import { Request, Response } from "express";
import * as orderController from "./orderController";

jest.mock("express");

describe("Order Controller", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    mockRequest = {
      body: {},
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
  });

  describe("createOrder", () => {
    it("should create an order", () => {
      mockRequest.body = {
        productID: "someProductId",
        Quantity: 3,
        address: "123 Main Street",
      };

      orderController.createOrder(
        mockRequest as Request,
        mockResponse as Response
      );

      //Basic assertions for the orders controller
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: true,
        order: expect.objectContaining({ orderId: expect.any(Number) }),
      });

    
    });
  });

  describe("updateOrder", () => {
    it("should update an order", () => {
      mockRequest.body = {
        orderId: 1,
        status: "Shipped",
      };

      orderController.updateOrder(
        mockRequest as Request,
        mockResponse as Response
      );

      
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: true,
        order: expect.objectContaining({ orderId: 1, status: "Shipped" }),
      });

      
    });
  });

  describe("getAllOrders", () => {
    it("should get all orders", () => {
      orderController.getAllOrders(
        mockRequest as Request,
        mockResponse as Response
      );

      
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        orders: expect.any(Array),
      });

      
    });
  });
});
