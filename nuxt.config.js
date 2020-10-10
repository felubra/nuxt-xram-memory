import axios from 'axios'
const pkg = require('./package')
const WorkerPlugin = require('worker-plugin')

module.exports = {
  mode: 'universal',
  srcDir: 'src/',
  generate: {
    routes: function () {
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
          'https://fonts.googleapis.com/icon?family=Material+Icons|Material+Icons+Outlined|Roboto:400,400i,500,500i|Vollkorn:400,400i,700,700i|Vollkorn+SC&display=swap'
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

  /**
   * Plugins to load before mounting the App
   */
  buildModules: [
    // Simple usage
    '@nuxtjs/vuetify'
  ],
  plugins: [
    { src: '@/plugins/resize-sensor.js', ssr: false },
    { src: '@/plugins/element-ui', ssr: false },
    { src: '@/plugins/drag-scroll', ssr: false },
    { src: '@/plugins/async-computed', ssr: false },
    { src: '@/plugins/infinite-scroll', ssr: false },
    '@/plugins/axios',
    '@/plugins/dataSources',
    '@/plugins/utils',
    '@/plugins/essential-content.js'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/dotenv', // TODO: remover
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
    baseURL: 'http://localhost:8000',
    debug: !(process.env.NODE_ENV && process.env.NODE_ENV === 'production'),
    progress: false
  },
  publicRuntimeConfig: {
    version: '0.5.7',
    axios: {
      browserBaseURL: process.env.API_URL
    },
    lunrIndexURL: process.env.LUNR_INDEX_URL ||
      'http://localhost:8000/media/lunr_index/index.json',
    contactMessageRelayURL: process.env.CONTACT_MESSAGE_RELAY_URL ||
      'http://localhost:3001',
    recaptchaKey: process.env.RECAPTCHA_KEY,
    mediaURL: process.env.MEDIA_URL ||
      'http://localhost:8000',
    apiURL: process.env.API_URL ||
      'http://localhost:8000'
  },
  privateRuntimeConfig: {
    axios: {
      baseURL: process.env.SSR_API_URL || process.env.API_URL
    },
    lunrIndexURL: process.env.SSR_LUNR_INDEX_URL ||
      process.env.LUNR_INDEX_URL ||
      'http://localhost:8000/media/lunr_index/index.json',
    contactMessageRelayURL: process.env.SSR_CONTACT_MESSAGE_RELAY_URL ||
      process.env.CONTACT_MESSAGE_RELAY_URL ||
      'http://localhost:3001',
    recaptchaKey: process.env.RECAPTCHA_KEY,
    mediaURL: process.env.SSR_MEDIA_URL ||
      process.env.MEDIA_URL ||
      'http://localhost:8000',
    apiURL: process.env.SSR_API_URL ||
      process.env.API_URL ||
      'http://localhost:8000'
  },
  router: {
    middleware: ['collapseMenu', 'fetchMenuItems'],
    parseQuery: qs => {
      // FIXME: não importe 'query-string' aqui
      const queryString = require('query-string')
      const parsed = queryString.parse(qs)
      if (parsed) {
        return parsed
      }
      return {}
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    terser: {
      extractComments: false // default was LICENSES
    },
    babel: {
      plugins: [
        [
          'component',
          {
            libraryName: 'element-ui',
            styleLibraryName: 'theme-chalk'
          }
        ]
      ]
    },
    extend (config, ctx) {
      config.output.globalObject = 'this'
      // suporte para webworkers
      if (ctx.isClient) {
        config.plugins.push(new WorkerPlugin())
      }

      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.devtool = 'source-map'
      }
      config.module.rules.forEach(rule => {
        if (String(rule.test) === String(/\.(png|jpe?g|gif|svg|webp)$/)) {
          // add a second loader when loading images
          rule.use.push({
            loader: 'image-webpack-loader',
            options: {
              svgo: {
                plugins: [
                  // use these settings for internet explorer for proper scalable SVGs
                  // https://css-tricks.com/scale-svg/
                  { removeViewBox: false },
                  { removeDimensions: true }
                ]
              }
            }
          })
        }
      })
    },
    telemetry: false
  }
}
