import Router from "express";
import {createTour, deleteTour, getAllTours, updateTour} from "../controllers/productControllers";
import multer from "multer";

const product_router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./images");
  },
  filename: function (req, file, cb) {
    cb(null, `${uuidv4()}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

tour_router.post("/createProduct", upload.single("productImage"), createProduct);
tour_router.get("/", getAllProduct), product_router.post("/updateProduct", updateProduct);
tour_router.delete("/deleteProduct", deleteProduct);


export default product_router;

function uuidv4() {
  throw new Error("Function not implemented.");
}
