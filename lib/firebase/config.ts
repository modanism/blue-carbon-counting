// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5MVQTXTundLQ4HYw0NYBeE0VeeHPL6oA",
  authDomain: "caroove-8ed9d.firebaseapp.com",
  projectId: "caroove-8ed9d",
  storageBucket: "caroove-8ed9d.appspot.com",
  messagingSenderId: "1087095421946",
  appId: "1:1087095421946:web:6e96b608838a35f9e44243"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
