'use strict';
const fetch = require('node-fetch');

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

let totalPages = 0;
const importArtists = async (page = 1) => {
  let data;
  try {
    const response = await fetch(`http://localhost:8888/wp-json/wp/v2/ha_artist?per_page=100&page=${page}`);
    totalPages = response.headers.get('x-wp-totalpages')
    data = await response.json();
  } catch (error) {
    return importArtists(page);
  }
  const artists = await Promise.all(data.map(artist => new Promise(async (resolve, reject) => {
    const {
      name,
      slug,
    } = artist;
    try {
      const created = await strapi.services.artist.create({
        name,
        slug,
      });
      resolve(created)
    } catch (err) {
      reject(err)
    }
  })));
  return totalPages > page ? importArtists(page + 1) : artists;
}

module.exports = {
  import: async ctx => {
    const artists = await importArtists();
    ctx.send(artists);
  },
};
