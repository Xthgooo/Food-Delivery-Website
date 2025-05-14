import { RequestHandler } from "express";
import FoodCategoryModel from "../../models/foodCategory.model";

export const deleteCategory: RequestHandler = async (req, res) => {
  const { categoryID } = req.params;

  try {
    const category = await FoodCategoryModel.findById(categoryID);

    if (!category) {
      res.status(404).json({
        message: "We can't find the category you're trying to delete",
      });
    }

    const categoryName = category.categoryName;
    await FoodCategoryModel.findByIdAndDelete(categoryID);

    res.status(200).json({
      message: `Category with name ${categoryName} has been deleted`,
    });
  } catch (error) {
    res.status(500).json({
      message: "Sorry, there was an error processing your request",
    });
  }
};
