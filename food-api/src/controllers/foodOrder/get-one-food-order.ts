import { RequestHandler } from "express";
import { FoodOrderModel } from "../../models/foodOrder.model";

export const getOneFoodOrder: RequestHandler = async (req, res) => {
  const { foodOrderID } = req.params;

  try {
    const findOrder = await FoodOrderModel.findById(foodOrderID).populate(
      "foodOrderItems"
    );

    if (!findOrder) {
      res.status(400).json({
        message: `There is no order with the id: ${foodOrderID}`,
      });
    }

    res.status(200).json({
      message: "Here is the food order details",
      findOrder,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong on the server.",
      error,
    });
  }
};
