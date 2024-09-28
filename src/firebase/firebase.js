import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import FirebaseConfig from "./firebaseConfig.js";

const app = initializeApp(FirebaseConfig);

const db = getFirestore(app);

const provider = new GoogleAuthProvider();

const auth = getAuth(app);

export { db, auth, provider };