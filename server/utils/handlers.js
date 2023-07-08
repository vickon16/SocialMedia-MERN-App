import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export const createError = (status, message) => {
  const err = new Error();
  err.status = status;
  err.message = message;

  return err;
};

export const createSuccess = (data, message, status) => {
  return {
    data: data || null,
    message,
    status: status || 200,
  };
};

export const createToken = (data) => {
  const token = jwt.sign(data, process.env.JWT_SECRET, 
    { expiresIn: "1d" } 
    );
  return token;
};
