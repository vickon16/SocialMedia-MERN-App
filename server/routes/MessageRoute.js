import express from "express";
import MessageModel from "../models/messageModel.js";
import authMiddleWare from "../middleware/AuthMiddleware.js";
import { createSuccess } from "../utils/handlers.js";

const router = express.Router();

router.post("/", authMiddleWare, async (req, res, next) => {
  const senderId = req.decodedUserId;
  const { chatId, text } = req.body;

  const message = new MessageModel({ chatId, senderId, text });
  try {
    const result = await message.save();
    res.status(201).json(createSuccess(result, "Message created successfully", 201));
  } catch (error) {
    next(error);
  }
});

router.get("/:chatId", async (req, res, next) => {
  const { chatId } = req.params;
  try {
    const result = await MessageModel.find({ chatId });
    res.status(200).json(createSuccess(result, "Message gotten successfully"));
  } catch (error) {
    next(error);
  }
});

export default router;
