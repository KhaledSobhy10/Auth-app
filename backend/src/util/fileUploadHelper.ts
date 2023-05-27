import multer from "multer";

export const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/uploads");
    },
    filename: function (req, file, cb) {
      const ex = file.mimetype.split("/")[1];
      const uniqueSuffix = Date.now() + "." + ex;
      cb(null, file.fieldname + "-" + uniqueSuffix);
    },
  });


  