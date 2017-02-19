<template lang="pug">
  div.layout.vertical.center
    div
      h1 DONE!
      p You will be emailed a completed PDF once all writers approve splits.
    div(v-if='!alreadyHasAccount && !userLoggedIn')
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
    div.MyAccount(v-else-if='userLoggedIn')
      nuxt-link(to='/account') My Account
    div(v-else)
      h1(v-if='wrongPassword') Wrong Password!
      h1(v-else) You already have an account!
      div
        label(for='Password') Password
        br
        input(id='Password' type='password' v-model='Password')
    div.layout.horizontal(v-if='!userLoggedIn')
      div.layout.start
        button(v-if='!alreadyHasAccount' @click='createAccount') Join
        button(v-else @click='login') Login
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
      this._data.Password = ''
    },
    logAccount() {
      console.log(require('../utils/firebase.js').fbWebClient().auth())
    },
    async login() {
      const userLoggedIn = await this.$store.dispatch('login', this._data.Password)
      if (userLoggedIn) this.$router.push('/account')
      else { this._data.Password = '' }
    }
  },
  computed: {
    alreadyHasAccount() { return this.$store.state.alreadyHasAccount },
    wrongPassword() { return this.$store.state.wrongPassword },
    userLoggedIn() { return this.$store.state.userLoggedIn }
  }
}
</script>

<style lang="stylus">
  .MyAccount
    margin-top 50px
</style>
