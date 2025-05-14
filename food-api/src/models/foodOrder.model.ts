import { Schema, model } from "mongoose";

const orderItemSchema = new Schema({
  food: {
    type: Schema.Types.ObjectId,
    ref: "Food",
    required: true,
  },
  quantity: {
    type: "number",
    required: true,
  },
});

const FoodOrderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  foodOrderItems: {
    type: [orderItemSchema],
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Delivered", "Cancelled"],
    default: "Pending",
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export const FoodOrderModel = model("FoodOrder", FoodOrderSchema);
