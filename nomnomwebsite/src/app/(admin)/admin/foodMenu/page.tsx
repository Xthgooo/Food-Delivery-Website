"use client";

import { useEffect, useState } from "react";
import { CategoryBadge } from "../_components/CategoryBadge";
import axios from "axios";
import { FoodCategorizerForAdmin } from "../_components/FoodCategorizerForAdmin";
import { AddCategory } from "../_components/add&EditCategory/AddCategory";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export type CategoriesWithNumberType = {
	_id: string;
	categoryName: string;
	allFoodsNumber: number;
};

export default function FoodMenuPage() {
	const [categories, setCategories] = useState<CategoriesWithNumberType[]>([]);
	const [allFoodsNumber, setAllFoodsNumber] = useState<number>(0);
	const router = useRouter();

	const getAllFoodsNumber = async () => {
		const response = await axios.get(`${process.env.API_URL}/food/getCount`);
		setAllFoodsNumber(response.data.numberOfAllFoods);
	};

	const getCategories = async () => {
		const response = await axios.get(
			`${process.env.API_URL}/category/getCategoriesWithCounts`
		);
		setCategories(response.data.categories);
	};

	useEffect(() => {
		getAllFoodsNumber();
		getCategories();
	}, []);

	return (
		<div className="w-full h-full flex flex-col gap-6 bg-black">
			<div
				className="bg-black/85  flex-col p-6 gap-4 fixed top-0 z-10 hidden lg:flex"
				style={{
					width: "calc(100vw - 240px)",
					maxWidth: "1200px",
				}}>
				<p className="text-[20px] font-bold text-white">Dishes category</p>
				<div className="w-full flex gap-3 flex-wrap">
					<Button className="p-4 h-9 text-[12px] items-center flex gap-2 rounded-full border-1 border-white/40">
						<p>All</p>
						<p className="h-5 flex px-[10px] items-center bg-white/15 rounded-full">
							{allFoodsNumber}
						</p>
					</Button>

					{categories.map(({ categoryName, _id, allFoodsNumber }) => (
						<CategoryBadge
							key={_id}
							numberOfFoods={allFoodsNumber}
							categoryName={categoryName}
							onClick={() =>
								router.push(
									`#${categoryName.toLowerCase().replace(/\s+/g, "-")}`
								)
							}
						/>
					))}
					<AddCategory refreshCategories={getCategories} />
				</div>
			</div>

			<div
				className="lg:hidden bg-black/85 flex flex-col p-6 gap-4 fixed top-0 z-10"
				style={{
					width: "calc(100vw - 180px)",
				}}>
				<p className="text-[20px] font-bold text-white">Dishes category</p>
				<div className="w-full flex gap-3 flex-wrap">
					<Button className="p-4 h-9 text-[12px] items-center flex gap-2 rounded-full border-1 border-white/40">
						<p>All</p>
						<p className="h-5 flex px-[10px] items-center bg-white/15 rounded-full">
							{allFoodsNumber}
						</p>
					</Button>

					{categories.map(({ categoryName, _id, allFoodsNumber }) => (
						<CategoryBadge
							key={_id}
							numberOfFoods={allFoodsNumber}
							categoryName={categoryName}
							onClick={() =>
								router.push(
									`#${categoryName.toLowerCase().replace(/\s+/g, "-")}`
								)
							}
						/>
					))}
					<AddCategory refreshCategories={getCategories} />
				</div>
			</div>

			<div className="lg:h-[120px] md:h-[150px] sm:h-[200px] h-[290px] mb-[40px]" />

			<div className="px-10 flex flex-col gap-5">
				{categories.map(({ categoryName, _id }) => {
					const slug = categoryName.toLowerCase().replace(/\s+/g, "-");
					return (
						<section key={_id} id={slug} className="scroll-mt-[140px]">
							<FoodCategorizerForAdmin
								categoryName={categoryName}
								id={_id}
								refreshCategories={getCategories}
							/>
						</section>
					);
				})}
			</div>
		</div>
	);
}
