"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { Minus, Plus, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { FoodType } from "../FoodCard";
import Image from "next/image";

export const FoodCardInCart = ({
	foodID,
	quantity,
	handleRemoveFromCart,
	handleQuantityChange,
}: {
	foodID: string;
	quantity: number;
	handleRemoveFromCart: (foodID: string) => void;
	handleQuantityChange: (foodID: string, newQuantity: number) => void;
}) => {
	const [localQuantity, setLocalQuantity] = useState<number>(quantity);
	const [orderedFood, setOrderedFood] = useState<FoodType>({} as FoodType);
	const [totalPrice, setTotalPrice] = useState<number>(0);

	useEffect(() => {
		const getFoodInfo = async () => {
			const foodInfo = await axios.get(`http://localhost:3001/food/${foodID}`);
			setOrderedFood(foodInfo.data.findFood);
		};
		getFoodInfo();
	}, [foodID]);

	useEffect(() => {
		setTotalPrice(localQuantity * (orderedFood?.price ?? 0));
	}, [localQuantity, orderedFood]);

	const handleAddQuantity = () => {
		const newQty = localQuantity + 1;
		setLocalQuantity(newQty);
		handleQuantityChange(foodID, newQty);
	};

	const handleSubtractQuantity = () => {
		const newQty = localQuantity - 1;
		if (newQty <= 0) {
			handleRemoveFromCart(foodID);
		} else {
			setLocalQuantity(newQty);
			handleQuantityChange(foodID, newQty);
		}
	};

	const handleDeleteFoodFromCart = () => {
		handleRemoveFromCart(foodID);
	};

	return (
		<div className="w-full flex gap-[10px]">
			<div className="w-[124px] h-[90px]">
				<Image
					alt="Ordered food image"
					src={orderedFood.image}
					className="w-full h-full bg-cover"
				/>
			</div>
			<div className=" h-full flex flex-col justify-between">
				<div className="w-full flex justify-between">
					<div className="w-[260px] flex flex-col">
						<p className="text-[16px] text-[#EF4444] font-bold">
							{orderedFood.foodName}
						</p>
						<p className="text-xs">{orderedFood.ingredients}</p>
					</div>
					<Button
						className="w-4 h-4 border-1 border-[#EF4444] flex justify-center items-center"
						onClick={handleDeleteFoodFromCart}>
						<XIcon color="#EF4444" />
					</Button>
				</div>
				<div className="w-full flex justify-between h-9 items-center text-[16px] font-bold ">
					<div className="w-[105px] h-full flex gap-3 items-center">
						<Button variant="ghost" onClick={handleSubtractQuantity}>
							<Minus />
						</Button>
						<p>{localQuantity}</p>
						<Button variant="ghost" onClick={handleAddQuantity}>
							<Plus />
						</Button>
					</div>
					<div className="flex gap-2">
						<p>Total Price:</p>
						<p className="w-[55px] text-center"> ${totalPrice}</p>
					</div>
				</div>
			</div>
		</div>
	);
};
