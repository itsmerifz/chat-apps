import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCjLsYYqgh5VR8-PkEZfocLu5FTVWM2LJQ",
  authDomain: "chat-nextjs-a5275.firebaseapp.com",
  projectId: "chat-nextjs-a5275",
  storageBucket: "chat-nextjs-a5275.appspot.com",
  messagingSenderId: "965465676599",
  appId: "1:965465676599:web:3db84f71d18004289a18b2"
};

const app = !firebase.apps.length ? 
  firebase.initializeApp(firebaseConfig) : firebase.app();

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };