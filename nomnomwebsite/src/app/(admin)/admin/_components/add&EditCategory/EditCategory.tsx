"use client";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { myAPI } from "@/axios";

export const EditCategory = ({
	categoryName,
	refreshFoods,
	categoryID,
}: {
	categoryName: string;
	categoryID: string;
	refreshFoods: () => void;
}) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [updatedCategoryName, setUpdatedCategoryName] =
		useState<string>(categoryName);

	const handleCancel = () => {
		setIsOpen(false);
		setUpdatedCategoryName(categoryName);
	};

	async function onSubmit(updatedCategoryName: string) {
		const token = localStorage.getItem("token");
		await myAPI.put(
			`${process.env.API_URL}/${categoryID}`,
			{ categoryName: updatedCategoryName },
			{
				headers: {
					"Content-type": "application/json",
					Authorization: `${token}`,
				},
			}
		);

		toast.success("Food has been successfully updated!", {
			description: `The ${categoryName} has been updated to ${updatedCategoryName}.`,
		});
		refreshFoods();
		if (setIsOpen) setIsOpen(false);
	}

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger className="bg-white w-8 h-[30px] flex justify-center items-center rounded-md hover:bg-white/30 ">
				✏️
			</DialogTrigger>
			<DialogContent className="w-[460px] bg-white text-black flex flex-col gap-5">
				<DialogHeader>
					<DialogTitle>
						Edit category name for: `&quot;`{categoryName} `&quot;`
					</DialogTitle>
				</DialogHeader>

				<form
					onSubmit={(e) => {
						e.preventDefault();
						onSubmit(updatedCategoryName);
					}}
					className="flex flex-col gap-5">
					<div className="flex flex-col justify-between">
						<input
							type="text"
							value={updatedCategoryName}
							onChange={(e) => {
								setUpdatedCategoryName(e.target.value);
							}}
							className="w-full px-3 py-2 border rounded"
						/>
					</div>
					<div className="flex gap-4 justify-center">
						<Button
							type="button"
							onClick={handleCancel}
							className="w-[40%] bg-gray-600">
							Cancel
						</Button>
						<Button type="submit" className="w-[40%] bg-green-900">
							Save changes ✨
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
};
