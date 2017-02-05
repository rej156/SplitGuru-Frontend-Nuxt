import Vuex from 'vuex'
import superagent from 'superagent'

const store = new Vuex.Store({
  state: {
    writer: {},
    writerIndex: null,
    hash: ''
  },
  mutations: {
    setHash (state, hash) {
      state.hash = hash
    },
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
  },
  actions: {
    async submitWriterDetails(store, details) {
      const { hash } = store.state
      const { LegalName, ArtistName, ContributionType, Pro, IdentificationNumber, Publisher, Signature } = details
      const writer = {  LegalName, ArtistName, ContributionType, Pro, IdentificationNumber, Publisher, Signature  }
      try {
        const result = await superagent.put(process.env.API_URL || `http://localhost:8080/fillindetails/${hash}`)
          .set('Content-Type', 'application/json')
          .send({ writer })
        console.log(result)
      } catch(e) {
        console.error(e)
      }
    }
  }
})

export default store
