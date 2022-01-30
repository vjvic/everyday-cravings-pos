import express from "express";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";
import {
  createIngredient,
  getAllIngredient,
  deleteIngredient,
  updateIngredient,
  getSupplierById,
} from "../controllers/ingredientController.js";

router
  .route("/")
  .post(protect, createIngredient)
  .get(protect, getAllIngredient);
router
  .route("/:id")
  .get(protect, getSupplierById)
  .delete(protect, deleteIngredient)
  .put(protect, updateIngredient);

export default router;
