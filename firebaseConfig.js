import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBM6U7Q80TlX3RRgCPb51xjTsHc8NUQHWk",
    authDomain: "udharbook-751bb.firebaseapp.com",
    databaseURL: "https://udharbook-751bb-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "udharbook-751bb",
    storageBucket: "udharbook-751bb.appspot.com",
    messagingSenderId: "33946891705",
    appId: "1:33946891705:web:434c348e7f0841c0837268"
  };

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };