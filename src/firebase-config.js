import { initializeApp } from "firebase/app"
import { getAuth, signInAnonymously } from "firebase/auth"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

let firebaseApp = null
let firebaseAuthInstance = null 

export const getFirebaseApp = () => {
  return firebaseApp
}

// Initialize Firebase
export const initFirebase = () => {
  firebaseApp = initializeApp(firebaseConfig, 'Agora-Live-Shopping')
  firebaseAuthInstance = getAuth(firebaseApp)

  console.log('Firebase initialized:', firebaseApp.name)

  return firebaseApp
}

export const auth = () => firebaseAuthInstance
