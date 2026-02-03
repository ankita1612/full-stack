import multer, { StorageEngine } from "multer";
import path from "path";
import { Request } from "express";

const storage = multer.diskStorage({
 destination: (req: Request, file: Express.Multer.File,cb: (error: Error | null, destination: string) => void) => {
     cb(null, "uploads");
   },
 
   filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
     const ext = path.extname(file.originalname);
     cb(null, `${file.fieldname}-${Date.now()}${ext}`);
   },
});

// File filter (only images)
const fileFilter: multer.Options["fileFilter"] = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only images allowed!"));
  }
};

export const m_upload = multer({ storage, fileFilter });