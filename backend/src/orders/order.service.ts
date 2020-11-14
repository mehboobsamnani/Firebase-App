import { Injectable } from '@nestjs/common';
import * as firebase from 'firebase-admin'
import firebaseAccountCredentials from '../../serviceAccountKey.json'
import { CreateOrder, UpdateOrder } from './dto/order.dto';

const serviceAccount = firebaseAccountCredentials as firebase.ServiceAccount

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: 'https://construyo-coding-challenge.firebaseio.com'
})
const ordersRef = firebase
  .firestore()
  .collection("orders");

@Injectable()
export class OrderService {

  async get(): Promise<FirebaseFirestore.DocumentData> {
    let orders = await ordersRef.get();
    return orders.docs.map(doc => ({ ...doc.data(), id: doc.id }));
  }

  async createOrder(order: CreateOrder): Promise<string> {
    console.log(order);
    return firebase.firestore().collection("orders").add({...order})
      .then(function () {
        return "Document successfully updated!";
      })
      .catch(function (error) {
        return `Error creating order: ${error}`;
      });
  }

  async updateOrder(id: string, orderDetail: UpdateOrder): Promise<string> {
    let bookingDate = new Date(orderDetail.bookingDate * 1000);
    console.log(bookingDate);
    let docRef = await ordersRef.doc(id).update({...orderDetail,bookingDate}).then(function () {
      return "Document successfully updated!";
    }).catch(function (error) {
      return `Error updating order: ${error}`;
    });
    return docRef;
  }
}
