import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB9oz8jQHyfzr5TLu2bsm_roylnAMXj2ao",
  authDomain: "chat-analyzer-51300.firebaseapp.com",
  projectId: "chat-analyzer-51300",
  storageBucket: "chat-analyzer-51300.appspot.com",
  messagingSenderId: "943227366098",
  appId: "1:943227366098:web:4fcec9fe1b4524420e9b0b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const db = getFirestore();
