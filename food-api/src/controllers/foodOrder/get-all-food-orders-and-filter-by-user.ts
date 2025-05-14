import { RequestHandler } from "express";
import { FoodOrderModel } from "../../models/foodOrder.model";

export const getFoodOrdersandFilterByUser: RequestHandler = async (
  req,
  res
) => {
  const { userID } = req.query;
  try {
    if (userID) {
      const foodOrderByUser = await FoodOrderModel.find({
        user: userID,
      })
        .populate("user")
        .populate("foodOrderItems.food");

      if (foodOrderByUser.length === 0) {
        res.status(200).json({
          message: `No orders found for user.`,
          foodOrderByUser: [],
        });
      }

      res.status(200).json({
        message: `Please see the client's food order below.`,
        foodOrderByUser,
      });
    } else {
      const allOrders = await FoodOrderModel.find({})
        .populate("user")
        .populate("foodOrderItems.food");

      res.status(200).json({
        message: `Please see the food orders.`,
        allOrders,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: `Sorry, there was an error processing your request.`,
      error,
    });
  }
};
