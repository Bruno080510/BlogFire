// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from 'firebase/firestore'
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBn09nzX9oOExYt_6dhY8TaWnoJ_OrO0Kg",
  authDomain: "blogreact-c573a.firebaseapp.com",
  projectId: "blogreact-c573a",
  storageBucket: "blogreact-c573a.appspot.com",
  messagingSenderId: "1065013347684",
  appId: "1:1065013347684:web:686fa6e170f8a9d8a22671"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const storage = getStorage(app)
