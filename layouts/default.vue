<template lang='pug'>
  div.layout.vertical.center
    nuxt
</template>

<script>
  export default {
    async mounted(context) {
      if (process.BROWSER_BUILD) {
        try {
          const { fbWebClient } = require('../utils/firebase.js')
          fbWebClient().auth().onAuthStateChanged(async (user) => {
            if (user) {
              this.$store.commit('userLoggedIn', user.email)
              await this.$store.dispatch('fetchWriter', user.email)
              await this.$store.dispatch('fetchSplitsheets', user.email)
            }
          })
        } catch(e) {
          console.error(e)
        }
      }
    }
  }
</script>

<style lang='stylus'>
@import url('https://fonts.googleapis.com/css?family=Cabin')
@import url('https://fonts.googleapis.com/css?family=Space+Mono')
@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

body
  background-color #d7d7d7
  font-family Cabin, Source Sans Pro
  font-weight 100

button
  background-color #6db18d
  border none
  border-radius 3px

</style>
