import { initializeApp } from 'firebase/app'
import { collection, getFirestore, addDoc } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: 'AIzaSyCzo6ucqnHICwEZi-AZcEotvc4H9C5TMIs',
    authDomain: 'wordle-2f7ac.firebaseapp.com',
    databaseURL:
        'https://wordle-2f7ac-default-rtdb.asia-southeast1.firebasedatabase.app',
    projectId: 'wordle-2f7ac',
    storageBucket: 'wordle-2f7ac.appspot.com',
    messagingSenderId: '614607540915',
    appId: '1:614607540915:web:de2ec5b69451e2dff256c6',
    measurementId: 'G-MX98Z3044C',
}

// Initialize Firebase

initializeApp(firebaseConfig)
export const db = getFirestore()
export const colRefEasy = collection(db, 'easy')
export const colRefHard = collection(db, 'hard')

export const getEasy = () => {
    //query(colRefEasy, orderBy('score', 'asc')).then((snapshot) => {
}

export const getHard = () => {}

export const addEasyScore = (name, score) => {
    addDoc(colRefEasy, {
        name: name,
        score: score,
    })
}

export const addHardScore = (name, score) => {
    addDoc(colRefHard, {
        name: name,
        score: score,
    })
}
