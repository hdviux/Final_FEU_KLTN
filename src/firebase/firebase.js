import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyC6zgoq_CyErQWv8sbEPRZg_0D8sIM5Fnc",
  authDomain: "toyskid-653c4.firebaseapp.com",
  projectId: "toyskid-653c4",
  storageBucket: "toyskid-653c4.appspot.com",
  messagingSenderId: "643368013524",
  appId: "1:643368013524:web:a4ca8ea6c39bb678bd7541",
  measurementId: "G-QHTVLDPPTE",
};

firebase.initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);
const auth = getAuth(app);
const db = getFirestore(app);
export { analytics, app, storage, firebase, auth, db };
