import express from "express";
const router = express.Router();
import {
  getOrder,
  createOrder,
  getOrderById,
} from "../controllers/orderController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";

router
  .route("/")
  .get(protect, isAdmin, getOrder)
  .post(protect, isAdmin, createOrder);

router.route("/:id").get(protect, isAdmin, getOrderById);

export default router;
