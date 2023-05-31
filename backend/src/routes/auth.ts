import { Router, query } from "express";
import {
  postLogin,
  postVerifyToken,
  validateLoginInput,
} from "../controllers/auth";

import axios from "axios";

const router = Router();

router.post("/login", [validateLoginInput], postLogin);

router.post("/verify-token", postVerifyToken);

router.get("/google/callback", (req, res) => {
  getAccessTokenFromCode(req.query.code as string)
    .then((data) => {
      console.log(
        "🚀 ~ file: auth.ts:21 ~ getAccessTokenFromCode ~ data:",
        data
      );
      return getGoogleUserInfo(data);
      // res.json({ success: true, data });
    })
    .then((data) => {
      // should create user if not exist or just check if email is
      res.json({ success: true, data });
    })
    .catch((err) => {
      console.log("🚀 ~ file: auth.ts:32 ~ router.get ~ err:", err);
      res.json({ success: false, err });
    });
});

router.get("/google/callback/token", (req, res) => {
  console.log(
    "🚀 ~ file: auth.ts:17 ~ router.get ~ req.body.token:",
    req.body.token
  );
  // res.json({ success: true });
});

async function getGoogleUserInfo(access_token: string) {
  const { data } = await axios({
    url: "https://www.googleapis.com/oauth2/v2/userinfo",
    method: "get",
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  console.log(data); // { id, email, given_name, family_name }
  return data;
}

async function getAccessTokenFromCode(code: string | undefined) {
  if (!code) return;
  const { data } = await axios({
    url: `https://oauth2.googleapis.com/token`,
    method: "post",
    data: {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      redirect_uri: process.env.APP_URL + "/api/auth/google/callback",
      grant_type: "authorization_code",
      code,
    },
  });
  console.log(data); // { access_token, expires_in, token_type, refresh_token }
  return data.access_token;
}

export default router;
