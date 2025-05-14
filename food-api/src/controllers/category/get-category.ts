import { RequestHandler } from "express";
import FoodCategoryModel from "../../models/foodCategory.model";

export const getCategories: RequestHandler = async (req, res) => {
  try {
    const categories = await FoodCategoryModel.find({});

    if (categories.length === 0) {
      res
        .status(404)
        .json({ message: "Sorry, we can't find any categories to show." });
    }

    res.status(200).json({ message: "All categories", categories });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong on the server." });
  }
};
