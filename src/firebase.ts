import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  projectId: "vocajapones-app-77777",
  appId: "1:588675203123:web:54a1996267a2d42acee346",
  storageBucket: "vocajapones-app-77777.firebasestorage.app",
  apiKey: "AIzaSyAdXlAJZ24Y1o9d1wp6__ZZrtko2mjrD1g",
  authDomain: "vocajapones-app-77777.firebaseapp.com",
  messagingSenderId: "588675203123"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
