import express from "express";
import authMiddleWare from "../middleware/AuthMiddleware.js";
import UserModel from "../models/userModel.js";
import { createError, createSuccess, createToken } from "../utils/handlers.js";

import bcrypt from "bcrypt";

const router = express.Router();

// get all users
router.get("/", async (req, res, next) => {
  try {
    let users = await UserModel.find();
    users = users.map((user) => {
      const { password, ...otherDetails } = user._doc;
      return otherDetails;
    });
    res
      .status(200)
      .json(createSuccess(users, "All users retrieved successfully"));
  } catch (error) {
    next(error);
  }
});

// get all users following userId
router.get('/find/:id/following', async (req, res, next) => {
  // const userId = req.decodedUserId;
  const {id} = req.params;

  try {
    const users = await UserModel.find({
      following : { $in: [id] },
    });

    res.status(200).json(createSuccess(users, "Users found successfully"));
  } catch (error) {
    next(error);
  }
});

// get one user
router.get("/find/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await UserModel.findById(id);

    if (!user) throw createError(404, "User not found");

    const { password, ...otherDetails } = user._doc;

    res
      .status(200)
      .json(createSuccess(otherDetails, "User retrieved successfully"));
  } catch (error) {
    next(error);
  }
});

// update user info
router.put("/find/:id", authMiddleWare, async (req, res, next) => {
  const { id } = req.params;
  const userId = req.decodedUserId;
  const { password } = req.body;

  try {
    if (userId !== id)
      throw createError(
        403,
        "Access Denied! You can only update your Account."
      );
    // if we also have to update password then password will be bcrypted again
    if (password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(password, salt);
    }

    // now find update the user
    const user = await UserModel.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    const token = createToken({ id: user._id });

    res
      .cookie("access_token", token, {
        httpOnly: true, //accessible only by web server 
        secure: true, //https
        sameSite: 'None', //cross-site cookie 
        maxAge: 1 * 24 * 60 * 60 * 1000 //cookie expiry 1day: set to match rT
      })
      .status(201)
      .json(createSuccess(user, "User updated successfully", 201));
  } catch (error) {
    next(error);
  }
});

// delete a particular user
router.delete("/find/:id", authMiddleWare, async (req, res, next) => {
  const { id } = req.params;
  const userId = req.decodedUserId;

  const { currentUserAdmin } = req.body;

  // if user is deleting his own account or he is an admin
  try {
    if (userId !== id || !currentUserAdmin)
      throw createError(403, "You can only delete your account");

    await UserModel.findByIdAndDelete(id);

    res.status(200).json(createSuccess(null, "User Deleted Successfully!"));
  } catch (error) {
    next(error);
  }
});

// follow user
router.put("/find/:id/follow", authMiddleWare, async (req, res, next) => {
  const { id } = req.params;
  const currentUserId = req.decodedUserId;

  try {
    if (currentUserId === id)
      throw createError(403, "You cannot follow your own account");

    const otherUser = await UserModel.findById(id);
    const currentUser = await UserModel.findById(currentUserId);

    if (currentUser.following.includes(id)) {
      throw createError(403, "You are already following this user");
    } else {
      await currentUser.updateOne({ $push: { following: id } });
      await otherUser.updateOne({ $push: { followers: currentUserId } });
      return res.status(200).json(createSuccess(null, "User followed!"));
    }
  } catch (error) {
    next(error);
  }
});

router.put("/find/:id/unfollow", authMiddleWare, async (req, res, next) => {
  const { id } = req.params;
  const currentUserId = req.decodedUserId;

  try {
    if (currentUserId === id)
      throw createError(403, "You cannot unfollow your own account");

    const otherUser = await UserModel.findById(id);
    const currentUser = await UserModel.findById(currentUserId);

    if (currentUser.following.includes(id)) {
      await currentUser.updateOne({ $pull: { following: id } });
      await otherUser.updateOne({ $pull: { followers: currentUserId } });

      return res.status(200).json(createSuccess(null, "User unfollowed!"));
    } else {
      throw createError(403, "You are already unfollowing this user");
    }
  } catch (error) {
    next(error);
  }
});

export default router;
