"use client";

import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { FoodType } from "../FoodCard";

interface AddFoodToCartProps extends FoodType {
	setIsOpen: (open: boolean) => void;
}

export const ShowFoodDetails = ({
	_id,
	image,
	foodName,
	ingredients,
	price,
	setIsOpen,
}: AddFoodToCartProps) => {
	const [quantity, setQuantity] = useState<number>(1);
	const [totalPrice, setTotalPrice] = useState<number>(price);

	const handleAddFoodToCart = () => {
		setIsOpen(false);

		const cart = JSON.parse(localStorage.getItem("cart") || "[]");

		const existingItemIndex = cart.findIndex(
			(item: { food: FoodType; quantity: number }) => item.food._id === _id
		);

		if (existingItemIndex !== -1) {
			cart[existingItemIndex].quantity += quantity;
		} else {
			const cartItem = {
				food: {
					_id,
					foodName,
					image,
					ingredients,
					price,
				},
				quantity,
			};
			cart.push(cartItem);
		}

		localStorage.setItem("cart", JSON.stringify(cart));

		window.dispatchEvent(new Event("cartUpdated"));
	};

	useEffect(() => {
		const totalPrice = quantity * price;
		setTotalPrice(totalPrice);
	}, [quantity, price]);

	const handleAddQuantity = () => setQuantity((prev) => prev + 1);
	const handleSubtractQuantity = () =>
		setQuantity((prev) => (prev > 1 ? prev - 1 : prev));

	return (
		<div className="flex gap-6 ">
			<div className="w-[50%] h-full">
				<img src={image} className="w-full h-[364px] bg-cover rounded-md" />
			</div>
			<div className="w-[50%] h-[364px] flex flex-col justify-between">
				<div className="w-full flex flex-col gap-3">
					<p className="text-[30px] font-semibold text-[#EF4444]">{foodName}</p>
					<p className="w-full text-base">{ingredients}</p>
				</div>
				<div className="w-full flex flex-col gap-8">
					<div className="flex h-full flex-col items-center ">
						<p className="text-base">Quantity</p>
						<div className="h-full flex gap-3 items-center">
							<Button
								className="w-11 h-11 rounded-full border-1 bg-transparent"
								onClick={handleSubtractQuantity}>
								<Minus color="black" />
							</Button>
							<p className="text-xl font-semibold w-10 flex justify-center">
								{quantity}
							</p>
							<Button
								className="w-11 h-11 rounded-full border-1 bg-transparent"
								onClick={handleAddQuantity}>
								<Plus color="black" />
							</Button>
						</div>
					</div>
					<div className="flex h-full flex-col justify-between items-center">
						<p className="text-base">Total Price</p>
						<p className="text-2xl font-semibold">${totalPrice}</p>
					</div>
				</div>
				<Button
					className="w-full h-11 bg-black text-white text-[14px] flex justify-center items-center "
					onClick={handleAddFoodToCart}>
					Add to cart
				</Button>
			</div>
		</div>
	);
};
