// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDUpt90m6RPbDkitW8hSPl4turdgwTcvpE",
  authDomain: "aifitnessapplication.firebaseapp.com",
  projectId: "aifitnessapplication",
  storageBucket: "aifitnessapplication.appspot.com",
  messagingSenderId: "823708590223",
  appId: "1:823708590223:web:a2012e323567cf0f6e90fa",
  measurementId: "G-FHE1CWQVCP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default firebaseConfig;