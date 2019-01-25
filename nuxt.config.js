const axios = require('axios')

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Crack in the Road',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'First to break the latest in genuinely groundbreaking new music, art and culture since 2010. Jacob Rees Mogg is our pay pig.' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: '~/components/Loading.vue',
  /*
  ** Build configuration
  */
  css: [
    '@/assets/shared.scss'
  ],
  transition: {
    name: 'page',
    mode: 'out-in',
    css: false
  },
  modules: [
    '@nuxtjs/axios'
  ],
  middleware: [
    'transition.js'
  ],
  plugins: [
    '~/plugins/portal-vue'
  ],
  build: {
    vendor: ['portal-vue'],
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  generate: {
    workers: 4,
    workerConcurrency: 500,
    concurrency: 500,
    routes: async function () {
      const res = await axios.get(`https://admin.crackintheroad.com/wp-json/custom/routes/?date=${Date.now()}`)
      const permalinks = res.data
      const pageSize = 1000
      const pageCount = Math.ceil(Object.keys(permalinks).length / pageSize)
      let posts = []
      for (let pageNum = 1; pageNum <= pageCount; pageNum++) {
        await axios.get(`https://admin.crackintheroad.com/wp-json/custom/routes/${pageNum}?date=${Date.now()}`).then((res) => {
          const formattedPosts = res.data.map((post, i) => {
            return {
              route: permalinks[post.ID].permalink,
              payload: post
            }
          })
          posts = [...posts, ...formattedPosts]
        })
      }
      return posts
    }
  }
}
