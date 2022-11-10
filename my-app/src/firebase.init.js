
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyBYHaHYd6T6kCEH-8cHUF_ECr2b1GZYDEc",
    authDomain: "restuarentapp-6733b.firebaseapp.com",
    databaseURL: "https://restuarentapp-6733b-default-rtdb.firebaseio.com",
    projectId: "restuarentapp-6733b",
    storageBucket: "restuarentapp-6733b.appspot.com",
    messagingSenderId: "170830589329",
    appId: "1:170830589329:web:53e83b9bcf571f6ebafe30"
};

const app = getApps.length > 0 ? getApp : initializeApp(firebaseConfig);

const firestore = getFirestore(app)
const storage = getStorage(app)

export { firestore, storage, app };
