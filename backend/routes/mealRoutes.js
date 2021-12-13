import express from "express";
const router = express.Router();
import {
  getMeal,
  getMealById,
  deleteMeal,
  createMeal,
  updateMeal,
} from "../controllers/mealController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";

router.route("/").get(getMeal).post(protect, isAdmin, createMeal);
router
  .route("/:id")
  .get(getMealById)
  .delete(protect, isAdmin, deleteMeal)
  .put(protect, isAdmin, updateMeal);

export default router;
