import Vuex from 'vuex'

const store = new Vuex.Store({
  state: {
    writer: {},
    writerIndex: null
  },
  mutations: {
    preloadWriter (store, writerToFillInFor) {
      store.writer = writerToFillInFor
    },
    preloadWriterIndex (store, writerToFillInForIndex) {
      store.writerIndex = writerToFillInForIndex
    },
    preloadSongTitle (store, songTitle) {
      store.songTitle = songTitle
    }
  }
})

export default store
