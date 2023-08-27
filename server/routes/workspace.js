import express from "express";
import { verifyToken } from "../middlewares/auth.js"; // middleware to verify jwt token for authentication
import { uploadFile, getFiles, getFile, updateFile } from "../controllers/workspace.js";

const router = express.Router();

router.get("/get-file/:fileID", verifyToken, getFile);
router.get("/get-files", verifyToken, getFiles);
router.post("/upload-file", verifyToken, uploadFile);
router.patch("/update-file", verifyToken, updateFile);

export default router;