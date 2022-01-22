import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCod-fjiaqUboCxU1rnXOgmNQzyqdGHxKY",
  authDomain: "phone-auth-37331.firebaseapp.com",
  projectId: "phone-auth-37331",
  storageBucket: "phone-auth-37331.appspot.com",
  messagingSenderId: "390243905836",
  appId: "1:390243905836:web:125307e6f5842c4cb5fc89",
  measurementId: "G-EDYJH5MHWV",
};
const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
