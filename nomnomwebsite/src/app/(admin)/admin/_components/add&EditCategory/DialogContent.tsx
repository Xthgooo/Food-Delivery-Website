import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export const AddCategoryDialogContent = ({
	refreshCategories,
	setIsOpen,
}: {
	refreshCategories: () => void;
	setIsOpen: (open: boolean) => void;
}) => {
	const [categoryName, setCategoryName] = useState("");
	const [inputError, setInputError] = useState(false);

	const handleCategoryPost = async () => {
		const trimmedName = categoryName.trim();

		if (!trimmedName) {
			setInputError(true);
			toast.error("You must enter a category name.");
			return;
		}

		try {
			const token = localStorage.getItem("token");

			await axios.post(
				`${process.env.API_URL}/category`,
				{
					newCategory: categoryName,
				},
				{
					headers: {
						"Content-type": "application/json",
						Authorization: `${token}`,
					},
				}
			);

			toast.success("Category has been created", {
				description: `New category added on ${new Date().toLocaleString()}`,
			});
			refreshCategories();
			setInputError(false);
			setCategoryName("");
			setIsOpen(false);
		} catch (error) {
			console.error("Error creating category:", error);
			toast.error("Failed to create category", {
				description: "An error occurred.",
			});
		}
	};

	return (
		<div className="flex flex-col justify-between">
			<input
				type="text"
				value={categoryName}
				onChange={(e) => {
					setCategoryName(e.target.value);
					if (inputError) setInputError(false);
				}}
				placeholder="Enter new category name"
				className={`w-full px-3 py-2 border rounded ${
					inputError ? "border-red-500 animate-shake" : "border-gray-300"
				}`}
			/>
			<Button onClick={handleCategoryPost} className="bg-black text-white mt-2">
				Add Category
			</Button>
		</div>
	);
};
