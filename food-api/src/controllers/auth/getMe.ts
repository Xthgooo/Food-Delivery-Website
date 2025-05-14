import { RequestHandler } from "express";
import { UserModel } from "../../models/user.model";

export const getMe: any = async (req, res) => {
  try {
    const userID = req.userId;

    const user = await UserModel.findById(userID).select("-password");

    if (!user) {
      res.status(400).json({ message: "User not found" });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
