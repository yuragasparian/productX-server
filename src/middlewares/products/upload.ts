import multer from "multer";
import path from "path";
import crypto from "crypto";

const isDev = process.env.NODE_ENV !== "production";

const storage = multer.diskStorage({
  destination: isDev ? "dist/uploads/" : "uploads/",
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const randomString = crypto.randomBytes(8).toString("hex");
    const timestamp = Date.now();
    const filename = `${randomString}-${timestamp}${ext}`;
    cb(null, filename);
  },
});

export const upload = multer({ storage });
