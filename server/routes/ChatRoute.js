import express from "express";
import authMiddleWare from "../middleware/AuthMiddleware.js";
import { createError, createSuccess } from "../utils/handlers.js";
import ChatModel from "../models/chatModel.js";
const router = express.Router();

router.post("/", authMiddleWare, async (req, res, next) => {
  const senderId = req.decodedUserId;
  const receiverId = req.body.receiverId;

  try {
    if (senderId === receiverId) {
      throw createError(400, "You cannot create chat with yourself");
    }

    const newChat = new ChatModel({
      members: [senderId, receiverId],
    });
    const result = await newChat.save();

    res
      .status(201)
      .json(createSuccess(result, "Chats created successfully", 201));
  } catch (error) {
    next(error);
  }
});

// router.get('/:userId', async (req, res, next) => {
//   try {
//     // get all the chats i have with a particular user
//     const chat = await ChatModel.find({
//       members: { $in: [req.params.userId] },
//     });
//     res.status(200).json(createSuccess(chat, "Chat found successfully"));
//   } catch (error) {
//     next(error);
//   }
// });

router.get("/find/:userId", authMiddleWare, async (req, res, next) => {
  const senderId = req.decodedUserId;
  const { userId } = req.params;

  
  try {
    if (senderId === userId) {
      throw createError(400, "You cannot find chats with yourself");
    }
    const chat = await ChatModel.findOne({
      members: { $all: [senderId, userId] },
    });

    res.status(200).json(createSuccess(chat, "Chat found successfully"));
  } catch (error) {
    next(error);
  }
});

export default router;
