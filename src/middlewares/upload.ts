import multer from 'multer';
import path from 'path';


const isDev = process.env.NODE_ENV !== "production";

const storage = multer.diskStorage({
    destination: isDev?'dist/uploads/':"uploads/",
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, `${Date.now()}${ext}`);
    }
});

export const upload = multer({ storage });