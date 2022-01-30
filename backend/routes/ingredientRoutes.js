import express from "express";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";
import {
  createIngredient,
  getAllIngredient,
  deleteIngredient,
  updateIngredient,
} from "../controllers/ingredientController.js";

router
  .route("/")
  .post(protect, createIngredient)
  .get(protect, getAllIngredient);
router
  .route("/:id")
  .delete(protect, deleteIngredient)
  .put(protect, updateIngredient);

export default router;
