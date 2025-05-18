"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../contextProvider/AuthContext";
import { toast } from "sonner";
import { FoodType } from "../FoodCard";
import { myAPI } from "@/axios";

interface FoodOrder {
	food: FoodType;
	quantity: number;
}

interface PaymentInfoProps {
	cartItems: FoodOrder[];
	refreshCart: () => void;
}

export const PaymentInfo = ({ cartItems, refreshCart }: PaymentInfoProps) => {
	const [total, setTotal] = useState(0);
	const [shippingCost, setShippingCost] = useState(0);
	const { user } = useAuth();

	useEffect(() => {
		const calculateTotalCartPrice = async () => {
			const totalPrice = cartItems.reduce((sum, { food, quantity }) => {
				return sum + food.price * quantity;
			}, 0);

			if (totalPrice > 50 || totalPrice === 0) {
				setShippingCost(0);
			} else {
				setShippingCost(5);
			}

			setTotal(totalPrice);
		};

		calculateTotalCartPrice();
	}, [cartItems]);

	const handleCheckout = async () => {
		try {
			const foodOrders = cartItems.map(({ food, quantity }) => ({
				food: food._id,
				quantity,
			}));

			const newOrder = {
				newFoodOrder: {
					user: user?._id,
					address: user?.address,
					foodOrderItems: foodOrders,
				},
			};

			await myAPI.post(`/foodOrder`, newOrder);
			localStorage.removeItem("cart");
			refreshCart();
			toast.success("Order placed successfully!");
			window.dispatchEvent(new Event("cartUpdated"));
		} catch (error) {
			toast.error("Checkout failed", {
				description: "There was an issue placing your order.",
			});
			console.error("Checkout error:", error);
		}
	};

	const finalTotal = total + shippingCost;

	return (
		<div className="w-full flex flex-col p-4 gap-5 rounded-md text-white">
			<hr className="border-t border-white/50" />
			<p className="text-[20px] font-semibold">Payment Info:</p>
			<div className="w-full flex-col gap-2">
				<div className="w-full h-7 flex justify-between">
					<p className="text-[16px] text-white/80">Items</p>
					<p className="text-[16px] font-bold">${total}</p>
				</div>
				<div className="w-full h-7 flex justify-between">
					<p className="text-[16px] text-white/80">Shipping</p>
					<p className="text-[16px] font-bold">${shippingCost}</p>
				</div>
			</div>
			<hr className="border-dashed border-white/40 " />
			<div className="w-full h-7 flex justify-between">
				<p className="text-[16px] text-white/80">Total</p>
				<p className="text-[16px] font-bold">${finalTotal}</p>
			</div>
			<Button
				className="w-full bg-[#EF4444] rounded-full text-white flex justify-center items-center"
				disabled={finalTotal === 0}
				onClick={handleCheckout}>
				Check out
			</Button>
		</div>
	);
};
