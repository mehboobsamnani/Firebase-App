import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderModule } from './orders/order.module';
import { OrderController } from './orders/order.controller';
import { OrderService } from './orders/order.service';

@Module({
  imports: [OrderModule],
  controllers: [AppController,OrderController],
  providers: [AppService,OrderService],
})
export class AppModule {}
