<template lang='pug'>
  div.layout.vertical.center
    nuxt
</template>

<script>
  export default {
    mounted(context) {
      if (process.BROWSER_BUILD) {
        try {
          const { fbWebClient } = require('../utils/firebase.js')
          fbWebClient().auth().onAuthStateChanged((user) => {
            if (user) {
              this.$store.dispatch('userLoggedIn')
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
  background-color #ebebeb
  font-family Cabin, Source Sans Pro
  font-weight 100

button
  background-color #6db18d
  border none
  border-radius 3px

</style>
