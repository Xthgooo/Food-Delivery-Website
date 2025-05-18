"use client";

import { useEffect, useState } from "react";
import { FoodCard } from "./FoodCard";
import { Title } from "./Title";
import axios from "axios";
import { CategoryType } from "../(customer)/page";
import { myAPI } from "@/axios";

type FoodCategorizerProps = {
	title: string;
	categoryID: string;
};

export type FoodsByCategoryType = {
	_id: string;
	foodName: string;
	price: number;
	image: string;
	ingredients: string;
	category: CategoryType;
};

export const FoodCategorizer = ({
	title,
	categoryID,
}: FoodCategorizerProps) => {
	const [foodsByCategory, setFoodsByCategory] = useState<FoodsByCategoryType[]>(
		[]
	);

	useEffect(() => {
		const getFoodsByCategory = async () => {
			const foodsArray = await myAPI.get(`/food?categoryID=${categoryID}`);
			setFoodsByCategory(foodsArray.data.foodsByCategory);
		};
		getFoodsByCategory();
	}, [categoryID]);

	return (
		<div className="w-full flex flex-col gap-[54px] px-[88px]">
			<Title title={title} />
			<div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-9">
				{foodsByCategory.map((food, index) => (
					<FoodCard
						_id={food._id}
						key={index}
						image={food.image}
						foodName={food.foodName}
						price={food.price}
						ingredients={food.ingredients}
					/>
				))}
			</div>
		</div>
	);
};
