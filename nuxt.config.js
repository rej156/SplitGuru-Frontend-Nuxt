module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'SplitGuru',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', content: "SplitGuru" }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Global CSS
  */
  css: ['~assets/css/flexbox-layout.css'],
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3B8070' },
  plugins: [ '~plugins/vuelidate.js' ]
}
