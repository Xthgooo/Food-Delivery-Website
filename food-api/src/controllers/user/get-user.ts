import { RequestHandler } from "express";
import { UserModel } from "../../models/user.model";

export const getUser: RequestHandler = async (req, res) => {
  const { userID } = req.params;
  try {
    const getUserInfo = await UserModel.findById(userID).populate("orders");

    if (getUserInfo) {
      res
        .status(200)
        .json({ message: `Found user with the id:${userID}`, getUserInfo });
    }
    if (!getUserInfo) {
      res
        .status(404)
        .json({ message: `We can't find a user with the id:${userID}` });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong on the server.", error });
  }
};
