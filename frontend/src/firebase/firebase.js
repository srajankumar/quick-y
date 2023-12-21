import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const key = process.env.NEXT_PUBLIC_APP_FIREBASE_KEY;

const firebaseConfig = {
  apiKey: key,
  authDomain: "quick-y.firebaseapp.com",
  projectId: "quick-y",
  storageBucket: "quick-y.appspot.com",
  messagingSenderId: "814644437432",
  appId: "1:814644437432:web:0cb9f829081cc7fbc06f4d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
