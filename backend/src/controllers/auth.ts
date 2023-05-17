import { Response, Request } from "express";
import prismaDB from "../util/db";
import { getKeysWithError } from "../util/zodErrorFormater";
import { generateToken } from "../util/token";
import { ProfileCreateInputSchema } from "../../prisma/generated/zod";

export const login = async (req: Request, res: Response) => {
  const data = { ...req.body };
  // Check validation of inputs before check in DB
  const validate = ProfileCreateInputSchema.safeParse(data);
  if (!validate.success)
    return res.status(400).json({
      success: false,
      errors: getKeysWithError(validate.error.issues),
    });
  // Check if data is exist in DB
  try {
    const user = await prismaDB.profile.findFirst({
      where: { ...validate.data },
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
