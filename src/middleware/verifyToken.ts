import { Request, Response, NextFunction } from "express";

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers["token"];

  if (token !== "ABC") {
    res.status(401).json({ error: "Unauthorized. Invalid token." });
    return;  }

  next();
};
