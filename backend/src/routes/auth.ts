import { Router } from "express";
import {
  postWithGoogle,
  postLogin,
  postVerifyToken,
  postWithGithub,
} from "../controllers/auth";

import { isValidateLoginInput } from "../middleware/isValidLoginInput";
import { getGoogleLoginUrl } from "../util/googleHelper";
import { getGithubLoginUrl } from "../util/githubHelper";
const router = Router();

// Authentication routes
router.post("/login", [isValidateLoginInput], postLogin);
router.post("/verify-token", postVerifyToken);

// Google OAuth2 login flow
router.get("/google-login-url", async (req, res) => {
  try {
    const url = getGoogleLoginUrl();
    res.status(200).json({ success: true, data: { url } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

router.get("/google/callback", postWithGoogle);

// GitHub OAuth2 login flow
router.get("/github-login-url", async (req, res) => {
  try {
    const url = getGithubLoginUrl();
    res.status(200).json({ success: true, data: { url } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

router.get("/github/callback", postWithGithub);

export default router;
