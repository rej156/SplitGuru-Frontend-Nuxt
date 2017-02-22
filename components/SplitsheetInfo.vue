<template lang="pug">
  div.SplitsheetsInfoData
    div.StatusAwaiting
    div.SongNameData
      p.SongName {{splitsheet.songTitle}}
      button.ExpandInfo +
    p API TBA
    p {{ publishingPercentage }}%
    div.ClickOptions
      span.EditButton Edit
      span.ResendButton Resend
      p ...Download
</template>

<script>
  export default {
    props: [ 'splitsheet', 'i' ],
    computed: {
      publishingPercentage() {
        return this.$store.state.splitsheets[this.i].writers
          .find(({ Email }) => Email === this.$store.state.userLoggedIn)['PublishingPercentage']
      }
    }
  }
</script>

<style lang="stylus">
  button-dimension = 40px
  button-text-font-size = 25px

  status-button(n)
    position relative
    margin-left 8px
    top 20px
    height (button-dimension / 2)
    width (button-dimension / 2)
    border-radius 50%
    background-color n

  .SplitsheetsInfoData
    display grid
    grid-template-columns 20% 20% 20% 20% 20%
    margin auto
    width 80%
  .StatusAwaiting
    status-button(yellow)
  .StatusDone
    status-button(#6db18d)
  .SongNameData
    display flex
    flex-direction row
  .SongName
    text-decoration underline
  .ExpandInfo
    margin-left auto
    margin-right 25px
    background-color transparent
  .ClickOptions
    display flex
    align-items center
  .EditButton
    padding-right 5px
    border-right 2px solid
  .ResendButton
    padding-left 5px
</style>
