import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrder, UpdateOrder } from './dto/order.dto';
import { ordersRef } from '../service/firebase';

@Injectable()
export class OrderService {

  async get(): Promise<FirebaseFirestore.DocumentData> {
    let orders = await ordersRef.get();
    return orders.docs.map(doc => ({ ...doc.data(), id: doc.id }));
  }

  async createOrder(order: CreateOrder): Promise<string> {
    console.log(order);
   
    try {
    return ordersRef.add({...order})
      .then(function () {
        return "Order successfully created!";
      })
      .catch(function (error) {
        throw new HttpException('Error updating order', HttpStatus.BAD_REQUEST);
      });
    } catch(error) {
      throw new HttpException('Error updating order', HttpStatus.BAD_REQUEST);
    }
  }

  async updateOrder(id: string, orderDetail: UpdateOrder): Promise<string> {
    let bookingDate = new Date(orderDetail.bookingDate * 1000);
   
    try {
      let docRef = await ordersRef.doc(id).update({...orderDetail,bookingDate}).then(function () {
        return "Order successfully updated!";
      }).catch(function (error) {
        throw new HttpException('Error updating order', HttpStatus.BAD_REQUEST);
      });
      return docRef;
    } catch(error) {
      throw new HttpException('Error updating order', HttpStatus.BAD_REQUEST);
    }
    
  }
}
