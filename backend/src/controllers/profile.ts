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
    return res.json({
      success: false,
      errors: getKeysWithError(validate.error.issues),
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
      res.json({
        success: false,
        errors: { key: "email", message: `email is already taken !!` },
      });
    } else res.json({ success: false, code: err });
  }
};

export const getProfiles = async (req: Request, res: Response) => {
  try {
    const profiles = await prismaDB.profile.findMany();
    res.json({ success: true, data: { profiles }, count: profiles.length });
  } catch (error) {
    res.json({ success: true, error });
  }
};

export const getProfile = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const profiles = await prismaDB.profile.findUnique({
      where: { id: Number.parseInt(id) },
    });
    res.json({ success: true, data: { profiles } });
  } catch (error) {
    res.json({ success: true, error });
  }
};
