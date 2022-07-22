import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDiIr6DCoFyjT3Gas-8e3622JuRCcXhdCg",
    authDomain: "f1-ua-5fadd.firebaseapp.com",
    databaseURL: 'https://f1-ua-5fadd-default-rtdb.firebaseio.com/',
    projectId: "f1-ua-5fadd",
    storageBucket: "f1-ua-5fadd.appspot.com",
    messagingSenderId: "494551080824",
    appId: "1:494551080824:web:150bc241bf4f0200e9728d",
    measurementId: "G-W7TPXSYNFB"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const storage = getStorage(app);
