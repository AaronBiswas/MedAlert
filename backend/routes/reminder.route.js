import express from "express";
import { getReminders, markTaken } from "../controllers/reminder.controller.js";
import { protectRoute } from "../middleware/Auth.js";

const router = express.Router();

router.get("/reminder", protectRoute, getReminders);
router.put("/mark-taken/:id",protectRoute,markTaken);

export default router;
