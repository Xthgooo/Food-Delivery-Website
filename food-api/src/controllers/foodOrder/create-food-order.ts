import { RequestHandler } from "express";
import { FoodOrderModel } from "../../models/foodOrder.model";
import FoodModel from "../../models/food.model";

export const addFoodOrder: RequestHandler = async (req, res) => {
  try {
    const { newFoodOrder } = req.body;

    const getFoodDetailsByIds = async (foodIDs) => {
      return await FoodModel.find({ _id: { $in: foodIDs } });
    };

    if (newFoodOrder) {
      let sum = 0;

      const foodDetails = await getFoodDetailsByIds(
        newFoodOrder.foodOrderItems.map((item) => item.food)
      );

      newFoodOrder.foodOrderItems.forEach((order) => {
        const food = foodDetails.find(
          (item) => item._id.toString() === order.food.toString()
        );
        if (food) {
          sum += food.price * order.quantity;
        }
      });

      const newOrderInfo = await FoodOrderModel.create({
        ...newFoodOrder,
        totalPrice: sum,
      });

      res.status(201).json({
        message: "Food order created!",
        data: newOrderInfo,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while creating the food order.",
      error: error.message,
    });
  }
};
