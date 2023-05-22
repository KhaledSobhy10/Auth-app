import { Router } from "express";
import {
  getProfile,
  getProfiles,
  postProfile,
  putProfile,
} from "../controllers/profile";
import { isAuth } from "../middleware/isAuth";
import { isValidProfileInputs } from "../middleware/isValidProfile";
import multer from "multer";

const router = Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    const ex = file.mimetype.split("/")[1];
    const uniqueSuffix = Date.now() + "." + ex;
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});
const upload = multer({ storage });

// routes
// router.get("/", getProfiles);
router.get("/", [isAuth], getProfile);
router.post("/", [isValidProfileInputs], postProfile);
router.put(
  "/",
  [isAuth, upload.single("photo"), isValidProfileInputs],
  putProfile
);

export default router;
