"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../contextProvider/AuthContext";
import axios from "axios";
import { FoodOrderInfo } from "@/app/(admin)/admin/_components/contextProvider/AdminContextProvider";
import { OrderDetailsTemplate } from "./OrderDetailsTemplate";

export const CheckOutOrders = () => {
	const [orders, setOrders] = useState<FoodOrderInfo[]>([]);
	const { user } = useAuth();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (!user?._id) {
			setLoading(false);
			return;
		}
		const fetchOrders = async () => {
			try {
				const response = await axios.get(
					`${process.env.API_URL}/foodOrder?userID=${user._id}`
				);
				setOrders(response.data.foodOrderByUser);
			} catch (error) {
				console.error("Error fetching orders:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchOrders();
	}, [user?._id]);

	console.log(orders);

	return (
		<div className="w-full h-full flex flex-col p-4 gap-5">
			<p className="font-semibold text-[15px] text-white">Order history</p>

			<div className="mb-[100px] overflow-y-scroll flex flex-col">
				<div className="flex flex-col gap-5">
					{loading ? (
						<div className="text-white text-sm italic opacity-70">
							⏳ Loading your orders...
						</div>
					) : orders.length === 0 ? (
						<div className="text-white text-sm italic opacity-70">
							🧾 You don`&apos;`t have any order history yet!
						</div>
					) : (
						orders
							.slice()
							.reverse()
							.map((order, index) => (
								<OrderDetailsTemplate key={index} order={order} />
							))
					)}
					<span className="h-20" />
				</div>
			</div>

			<div className="absolute bottom-[36px] left-0 w-full h-24 bg-gradient-to-b from-transparent to-black z-20 pointer-events-none" />
		</div>
	);
};
