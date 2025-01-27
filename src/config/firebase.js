import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
  // Pegar configuración de Firebase Console
  apiKey: "AIzaSyAUyr4xcBbQRoCUjnm6y37oEQ3b8Bf_55o",
  authDomain: "micomidafavorita-e93d2.firebaseapp.com",
  projectId: "micomidafavorita-e93d2",
  storageBucket: "micomidafavorita-e93d2.firebasestorage.app",
  messagingSenderId: "360157369581",
  appId: "1:360157369581:web:e40eb4a9a9aeddf59de8e4",
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);