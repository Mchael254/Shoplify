import express, { Request, Response } from "express";
import Joi from "joi";

const router = express.Router();

const orders: any[] = [];

// Order creation validation schema
const orderCreationValidationSchema = Joi.object({
  productId: Joi.string().required(),
  quantity: Joi.number().integer().min(1).required(),
  address: Joi.string().required(),
});

// Order update validation schema
const orderUpdateValidationSchema = Joi.object({
  orderId: Joi.string().required(),
  status: Joi.string().valid("Pending", "Shipped", "Delivered").required(),
});

// Middleware for validating order creation
const validateOrderCreation = (req: Request, res: Response, next: Function) => {
  const { error, value } = orderCreationValidationSchema.validate(req.body);

  if (error) {
    return res
      .status(400)
      .json({ error: error.details.map((err) => err.message) });
  }

  req.body = value; // Replace the request body with the validated value
  next();
};

// Middleware for validating order update
const validateOrderUpdate = (req: Request, res: Response, next: Function) => {
  const { error, value } = orderUpdateValidationSchema.validate(req.body);

  if (error) {
    return res
      .status(400)
      .json({ error: error.details.map((err) => err.message) });
  }

  req.body = value; // Replace the request body with the validated value
  next();
};

// Order creation route
router.post("/create", validateOrderCreation, (req: Request, res: Response) => {
  try {
    const { productId, quantity, address } = req.body;

    const order = {
      orderId: orders.length + 1,
      productId,
      quantity,
      address,
      status: "Pending",
    };

    orders.push(order);

    res.status(201).json({ success: true, order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Order update route
router.put("/update", validateOrderUpdate, (req: Request, res: Response) => {
  try {
    const { orderId, status } = req.body;

    // Find the order in the database and update the status
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
});

// Get all orders route
router.get("/all", (req: Request, res: Response) => {
  try {
    res.status(200).json({ orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
