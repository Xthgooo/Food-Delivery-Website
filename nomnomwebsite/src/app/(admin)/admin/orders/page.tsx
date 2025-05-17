"use client";

import axios from "axios";
import { DatePickerWithRange } from "../_components/DateRangePicker";
import { FoodOrdersDataTable } from "../_components/Table";
import { useContext } from "react";
import {
	AdminContext,
	StatusType,
} from "../_components/contextProvider/AdminContextProvider";
import { Button } from "@/components/ui/button";

export default function FoodOrdersPage() {
	const { orders, setOrders } = useContext(AdminContext);

	const getOrders = async () => {
		const allOrders = await axios.get("http://localhost:3001/foodOrder");
		setOrders(allOrders.data.allOrders);
	};

	const handleStatusChange = async ({
		orderID,
		status,
	}: {
		orderID: string;
		status: StatusType;
	}) => {
		try {
			const token = localStorage.getItem("token");

			await axios.put(
				`http://localhost:3001/foodOrder/${orderID}`,
				{
					status,
				},
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `${token}`,
					},
				}
			);
			getOrders();
		} catch (error) {
			console.error("Error updating order status:", error);
		}
	};
	console.log(orders);

	return (
		<div className="w-full h-full px-10 mt-20">
			<div className="w-full flex flex-col bg-white/20 rounded-[8px] ">
				<div className="flex justify-between w-full p-4 h-19">
					<div className="flex flex-col">
						<p className="text-[20px] font-bold text-white">Orders</p>
						<p className="text-xs text-white/70 italic">
							{orders.length} items
						</p>
					</div>
					<div className="h-full flex gap-3 items-center">
						<div className="flex gap-1 items-center text-white italic text-xs">
							<p>Pick date range:</p>
							<DatePickerWithRange />
						</div>
						<Button className="rounded-full">
							<p> Change delivery state </p>
							<p>0</p>
						</Button>
					</div>
				</div>
				<div className="w-full h-full flex flex-col">
					<FoodOrdersDataTable
						tableData={orders}
						handleStatusChange={handleStatusChange}
						refreshOrders={getOrders}
					/>
				</div>
			</div>
		</div>
	);
}
