import express from "express";
const router = express.Router();
import { protect, admin } from "../middleware/authMiddleware.js";
import {
  createIngredient,
  getAllIngredient,
  deleteIngredient,
  updateIngredient,
  getIngredientById,
  updateIngredientStock,
} from "../controllers/ingredientController.js";

router
  .route("/")
  .post(protect, admin, createIngredient)
  .get(protect,admin, getAllIngredient);
router
  .route("/:id")
  .get(protect, admin, getIngredientById)
  .delete(protect, admin, deleteIngredient)
  .put(protect, admin, updateIngredient);

router.put("/:id/updatestock", protect, updateIngredientStock);

export default router;
