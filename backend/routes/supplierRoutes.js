import express from "express";
const router = express.Router();
import { protect, admin } from "../middleware/authMiddleware.js";
import {
  createSupplier,
  getAllSupplier,
  deleteSupplier,
  updateSupplier,
  getSupplierById,
} from "../controllers/supplierController.js";

router
  .route("/")
  .post(protect, admin, createSupplier)
  .get(protect, getAllSupplier);
router
  .route("/:id")
  .get(protect, admin, getSupplierById)
  .delete(protect, admin, deleteSupplier)
  .put(protect, admin, updateSupplier);

export default router;
