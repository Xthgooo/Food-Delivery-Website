"use client";

import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingCartIcon } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { useEffect, useState } from "react";
import { ListFoodsInCart } from "./ListFoodsInCart";
import { CheckOutOrders } from "./CheckedOutOrders";

export const ShowCart = () => {
	const [activeTab, setActiveTab] = useState<"Cart" | "Order">("Cart");
	const [cartCount, setCartCount] = useState<number>(0);
	const tabs: string[] = ["Cart", "Order"];

	useEffect(() => {
		const updateCartCount = () => {
			const cart = JSON.parse(localStorage.getItem("cart") || "[]");
			const count = cart.reduce(
				(acc: number, item: any) => acc + item.quantity,
				0
			);
			setCartCount(count);
		};

		updateCartCount();

		window.addEventListener("cartUpdated", updateCartCount);
		return () => {
			window.removeEventListener("cartUpdated", updateCartCount);
		};
	}, []);

	return (
		<Sheet>
			<SheetTrigger className="relative bg-white rounded-full w-9 h-9 flex justify-center items-center hover:bg-[#EF4444]">
				<ShoppingCartIcon color="black" size={16} />
				{cartCount > 0 && (
					<span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
						{cartCount}
					</span>
				)}
			</SheetTrigger>
			<SheetContent className="w-[535px] z-1000000 bg-black p-8 flex-col gap-6 border-0">
				<SheetHeader>
					<SheetTitle className="text-white flex gap-2 items-center">
						<ShoppingCartIcon /> Your order details
					</SheetTitle>
					<SheetDescription></SheetDescription>
				</SheetHeader>
				<div className="w-full flex justify-between rounded-full border-2 border-white bg-white">
					{tabs.map((tab) => (
						<Toggle
							key={tab}
							pressed={activeTab === tab}
							onClick={() => setActiveTab(tab as "Cart" | "Order")}
							className="w-[220px] flex justify-center rounded-full ">
							{tab}
						</Toggle>
					))}
				</div>
				{activeTab === "Cart" ? <ListFoodsInCart /> : <CheckOutOrders />}
			</SheetContent>
		</Sheet>
	);
};
