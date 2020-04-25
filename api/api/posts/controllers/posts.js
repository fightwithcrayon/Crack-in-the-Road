const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
const { Analytics } = require('analytics')
const googleAnalytics = require('@analytics/google-analytics').default;

const analytics = Analytics({
  app: 'Crack in the Road',
  version: 100,
  plugins: [
    googleAnalytics({
      trackingId: 'UA-17970339-3',
    }),
  ]
})

// Fire a page view

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
  const author = await strapi.query('author').model.find({ slug }, 'slug id');
  return author;
}

const getArtists = async slugs => {
  let artists = await Promise.all(slugs.map(slug => new Promise(async (resolve, reject) => {
    const artist = await strapi.query('artist').model.find({ slug }, 'slug id');
    resolve(artist[0]);
  })));
  return artists.map(artist => artist.id);
}

const getCategories = async terms => {
  let categories = await Promise.all(terms.map((slug) => new Promise(async (resolve, reject) => {
    const data = await strapi.query('category').model.find({ slug }, 'slug id');
    resolve(data[0]);
  })));
  return categories.filter(c => c);
}
const getImage = meta => {
  const { file, sizes } = meta;
  const filePath = '/Users/andrew/Repos/crackintheroad/api/public/uploads/'
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
      .readdirSync(`${filePath}${year}/${month}`)
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
    author: wpAuthor,
    terms: wpTerms,
  } = post;
  const categories = await getCategories(wpTerms);
  const artists = await getArtists(wpArtists);
  const author = await getAuthor(wpAuthor);
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
const importPosts = async (page = 30, limit = 999) => {
  let total = 0;
  let progress = 0;
  let posts;
  console.clear()
  try {
    console.log('Getting page', page);
    const response = await fetch(`http://localhost:8888/wp-json/wp/v2/posts?per_page=100&page=${page}`);
    totalPostPages = response.headers.get('x-wp-totalpages')
    posts = await response.json();
  } catch (error) {
    console.log('Error');
    return importPosts(page);
  }
  total = posts.length;
  for await (post of posts) {
    const slug = `${post.id}-${decodeURIComponent(post.slug)}`;
    const existing = await strapi.query('posts').model.find({ slug }, 'slug id');
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
  // Todo: No date filter added
  const latest = await strapi.query('posts').model.find({}, 'title slug category date featured_image').limit(10).sort({ date: 'desc' }).exec();
  const featured = await strapi.query('posts').model.find({
    isSticky: true,
  }, 'title slug category date featured_image').limit(1).sort({ date: 'desc' }).exec();
  const random = await strapi.query('posts').model.find({}, 'title slug category date featured_image').where('id').nin([...latest, ...featured]).limit(10).sort({ date: 'desc' }).exec();

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
  do: async ctx => {
    const data = strapi.query('posts').model.find({}, 'id slug content');
    const docs = await data.exec();

    for await (doc of docs) {
      const content = doc.content
        .replace('http://localhost:8888/wp-content/uploads', 'https://api.crackintheroad.com/images')
        .replace('http://admin.crackintheroad.com/wp-content/uploads', 'https://api.crackintheroad.com/images')
        .replace('https://admin.crackintheroad.com/wp-content/uploads', 'https://api.crackintheroad.com/images')
        .replace('http://', 'https://');

      const result = strapi.query('posts').model.update({
        id: doc.id,
      }, {
        content,
      });

      await result.exec();
      console.log('Processed', doc.slug)
    };
  },
  index: async ctx => {
    await getIndex(ctx)
  },
  indexArchive: async ctx => {
    await getIndex(ctx)
  },
  note: async ctx => {
    const { href, path, title } = ctx.query;
    analytics.page({
      path,
      title,
      href,
      url: href,
    })
    ctx.send({})
  },
  routes: async ctx => {
    const data = strapi.query('posts').model.find({}, 'category slug');
    ctx.send(await data.exec())
  },
  single: async ctx => {
    const data = strapi.query('posts').model.find({
      slug: ctx.params.id,
    })
      .populate('author', 'name').select('author.name category content date featured_image slug title');
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
