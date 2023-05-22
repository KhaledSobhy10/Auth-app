import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../util/token";
import { JwtPayload } from "jsonwebtoken";

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.get("Authorization");
  if (!authHeader)
    return res.status(400).json({
      success: false,
      message: "Authorization header is required !",
    });
  const token: string = authHeader.split(" ")[1];

  verifyToken(token)
    .then((result) => {
      const { id } = result as JwtPayload;
      req.params.id = id;
      next();
    })
    .catch((error) => {
      return res.status(401).json({ success: false, message: error.message });
    });
};
