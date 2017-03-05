import Vuex from 'vuex'
import superagent from 'superagent'

const store = new Vuex.Store({
  state: {
    writer: {},
    writerIndex: null,
    hash: '',
    alreadyHasAccount: false,
    userLoggedIn: false,
    wrongPassword: false,
    splitsheets: []
  },
  mutations: {
    setHash(state, hash) {
      state.hash = hash
    },
    preloadWriterSplitsheets(state, splitsheets) {
      state.splitsheets = splitsheets
    },
    preloadWriter(state, writerToFillInFor) {
      state.writer = writerToFillInFor
    },
    preloadWriterIndex(state, writerToFillInForIndex) {
      state.writerIndex = writerToFillInForIndex
    },
    preloadSongTitle(state, songTitle) {
      state.songTitle = songTitle
    },
    updateWriter(state, writer) {
      state.writer = writer
    },
    alreadyHasAccount(state) {
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
            ...writer,
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
    userLoggedIn(store, uid) {
      store.state.userLoggedIn = uid
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
          const token = await fbWebClient().auth().currentUser.getToken()
          await superagent.get('http://api.split.guru/verifytoken')
            .set('Content-Type', 'application/json')
            .set('token', token)
          store.dispatch('userLoggedIn')
          return true
        } catch(e) {
          if (e.code === "auth/wrong-password") store.commit('wrongPassword')
          console.error(e)
          return false
        }
      }
    },
    async fetchWriter(store, uid) {
      const { fbWebClient } = require('../utils/firebase.js')
      try {
        const writerRef = await fbWebClient().database().ref(`/users/${uid.replace('.', ',')}`).once('value')
        const writer = writerRef.val()
        store.commit('preloadWriter', writer)
        console.log(writer)
      } catch(e) {
        if (e.code === "auth/wrong-password") store.commit('wrongPassword')
        console.error(e)
        return false
      }
    },
    async fetchSplitsheets(store, uid) {
      const { fbWebClient } = require('../utils/firebase.js')
      try {
        const splitsheetsRef = await fbWebClient().database().ref(`/splitsheets`).once('value')
        const splitsheets = splitsheetsRef.val()
        const writerSplitsheets = Object.values(splitsheets).filter(({ writers }) => {
          if (writers) return writers.find(({ Email }) => Email === uid)
        })
        store.commit('preloadWriterSplitsheets', writerSplitsheets)
        console.log(writerSplitsheets)
      } catch(e) {
        if (e.code === "auth/wrong-password") store.commit('wrongPassword')
        console.error(e)
        return false
      }
    }
  }
})

export default store
