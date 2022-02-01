import express from "express";
const router = express.Router();
import {
  createOrderCashier,
  getOrderCashierById,
  getAllOrderCashier,
} from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

//cashier

router
  .route("/cashier")
  .post(protect, createOrderCashier)
  .get(protect, getAllOrderCashier);

router.get("/cashier/:id", protect, getOrderCashierById);

export default router;
