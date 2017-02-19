<template lang="pug">
  div.layout.vertical.center
    div
      h1 DONE!
      p You will be emailed a completed PDF once all writers approve splits.
    div
      h1 Create Account
      p Create a password to never fill this out again and keep a record of all of your splits.
      p Moving forward you'll only need to approve percentages and get back to creating.
      br
      div
        label(for='Password') Password
        br
        input(id='Password' type='password' v-model='Password')
        br
        u Terms
    div.layout.horizontal
      div.layout.start
        button(@click='createAccount') Join
        button(@click='logAccount') Account Info
      div.layout.end
        button(@click='goHome') No thanks
</template>

<script>
export default {
  data: () => ({ Password: '' }),
  methods: {
    goBack() {
      window.history.go(-1)
    },
    goHome() {
      window.location = 'http://start.split.guru'
    },
    async createAccount() {
      const userLoggedIn = await this.$store.dispatch('createAccount', this._data.Password)
      if (userLoggedIn) this.$router.push('/account')
    },
    logAccount() {
      console.log(require('../utils/firebase.js').fbWebClient().auth())
    }
  }
}
</script>

<style lang="stylus">
</style>
