import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc,getDocs,updateDoc,doc,deleteDoc } from "firebase/firestore"; // Remove app and db from imports

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAhvnfOjiSCAatQTnK6mM_lSRMEmXSN3lA",
  authDomain: "reactnativecrud-34e15.firebaseapp.com",
  projectId: "reactnativecrud-34e15",
  storageBucket: "reactnativecrud-34e15.appspot.com",
  messagingSenderId: "241561209835",
  appId: "1:241561209835:web:77004e688a8e06c4f567ae"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db, getFirestore, collection, addDoc,getDocs,updateDoc,doc,deleteDoc };
