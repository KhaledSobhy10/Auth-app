import { NextFunction, Request, Response } from "express";
import { getKeysWithError } from "../util/zodErrorFormater";
import { z } from "zod";

const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  name: z.string().max(30).optional().nullable(),
  password: z
    .string()
    .min(8, { message: "password must be more than 8 characters" }),
  photo_url: z.string().optional().nullable(),
  bio: z.string().max(100).optional().nullable(),
  phone: z
    .string()
    .min(8, { message: "phone must be 11 numbers" })
    .optional()
    .nullable(),
});

export const isValidProfileInputs = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = { ...req.body };

  const validate = schema.safeParse(data);

  if (!validate.success)
    res.status(400).json({
      success: false,
      errors: getKeysWithError(validate.error.issues),
      message: "Incorrect form data !",
    });
  else {
    req.body = validate.data;
    next();
  }
};
