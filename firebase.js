// Firebase Configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import {getFirestore} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js"
const firebaseConfig = {
    apiKey: "AIzaSyDINh2pIV631a--AtygTDkmqeEi5PAnsVg",
    authDomain: "hackfusion-c831d.firebaseapp.com",
    databaseURL: "https://hackfusion-c831d-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "hackfusion-c831d",
    storageBucket: "hackfusion-c831d.appspot.com",
    messagingSenderId: "131044666281",
    appId: "1:131044666281:web:da10868a523bb5cd1d72b8"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(firebase);

