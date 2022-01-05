import firebase from "firebase/compat/app";
import "firebase/compat/auth"
import "firebase/compat/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBdvxJ-J3YA61hm-6OhTE3jtTLq1sYdD34",
  authDomain: "netflix-clone-e8bc2.firebaseapp.com",
  projectId: "netflix-clone-e8bc2",
  storageBucket: "netflix-clone-e8bc2.appspot.com",
  messagingSenderId: "111215586475",
  appId: "1:111215586475:web:ef76de367848a44fcc9bee"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

//firestore database
const db = firebaseApp.firestore();

//Authentication initalise
const auth = firebase.auth();

//explicit export
export { auth }
//default export
export default db