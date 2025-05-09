// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCXkpJIKtpRLukmr1_AK_dnmhg69eRjh7s",
//   authDomain: "babycode-assignment-7a05a.firebaseapp.com",
//   projectId: "babycode-assignment-7a05a",
//   storageBucket: "babycode-assignment-7a05a.firebasestorage.app",
//   messagingSenderId: "707783258842",
//   appId: "1:707783258842:web:eb104c65e61002017cabe3"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);


// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCXkpJIKtpRLukmr1_AK_dnmhg69eRjh7s",
  authDomain: "babycode-assignment-7a05a.firebaseapp.com",
  projectId: "babycode-assignment-7a05a",
  storageBucket: "babycode-assignment-7a05a.firebasestorage.app",
  messagingSenderId: "707783258842",
  appId: "1:707783258842:web:eb104c65e61002017cabe3"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
