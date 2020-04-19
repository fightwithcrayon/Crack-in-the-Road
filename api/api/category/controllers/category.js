const fetch = require('node-fetch');
let totalPages = 0;
const importCategories = async (page = 1) => {
  let data;
  try {
    const response = await fetch(`http://localhost:8888/wp-json/wp/v2/categories?per_page=100&page=${page}`);
    data = await response.json();
  } catch (error) {
    return importCategories(page);
  }
  const categories = await Promise.all(data.map(category => new Promise(async (resolve, reject) => {
    const {
      name,
      slug,
    } = category;
    try {
      const created = await strapi.services.category.create({
        name,
        slug,
      });
      resolve(created)
    } catch (err) {
      reject(err)
    }
  })));
  return categories;
}

module.exports = {
  import: async ctx => {
    const categories = await importCategories();
    ctx.send(categories);
  },
};
