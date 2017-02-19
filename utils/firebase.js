const firebaseClient = () => {
  if (process.SERVER_BUILD) {
    const firebase = require('firebase-admin')
    try {
      firebase.initializeApp({
        credential: firebase.credential.applicationDefault(),
        databaseURL: "https://splitguru-154114.firebaseio.com"
      })
    } catch(e) {
    }
    return firebase
  }
}

export function fbWebClient() {
  if (process.BROWSER_BUILD) {
    const fb = require('firebase')
    const config = {
      apiKey: "AIzaSyANIPKCWGLZbgLU0QckdetyJGXGVAlVTC8",
      authDomain: "splitguru-154114.firebaseapp.com",
      databaseURL: "https://splitguru-154114.firebaseio.com",
      storageBucket: "splitguru-154114.appspot.com",
      messagingSenderId: "895373039656"
    }
    try {
      fb.initializeApp(config)
    } catch(e) {
    }
    return fb
  }
}

export default firebaseClient
