import 'firebase/auth';        // for authentication
import 'firebase/storage';     // for storage
import 'firebase/database';    // for realtime database
import 'firebase/firestore';   // for cloud firestore
import 'firebase/messaging';   // for cloud messaging
import 'firebase/functions';   // f
import firebase from 'firebase/app';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAq-4KS57cM1WXVBz6Vc7ftumi_GiJRU2M",
    authDomain: "whatsapp-2-33b00.firebaseapp.com",
    projectId: "whatsapp-2-33b00",
    storageBucket: "whatsapp-2-33b00.appspot.com",
    messagingSenderId: "1008300648639",
    appId: "1:1008300648639:web:89d212a2b41faafaf67e0a",
    measurementId: "G-VBMDBTP501"
  };

const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()


const db = app.firestore();
const auth = app.auth();

const provider = new firebase.auth.GoogleAuthProvider();


export {db, auth, provider};