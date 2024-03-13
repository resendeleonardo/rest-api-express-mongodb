import express, { Request, Response } from "express";
import User from "../models/User";
import { createToken, removeToken } from "../utils/authentication";
import asyncHandler from "express-async-handler";

const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password, roles } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(409).json({ message: "This email already exists" });
  }

  const user = await User.create({
    name,
    email,
    password,
    roles,
  });

  if (user) {
    createToken(res, {
      userId: user._id,
      userEmail: user.email,
      userRoles: user.roles,
    });
    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      roles: user.roles,
    });
  } else {
    throw new Error("An error occurred in registering the user");
  }
});

const authenticateUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.comparePassword(password))) {
    createToken(res, {
      userId: user._id,
      userEmail: user.email,
      userRoles: user.roles,
    });
    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      roles: user.roles,
    });
  } else {
    throw new Error("User not found / password incorrect");
  }
});

const logoutUser = asyncHandler(async (req: Request, res: Response) => {
  removeToken(res);
  res.status(200).json({ message: "Successfully logged out" });
});

export { registerUser, authenticateUser, logoutUser };
