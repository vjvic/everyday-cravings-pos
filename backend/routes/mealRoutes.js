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
  updateMealStock,
} from "../controllers/mealController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.get("/top", getTopMeal);
router.route("/").get(getMeal).post(protect, createMeal);
router.route("/:id/reviews").post(protect, createMealReviews);
router
  .route("/:id")
  .get(getMealById)
  .delete(protect, admin, deleteMeal)
  .put(protect, admin, updateMeal);
router.get("/category/:category", getMealByCategory);
router.put("/:id/updatestock", protect, updateMealStock);
export default router;
