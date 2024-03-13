import express from "express";
import { getCurrentUser, getUsers } from "../controllers/userController";
import { hasAuthorization, isAuthenticated } from "../middleware/authMiddleware";
import { Roles } from "../utils/roles";

const router = express.Router();

// {GET} /api/users/profile
router.get(
  "/profile",
  isAuthenticated,
  hasAuthorization([Roles.Basic, Roles.Professional, Roles.Admin]),
  getCurrentUser
);

// {GET} /api/users/all
router.get("/all", hasAuthorization([Roles.Admin]), getUsers);

export default router;
