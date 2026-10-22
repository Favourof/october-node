import express from "express";
import {
  addProduct,
  deleteProduct,
  getAllProduct,
  getSingleProduct,
  updateProduct,
} from "../Controllers/product.js";

const router = express.Router();

router.post("/", addProduct);
router.get("/", getAllProduct);
router.get("/:id", getSingleProduct);
router.delete("/:id", deleteProduct);
router.put("/:id", updateProduct);

export default router;
