import express from "express";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";
import {
  createSupplier,
  getAllSupplier,
  deleteSupplier,
  updateSupplier,
  getSupplierById,
} from "../controllers/supplierController.js";

router.route("/").post(protect, createSupplier).get(protect, getAllSupplier);
router
  .route("/:id")
  .get(protect, getSupplierById)
  .delete(protect, deleteSupplier)
  .put(protect, updateSupplier);

export default router;
