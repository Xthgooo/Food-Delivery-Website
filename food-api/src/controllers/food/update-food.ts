import { RequestHandler } from "express";
import FoodModel from "../../models/food.model";

export const updateFood: RequestHandler = async (req, res) => {
  const { foodID } = req.params;
  const updatedData = req.body;

  try {
    const updatedFood = await FoodModel.findByIdAndUpdate(
      foodID,
      {
        ...updatedData,
        updatedAt: new Date(),
      },
      { new: true, runValidators: true }
    ).populate("category");

    if (!updatedFood) {
      res.status(404).json({
        message: `Sorry, we can't find a food with the id: ${foodID}`,
      });
    }

    res
      .status(200)
      .json({ message: "Food has been successfully updated!", updatedFood });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Something went wrong on the server.", error });
  }
};
