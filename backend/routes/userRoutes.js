import express from "express";
const router = express.Router();
import {
  authUser,
  getUserProfile,
  updateUserProfile,
  getUserById,
} from "../controllers/userController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";

router.route("/");

router.post("/login", authUser);

router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router.route("/:id").get(protect, isAdmin, getUserById);

export default router;
