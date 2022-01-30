import express from "express";
const router = express.Router();
import { protect, admin } from "../middleware/authMiddleware.js";
import {
  createIngredient,
  getAllIngredient,
  deleteIngredient,
  updateIngredient,
  getSupplierById,
} from "../controllers/ingredientController.js";

router
  .route("/")
  .post(protect, admin, createIngredient)
  .get(protect, getAllIngredient);
router
  .route("/:id")
  .get(protect, getSupplierById)
  .delete(protect, admin, deleteIngredient)
  .put(protect, admin, updateIngredient);

export default router;
