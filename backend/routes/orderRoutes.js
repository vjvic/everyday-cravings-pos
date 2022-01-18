import express from "express";
const router = express.Router();
import {
  /* getOrder, */
  createOrder,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getUserOrders,
  getAllOrders,
} from "../controllers/orderController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";

router
  .route("/")
  .get(protect, isAdmin, getAllOrders)
  .post(protect, createOrder);
router.get("/myorders", protect, getUserOrders);
router.get("/:id", protect, getOrderById);
router.put("/:id/pay", protect, isAdmin, updateOrderToPaid);
router.put("/:id/deliver", protect, isAdmin, updateOrderToDelivered);

export default router;
