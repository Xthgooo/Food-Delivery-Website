"use client";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { FoodCategorizer } from "../components/FoodCategorizer";
import { Footer } from "../components/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import { Header } from "../components/Header";
import { Title } from "../components/Title";

export type FoodsType = {
	_id: string;
	foodName: string;
	price: number;
	image: string;
	ingredients: string;
	category: CategoryType;
};

export type CategoryType = {
	_id: string;
	categoryName: string;
};

export default function Home() {
	const [categories, setCategories] = useState<CategoryType[]>([]);
	const [filterFoods, setFilterFoods] = useState<CategoryType | null>(null);
	const [selectedCategory, setSelectedCategory] = useState<string | null>(null); // Track selected category

	const getCategories = async () => {
		try {
			const categoriesData = await axios.get("http://localhost:3001/category");
			setCategories(categoriesData.data.categories);
		} catch (error) {
			console.error("Error fetching categories:", error);
		}
	};

	useEffect(() => {
		getCategories();
	}, []);

	const ShowFilteredFoods = (
		categoryName: string | null,
		_id: string | null
	) => {
		if (categoryName === null && _id === null) {
			setFilterFoods(null);
			setSelectedCategory(null);
		} else if (categoryName !== null && _id !== null) {
			setFilterFoods({
				categoryName,
				_id,
			});
			setSelectedCategory(_id);
		}
	};

	const activeStyle = {
		backgroundColor: "rgb(239, 68, 68)",
		color: "white",
	};

	const inactiveStyle = {
		backgroundColor: "white",
		color: "black",
	};

	return (
		<div className="w-screen bg-black flex flex-col">
			<Header />
			<div className="w-full mt-17 flex flex-col">
				<div className="mb-21 flex flex-col items-center">
					<div className="w-full flex justify-center">
						<div className="max-w-[1440px] w-full flex flex-col">
							<div
								className="w-full h-[570px] relative"
								style={{
									backgroundImage: "url('/images/herobg.png')",
									backgroundSize: "cover",
									backgroundPosition: "center",
								}}>
								<div
									className="absolute inset-0 bg-gradient-to-t from-black to-transparent transition-all duration-1000 ease-in-out"
									style={{
										backgroundImage:
											"linear-gradient(to top, black, transparent)",
									}}></div>
							</div>
							<div className="w-full h-fit flex flex-col gap-9 px-22 pb-5">
								<Title title="Categories" />
								<Carousel
									opts={{
										align: "start",
									}}
									className="w-full">
									<CarouselContent>
										<CarouselItem className="basis-auto">
											<Badge
												style={
													selectedCategory === null
														? activeStyle
														: inactiveStyle
												}
												className="px-5 h-9  text-lg font-normal rounded-full"
												onClick={() => {
													ShowFilteredFoods(null, null);
												}}>
												All
											</Badge>
										</CarouselItem>
										{categories.map(({ categoryName, _id }) => (
											<CarouselItem key={_id} className="basis-auto">
												<Badge
													style={
														selectedCategory === _id
															? activeStyle
															: inactiveStyle
													}
													className="px-5 h-9 text-lg font-normal rounded-full hover:text-white hover:bg-red-500"
													onClick={() => {
														ShowFilteredFoods(categoryName, _id);
													}}>
													{categoryName}
												</Badge>
											</CarouselItem>
										))}
									</CarouselContent>
									<CarouselPrevious />
									<CarouselNext />
								</Carousel>
							</div>
							<div className="mt-10 w-full flex flex-col gap-[54px]">
								{filterFoods ? (
									<FoodCategorizer
										title={filterFoods.categoryName}
										categoryID={filterFoods._id}
									/>
								) : (
									categories.map((category) => (
										<FoodCategorizer
											key={category._id}
											title={category.categoryName}
											categoryID={category._id}
										/>
									))
								)}
							</div>
						</div>
					</div>
				</div>
				<Footer />
			</div>
		</div>
	);
}
