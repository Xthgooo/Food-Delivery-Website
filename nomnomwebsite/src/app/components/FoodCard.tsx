import Image from "next/image";
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
        <Image
          width={"396"}
          height={"342"}
          alt="food image"
          src={image}
          className="w-full h-full bg-cover"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-transparent to-white transition-all duration-1000 ease-in-out top-[70%]"
          style={{ height: "30%" }}
        ></div>
      </div>

      <div className="w-full flex flex-col gap-2 px-4 items-center">
        <div className="w-full flex justify-between items-center">
          <p className="w-full h-7 text-xl font-semibold text-[#EF4444] flex overflow-hidden">
            {foodName}
          </p>
          <p className="text-[18px] font-semibold">${price}</p>
        </div>
        <p className="w-full h-10 text-sm overflow-hidden">{ingredients}</p>
        <AddFoodToCart
          _id={_id}
          image={image}
          foodName={foodName}
          price={price}
          ingredients={ingredients}
        />
      </div>
    </div>
  );
};
