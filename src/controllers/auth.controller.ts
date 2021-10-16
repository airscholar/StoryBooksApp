import User from "../models/User.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import env from "../config/env.config";
import { Request, Response } from "express";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ msg: "User does not exist" });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ msg: "Invalid credentials" });
  }
  const payload = {
    user: {
      id: user.id,
    },
  };
  jwt.sign(payload, env.JWT_SECRET, { expiresIn: 360000 }, (err, token) => {
    if (err) throw err;
    res.json({ token });
  });
};

// const signup = async (req, res) => {
//   const { name, email, password } = req.body;
//   const user = await User.findOne({ email });
//   if (user) {
//     return res.status(400).json({ msg: "User already exists" });
//   }
//   const newUser = new User({
//     name,
//     email,
//     password,
//   });
//   const salt = await bcrypt.genSalt(10);
//   newUser.password = await bcrypt.hash(password, salt);
//   await newUser.save();
//   const payload = {
//     user: {
//       id: newUser.id,
//     },
//   };
//   jwt.sign(payload, config.get("jwtSecret"), { expiresIn: 360000 }, (err, token) => {
//     if (err) throw err;
//     res.json({ token });
//   });
// };

export const logout = (req: Request, res: Response) => {
  req.logout();
  res.redirect("/");
};

// const forgotPassword = async (req, res) => {
//   const { email } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ msg: "User does not exist" });
//     }
//     const token = crypto.randomBytes(20).toString("hex");
//     user.resetToken = token;
//     user.expireToken = Date.now() + 3600000;
//     await user.save();
//     const resetUrl = `http://localhost:3000/resetPassword/${token}`;
//     await sendEmail({
//       email: user.email,
//       subject: "Password Reset",
//       message: `You are receiving this email because you (or someone else) have requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`,
//     });
//     res.json({ msg: "Email sent" });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
// };

// const resetPassword = async (req, res) => {
//   const { resetToken } = req.params;
//   const { password } = req.body;
//   try {
//     const user = await User.findOne({ resetToken });
//     if (!user) {
//       return res.status(400).json({ msg: "Invalid token" });
//     }
//     if (user.expireToken < Date.now()) {
//       return res.status(400).json({ msg: "Token expired" });
//     }
//     const salt = await bcrypt.genSalt(10);
//     user.password = await bcrypt.hash(password, salt);
//     user.resetToken = undefined;
//     user.expireToken = undefined;
//     await user.save();
//     res.json({ msg: "Password updated" });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
// };
