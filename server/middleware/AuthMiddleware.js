import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { createError } from "../utils/handlers.js";

dotenv.config();
const secret = process.env.JWT_SECRET;

const authMiddleWare = async (req, res, next) => {
  // we assume the user is signed in in other to perform a crud operation
    // if the user is signed in, he already has an access token
    const token = req.cookies.access_token;

  try {
    if (!token) throw createError(401, "You are not Unauthenticated");

    jwt.verify(token, secret, (err, decodedUser) => {
      if (err) {
        throw createError(401, "token expired");
      }

      // decodedUser = { id:string, iat:number, exp:number}
      req.decodedUserId = decodedUser?.id;
      next();
    });
  } catch (error) {
    next(error);
  }
};

export default authMiddleWare;
