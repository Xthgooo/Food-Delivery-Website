import { CategoryType } from "@/app/(customer)/page";
import { EditFood } from "./EditFood";
import { FoodType } from "@/app/components/FoodCard";
import Image from "next/image";

export interface EditableFoodCardProps extends FoodType {
	refreshFoods: () => void;
	category: CategoryType;
}

export const EditableFoodCard = ({
	image,
	foodName,
	price,
	ingredients,
	_id,
	category,
	refreshFoods,
}: EditableFoodCardProps) => {
	return (
		<div className="max-w-[270px] w-full h-[241px] bg-black/40 rounded-[20px] flex flex-col justify-between items-center relative p-4">
			<div className="max-w-[165px] w-full h-[129px] rounded-[12px] relative overflow-hidden">
				<Image alt="image" src={image} className="w-full h-full bg-cover" />
			</div>
			<div className="w-full flex flex-col gap-2">
				<div className="w-full flex justify-between items-center">
					<p className="text-[14px] h-[21px] overflow-hidden font-semibold text-white">
						{foodName}
					</p>
					<p className="text-[12px] font-semibold text-white">${price}</p>
				</div>
				<p className="w-full h-4 text-xs text-white overflow-hidden">
					{ingredients}
				</p>
			</div>
			<div className="w-full flex justify-end">
				<EditFood
					foodName={foodName}
					_id={_id}
					image={image}
					price={price}
					ingredients={ingredients}
					category={category}
					refreshFoods={refreshFoods}
				/>
			</div>
		</div>
	);
};
