import { Response, Request, NextFunction } from "express";
import prismaDB from "../util/db";
import { generateToken, verifyToken } from "../util/token";
import {
  getAccessTokenFromCode,
  getGoogleUserInfo,
} from "../util/googleHelper";
import {
  getGithubAccessTokenFromCode,
  getGithubUserInfo,
} from "../util/githubHelper";

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
    return res.status(401).json({
      success: false,
      message: "Incorrect Email or password !!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Server Error`,
    });
  }
};

export const postVerifyToken = async (req: Request, res: Response) => {
  const { token } = req.body;
  if (!token) {
    res.status(401).json({ success: false, message: "Token is required !" });
    return;
  }
  verifyToken(token)
    .then((result) => {
      console.log("result", result);
      res.status(200).json({ success: true, message: "Valid token !" });
    })
    .catch((error) => {
      res.status(401).json({ success: false, message: error.message });
    });
};

/**
 * Handles the POST request for Google OAuth login.
 * @param req - The request object.
 * @param res - The response object.
 * @returns A redirect response to the login page with a JWT token.
 */
export const postWithGoogle = async (req: Request, res: Response) => {
  try {
    // Get the access token from the authorization code sent by Google.
    const token = await getAccessTokenFromCode(req.query.code as string);

    // Use the access token to get the user information from Google.
    const googleUserData = await getGoogleUserInfo(token);

    // Check if the user information includes an email address.
    const email = googleUserData.email;
    if (!email) {
      console.log(
        "🚀 ~ file: auth.ts:56 ~ postWithGoogle ~ unexpected response from google"
      );
      throw Error("unexpected response from google");
    }

    // Find or create a user profile in the database based on the email address.
    let profile = await prismaDB.profile.findUnique({ where: { email } });
    if (!profile) {
      profile = await prismaDB.profile.create({
        data: {
          email: googleUserData.email,
          photo_url: googleUserData.picture,
          name: googleUserData.name,
        },
      });
    }

    // Generate a JWT token for the user's profile ID.
    const loginToken = await generateToken({ id: profile.id });

    // Redirect to the login page with the JWT token in the URL.
    res.cookie("token", loginToken, {
      maxAge: 900000,
      httpOnly: false,
      domain: process.env.FRONT_END_URL,
    });
    res.setHeader("Set-Cookie", `token= ${loginToken} Secure Max-age=10 `);

    return res.redirect(
      `${process.env.FRONT_END_URL}/login?token=${loginToken}`
    );
  } catch (error) {
    // Log the error and redirect to the login page without a token.
    console.log("🚀 ~ file: auth.ts:56 ~ postWithGoogle", error);
    return res.redirect(`${process.env.FRONT_END_URL}/login`);
  }
};

/**
 * Handles the POST request for Github OAuth login.
 * @param req - The request object.
 * @param res - The response object.
 * @returns A redirect response to the login page with a JWT token.
 */
export const postWithGithub = async (req: Request, res: Response) => {
  try {
    // Get the access token from the authorization code sent by github.
    const token = await getGithubAccessTokenFromCode(req.query.code as string);

    // Use the access token to get the user information from github.
    const githubUserData = await getGithubUserInfo(token);

    // Check if the user information includes an email address.
    const email = githubUserData.email;
    if (!email) {
      console.log(
        "🚀 ~ file: auth.ts:56 ~ postWithGithub ~ unexpected response from github"
      );
      throw Error("unexpected response from github");
    }

    // Find or create a user profile in the database based on the email address.
    let profile = await prismaDB.profile.findUnique({ where: { email } });
    if (!profile) {
      profile = await prismaDB.profile.create({
        data: {
          ...githubUserData,
        },
      });
    }

    // Generate a JWT token for the user's profile ID.
    const loginToken = await generateToken({ id: profile.id });
    console.log(
      "🚀 ~ file: auth.ts:148 ~ postWithGithub ~ loginToken:",
      loginToken
    );

    // Redirect to the login page with the JWT token in the URL.

    return res.redirect(
      `${process.env.FRONT_END_URL}/login?token=${loginToken}`
    );
  } catch (error) {
    // Log the error and redirect to the login page without a token.
    console.log("🚀 ~ file: auth.ts:156 ~ postWithGithub", error);
    return res.redirect(`${process.env.FRONT_END_URL}/login`);
  }
};
