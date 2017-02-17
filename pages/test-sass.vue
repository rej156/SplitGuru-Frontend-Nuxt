<template>
<div class="ChangeMe">
  <h1 class="ChangeMe2">
    Wtf I can be scoped!
  </h1>
  <h2>{{ myData }}</h2>
</div>
</template>

<script>
export default {
  data({store}) {
    return { myData: 'Hello world!' }
  }
}
</script>

<style scoped lang="sass">
.ChangeMe
  color: red
h2
  color: green
</style>