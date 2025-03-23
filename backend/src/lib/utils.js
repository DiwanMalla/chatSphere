import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  res.cookie("jwt", token, {
    httpOnly: true, //prevents client side js from accessing the cookie
    secure: process.env.NODE_ENV !== "development", //only send the cookie over https in production
    maxAge: 7 * 24 * 60 * 60 * 1000, //7 days
    sameSite: "strict", //prevent csrf attacks
  });
  return token;
};
