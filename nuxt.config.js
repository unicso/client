const isDev = false
export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)

  loading: '~/components/loader.vue',

  router: {
    prefetchLinks: false,
    middleware: 'preload'
  },
  head: {
    title: 'Юниксо - надежный помощник Вашего бизнеса',
    htmlAttrs: {
      lang: 'ru',
      translate:'no'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Компания ООО «Юниксо» осуществляет коммерческую деятельность, ориентированную на предоставление заказчикам комплексных решений по планированию, разработке, обеспечению и управлению процессами закупочной деятельности организаций' },

      { property:"og:url", content:"https://market.unicso.ru"},
      { property:"og:type", content:"website"},
      { property:"og:title", content:"Сайт компании Юниксо"},
      { property:"og:description", content:"Юниксо - надежный помощник Вашего бизнеса"},
      { property:"og:image", content:"https://market.unicso.ru"}
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/files/client/images/favicon.ico' }

    ],

  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '~assets/main.css',
    '~assets/fonts.css',
    '~assets/form_fields.css',
    '~assets/icons.css',
    '~assets/animations.css',

    '~assets/min980.css',
    '~assets/max980.css',
    '~assets/max480.css',

    '~assets/ie.css'



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
    { src: '~/plugins/vue-modal.js', mode: 'client' },
    '~plugins/filters.js'
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
    ['cookie-universal-nuxt', { alias: 'cookies' }],


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


        'postcss-url': false,
        // Add some plugins
        'postcss-nested': {}
        /*   'postcss-responsive-type': {},*/

      },
      preset: {
        autoprefixer: {

             grid: true,
          //     browsers: ['ie >= 10']
        }
      }
    },

      html: {
        minify: {
          collapseBooleanAttributes: true,
          decodeEntities: true,
          minifyCSS: true,
          minifyJS: true,
          processConditionalComments: true,
          removeEmptyAttributes: true,
          removeRedundantAttributes: true,
          trimCustomFragments: true,
          useShortDoctype: true
        }
      },


    extend (config, { isDev, isClient }) {
      config.node = {

        fs: "empty",
        uws: "empty"

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
