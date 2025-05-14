import { RequestHandler } from "express";
import { FoodOrderModel } from "../../models/foodOrder.model";

export const updateFoodOrder: RequestHandler = async (req, res) => {
  const { foodOrderID } = req.params;
  const updatedData = req.body;

  const updatedOrder = await FoodOrderModel.findByIdAndUpdate(
    foodOrderID,
    {
      ...updatedData,
      updatedAt: new Date(),
    },
    { new: true, runValidators: true }
  );

  try {
    if (!updatedOrder) {
      res.status(400).json({
        message: `Sorry there is no foor order with the id:${foodOrderID}`,
      });
    }

    res.status(200).json({ message: `Updated the food order!`, updatedOrder });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong on the server.", error });
  }
};
