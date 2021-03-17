export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  domain:'https://unicso.devcomp.ru',
  loading: '~/components/loader.vue',

  router: {
    middleware: 'preload'
  },
  head: {
    title: 'Сайт',
    htmlAttrs: {
      lang: 'ru',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },

      { property:"og:url", content:this.domain},
      { property:"og:type", content:"website"},
      { property:"og:title", content:"Сайт"},
      { property:"og:description", content:"Сайт"},
      { property:"og:image", content:this.domain},
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/files/client/images/favicon.ico' },

    ],

  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '~assets/main.css',
    '~assets/fonts.css',
    '~assets/form_fields.css',
      '~assets/icons.css'


  ],
  cache: false,

  axios: {
    //origin:'https://startup-clan.ru',
    baseURL: '/v1/',
    proxyHeaders: false,
    credentials: true,
    debug:false,
    cookieEnabled:true,
    retry: { retries: 3 }

  },
  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '~/plugins/axios',
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    '@nuxtjs/axios',
    ['@nuxtjs/device'],
   // ['nuxt-session', { alias: 'nsession' }],
    ['cookie-universal-nuxt', { alias: 'cookiz' }],


  ],

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    /*
    ** Run ESLint on save
    */
    vendor: ['vue-native-websocket'],

    postcss: {
      plugins: {
        // Disable `postcss-url`


       // 'postcss-url': false,
        // Add some plugins
      //  'postcss-nested': {},
        /*   'postcss-responsive-type': {},*/

      },
      preset: {
        autoprefixer: {
          //   grid: true,
          //     browsers: ['ie >= 10']
        }
      }
    },


    extend (config, { isDev, isClient }) {
      config.node = {

        fs: "empty",
        uws: "empty",

      };
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          //loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
