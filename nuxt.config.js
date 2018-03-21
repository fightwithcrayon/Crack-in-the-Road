const axios = require('axios')
const routerBase = process.env.DEPLOY_ENV === 'GH_PAGES' ? {
  router: {
    base: '/Crack-in-the-Road/'
  }
} : {}

module.exports = {
  ...routerBase,
  /*
  ** Headers of the page
  */
  head: {
    title: 'Crack in the Road',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'First to break the latest in genuinely groundbreaking new music, art and culture since 2010. Jacob Rees Mogg is our pay pig..' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  css: [
    '@/assets/shared.scss'
  ],
  transition: {
    name: 'page',
    mode: 'out-in',
    css: false,
    beforeLeave (el) {
      console.log('before leave')
    },
    leave (el, done) {
      console.log('leave')
      done()
    }
  },
  plugins: [
    {
      src: '~plugins/webFontLoader.js', ssr: false
    }
  ],
  modules: [
    '@nuxtjs/axios'
  ],
  middleware: [
    'transition.js'
  ],
  build: {
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
    routes: function () {
      // return ['https://www.crackintheroad.com/music/34275-new-thunder-jackson-colours']
      return axios.get('https://www.crackintheroad.com/wp-json/custom/routes').then((res) => {
          return res.data.map(url => url.replace('https://www.crackintheroad.com', ''))
        })
    }
  }
}
