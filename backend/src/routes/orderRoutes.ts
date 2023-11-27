import express from "express";
import orderRoutes from "../controllers/orderController";

const app = express();



// Include the order routes
app.use("/orders", orderRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
