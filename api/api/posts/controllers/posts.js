const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
var htmlEntities = {
  nbsp: ' ',
  cent: '¢',
  pound: '£',
  yen: '¥',
  euro: '€',
  copy: '©',
  reg: '®',
  lt: '<',
  gt: '>',
  quot: '"',
  amp: '&',
  apos: '\'',
};

const unescapeHTML = str => str.replace(/\&([^;]+);/g, (entity, entityCode) => {
  let match;

  if (entityCode in htmlEntities) {
    return htmlEntities[entityCode];
  } else if (match = entityCode.match(/^#x([\da-fA-F]+)$/)) {
    return String.fromCharCode(parseInt(match[1], 16));
  } else if (match = entityCode.match(/^#(\d+)$/)) {
    return String.fromCharCode(~~match[1]);
  } else {
    return entity;
  }
});

'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const getAuthor = async slug => {
  let author = await strapi.services.author.find({ slug });
  return author;
}

const getArtists = async slugs => {
  let artists = await Promise.all(slugs.map(slug => new Promise(async (resolve, reject) => {
    const artist = await strapi.services.artist.find({ slug });
    resolve(artist[0]);
  })));
  return artists.map(artist => artist.id);
}

const getCategories = async terms => {
  let categories = await Promise.all(terms.map(({ slug }) => new Promise(async (resolve, reject) => {
    const category = await strapi.services.category.find({ slug });
    resolve(category[0]);
  })));
  return categories.filter(c => c);
}
const getImage = meta => {
  const { file, sizes } = meta;
  const filePath = __dirname + '/output/wp-content/uploads/'
  if (fs.existsSync(filePath + file)) {
    return {
      file: file.toLowerCase(),
      height: parseInt(meta.height),
      width: parseInt(meta.width),
    };
  }
  if (!sizes) {
    return null;
  }
  const [year, month, filenameWithExt] = file.split('/');
  const largestImage = Object.values(sizes)
    .sort((a, b) => a.width - b.width)
    .find(size => fs.existsSync(`${filePath}/${year}/${month}/${size.file}`))
  if (largestImage) {
    return {
      file: `${year}/${month}/${largestImage.file.toLowerCase()}`,
      height: parseInt(largestImage.height),
      width: parseInt(largestImage.width),
    };
  }
  console.log('Needs a search')
  const filename = path.parse(filenameWithExt).name;
  try {
    var files = fs
      .readdirSync(__dirname + `/output/wp-content/uploads/${year}/${month}`)
      .filter(fn => fn.startsWith(filename))
      .map(f => {
        const chunks = path.parse(f).name.replace(filename + '-', '').split('x');
        if (chunks.length !== 2) {
          return null;
        }
        const width = parseInt(chunks[0]);
        const height = parseInt(chunks[1]);
        if (isNaN(width) || isNaN(height)) {
          return null;
        }
        return {
          file: f.toLowerCase(),
          width,
          height
        }
      })
      .filter(i => i)
      .sort((a, b) => b.width - a.width)
    console.log('Result', filename, files);
    if (files.length > 0) {
      return files[0]
    }
  } catch (error) {
    console.log(error)
  }
  return null;
};

const process = async post => {
  const {
    id: wpid,
    title: {
      rendered: titleRendered
    },
    slug,
    content: {
      rendered: contentRendered
    },
    date,
    artists: wpArtists,
    featured_image_meta,
    sticky,
    _embedded: {
      author: wpAuthor,
      ['wp:term']: wpTerms,
    }
  } = post;
  const categories = await getCategories(wpTerms[0]);
  const artists = await getArtists(wpArtists);
  const author = await getAuthor(wpAuthor[0].slug);
  const featured_image = featured_image_meta ? getImage(featured_image_meta) : null;

  const postData = {
    title: unescapeHTML(titleRendered),
    content: unescapeHTML(contentRendered.replace('admin.crackintheroad.com', 'api.crackintheroad.com').replace('/wp-content/uploads', '/uploads')),
    slug: `${wpid}-${decodeURIComponent(slug)}`,
    author: author[0].id,
    artists,
    categories: categories.map(category => category.id),
    category: categories[0].slug || 'music',
    date: date,
    wpid,
    isSticky: sticky,
    featured_image
  };
  return postData;
}

let totalPostPages = 0;
const importPosts = async (page = 39, limit = 999) => {
  let total = 0;
  let progress = 0;
  let posts;
  console.clear()
  console.log('Getting page', page);
  try {
    const response = await fetch(`http://localhost:8888/wp-json/wp/v2/posts?per_page=100&page=${page}&_embed`);
    totalPostPages = response.headers.get('x-wp-totalpages')
    posts = await response.json();
  } catch (error) {
    return importPosts(page);
  }
  total = posts.length;
  for await (post of posts) {
    const slug = `${post.id}-${decodeURIComponent(post.slug)}`;
    const existing = await strapi.services.posts.find({ slug });
    if (!existing || existing.length < 1) {
      const postData = await process(post);
      await strapi.services.posts.create(postData);
    } else {
      console.log('Skipping', slug)
    }
    progress += 1;
    console.log(`${progress} / ${total}`);
  }
  return totalPostPages > page ? importPosts(page + 1) : posts;
}

const getIndex = async (ctx) => {
  const { params: { year, month } } = ctx;
  let dateFilter = {};
  if (year && month) {
    dateFilter = {
      date_lt: new Date(year, month, 0),
    }
  }
  console.log(dateFilter)
  const latest = await strapi.query('posts').find({ _limit: 10, _sort: 'date:desc', ...dateFilter });
  const featured = await strapi.query('posts').find({ isSticky: true, _limit: 5, _sort: 'date:desc', ...dateFilter });
  const random = await strapi.query('posts').find({ id_nin: [...latest, ...featured], _limit: 10, _sort: 'date:desc', ...dateFilter });
  ctx.send({
    latest,
    featured,
    random,
  })
}

module.exports = {
  import: async ctx => {
    const data = await importPosts();
    ctx.send({
      state: 'success',
    });
  },
  index: async ctx => {
    await getIndex(ctx)
  },
  indexArchive: async ctx => {
    await getIndex(ctx)
  },
  routes: async ctx => {
    const data = strapi.query('posts').model.find({}, 'category slug');
    ctx.send(await data.exec())
  },
  timeline: async ctx => {
    const data = strapi.query('posts').model.aggregate([
      {
        $group: {
          _id: {
            year: {
              $year: '$date'
            },
            month: {
              $month: '$date'
            }
          },
          documentCount: { $sum: 1 }
        }
      },
      {
        $sort: {
          '_id.year': -1,
          '_id.month': -1
        }
      }
    ]);
    ctx.send(await data.exec())
  }
};
