<<<<<<< HEAD
import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import user_router from "./routes/userRoutes";
import product_router from "./routes/productRoutes";


dotenv.config();
const port = process.env.PORT || 5200;
const app = express();
app.use(json());
app.use(cors());

app.use("/user", user_router);
app.use("/product", product_router);

app.listen(port, () => {
  console.log(`Shopie running on port  ${port}`);
});
=======
import express, { json } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import user_router from './routes/userRoutes'
import product_router from './routes/productRoutes'


dotenv.config()
const port = process.env.PORT ||5200
const app = express()
app.use(json())
app.use(cors())

app.use('/user',user_router)
app.use('/product',product_router)

app.listen(port,()=>{
    console.log(`Shopie running on port ${port}`);
    
});
>>>>>>> fa2e0f8fa302592d0ae834416a4405abcd659d0f
