import { RequestHandler } from "express";
import FoodCategoryModel from "../../models/foodCategory.model";

export const postCategory: RequestHandler = async (req, res) => {
  try {
    const { newCategory, newCategories } = req.body;

    if (newCategory) {
      const createdCategory = await FoodCategoryModel.create({
        categoryName: newCategory,
      });

      res
        .status(201)
        .json({ message: "Category created!", data: createdCategory });
    }

    if (Array.isArray(newCategories) && newCategories.length > 0) {
      const formattedCategories = newCategories.map((cat) => ({
        categoryName: cat.name || cat.categoryName,
      }));

      const createdCategories = await FoodCategoryModel.insertMany(
        formattedCategories
      );

      res
        .status(201)
        .json({ message: "Categories created!", data: createdCategories });
    }

    res.status(400).json({
      message: "Please provide a single category or an array of categories.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create category/categories." });
  }
};
