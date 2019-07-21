const pkg = require('./package')
const { resolve } = require('path')
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
      { hid: 'description', name: 'description', content: pkg.description },
      { name: 'msapplication-TileColor', content: '#008987' },
      { name: 'theme-color', content: '#ffffff' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png'
      },
      { rel: 'manifest', href: '/site.webmanifest' },
      { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#5bbad5' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/icon?family=Material+Icons|Material+Icons+Outlined'
      },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Cabin:400,400i,600,600i|Vollkorn:400,400i,700,700i'
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Vollkorn+SC&display=swap'
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
  css: ['element-ui/lib/theme-chalk/index.css'],

  /**
   * Plugins to load before mounting the App
   * TODO: remover o element-ui e o reactive-search e usá-los de forma fracionada, por componente
   */
  plugins: [
    { src: '@/plugins/resize-sensor.js', ssr: false },
    { src: '@/plugins/reactive-search', ssr: false },
    { src: '@/plugins/element-ui', ssr: false },
    '@/plugins/v-viewer',
    '@/plugins/axios',
    '@/plugins/essential-content.js'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/dotenv',
    '@nuxtjs/axios',
    'nuxt-device-detect',
    '@nuxtjs/style-resources'
  ],
  styleResources: {
    stylus: './assets/styles/*.styl'
  },
  /*
  ** Axios module configuration
  */
  axios: {
    baseURL: process.env.API_URL || 'http://localhost:8000',
    debug: !(process.env.NODE_ENV && process.env.NODE_ENV === 'production')
  },
  env: {
    CONTACT_MESSAGE_RELAY_URL:
      process.env.CONTACT_MESSAGE_RELAY_URL || 'http://localhost:3001',
    RECAPTCHA_KEY: process.env.RECAPTCHA_KEY,
    MEDIA_URL: process.env.MEDIA_URL || 'http://localhost:8000',
    API_URL: process.env.API_URL || 'http://localhost:8000',
    ELASTIC_SEARCH_SERVER:
      process.env.ELASTIC_SEARCH_SERVER || 'http://localhost:9200',
    ELASTIC_SEARCH_CREDENTIALS: process.env.ELASTIC_SEARCH_CREDENTIALS
  },
  router: {
    middleware: ['collapseMenu', 'fetchMenuItems']
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
