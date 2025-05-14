import { RequestHandler } from "express";
import { UserModel } from "../../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const SignIn: RequestHandler = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      res.status(404).json({ message: "Username is invalid" });
    }

    const { password: hashedPassword, ...UserWithoutPassword } =
      user.toObject();

    const passwordMatched = await bcrypt.compare(password, hashedPassword);

    if (!passwordMatched) {
      res.status(401).json({ message: "Username or password is invalid" });
      return;
    }

    const token = jwt.sign(
      { userID: user._id, isAdmin: user.role === "Admin" },
      process.env.JWT_SECRET
    );
    res.status(200).json({ user: UserWithoutPassword, token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
