
import * as firebase from 'firebase-admin'
import firebaseAccountCredentials from '../../serviceAccountKey.json'

const serviceAccount = firebaseAccountCredentials as firebase.ServiceAccount

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: 'https://construyo-coding-challenge.firebaseio.com'
})
const ordersRef = firebase
    .firestore()
    .collection("orders");

 export {
    ordersRef
 }