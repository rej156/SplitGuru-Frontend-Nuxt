<template lang='pug'>
  div.layout.vertical.center.content
    h1 Please fill in your details!
    form.layout.horizontal
      div.column
        label(for='LegalName') Legal Name
        br
        input(id='LegalName' v-model='LegalName')
        p(v-if="!LegalName.length") Legal Name is required!
        br
        label(for='ArtistName') Artist Name
        br
        input(id='ArtistName' v-model='ArtistName')
        p(v-if="!ArtistName.length") Artist Name is required!
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
        input(disabled type='number' min=1 max=99 id='PublishingPercentage' v-model='PublishingPercentage')
        p(v-if="PublishingPercentage > 99 || PublishingPercentage < 1") Publishing Percentage is min 1, max 100!
        br
        label(for='Pro') Pro
        br
        select(id='Pro' v-model='Pro')
          option(v-for='proOption in proOptions' @value='proOption') {{proOption}}
    div.layout.horizontal.buttons
      button(@click='goBack') Back
      nuxt-link(to='/next')
        button(@click='updateWriter') Next
</template>

<script>
export default {
  data({store}) {
    const proOptions = ['ASCAP','BMI','SESAC','SOCAN','PRS','GEMA','SACEM','APRA','Other']
    const { writer } = store.state
    console.log(store.state)
    console.log(writer)
    return { ...writer, proOptions }
  },
  methods: {
    goBack() {
      window.history.go(-1)
    },
    updateWriter() {
      this.$store.commit('updateWriter', this._data)
    }
  }
}
</script>

<style scoped lang='stylus'>
.column
  margin-right 20px
.content
  margin-top 50px
.buttons
  margin-top 30px
</style>
