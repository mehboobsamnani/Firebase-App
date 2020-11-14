import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { OrderService } from './order.service';
import { FindOneParams, CreateOrder, UpdateOrder } from './dto/order.dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  getOrders(): Promise<FirebaseFirestore.DocumentData> {
    return this.orderService.get();
  }

  @Post()
  postOrders(@Body() order: CreateOrder): Promise<string> {
    return this.orderService.createOrder(order);
  }

  @Put(':id')
  updateOrders(@Param() params: FindOneParams , @Body() updateOrder: UpdateOrder) : Promise<string> {
    return this.orderService.updateOrder(params.id , updateOrder);
  }
}
