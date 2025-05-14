import { RequestHandler } from "express";
import FoodModel from "../../models/food.model";

export const deleteFood: RequestHandler = async (req, res) => {
  const { foodID } = req.params;

  try {
    const deleted = await FoodModel.findByIdAndDelete(foodID);

    if (deleted) res.status(200).json({ message: "Food has been deleted" });
    if (!deleted)
      res
        .status(400)
        .json({ message: "We can't find the food you'are tyring to delete" });
  } catch (error) {
    res.status(500).json({
      message: "Sorry there was an error to procceed with your request.",
    });
  }
};
