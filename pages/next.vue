<template lang='pug'>
  div.layout.vertical.center
    form
      label(for='IdentificationNumber') CAE | IPI | SSN
      br
      input(type='number' id='IdentificationNumber' v-model='IdentificationNumber')
      p(v-if="!IdentificationNumber.toString().length") Identification Number required!
      br
      label(for='Publisher') Publisher
      br
      input(id='Publisher' v-model='Publisher')
      p(v-if="!Publisher.length") Publisher is required!
      br
      label(for='Signature') Signature
      br
      input(id='Signature' v-model='Signature')
      p(v-if="!Signature.length") Signature is required!
      br
    div.layout.horizontal
      nuxt-link(to='/form')
        button Back
      nuxt-link(to='/review')
        button(@click='updateWriter') Next
</template>

<script>
export default {
  data({ store }) {
    const { writer } = store.state
    return { ...writer }
  },
  methods: {
    updateWriter() {
      console.log(this._data)
      this.$store.commit('updateWriter', this._data)
    }
  }
}
</script>

<style scoped lang='stylus'>
</style>
