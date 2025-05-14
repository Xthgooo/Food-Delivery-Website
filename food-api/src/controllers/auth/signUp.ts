import { RequestHandler } from "express";
import { UserModel } from "../../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const SignUp: any = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      res.status(400).json({ message: `User with ${email} already exists` });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await UserModel.create({
      ...req.body,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const { password: userPassword, ...UserWithoutPassword } =
      newUser.toObject();

    const token = jwt.sign(
      { userID: newUser._id, isAdmin: newUser.role === "Admin" },
      process.env.JWT_SECRET
    );

    res.status(201).json({ user: UserWithoutPassword, token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
