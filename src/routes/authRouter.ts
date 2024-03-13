import express from "express";
import {
  registerUser,
  authenticateUser,
  logoutUser,
} from "../controllers/authController";

const router = express.Router();

// {POST} /api/auth/register
router.post("/register", registerUser);

// {POST} /api/auth/login
router.post("/login", authenticateUser);

// {POST} /api/auth/logout
router.post("/logout", logoutUser);

export default router;
