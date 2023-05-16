import { Response, Request } from "express";
import prismaDB from "../util/db";
import * as z from "zod";
import { getKeysWithError } from "../util/zod-error-formater";
import { generateToken } from "../util/token";
import { ProfileCreateInputSchema } from "../../prisma/generated/zod";

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const login = async (req: Request, res: Response) => {
  try {
    const user = await prismaDB.profile.findFirst({
      where: { password: req.body.password, email: req.body.email },
    });
    console.log("user", user);

    if (user) {
      const token = await generateToken({ id: user.id });
      return res.status(200).json({
        success: true,
        data: { token },
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Incorrect Email or password !!",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const isValidateBeforeDB = (req: Request, res: Response) => {
  const data = { ...req.body };
  const validate = ProfileCreateInputSchema.safeParse(data);
  if (!validate.success) {
    res.status(400).json({
      success: false,
      errors: getKeysWithError(validate.error.issues),
    });
    return;
  }
  return validate.data;
};
