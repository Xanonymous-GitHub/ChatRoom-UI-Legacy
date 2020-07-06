module.exports = {
  mode: 'universal',
  target: 'static',
  head: {
    title: 'Mr.Coding',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  loading: {
    color: 'green',
    height: '5px'
  },
  css: ['~/assets/scss/app.scss'],
  plugins: [],
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/vuetify'
  ],
  modules: [
    '~/io'
  ],
  vuetify: {
    customVariables: ['~/assets/scss/shared/variables.scss'],
    maxChunkSize: 10000,
    theme: {
      dark: false,
      default: 'light',
      disable: false,
      options: {
        cspNonce: undefined,
        customProperties: undefined,
        minifyTheme: undefined,
        themeCache: undefined
      },
      themes: {
        light: {
          primary: '#1976D2',
          secondary: '#424242',
          accent: '#82B1FF',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FB8C00'
        },
        dark: {
          primary: '#2196F3',
          secondary: '#424242',
          accent: '#FF4081',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FB8C00'
        }
      }
    }
  },
  build: {
    // analyze: true,
    extractCSS: true,
    sourceMap: false,
    cssSourceMap: false,
    optimization: {
      splitChunks: {
        chunks: 'all',
        automaticNameDelimiter: '.',
        name: true,
        cacheGroups: {},
        maxSize: 50000
      }
    },
    maxChunkSize: 50000,
    transpile: [
      /typed-vuex/
    ],
    postcss: {
      plugins: {
        'postcss-url': {},
        'postcss-nested': {},
        'postcss-responsive-type': {},
        'postcss-hexrgba': {}
        // 'postcss-scss': {}
      }
    }
  },
  typescript: {
    typeCheck: {
      eslint: true
    }
  },
  store: true,
  styleResources: {
    scss: '@/assets/app.scss'
  },
  env: {
    WS_URL: process.env.WS_URL || '/'
  }
}
