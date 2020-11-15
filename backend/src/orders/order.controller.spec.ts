import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import * as admin from 'firebase-admin';

jest.mock('firebase-admin', () => {
  const set = jest.fn();
  return {
    database: jest.fn(() => ({
      ref: jest.fn(() => ({
        push: jest.fn(() => ({
          set,
        })),
      })),
    })),
  };
});
let adminStub;

describe('OrderController', () => {
  let orderController: OrderController;
  


  beforeEach(async () => {
    adminStub = jest.spyOn(admin, "initializeApp");
    const app: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [OrderService],
    }).compile();

    orderController = app.get<OrderController>(OrderController);
  });

  afterEach(() => {
    jest.clearAllMocks();
    adminStub.mockRestore();
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(orderController.getOrders()).toBe('Hello World!');
    });

    it("test function returns 6",() =>{
      expect(orderController.getOrders()).toBe(6);
  });
  });
});
