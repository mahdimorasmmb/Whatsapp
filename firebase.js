import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAE2mzkCibSL53XteyhB7MzbjwCXDpMbdk",
  authDomain: "whatsapp-2-72970.firebaseapp.com",
  projectId: "whatsapp-2-72970",
  storageBucket: "whatsapp-2-72970.appspot.com",
  messagingSenderId: "60990384035",
  appId: "1:60990384035:web:c1e16c4fe5d64ac8329c16",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();
const auth = app.auth();
var provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
