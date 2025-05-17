"use client";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

import { EditFoodForm } from "./EditFoodForm";
import { EditableFoodCardProps } from "./EditableFoodCard";
import { useState } from "react";

export const EditFood = ({
	foodName,
	_id,
	category,
	image,
	price,
	ingredients,
	refreshFoods,
}: EditableFoodCardProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger className="max-w-[50px] w-full h-5 rounded-md flex justify-center items-center text-[12px] text-black bg-white hover:bg-white/20 hover:font-bold hover:text-white">
				Edit ✏️
			</DialogTrigger>

			<DialogContent className="w-[460px] bg-white text-black">
				<DialogHeader>
					<DialogTitle>Edit food details for {foodName}</DialogTitle>
					<DialogDescription />
				</DialogHeader>
				<EditFoodForm
					foodName={foodName}
					_id={_id}
					category={category}
					price={price}
					image={image}
					ingredients={ingredients}
					refreshFoods={refreshFoods}
					setIsOpen={setIsOpen}
				/>
			</DialogContent>
		</Dialog>
	);
};
