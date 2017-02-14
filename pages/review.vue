<template lang='pug'>
  div.layout.vertical.center
    h1 Review {{ songTitle }} Split sheet
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
        br
        label(for='Publisher') Publisher
        br
        input(id='Publisher' v-model='Publisher')
        p(v-if="!Publisher.length") Publisher is required!
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
        br
        label(for='IdentificationNumber') CAE | IPI | SSN
        br
        input(type='number' id='IdentificationNumber' v-model='IdentificationNumber')
        p(v-if="!IdentificationNumber.toString().length") Identification Number required!
        br
        label(for='Signature') Signature
        br
        input(id='Signature' v-model='Signature')
        p(v-if="!Signature.length") Signature is required!
        br
    div.layout.horizontal.buttons
      button(@click='goBack') Back
      button(@click='submitDetails') Submit
</template>

<script>
export default {
  data({store}) {
    const proOptions = ['ASCAP','BMI','SESAC','SOCAN','PRS','GEMA','SACEM','APRA','Other']
    const { writer, songTitle } = store.state
    console.log(store.state)
    console.log(writer)
    return { ...writer, proOptions, songTitle }
  },
  methods: {
    goBack() {
      window.history.go(-1)
    },
    updateWriter() {
      this.$store.commit('updateWriter', this._data)
    },
    submitDetails() {
      this.$store.dispatch('submitWriterDetails', this._data)
      this.$router.push('/done')
    }
  }
}
</script>

<style scoped lang='stylus'>
  .title
    margin 50px 0
  .buttons
    margin-top 30px
</style>
