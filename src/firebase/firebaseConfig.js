import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// firebase init - add your own config here
const firebaseConfig = {
  apiKey: "AIzaSyDVxcAS9EWP-Pc8Pu0Bi84WtHFZu7PePVk",
  authDomain: "biadjo-1546341863949.firebaseapp.com",
  databaseURL: "https://biadjo-1546341863949.firebaseio.com",
  projectId: "biadjo-1546341863949",
  storageBucket: "biadjo-1546341863949.appspot.com",
  messagingSenderId: "1058566822933",
  appId: "1:1058566822933:web:544cc49d8ffc03873d421c",
  measurementId: "G-2NL7MD80M4"
};
firebase.initializeApp(firebaseConfig);

// utils
const db = firebase.firestore();
const auth = firebase.auth();

// collection references
const usersCollection = db.collection("users");
const postsCollection = db.collection("posts");
const commentsCollection = db.collection("comments");
const likesCollection = db.collection("likes");

// export utils/refs
export {
  db,
  auth,
  usersCollection,
  postsCollection,
  commentsCollection,
  likesCollection
};
