import { RequestHandler } from "express";
import FoodModel from "../../models/food.model";

export const getAllFoodsCount: RequestHandler = async (req, res) => {
  try {
    const numberOfAllFoods = await FoodModel.countDocuments({});

    res.status(200).json({
      message: "All foods Number",
      numberOfAllFoods,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Sorry, there was an error processing your request.",
      error,
    });
  }
};
