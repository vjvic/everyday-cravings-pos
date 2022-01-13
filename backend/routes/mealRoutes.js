import express from "express";
const router = express.Router();
import {
  getMeal,
  getMealById,
  deleteMeal,
  createMeal,
  updateMeal,
  createMealReviews,
  getMealByCategory,
  getTopMeal,
} from "../controllers/mealController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";

router.get("/top", getTopMeal);
router.route("/").get(getMeal).post(protect, isAdmin, createMeal);
router.route("/:id/reviews").post(protect, createMealReviews);
router
  .route("/:id")
  .get(getMealById)
  .delete(protect, isAdmin, deleteMeal)
  .put(protect, isAdmin, updateMeal);
router.get("/category/:category", getMealByCategory);

export default router;
