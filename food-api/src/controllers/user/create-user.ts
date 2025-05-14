import { RequestHandler } from "express";
import { UserModel } from "../../models/user.model";

export const CreateUser: RequestHandler = async (req, res) => {
  try {
    const { newUser } = req.body;

    if (newUser) {
      const createdUser = await UserModel.create(newUser);
      res.status(201).json({
        message: "User account successfully created!",
        data: createdUser,
      });
    }

    res.status(400).json({
      message:
        "Please provide the user information correctly to create an account",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create food(s)." });
  }
};
