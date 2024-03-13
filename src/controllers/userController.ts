import { Request, Response } from "express";
import User from "../models/User";
import asyncHandler from "express-async-handler";

const getCurrentUser = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?._id;
  const user = await User.findById(userId, "name email roles");

  if (!user) {
    throw new Error("User not available");
  }

  res.status(200).json(user);
});

const getUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await User.find({}, "name email roles");

  res.status(200).json(
    users.map((user) => {
      return {
        id: user._id,
        name: user.name,
        email: user.email,
        roles: user.roles,
      };
    })
  );
});

export { getCurrentUser, getUsers };
