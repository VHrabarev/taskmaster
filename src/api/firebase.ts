import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyAyNBV5OOFrekE0uSO-yjwAMDBoD7kHvlM",
    authDomain: "taskmaster-aedaf.firebaseapp.com",
    projectId: "taskmaster-aedaf",
    storageBucket: "taskmaster-aedaf.appspot.com",
    messagingSenderId: "904621001519",
    appId: "1:904621001519:web:a64be31fa9b589d1e32fda"
};

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;