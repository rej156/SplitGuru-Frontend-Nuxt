<template lang='pug'>
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
        input(id='Password' v-model='Password')
        br
        u Terms
    div.layout.horizontal
      div.layout.start
        button(@click='goBack') Join
      div.layout.end
        button(@click='submitDetails') No thanks
</template>

<script>
export default {
  data({store}) {
    return { Password: '' }
  },
  methods: {
  }
}
</script>

<style>
</style>
