import { RequestHandler } from "express";
import { FoodOrderModel } from "../../models/foodOrder.model";

export const deleteFoodOrder: RequestHandler = async (req, res) => {
  const { foodOrderID } = req.params;

  try {
    const deleted = await FoodOrderModel.findByIdAndDelete(foodOrderID);

    if (deleted)
      res.status(200).json({ message: "Food order has been deleted" });
    if (!deleted)
      res.status(400).json({
        message: "We can't find the food order you'are tyring to delete",
      });
  } catch (error) {
    res.status(500).json({
      message: "Sorry there was an error to procceed with your request.",
    });
  }
};
