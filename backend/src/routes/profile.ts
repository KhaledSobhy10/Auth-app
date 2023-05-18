import { Router, Response, Request, NextFunction } from "express";
import { getProfile, getProfiles, postProfile } from "../controllers/profile";
import { isAuth } from "../middleware/isAuth";

const router = Router();

router.post("/", postProfile);
// router.get("/", getProfiles);
router.get("/", [isAuth], getProfile);

export default router;
