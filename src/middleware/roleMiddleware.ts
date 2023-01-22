import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

import dotenv from "dotenv";

dotenv.config();

interface TokenPayload {
  roles: string[];
}

export default (allowedRoles: string[]) => {
  return (req: any, res: Response, next: NextFunction) => {
    if (req.method === "OPTIONS") {
      return next();
    }

    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "No authorization header" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Invalid token" });
    }

    try {
      const decoded = jwt.verify(
        token,
        String(process.env.SECRET_KEY)
      ) as TokenPayload;
      const userRoles = decoded.roles;

      if (!userRoles.some((role) => allowedRoles.includes(role))) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      req.user = decoded;
      next();
    } catch (e) {
      console.error(e);
      return res.status(401).json({ message: "Invalid token" });
    }
  };
};
