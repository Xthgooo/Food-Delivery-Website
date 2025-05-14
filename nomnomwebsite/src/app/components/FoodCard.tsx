import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { AddFoodToCart } from "./foodOrder/AddFoodToCart";

export type FoodType = {
  _id: string;
  image: string;
  foodName: string;
  price: number;
  ingredients: string;
};

export const FoodCard = ({
  image,
  foodName,
  price,
  ingredients,
  _id,
}: FoodType) => {
  return (
    <div className="max-w-[396px] w-full h-[342px] bg-white rounded-[20px] flex flex-col gap-5 relative">
      <div className="w-full h-[210px] rounded-[12px] relative overflow-hidden">
        <img src={image} className="w-full h-full bg-cover" />
        <div
          className="absolute inset-0 bg-gradient-to-b from-transparent to-white transition-all duration-1000 ease-in-out top-[70%]"
          style={{ height: "30%" }}
        ></div>
        <AddFoodToCart
          _id={_id}
          image={image}
          foodName={foodName}
          price={price}
          ingredients={ingredients}
        />
      </div>

      <div className="w-full flex flex-col gap-2 px-4 ">
        <div className="w-full flex justify-between items-center">
          <p className="text-xl font-semibold text-[#EF4444]">{foodName}</p>
          <p className="text-[18px] font-semibold">${price}</p>
        </div>
        <p className="w-full h-10 text-sm">{ingredients}</p>
      </div>
    </div>
  );
};
