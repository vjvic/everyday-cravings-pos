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
  createOrderCashier,
  getOrderCashierById,
  getAllOrderCashier,
} from "../controllers/orderController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";

//cashier

router
  .route("/cashier")
  .post(protect, createOrderCashier)
  .get(protect, getAllOrderCashier);

router.get("/cashier/:id", protect, getOrderCashierById);

router.route("/").get(protect, getAllOrders).post(protect, createOrder);
router.get("/myorders", protect, getUserOrders);
router.get("/:id", protect, getOrderById);
router.put("/:id/pay", protect, updateOrderToPaid);
router.put("/:id/deliver", protect, updateOrderToDelivered);

export default router;
