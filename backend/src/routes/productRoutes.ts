import Router from "express";
import {
  createProduct,
  getAllproducts,
  updateProduct,
  deleteProduct,
} from "../controllers/productControllers";

const product_router = Router();

product_router.post("/createproduct", createProduct);
product_router.get("/", getAllproducts);
product_router.put("/updateProduct", updateProduct);
product_router.delete('/deleteproduct',deleteProduct)


export default product_router;
