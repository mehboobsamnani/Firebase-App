import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { Order } from '../types';

const app = firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
});

let orderRef = firebase.firestore().collection("orders");

const getOrders = async () => {
    let orders = await orderRef.get();
   
    return orders.docs.map(doc => {
        return ({ ...doc.data(), id: doc.id })
    });
};

const getUser = async () => {
    let user = await firebase.auth().currentUser;
    return user;
};

const getOrderById = async (id: string) => {
    const orderDetail = await orderRef
        .doc(id)
        .get().then((docRef) =>
            docRef.data() as Order
        )
    return orderDetail;
};

const auth = app.auth()
const db = app.firestore();

export { db, auth, getOrders, getOrderById, getUser };
export default app
