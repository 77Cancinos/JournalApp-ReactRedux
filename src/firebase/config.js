// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
import { getEnvironments } from "../helpers";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
// Dev-prod
// const firebaseConfig = {
//   apiKey: "AIzaSyD2U3XkvSG_ysHNK1RDJpJSWAst-ubXSAI",
//   authDomain: "react-cursos-45fee.firebaseapp.com",
//   projectId: "react-cursos-45fee",
//   storageBucket: "react-cursos-45fee.appspot.com",
//   messagingSenderId: "526431207277",
//   appId: "1:526431207277:web:42d1920af77e55954da464"
// };


const {
  VITE_APIKEY,
  VITE_AUTHDOMAIN,
  VITE_PROJECTID,
  VITE_STORAGEBUCKET,
  VITE_MESSAGINGSENDERID,
  VITE_APPID
} = getEnvironments();
// console.log(env)

// console.log( import.meta.env );

// Testing
// const firebaseConfig = {
//   apiKey: "AIzaSyA7rM8lTGUYJ_haqWDQb2MS-4AzfAShMoc",
//   authDomain: "crud-firebase-angular13-69e05.firebaseapp.com",
//   projectId: "crud-firebase-angular13-69e05",
//   storageBucket: "crud-firebase-angular13-69e05.appspot.com",
//   messagingSenderId: "310947216209",
//   appId: "1:310947216209:web:8be990457af756d272b170"
// };


const firebaseConfig = {
  apiKey: VITE_APIKEY,
  authDomain: VITE_AUTHDOMAIN,
  projectId: VITE_PROJECTID,
  storageBucket: VITE_STORAGEBUCKET  ,
  messagingSenderId: VITE_MESSAGINGSENDERID,
  appId: VITE_APPID,
};

//console.log(firebaseConfig);

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);
