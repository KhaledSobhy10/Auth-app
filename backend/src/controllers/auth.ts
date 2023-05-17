import { Response, Request, NextFunction } from "express";
import prismaDB from "../util/db";
import { getKeysWithError } from "../util/zodErrorFormater";
import { generateToken, verifyToken } from "../util/token";
import { ProfileCreateInputSchema } from "../../prisma/generated/zod";

export const postLogin = async (req: Request, res: Response) => {
  // Check if data is exist in DB
  try {
    const user = await prismaDB.profile.findFirst({
      where: { ...req.body },
    });
    if (user) {
      const token = await generateToken({ id: user.id });
      return res.status(200).json({
        success: true,
        data: { token },
      });
    }
    return res.status(400).json({
      success: false,
      message: "Incorrect Email or password !!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Server Error ${error}`,
    });
  }
};

export const validateLoginInput = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = { ...req.body };
  // Check validation of inputs before check in DB
  const validate = ProfileCreateInputSchema.safeParse(data);
  if (!validate.success)
    return res.status(400).json({
      success: false,
      errors: getKeysWithError(validate.error.issues),
    });
  req.body = validate.data;
  next();
};

export const postVerifyToken = async (req: Request, res: Response) => {
  const { token } = req.body;
  if (!token) {
    res.status(400).json({ success: false, message: "Token is required !" });
    return;
  }
  verifyToken(token)
    .then((result) => {
      console.log("result", result);
      res.status(200).json({ success: true, message: "Valid token !" });
    })
    .catch((error) => {
      res.status(400).json({ success: false, message: error.message });
    });
};
