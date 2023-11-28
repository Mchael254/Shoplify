import Router from "express";
import {
  createOrder,
  getAllOrders,
  updateOrder,
  // deleteOrder,
} from "../controllers/orderController";

const order_router = Router();

order_router.post("/createproduct", createOrder);
order_router.get("/", getAllOrders);
order_router.put("/updateProduct", updateOrder);
// order_router.delete("/deleteorder", deleteOrder);

export default order_router;
