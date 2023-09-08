import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"


const firebaseConfig = {
  apiKey: "process.env.key",
  authDomain: "video2-70b56.firebaseapp.com",
  projectId: "video2-70b56",
  storageBucket: "video2-70b56.appspot.com",
  messagingSenderId: "486276510961",
  appId: "1:486276510961:web:ea331805e6da33876da550"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth =getAuth();
export const provider = new GoogleAuthProvider();

export default app;