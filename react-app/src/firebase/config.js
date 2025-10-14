// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA2Cv2Wrp3uoEDWBA8fZWCnzzdrWNEfAPQ",
  authDomain: "rameshaqua-1fc5f.firebaseapp.com",
  projectId: "rameshaqua-1fc5f",
  storageBucket: "rameshaqua-1fc5f.firebasestorage.app",
  messagingSenderId: "572715546695",
  appId: "1:572715546695:web:0a5fc1407715b4d78c1962",
  measurementId: "G-D1BRN3WC15"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;