import firebase from "firebase";

//set up firebase
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCs____B_tC-e1AI7N9DA6_t9DmbH2VOgI",
  authDomain: "instagram-clone-6ebf0.firebaseapp.com",
  databaseURL: "https://instagram-clone-6ebf0.firebaseio.com",
  projectId: "instagram-clone-6ebf0",
  storageBucket: "instagram-clone-6ebf0.appspot.com",
  messagingSenderId: "532307451493",
  appId: "1:532307451493:web:601e1ad1e1808ca62b708c",
  measurementId: "G-YZJ18YB91M",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
