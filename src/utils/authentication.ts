import jwt from "jsonwebtoken";
import { Response } from "express";

type TokenPayload = {
  userId: string;
  userEmail: string;
  userRoles: string[];
}

const createToken = (res: Response, payload: TokenPayload) => {
  const jwtSecret = process.env.JWT_SECRET || "";
  const token = jwt.sign(payload, jwtSecret, {
    expiresIn: "6h",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 60 * 60 * 1000,
  });
};

const removeToken = (res: Response) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
};

export { createToken, removeToken };
