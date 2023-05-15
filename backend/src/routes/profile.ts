import { Response, Request, Router } from "express";
import { getProfile, getProfiles, postProfile } from "../controllers/profile";

const router = Router();

router.post("/", postProfile);
router.get("/", getProfiles);
router.get("/:id", getProfile);

export default router;
