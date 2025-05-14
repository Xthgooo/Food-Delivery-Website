import { RequestHandler } from "express";

export const authorizationMiddleware: RequestHandler = (req, res, next) => {
  const isAdmin = (req as any).isAdmin;

  if (!isAdmin) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  next();
};
