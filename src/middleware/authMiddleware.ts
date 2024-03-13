import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  try {
    let token = req.cookies.jwt;

    if (!token) {
      throw new Error("Token not found / User not logged in");
    }

    const jwtSecret = process.env.JWT_SECRET || ""; // define JWT_SECRET in your .env file
    const decoded = jwt.verify(token, jwtSecret) as JwtPayload;
    // console.log(JSON.stringify(decoded));

    if (!decoded || !decoded.userId || !decoded.userEmail) {
      throw new Error("User not found");
    }

    const { userId, userEmail, userRoles } = decoded;

    req.user = { _id: userId, email: userEmail, roles: userRoles };
    next();
  } catch (err) {
    throw new Error("Not authorized / Invalid token");
  }
};

const hasAuthorization = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRoles = req.user?.roles;

    if (
      !userRoles ||
      !userRoles.some((role: string) => allowedRoles.includes(role))
    ) {
      return res.status(403).json({ message: "Access denied" });
    }

    next();
  };
};

export { isAuthenticated, hasAuthorization };
