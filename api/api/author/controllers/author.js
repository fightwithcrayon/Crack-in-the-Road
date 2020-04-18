'use strict';
const fetch = require('node-fetch');

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const importAuthors = async () => {
  let data;
  try {
    const response = await fetch(`https://admin.crackintheroad.com/wp-json/wp/v2/users?per_page=100`);
    data = await response.json();
   } catch (error) {
     return importAuthors();
   }
  const authors = await Promise.all(data.map(author => new Promise(async (resolve, reject) => {
    const {
      name,
      slug,
      avatar_urls,
    } = author;
    try{
      const created = await strapi.services.author.create({
        name,
        slug,
        avatar: avatar_urls['96'],
      });
      resolve(created)
    }catch(err){
      reject(err)
    }
  })));
  return authors;
 }

module.exports = {
  import: async ctx => {
    const authors = await importAuthors();
    ctx.send(authors);
  },
};
