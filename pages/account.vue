<template lang="pug">
  div.Account.layout.vertical
    div.AccountProfile.layout.vertical
      div.Logout
        p Logout
      div.ArtistProfile.layout.horizontal
        h2.ArtistName {{artistName}}
        button.CreateSplitSheet
          span.PlusSign +
      div.Tabs.layout.horizontal
        div.Splits
          button.SplitsButton Splits
        div.AccountInfo
          button.AccountInfoButton Account Info
    div.SplitsheetsInfo
      div.SplitsheetsInfoHeader
        h4.StatusHeader Status
        h4 Song Name
        h4 Date
        h4 Pub %
        h4 Click Options
      SplitsheetInfo(v-for='(splitsheet, i) in splitsheets' v-bind:splitsheet='splitsheet' v-bind:i='i')

</template>

<script>
  import SplitsheetInfo from '../components/SplitsheetInfo.vue'

  export default {
    components: {
      SplitsheetInfo
    },
    middleware: "auth",
    computed: {
      artistName() { return this.$store.state.writer.ArtistName },
      splitsheets() { return this.$store.state.splitsheets }
    }
  }
  </script>

<style lang="stylus">
  button-dimension = 40px
  button-text-font-size = 25px

  .Account
    min-width 70%
  .AccountProfile
    background-color #ebebeb
    padding 0 15px
  .Logout
    margin-right 0
    margin-left auto
    > p
      text-transform uppercase
  .ArtistName
    margin-left 150px
  .CreateSplitSheet
    display block
    height button-dimension
    color white
    width button-dimension
    margin-top 5px
    margin-right 22%
    margin-left auto
    border-radius 50%
  .PlusSign
    position relative
    font-size button-text-font-size
    top -2px
  .Tabs
    margin-top 50px
    height 60px
  .Splits, .AccountInfo
    vertical-align middle
    text-align center
    width 50%
  .AccountInfo
    line-height 50px
  .AccountInfoButton, .SplitsButton
    background-color #5c6d7e
    text-transform uppercase
    color white
    height 50px
    width 150px
  .SplitsheetsInfoHeader
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
