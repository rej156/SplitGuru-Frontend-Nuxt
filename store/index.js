import Vuex from 'vuex'
import superagent from 'superagent'

const store = new Vuex.Store({
  state: {
    writer: {},
    writerIndex: null,
    hash: '',
    alreadyHasAccount: false,
    userLoggedIn: false,
    wrongPassword: false
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
    },
    alreadyHasAccount (state) {
      state.alreadyHasAccount = true
    },
    wrongPassword(state) {
      state.wrongPassword = true
    }
  },
  actions: {
    async submitWriterDetails(store, details) {
      const { hash } = store.state
      const { LegalName, ArtistName, ContributionType, Pro, IdentificationNumber, Publisher, Signature } = details
      const writer = {  LegalName, ArtistName, ContributionType, Pro, IdentificationNumber, Publisher, Signature  }
      try {
        const result = await superagent.put(`http://api.split.guru/fillindetails/${hash}`)
          .set('Content-Type', 'application/json')
          .send({ writer })
        console.log(result)
      } catch(e) {
        console.error(e)
      }
    },
    async createAccount(store, Password) {
      const { writer } = store.state
      if (process.BROWSER_BUILD) {
        try {
          const { fbWebClient } = require('../utils/firebase.js')
          const acc = await fbWebClient().auth().createUserWithEmailAndPassword(writer.Email, Password)
          const { providerData } = await fbWebClient().auth().currentUser
          await fbWebClient().database().ref("/users").child(providerData[0].uid.replace('.', ',')).set({
             provider: 'password'
          })
          store.dispatch('userLoggedIn')
          return true
        } catch(e) {
          if (e.code === "auth/email-already-in-use") store.commit('alreadyHasAccount')
          console.error(e)
          return false
        }
      }
    },
    userLoggedIn(store) {
      store.state.userLoggedIn = true
    },
    wrongPassword(store) {
      store.state.wrongPassword = true
    },
    async login(store, Password) {
      const { writer } = store.state
      if (process.BROWSER_BUILD) {
        try {
          const { fbWebClient } = require('../utils/firebase.js')
          await fbWebClient().auth().signInWithEmailAndPassword(writer.Email, Password)
          store.dispatch('userLoggedIn')
          return true
        } catch(e) {
          if (e.code === "auth/wrong-password") store.commit('wrongPassword')
          console.error(e)
          return false
        }
      }

    }
  }
})

export default store
