"use client";

import { createContext, useState, ReactNode, useEffect } from "react";

import { FoodType } from "@/app/components/FoodCard";
import { usePathname } from "next/navigation";
import { myAPI } from "@/axios";

export type OneOrder = {
	food: FoodType;
	quantity: number;
};

export type FoodOrderInfo = {
	_id: number;
	number: number;
	foodOrderItems: OneOrder[];
	createdAt: string;
	totalPrice: number;
	address: string;
	status: StatusType;
};

export const AdminContext = createContext<AdminContextType>(
	{} as AdminContextType
);

export type AdminButtonNameType = "Orders" | "Food Menu" | "Settings";
export type StatusType = "Pending" | "Delivered" | "Cancelled";

type AdminContextType = {
	orders: FoodOrderInfo[];
	setOrders: (orders: FoodOrderInfo[]) => void;
	clickedButton: AdminButtonNameType;
	setClickedButton: (name: AdminButtonNameType) => void;
};

export const AdminContextProvider = ({ children }: { children: ReactNode }) => {
	const [clickedButton, setClickedButton] =
		useState<AdminButtonNameType>("Orders");
	const [orders, setOrders] = useState<FoodOrderInfo[]>([]);
	const pathname = usePathname();

	const getOrders = async () => {
		try {
			const response = await myAPI.get(`/foodOrder`);
			setOrders(response.data.allOrders);
		} catch (error) {
			console.error("Failed to fetch orders:", error);
		}
	};

	useEffect(() => {
		getOrders();

		const pathToButtonMap: { [key: string]: AdminButtonNameType } = {
			"/admin/settings": "Settings",
			"/admin/orders": "Orders",
			"/admin/foodMenu": "Food Menu",
		};

		const matchedPath = Object.keys(pathToButtonMap).find((path) =>
			pathname.startsWith(path)
		);

		if (matchedPath) {
			setClickedButton(pathToButtonMap[matchedPath]);
		}
	}, [pathname]);

	return (
		<AdminContext.Provider
			value={{
				clickedButton,
				setClickedButton,
				orders,
				setOrders,
			}}>
			{children}
		</AdminContext.Provider>
	);
};
