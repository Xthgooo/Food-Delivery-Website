import Image from "next/image";

export const ShowOrderedFoods = ({
	image,
	foodName,
	count,
}: {
	image: string;
	foodName: string;
	count: number;
}) => {
	return (
		<div className="w-[263px] flex flex-col gap-3">
			<div className="flex h-8 justify-between items-center">
				<div className="flex gap-[10px] items-center text-xs">
					<div className="w-8 h-8 overflow-hidden">
						<Image
							alt="Ordered food image"
							src={image}
							className="w-full h-full bg-cover rounded-md"
						/>
					</div>
					<p>{foodName}</p>
				</div>
				<p>x {count}</p>
			</div>
		</div>
	);
};
