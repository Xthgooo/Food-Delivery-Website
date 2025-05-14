import { RequestHandler } from "express";
import { UserModel } from "../../models/user.model";

export const getAllUsers: RequestHandler = async (req, res) => {
  try {
    const users = await UserModel.find({}).populate("orders");

    if (users.length > 0) {
      res
        .status(200)
        .json({ message: "Please see the users info below", users });
    }
    if (users.length === 0) {
      res.status(404).json({ message: "Sorry, we can't find any users" });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong on the server." });
  }
};
