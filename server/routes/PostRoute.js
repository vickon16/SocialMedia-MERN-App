import express from "express";
import authMiddleWare from "../middleware/AuthMiddleware.js";
import PostModel from "../models/postModel.js";
import UserModel from "../models/userModel.js";
import mongoose from "mongoose";
import { createError, createSuccess } from "../utils/handlers.js";

const router = express.Router();

// create new post
router.post("/create", authMiddleWare, async (req, res, next) => {
  const newPost = new PostModel({ ...req.body, userId: req.decodedUserId });

  try {
    const result = await newPost.save();
    res
      .status(201)
      .json(createSuccess(result, "Post created successfully", 201));
  } catch (error) {
    next(error);
  }
});

// get all posts
router.get("/", async (req, res, next) => {
  try {
    const posts = await PostModel.find();
    const sortedPosts = posts.sort((a, b) => b.createdAt - a.createdAt)

    res.status(200).json(createSuccess(sortedPosts, "Posts gotten successfully"));
  } catch (error) {
    next(error);
  }
})

// get all posts from a user
router.get("/user/:userId", async (req, res, next) => {
  const {userId} = req.params;

  try {
    const posts = await PostModel.find({userId});
    const sortedPosts = posts.sort((a, b) => b.createdAt - a.createdAt)

    res.status(200).json(createSuccess(sortedPosts, "Posts gotten successfully"));
  } catch (error) {
    next(error);
  }
})

// get a single post
router.get("/find/:postId", async (req, res, next) => {
  const { postId } = req.params;

  try {
    const post = await PostModel.findById(postId);
    if (!post) throw createError(404, "Post does not exist");

    res.status(200).json(createSuccess(post, "Post gotten successfully"));
  } catch (error) {
    next(error);
  }
});

// update post
router.put("/find/:postId", authMiddleWare, async (req, res, next) => {
  const { postId } = req.params;
  const userId = req.decodedUserId;
  req.body.userId = userId;

  try {
    const post = await PostModel.findById(postId);

    if (!post) throw createError(404, "Post does not exit");

    if (userId !== post.userId)
      throw createError(403, "You can only edit your post");

    await post.updateOne({ $set: req.body });

    res.status(200).json(createSuccess(null, "Post updated!"));
  } catch (error) {
    next(error);
  }
});

// delete post
router.delete("/find/:postId", authMiddleWare, async (req, res, next) => {
  const { postId } = req.params;
  const userId = req.decodedUserId;
  req.body.userId = userId;

  try {
    const post = await PostModel.findById(postId);

    if (!post) throw createError(404, "Post does not exit");

    if (userId !== post.userId)
      throw createError(403, "You can only delete your post");

    await post.deleteOne();

    res.status(200).json(createSuccess(null, "Post deleted!"));
  } catch (error) {
    next(error);
  }
});

// like a post
router.put("/find/:postId/like", authMiddleWare, async (req, res, next) => {
  const { postId } = req.params;
  const userId = req.decodedUserId;

  try {
    const post = await PostModel.findById(postId);

    if (!post) throw createError(404, "Post does not exit");

    if (post.likes.includes(userId)) {
      throw createError(403, "Post Already liked");
    } 

    await post.updateOne({ $push: { likes: userId } });
    return res.status(200).json(createSuccess(null, "Post Liked!"));
  } catch (error) {
    next(error);
  }
});

// like a post
router.put("/find/:postId/dislike", authMiddleWare, async (req, res, next) => {
  const { postId } = req.params;
  const userId = req.decodedUserId;

  try {
    const post = await PostModel.findById(postId);

    if (!post) throw createError(404, "Post does not exit");

    if (!post.likes.includes(userId)) {
      throw createError(403, "Post has not been liked");
    } 

    await post.updateOne({ $pull: { likes: userId } });
    return res.status(200).json(createSuccess(null, "Post Disliked!"));
  } catch (error) {
    next(error);
  }
});

// find posts with a particular userId
router.get("/find/:userId/timeline", async (req, res, next) => {
  const {userId} = req.params;

  try {
    // find a particular post with the id;
    const currentUserPosts = await PostModel.find({ userId: userId });

    const followingPosts = await UserModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "posts",
          localField: "following",
          foreignField: "userId",
          as: "followingPosts",
        },
      },
      {
        $project: {
          followingPosts: 1,
          _id: 0,
        },
      },
    ]);

    const data = currentUserPosts
      .concat(...followingPosts[0].followingPosts)
      .sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });

    res
      .status(200)
      .json(createSuccess(data, "Timeline gotten successfully"));
  } catch (error) {
    next(error);
  }
});

export default router;
