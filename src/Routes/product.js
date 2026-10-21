import express from "express";
import { addProduct, getAllProduct } from "../Controllers/product.js";

const router = express.Router();

router.post("/", addProduct);
router.get("/", getAllProduct);

export default router;
