import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import FirebaseConfig from "./firebaseConfig";

const app = initializeApp(FirebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);

export { db, auth };