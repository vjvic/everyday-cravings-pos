import express from "express";
const router = express.Router();
import { getMeal, getMealById } from "../controllers/mealController.js";

router.route("/").get(getMeal);
router.route("/:id").get(getMealById);

export default router;
