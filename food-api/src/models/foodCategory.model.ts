import { Schema, model } from "mongoose";

const FoodCategorySchema = new Schema({
  categoryName: {
    type: String,
    required: true,
  },
  numberOfFoods: [
    {
      type: Schema.Types.ObjectId,
      ref: "Food",
    },
  ],
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

const FoodCategoryModel = model("FoodCategory", FoodCategorySchema);

export default FoodCategoryModel;
