import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { collection, addDoc,getDocs, getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyB3txKr4eA8Zr8sB4BUCH2L9M7VCKCCUW0',
    authDomain: 'gyroscope-3473f.firebaseapp.com',
    projectId: 'gyroscope-3473f',
    storageBucket: 'gyroscope-3473f.appspot.com',
    messagingSenderId: '379315740663',
    appId:'1:379315740663:web:dc7063cdb54322657718f2',
    measurementId: 'G-FWLECE572X',
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const firestore = getFirestore(app);

export { storage, firestore as db, collection,addDoc,getDocs, };