import express, { Request, Response } from "express";
import {
  orderCreationValidationSchema,
  orderUpdateValidationSchema,
} from "../validators/orderValidators";

const router = express.Router();

const orders: any[] = [];

export const createOrder = (req: Request, res: Response) => {
  try {
    const { productID, Quantity, address } = req.body;

    const order = {
      orderId: orders.length + 1,
      productID,
      Quantity,
      address,
      status: "Pending",
    };

    orders.push(order);

    res.status(201).json({ success: true, order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateOrder = (req: Request, res: Response) => {
  try {
    const { orderId, status } = req.body;

    const orderToUpdate = orders.find((order) => order.orderId === orderId);

    if (!orderToUpdate) {
      return res.status(404).json({ error: "Order not found" });
    }

    orderToUpdate.status = status;

    res.status(200).json({ success: true, order: orderToUpdate });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllOrders = (req: Request, res: Response) => {
  try {
    res.status(200).json({ orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default router;
