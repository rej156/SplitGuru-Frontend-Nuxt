<template lang='pug'>
  div.layout.vertical.center
    h1 Fill in yo shit!
    form.layout.horizontal
      div.column
        label(for='LegalName') Legal Name
        br
        input(id='LegalName' v-model='LegalName')
        br
        label(for='ArtistName') Artist Name
        br
        input(id='ArtistName' v-model='ArtistName')
        br

        label Contribution
        br
        input(type='radio' value='Lyrics' v-model='ContributionType')
        label(for='Lyrics') Lyrics
        input(type='radio' value='Composer' v-model='ContributionType')
        label(for='Composer') Composer
        input(type='radio' value='Both' v-model='ContributionType')
        label(for='Both') Both
      div.column
        label(for='PublishingPercentage') Publishing Percentage
        br
        input(id='PublishingPercentage' v-model='PublishingPercentage')
        br
        label(for='Pro') Pro
        br
        input(id='Pro' v-model='Pro')
        br
        label(for='Email') Email
        br
        input(id='Email' v-model='Email')
    div.layout.horizontal
      button(@click='goBack') Back
      nuxt-link(to='/review')
        button Next
</template>

<script>
export default {
  data({ store }) {
    const { writer } = store.state
    console.log(store.state)
    console.log(writer)
    return { ...writer }
  },
  methods: {
    goBack() {
      window.history.go(-1)
    }
  }
}
</script>

<style scoped lang='stylus'>
.column
  margin-right: 20px
</style>
