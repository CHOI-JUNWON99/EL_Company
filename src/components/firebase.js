import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getFunctions } from "firebase/functions";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAQSoIloDSbRbnpVai_3HA4NlQWqJ6vr_I",
  authDomain: "el-giup.firebaseapp.com",
  projectId: "el-giup",
  storageBucket: "el-giup.firebasestorage.app",
  messagingSenderId: "537607162480",
  appId: "1:537607162480:web:89fd129df591c7c1d042b5",
  measurementId: "G-WJ2286H7WD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export { app, analytics };
export const db = getFirestore(app);
export const storage = getStorage(app);
export const functions = getFunctions(app);
