import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers.authorization;

  if (!header) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const secret = process.env.JWT_SECRET;

  if (!secret) {
    res.status(500).json({ error: "JWT secret not configured" });
    return;
  }

  try {
    const result = jwt.verify(header, secret);
    (req as Request & { user?: unknown }).user = result;
    next();
  } catch {
    res.status(401).json({ error: "Unauthorized" });
  }
};
