/**
 * Firebase Configuration for React Native
 * Clean implementation with proper error handling
 */

import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';
import {getAnalytics, isSupported} from 'firebase/analytics';

// Firebase configuration - same as web app
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "rameshaqua-1fc5f.firebaseapp.com",
  projectId: "rameshaqua-1fc5f",
  storageBucket: "rameshaqua-1fc5f.appspot.com",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id",
  measurementId: "your-measurement-id"
};

// Initialize Firebase app
let app;
let db;
let auth;
let analytics;

export const initializeFirebase = () => {
  try {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    auth = getAuth(app);
    
    // Analytics is optional for React Native
    isSupported().then((supported) => {
      if (supported) {
        analytics = getAnalytics(app);
      }
    });
    
    console.log('Firebase initialized successfully');
  } catch (error) {
    console.error('Error initializing Firebase:', error);
  }
};

// Export Firebase services
export {db, auth, analytics};
export default app;