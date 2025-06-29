import express from "express";
import multer from "multer";
import { uploadFile } from "../controllers/upload.controller.js";
import { protectRoute } from "../middleware/Auth.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/file",protectRoute, upload.single("file"), uploadFile);

export default router;
