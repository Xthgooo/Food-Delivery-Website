"use client";
import { useCallback, useEffect, useState } from "react";
import { EditableFoodCard } from "./add&EditFood/EditableFoodCard";
import { FoodsType } from "@/app/(customer)/page";
import { DeleteCategory } from "./add&EditCategory/DeleteCategory";
import { AddFood } from "./add&EditFood/AddFood";
import { EditCategory } from "./add&EditCategory/EditCategory";
import { myAPI } from "@/axios";

export type FoodCategorizerProps = {
	id: string;
	categoryName: string;
	refreshCategories: () => void;
};
export const FoodCategorizerForAdmin = ({
	id,
	categoryName,
	refreshCategories,
}: FoodCategorizerProps) => {
	const [foods, setFoods] = useState<FoodsType[]>([]);

	const getFoodsByCategory = useCallback(async () => {
		const foodsArray = await myAPI.get(`/food?categoryID=${id}`);
		setFoods(foodsArray.data.foodsByCategory);
	}, [id]);

	useEffect(() => {
		getFoodsByCategory();
	}, [getFoodsByCategory]);

	return (
		<div
			id={categoryName}
			className="w-full  bg-white/10 rounded-[8px] flex flex-col p-5 gap-4 ">
			<div className="flex w-full justify-between">
				<p className="lg:text-[20px] md:text-[17px] text-[15px] font-semibold text-white">
					{categoryName} - ({foods.length})
				</p>
				<div className="flex gap-3">
					<EditCategory
						categoryName={categoryName}
						refreshFoods={refreshCategories}
						categoryID={id}
					/>
					<AddFood
						categoryName={categoryName}
						refreshFoods={getFoodsByCategory}
						categoryID={id}
					/>
					<DeleteCategory
						categoryName={categoryName}
						id={id}
						refreshCategories={refreshCategories}
						foods={foods}
					/>
				</div>
			</div>
			<div className=" w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4  gap-4 flex-wrap">
				{foods.map(({ _id, image, foodName, price, ingredients, category }) => {
					console.log("foods", foods);
					return (
						<div key={_id}>
							<EditableFoodCard
								category={category}
								_id={_id}
								image={image}
								price={price}
								foodName={foodName}
								ingredients={ingredients}
								refreshFoods={getFoodsByCategory}
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
};
