import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { getKeysWithError } from "../util/zodErrorFormater";

export const isValidateLoginInput = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = { ...req.body };

  const schema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    name: z.string().length(100).optional().nullable(),
    password: z
      .string()
      .min(8, { message: "password must be more than 8 characters" }),
  });

  // Check validation of inputs before check in DB
  const validate = schema.safeParse(data);
  if (!validate.success)
    return res.status(400).json({
      success: false,
      errors: getKeysWithError(validate.error.issues),
    });
  req.body = validate.data;
  next();
};
