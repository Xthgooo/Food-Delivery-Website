import { RequestHandler } from "express";
import FoodCategoryModel from "../../models/foodCategory.model";

export const getCategory: RequestHandler = async (req, res) => {
  const { categoryID } = req.params;

  try {
    const category = await FoodCategoryModel.findById(categoryID);

    if (!category) {
      res.status(404).json({
        message: `Sorry, we can't find a category with the id: ${categoryID}`,
      });
    }

    res.status(200).json({
      message: `Here is the category with the id:${categoryID}`,
      category,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong on the server.", error });
  }
};
