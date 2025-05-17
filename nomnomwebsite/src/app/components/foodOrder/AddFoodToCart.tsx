"use client";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { ShowFoodDetails } from "./ShowFoodDetails";
import { useState } from "react";
import { AddressDialogue } from "./AddressDialogue";
import { FoodType } from "../FoodCard";

export const AddFoodToCart = ({
	image,
	foodName,
	price,
	ingredients,
	_id,
}: FoodType) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	// const [address, setAddress] = useState<string>("");

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger className="px-1.5 py-0.5 absolute right-[4%] top-[5%] rounded-md hover:bg-red-500 flex justify-center items-center text-xs font-bold border border-white bg-[#EF4444] text-white shadow-[0_2px_6px_rgba(0,0,0,0.5)]">
				GET
			</DialogTrigger>
			<DialogTitle></DialogTitle>
			<DialogDescription></DialogDescription>
			<DialogContent className="sm:max-w-[826px] bg-white rounded-[20px]">
				<ShowFoodDetails
					_id={_id}
					image={image}
					foodName={foodName}
					price={price}
					ingredients={ingredients}
					setIsOpen={setIsOpen}
				/>
			</DialogContent>
			//
			<DialogContent className="bg-white rounded-[20px]">
				// <AddressDialogue setIsOpen={setIsOpen} />
				//
			</DialogContent>
		</Dialog>
	);
};
