import express from "express";
import {
  addProduct,
  deleteProduct,
  getAllProduct,
  getSingleProduct,
  updateProduct,
} from "../Controllers/product.js";
import { checkAuth } from "../Middlewares/checkAuth.js";
import { uploads } from "../utils/multer.js";

const router = express.Router();

router.post("/", uploads.single("image"), checkAuth, addProduct);
router.get("/", getAllProduct);
router.get("/:id", getSingleProduct);
router.delete("/:id", checkAuth, deleteProduct);
router.put("/:id", checkAuth, updateProduct);

export default router;
