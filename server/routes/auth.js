import express from "express";
import { verifyToken } from "../middlewares/auth.js";
import { signin, signup, changePassword, forgotPassword } from "../controllers/auth.js";

const router = express.Router();

router.post("/signup", signup); // creates a new user account 
router.post("/signin", signin); // signs user in to the workspace and returns a jwt token to be used for subsequent requests
router.patch("/change-password", verifyToken, changePassword); // changes user password
router.patch("/forgot-password", forgotPassword); // creates new passowrd for user and sends it via email

export default router;