<template lang='pug'>
  div.layout.vertical.center
    h1 Split Guru
    p You've been invited to {{ songTitle }}'s split sheet.
    p Quickly and easily fill in a few detials, then you're done!
    nuxt-link(to='/form')
      button Enter Split
    p Already have an account?
    button Login

</template>

<script>
if (process.SERVER_BUILD) {
  var { decode } = require('jsonwebtoken') 
  var firebase = require('../../utils/firebase.js').default
}

export default {
  async fetch({ store, params: { hash } }) {
    if (process.SERVER_BUILD) {
      const { email, ref } = decode(hash, 'splitgurusecret')
      const splitsheetRef = ref.replace("https://splitguru-154114.firebaseio.com", '')
      const writersRef = await firebase().database().ref(splitsheetRef + '/writers').once('value')
      const writers = writersRef.val()
      const writerToFillInFor = writers.find((writer) => writer.Email === email)
      const writerIndex = writers.indexOf(writerToFillInFor)
      const songTitleRef = await firebase().database().ref(splitsheetRef + '/songTitle').once('value')
      const songTitle = songTitleRef.val()


      store.commit('setHash', hash)
      store.commit('preloadWriter', writerToFillInFor)
      store.commit('preloadSongTitle', songTitle)
      store.commit('preloadWriterIndex', writerIndex)
    }
  },
  computed: {
    songTitle () { return this.$store.state.songTitle }
  }
}
</script>

<style>

</style>
