import { Router } from "express";
import {
  postLogin,
  postVerifyToken,
  validateLoginInput,
} from "../controllers/auth";

const router = Router();

router.post("/login", [validateLoginInput], postLogin);

router.post("/verify-token", postVerifyToken);

export default router;
