import express from "express";
const router = express.Router();
import {
  getMeal,
  getMealById,
  deleteMeal,
  createMeal,
  updateMeal,
  updateMealStock,
} from "../controllers/mealController.js";
import { protect, admin } from "../middleware/authMiddleware.js";


router.route("/").get(getMeal).post(protect, createMeal);
router
  .route("/:id")
  .get(getMealById)
  .delete(protect, admin, deleteMeal)
  .put(protect, admin, updateMeal);
router.put("/:id/updatestock", protect, updateMealStock);
export default router;
