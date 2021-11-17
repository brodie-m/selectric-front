import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBniGuymvXA-LrjVhgjm4w_J_1qr2OZl8A",
  authDomain: "selectric-91dc8.firebaseapp.com",
  projectId: "selectric-91dc8",
  storageBucket: "selectric-91dc8.appspot.com",
  messagingSenderId: "124301457237",
  appId: "1:124301457237:web:8c9d7965f4030324c621dc",
  measurementId: "G-HZQC4DBDN0",
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

export { storage, firebase as default };
