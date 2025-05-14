import { RequestHandler } from "express";
import FoodCategoryModel from "../../models/foodCategory.model";

export const updateCategory: RequestHandler = async (req, res) => {
  const { categoryID } = req.params;
  const updateData = req.body;

  try {
    const updatedCategory = await FoodCategoryModel.findByIdAndUpdate(
      categoryID,
      {
        ...updateData,
        updatedAt: new Date(),
      },
      { new: true, runValidators: true }
    );

    if (!updatedCategory) {
      res.status(404).json({
        message: `Sorry, we can't find a category with the id: ${categoryID}`,
      });
    }

    res.status(200).json({
      message: `Successfully updated the category name for category:${categoryID}`,
      updatedCategory,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong on the server." });
  }
};
