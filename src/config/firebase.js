// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAuvyqeoXXh8GuPQ3Df60P7oPyJa9KKRJY",
  authDomain: "fir-course-d2f94.firebaseapp.com",
  projectId: "fir-course-d2f94",
  storageBucket: "fir-course-d2f94.appspot.com",
  messagingSenderId: "1094880671708",
  appId: "1:1094880671708:web:fb5766794af12887ecc119",
  measurementId: "G-K4REKCEQJ9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app)
export const storage = getStorage(app);
// const analytics = getAnalytics(app);