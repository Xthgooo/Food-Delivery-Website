import { RequestHandler } from "express";
import FoodModel from "../../models/food.model";

export const postFood: RequestHandler = async (req, res) => {
  const { foodName, category, ingredients, price, image } = req.body;

  if (!foodName || !category || !ingredients || !price || !image) {
    res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const parsedPrice = parseFloat(price);

    const createdFood = await FoodModel.create({
      foodName,
      price: parsedPrice,
      image,
      ingredients,
      category,
    });

    res.status(200).json({
      message: "New food successfully added!",
      food: createdFood,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong on the server",
      error: error instanceof Error ? error.message : error,
    });
    console.log(error);
  }
};
