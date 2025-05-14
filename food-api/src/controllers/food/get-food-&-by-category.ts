import { RequestHandler } from "express";
import FoodModel from "../../models/food.model";
import FoodCategoryModel from "../../models/foodCategory.model";

export const getAllFoodsAndFilterByCategory: RequestHandler = async (
  req,
  res
) => {
  const { categoryID } = req.query;

  try {
    if (categoryID) {
      const foodsByCategory = await FoodModel.find({
        category: categoryID,
      }).populate("category");

      res.status(200).json({
        message: `Please see the foods in the category: ${categoryID}`,
        foodsByCategory,
      });
    } else {
      const foods = await FoodModel.find({}).populate("category");

      if (foods.length === 0) {
        res.status(400).json({
          message: `Sorry, we can't find any foods to show.`,
        });
      }

      res.status(200).json({
        message: "Please see all available foods.",
        foods,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Sorry, there was an error processing your request.",
      error,
    });
  }
};
