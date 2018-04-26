module.exports = {
  modules: ['@nuxtjs/pwa','@nuxtjs/axios'],
  manifest: {
    name: 'Rider-S',
    short_name: 'Rider-S',
    title: 'Rider-S',
    'og:title': 'Rider-S',
    description: 'description',
    'og:description': 'description',
    lang: 'ja',
    theme_color: '#ffffff',
    background_color: '#ffffff'
  },
  /*
  ** Headers of the page
  */
  head: {
    title: 'Rider-S',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
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
  }
}
