import { RequestHandler } from "express";
import { UserModel } from "../../models/user.model";

export const DeleteUser: RequestHandler = async (req, res) => {
  const { userID } = req.params;
  try {
    const deleteUser = await UserModel.findByIdAndDelete(userID);

    if (deleteUser) {
      res
        .status(200)
        .json({ message: `Deleted the user with the id:${userID}` });
    }
    if (!deleteUser) {
      res
        .status(404)
        .json({
          message: `We can't find a user to delete with the user id:${userID}`,
        });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong on the server." });
  }
};
