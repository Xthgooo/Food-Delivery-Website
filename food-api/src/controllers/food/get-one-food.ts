import { RequestHandler } from "express";
import FoodModel from "../../models/food.model";

export const getFood: RequestHandler = async (req, res) => {
  const { foodID } = req.params;

  try {
    const findFood = await FoodModel.findById(foodID).populate("category");

    if (!findFood) {
      res.status(404).json({
        message: `Sorry, we can't find a food with the id: ${foodID}`,
      });
    }

    res.status(200).json({
      message: `Please see the food with the id:${foodID} below`,
      findFood,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong on the server." });
  }
};
[
  {
    _id: "6807701a99027f3030af33c7",
    image:
      "https://kikkomanusa.com/homecooks/wp-content/uploads/2024/05/Thai-Spring-Roll-Noodle-Bowl-IMG-1.png",
  },
  {
    _id: "6807701a99027f3030af33c8",
    image:
      "https://images.services.kitchenstories.io/uQyIMcz4a7MwVKnuaETb-0_TptY=/3840x0/filters:quality(85)/images.kitchenstories.io/recipeImages/R887-photo-final-4x3.jpg",
  },
  {
    _id: "6807701a99027f3030af33c9",
    image:
      "https://www.floatingkitchen.net/wp-content/uploads/2023/08/Bruschetta-Ricotta-Pesto-1-720x405.jpg",
  },
  {
    _id: "6807701a99027f3030af33ca",
    image:
      "https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2023/10/Stuffed-Mushrooms-main.jpg",
  },
  {
    _id: "6807701a99027f3030af33cb",
    image:
      "https://www.budgetbytes.com/wp-content/uploads/2024/01/buffalo-wings-overhead-horizontal-WR-scaled.jpg",
  },
  {
    _id: "6807701a99027f3030af33cc",
    image:
      "https://images.getrecipekit.com/20220505193805-grilled-garlic-dijon-salmon_1000x.webp?class=16x9",
  },
  {
    _id: "6807701a99027f3030af33cd",
    image:
      "https://nebraskastarbeef.com/wp-content/uploads/2022/09/52913995_m-scaled.jpg",
  },
  {
    _id: "6807701a99027f3030af33ce",
    image:
      "https://hips.hearstapps.com/hmg-prod/images/chicken-alfredo-index-64ee1026c82a9.jpg?crop=0.9994472084024323xw:1xh;center,top&resize=1200:*",
  },
  {
    _id: "6807701a99027f3030af33cf",
    image:
      "https://www.simplyrecipes.com/thmb/w4_QB4AOJ6a58M6g8FL7oJp3h7c=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Spicy-Tofu-Stirfry-METHOD-10-50c90297cbc840ba9927452d47c7e775.jpg",
  },
  {
    _id: "6807701a99027f3030af33d0",
    image:
      "https://www.foodandwine.com/thmb/IiwMj-hLImEmvZwKGEPPuAKdYJM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Lamb-Loin-Chops-with-Red-Wine-Pan-Sauce-with-Cumin-and-Chiles-FT-RECIPE0125-bdee865e44864145bde3e251eec79d02.jpg",
  },
];
