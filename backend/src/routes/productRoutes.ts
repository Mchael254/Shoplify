<<<<<<< HEAD
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
=======
import Router from "express";
import { createProduct, getAllproducts, updateProduct } from "../controllers/productControllers";


const product_router = Router();

product_router.post("/createproduct", createProduct)
product_router.get('/',getAllproducts)
product_router.put('/updateProduct',updateProduct)
// product_router.delete('/deleteproduct',deleteproduct)
// product_router.post("/bookTicket",bookTicket)
// product_router.get('/allBookings',getAllbookings)


export default product_router


>>>>>>> fa2e0f8fa302592d0ae834416a4405abcd659d0f
