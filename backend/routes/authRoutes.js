import express from "express";
import { register, login } from "../controller/authController.js";
import { getUser } from "../controller/authController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/user", verifyToken, getUser);




export default router;
