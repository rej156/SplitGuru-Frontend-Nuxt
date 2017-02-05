import Vuex from 'vuex'

const store = new Vuex.Store({
  state: {
    writer: {},
    writerIndex: null
  },
  mutations: {
    preloadWriter (state, writerToFillInFor) {
      state.writer = writerToFillInFor
    },
    preloadWriterIndex (state, writerToFillInForIndex) {
      state.writerIndex = writerToFillInForIndex
    },
    preloadSongTitle (state, songTitle) {
      state.songTitle = songTitle
    },
    updateWriter (state, writer) {
      state.writer = writer
    }
  }
})

export default store
