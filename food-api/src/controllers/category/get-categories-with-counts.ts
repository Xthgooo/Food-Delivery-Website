import { RequestHandler } from "express";
import FoodModel from "../../models/food.model";
import FoodCategoryModel from "../../models/foodCategory.model";

export const getCategoriesWithCounts: RequestHandler = async (req, res) => {
  try {
    const categories = await FoodCategoryModel.find({});

    const categoriesWithCounts = await Promise.all(
      categories.map(async (category) => {
        const count = await FoodModel.countDocuments({
          category: category._id,
        });

        return {
          _id: category._id,
          categoryName: category.categoryName,
          numberOfFoods: count,
          createdAt: category.createdAt,
          updatedAt: category.updatedAt,
        };
      })
    );

    if (categories.length === 0) {
      res.status(404).json({
        message: "Sorry, we can't find any categories to show.",
      });
    }

    res.status(200).json({
      message: "Categories fetched successfully",
      categories: categoriesWithCounts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong on the server.",
      error,
    });
  }
};
