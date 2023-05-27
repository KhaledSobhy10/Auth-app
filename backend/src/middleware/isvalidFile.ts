import multer from "multer";
import { storage } from "../util/fileUploadHelper";

export const isValidFile = multer({
  storage,
  fileFilter(req, file, cb) {
    const whitelist = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
    if (!whitelist.includes(file.mimetype)) {
      return cb(null, false);
    }
    cb(null, true);
  },
});
