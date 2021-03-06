import express from "express";
const router = express.Router();
import { protect, admin } from "../middleware/authMiddleware.js";
import {
  createCategory,
  getAllCategory,
  deleteCategory,
  updateCategory,
  getCategoryById,
} from "../controllers/categoryController.js";

router.route("/").post(protect, admin,createCategory).get(protect,admin, getAllCategory);
router
  .route("/:id")
  .get(protect,admin, getCategoryById)
  .delete(protect, admin, deleteCategory)
  .put(protect, admin, updateCategory);

export default router;
