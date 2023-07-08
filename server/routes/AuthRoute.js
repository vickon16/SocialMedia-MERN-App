import express from "express";
import UserModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import { createError, createSuccess, createToken } from "../utils/handlers.js";
import authMiddleWare from "../middleware/AuthMiddleware.js";

const router = express.Router();

// get session to determine jwt expiration token
router.get("/session", authMiddleWare, (req, res, next) => {
  res.status(200).json(createSuccess(null, "Access Granted"));
});

// register or signup user
router.post("/register", async (req, res, next) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(req.body.password, salt);
  req.body.password = hashedPass;
  const newUser = new UserModel(req.body);

  const { email } = req.body;
  try {
    // check if user already exist
    const oldUser = await UserModel.findOne({ email: email });

    if (oldUser) {
      throw createError(401, "User already exists");
    }

    const user = await newUser.save();
    const token = createToken({ id: user._id });

    const { password, ...userDetails } = user?._doc;

    res
      .cookie("access_token", token, {
        httpOnly: true, //accessible only by web server 
        secure: true, //https
        sameSite: 'None', //cross-site cookie 
        maxAge: 1 * 24 * 60 * 60 * 1000 //cookie expiry 1day: set to match rT
      })
      .status(201)
      .json(createSuccess(userDetails, "User Created successfully", 201));
  } catch (error) {
    next(error);
  }
});

// log user in
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email: email });

    if (!user) throw createError(404, "User does not exist");

    const validity = await bcrypt.compare(password, user.password);

    if (!validity) throw createError(401, "Wrong Credentials");

    const token = createToken({ id: user._id });

    const { password: pass, ...userDetails } = user?._doc;

    res
      .cookie("access_token", token, {
        httpOnly: true, //accessible only by web server 
        secure: true, //https
        sameSite: 'None', //cross-site cookie 
        maxAge: 1 * 24 * 60 * 60 * 1000 //cookie expiry 1day: set to match rT
      })
      .status(200)
      .json(createSuccess(userDetails, "User Logged in successfully"));
  } catch (err) {
    next(err);
  }
});

// log user out
router.get("/logout", async (req, res, next) => {
  res
    .clearCookie("access_token", { httpOnly: true, sameSite: 'None', secure: true })
    .status(200)
    .json(createSuccess(null, "Signed out successfully"));
});

export default router;
