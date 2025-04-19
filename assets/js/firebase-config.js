import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyD7ah_gSiea8qmtO68sIDxiCi5wdGMkXnk",
  authDomain: "deistore.firebaseapp.com",
  projectId: "deistore",
  storageBucket: "deistore.firebasestorage.app",
  messagingSenderId: "250424304046",
  appId: "1:250424304046:web:bacee681b0250a0fd5e83f",
  measurementId: "G-XMFVGWQC2X"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
