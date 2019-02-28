const pkg = require('./package')

module.exports = {
  mode: 'universal',
  srcDir: 'src/',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/icon?family=Material+Icons'
      }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: ['element-ui/lib/theme-chalk/index.css', '~/css/main.css'],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: ['@/plugins/reactive-search', '@/plugins/v-viewer'],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios'
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    baseURL: process.env.API_URL || 'http://localhost:8000',
    debug: !(process.env.NODE_ENV && process.env.NODE_ENV === 'production')
  },
  env: {
    mediaUrl: process.env.MEDIA_SERVER_URL || 'http://localhost:8000'
  },
  router: {
    middleware: 'collapseMenu'
  },
  /*
  ** Build configuration
  */
  build: {
    transpile: [/^element-ui/],
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Necessário para utilizar o componente pdfVuer: https://github.com/webpack/webpack/issues/6525
      config.output.globalObject = '(self || this)'
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.devtool = 'source-map'
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
