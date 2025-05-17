import { Plus } from "lucide-react";

export const AddFoodButton = ({ categoryName }: { categoryName: string }) => {
	return (
		<div className="max-w-[270px] w-full h-[241px] bg-black/60 rounded-[20px] flex relative p-4 justify-center items-center border-1 border-dashed border-white px-5">
			<div className="flex flex-col gap-6 items-center">
				<Plus color="white" />
				<div className="flex flex-col text-[12px]  text-white font-medium items-center">
					<p>Add new Dish to</p>
					<p>{categoryName}</p>
				</div>
			</div>
		</div>
	);
};
