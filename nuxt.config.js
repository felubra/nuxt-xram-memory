const { resolve } = require('path')
const pkg = require('./package')
import axios from 'axios'

module.exports = {
  mode: 'universal',
  srcDir: 'src/',
  generate: {
    routes: function() {
      const baseURL = process.env.API_URL || 'http://localhost:8000'
      const axiosInstance = axios.create({
        baseURL
      })
      return Promise.all([
        axiosInstance.get('api/v1/pages/in_menu'),
        axiosInstance.get('api/v1/pages/featured')
      ])
        .then(responses => responses.map(response => response.data))
        .then(pages => pages.reduce((acc, val) => acc.concat(val), []))
        .then(pages => pages.map(page => `/${page.id}`))
    }
  },
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
      },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Cabin:400,400i,600,600i|Vollkorn:400,400i,700,700i'
      }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#AA0000' },

  /*
  ** Global CSS
  */
  css: ['element-ui/lib/theme-chalk/index.css', '~/css/main.css'],

  /**
   * Plugins to load before mounting the App
   * TODO: remover o element-ui e o reactive-search e usá-los de forma fracionada, por componente
   */
  plugins: [
    { src: '@/plugins/element-ui', ssr: false },
    { src: '@/plugins/reactive-search', ssr: false },
    '@/plugins/v-viewer',
    '@/plugins/axios',
    '@/plugins/essential-content.js',
    { src: '@/plugins/resize-sensor.js', ssr: false }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    ['@nuxtjs/dotenv', { path: resolve(__dirname) }],
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
    CONTACT_MESSAGE_RELAY_URL: process.env.CONTACT_MESSAGE_RELAY_URL,
    RECAPTCHA_KEY: process.env.RECAPTCHA_KEY,
    MEDIA_URL: process.env.MEDIA_URL,
    API_URL: process.env.API_URL,
    ELASTIC_SEARCH_SERVER: process.env.ELASTIC_SEARCH_SERVER
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
      }
    }
  }
}
