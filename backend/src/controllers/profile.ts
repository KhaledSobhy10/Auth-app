import { Response, Request } from "express";
import prismaDB from "../util/db";
import { ProfileCreateInputSchema } from "../../prisma/generated/zod";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { getKeysWithError } from "../util/zodErrorFormater";
import { generateToken } from "../util/token";

export const postProfile = async (req: Request, res: Response) => {
  const data = { ...req.body };
  const validate = ProfileCreateInputSchema.safeParse(data);

  if (!validate.success)
    return res.status(400).json({
      success: false,
      errors: getKeysWithError(validate.error.issues),
      message: "Incorrect form data !",
    });

  try {
    const response = await prismaDB.profile.create({ data });
    const token = await generateToken({ id: response.id });
    res.json({
      success: true,
      data: { token },
    });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError && "P2002" === err.code) {
      res.status(400).json({
        success: false,
        errors: [{ key: "email", message: `email is already taken !!` }],
      });
    } else res.status(500).json({ success: false, message: err });
  }
};

export const getProfiles = async (req: Request, res: Response) => {
  try {
    const profiles = await prismaDB.profile.findMany();
    res.json({ success: true, data: { profiles }, count: profiles.length });
  } catch (error) {
    res.json({ success: false, message: error });
  }
};

export const getProfile = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const profile = await prismaDB.profile.findUnique({
      where: { id: Number.parseInt(id) },
    });
    res.json({ success: true, data: { profile } });
  } catch (error) {
    res.status(400).json({ success: false, message: error });
  }
};
