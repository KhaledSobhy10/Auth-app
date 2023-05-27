import { Router } from "express";
import {
  getProfile,
  postProfile,
  putProfile,
} from "../controllers/profile";
import { isAuth } from "../middleware/isAuth";
import { isValidProfileInputs } from "../middleware/isValidProfile";
import { isValidFile } from "../middleware/isvalidFile";

const router = Router();


// routes
// router.get("/", getProfiles);
router.get("/", [isAuth], getProfile);
router.post("/", [isValidProfileInputs], postProfile);
router.put(
  "/",
  [isAuth, isValidFile.single("photo"), isValidProfileInputs],
  putProfile
);

export default router;
