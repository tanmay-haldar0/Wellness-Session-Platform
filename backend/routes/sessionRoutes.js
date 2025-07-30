import express from "express";
import {
  getPublicSessions,
  getUserSessions,
  getSessionById,
  saveDraft,
  publishSession
} from "../controller/sessionController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/sessions", getPublicSessions);
router.get("/my-sessions", verifyToken, getUserSessions);
router.get("/my-sessions/:id", verifyToken, getSessionById);
router.post("/my-sessions/save-draft", verifyToken, saveDraft);
router.post("/my-sessions/publish", verifyToken, publishSession);

export default router;
