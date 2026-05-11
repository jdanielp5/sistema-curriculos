import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDLTTztxpVVdYF0lasFoqd2BuZ4f80NilI",
  authDomain: "sistema-curriculos-senai.firebaseapp.com",
  projectId: "sistema-curriculos-senai",
  storageBucket: "sistema-curriculos-senai.firebasestorage.app",
  messagingSenderId: "659121469345",
  appId: "1:659121469345:web:dce6500c5cb63227f6fde0"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db };