import { Router } from "express";
import { cleanLogin, login } from "../controllers/login";

const router = Router();

router.post("/login", cleanLogin);

export default router;
