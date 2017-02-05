<template lang='pug'>
  section
    img.logo(src='../assets/img/logo.png')
    h1.title Universal Vue.js Application Framework
    input(v-model='message' placeholder='edit me')
    p Message is {{message}}
    nuxt-link.button(to='/about') About page
</template>

<script>
  export default {
    data(context) {
      return { message: '' }
    }
  }
</script>

<style scoped lang='stylus'>
  .title
    margin: 50px 0
</style>
