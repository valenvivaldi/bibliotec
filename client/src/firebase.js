// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase";
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"
// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

const firebaseApp = firebase.initializeApp( {
    apiKey: "AIzaSyBb1oJ9AVzReRbpyqsZEmoLV97pMTEkpXE",
    authDomain: "biblioteca-b8d01.firebaseapp.com",
    projectId: "biblioteca-b8d01",
    storageBucket: "biblioteca-b8d01.appspot.com",
    messagingSenderId: "181718179758",
    appId: "1:181718179758:web:fa9c1a600c8527b844f23f",
  }
  );

const db = firebaseApp.firestore();

export { db };