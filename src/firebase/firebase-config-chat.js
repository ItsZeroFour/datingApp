// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfigChat = {
  apiKey: process.env.REACT_APP_FIREBASE_CHAT_KEY,
  authDomain: "datingapp-chat-393a9.firebaseapp.com",
  projectId: "datingapp-chat-393a9",
  storageBucket: "datingapp-chat-393a9.appspot.com",
  messagingSenderId: "252353218888",
  appId: "1:252353218888:web:4172908a1db8f75c83cb7d",
  measurementId: "G-YEE1Z8WN2H",
};

// Initialize Firebase
const appChat = !getApps().length
  ? initializeApp(firebaseConfigChat)
  : getApp();
export const dbchat = getFirestore(appChat);
