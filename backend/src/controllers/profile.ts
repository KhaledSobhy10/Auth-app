import { Response, Request } from "express";
import prismaDB from "../util/db";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { generateToken } from "../util/token";

export const postProfile = async (req: Request, res: Response) => {
  const data = { ...req.body };
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
    if (profile?.photo_url) {
      profile.photo_url = profile.photo_url.replace(
        "public",
        process.env.APP_URL || "ErrorInFilePath"
      );
    }
    res.json({ success: true, data: { profile } });
  } catch (error) {
    res.status(400).json({ success: false, message: error });
  }
};

export const putProfile = async (req: Request, res: Response) => {
  // will be set buy our middleware
  const { id } = req.params;

  if (req.file) {
    req.body.photo_url = req.file.path;
  }

  try {
    delete req.body.id;
    const result = await prismaDB.profile.update({
      where: { id: Number.parseInt(id) },
      data: { ...req.body },
    });
    res.json({ success: true, message: "Profile updated successfully" });
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      "P2002" === error.code
    ) {
      return res.status(400).json({
        success: false,
        errors: [{ key: "email", message: `email is already taken !!` }],
      });
    }
    console.log("🚀 ~ file: profile.ts:59 ~ putProfile ~ error:", error);
    res.status(400).json({ success: false, message: "Error" });
  }
};
