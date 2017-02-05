import * as firebase from 'firebase-admin'



const fb = () => {
  try {
    firebase.initializeApp({
    credential: firebase.credential.cert("./splitsheet-firebase.json"),
    databaseURL: "https://splitguru-154114.firebaseio.com"
    })
  } catch(e) {
  }
  return firebase
}

export default fb
