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
  routes: async ctx => {
    const sorted = await strapi.query('category').model.aggregate([
      { $project: { posts: 1, slug: 1, name: 1 } },
      { $unwind: '$posts' },
      { $group: { _id: '$_id', count: { $sum: 1 }, slug: { $first: '$slug' }, name: { $first: '$name' } } },
      { $sort: { 'count': -1 } },
    ]);
    ctx.send(sorted);
  },
  import: async ctx => {
    const categories = await importCategories();
    ctx.send(categories);
  },
};
