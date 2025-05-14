import { RequestHandler } from "express";
import { UserModel } from "../../models/user.model";

export const UpdateUser: RequestHandler = async (req, res) => {
  const { userID } = req.params;
  const updatedData = req.body;

  try {
    const userToUpdate = await UserModel.findByIdAndUpdate(
      userID,
      {
        ...updatedData,
        updatedAt: new Date(),
      },
      { new: true, runValidators: true }
    );

    if (userToUpdate) {
      res.status(200).json({
        message: `Successfully updated the user information with the id:${userID}`,
        userToUpdate,
      });
    }
    if (!userToUpdate) {
      res.status(404).json({
        message: `We can't find a user with the user id:${userID}`,
      });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};
