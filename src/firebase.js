// Import the functions you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyBaD8mP--d-KWfIb4Kmryf5HjQHhAUUJrA",
    authDomain: "myutube-8348b.firebaseapp.com",
    projectId: "myutube-8348b",
    storageBucket: "myutube-8348b.firebasestorage.app",
    messagingSenderId: "30135166657",
    appId: "1:30135166657:web:108c26b5b9762343915640",
    measurementId: "G-J8EHK8D4BF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firestore
export const db = getFirestore(app);
