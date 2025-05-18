"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import {
	Select,
	SelectTrigger,
	SelectContent,
	SelectItem,
	SelectValue,
} from "@/components/ui/select";

import { toast } from "sonner";
import { CategoryType } from "@/app/(customer)/page";
import { Edit2Icon } from "lucide-react";
import { format } from "date-fns";
import { EditableFoodCardProps } from "./EditableFoodCard";
import { DeleteFood } from "./DeleteFood";
import { myAPI } from "@/axios";

export type FormValues = {
	foodName: string;
	price: number;
	category: string;
	ingredients: string;
	image: string;
};

const formSchema = z.object({
	foodName: z
		.string()
		.min(1, { message: "Food name is required" })
		.regex(/^[A-Za-z\s&'-]+$/, {
			message: "Food name must contain only letters and spaces",
		}),

	category: z.string().min(1, { message: "Please select a dish category" }),

	ingredients: z.string().min(1, { message: "Ingredients are required" }),

	price: z
		.number({ invalid_type_error: "Price must be a number" })
		.min(0.01, { message: "Price must be greater than zero" }),

	image: z
		.string()
		.url({ message: "Image must be a valid URL" })
		.min(1, { message: "Image URL is required" }),
});

type FieldEditable = {
	foodName: boolean;
	price: boolean;
	category: boolean;
	ingredients: boolean;
	image: boolean;
};

type fieldName = "foodName" | "price" | "category" | "ingredients" | "image";

export interface EditableFoodCardPropsWithSetOpen
	extends EditableFoodCardProps {
	setIsOpen: (open: boolean) => void;
}

export const EditFoodForm = ({
	foodName,
	_id,
	category,
	image,
	ingredients,
	price,
	refreshFoods,
	setIsOpen,
}: EditableFoodCardPropsWithSetOpen) => {
	const [categories, setCategories] = useState<CategoryType[]>([]);
	const [editableFields, setEditableFields] = useState<FieldEditable>({
		foodName: false,
		price: false,
		category: false,
		ingredients: false,
		image: false,
	});

	const categoryID = category._id;

	const enableField = (fieldName: fieldName) => {
		setEditableFields((prev) => ({ ...prev, [fieldName]: true }));
	};

	const handleCancel = () => {
		if (setIsOpen) setIsOpen(false);
	};

	const getCategories = async () => {
		const categoriesData = await myAPI.get(`/category`);
		setCategories(categoriesData.data.categories);
	};

	useEffect(() => {
		getCategories();
	}, []);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			foodName: foodName,
			category: categoryID,
			ingredients: ingredients,
			price: price,
			image: image,
		},
	});

	const now = new Date();
	const formattedDate = format(now, "PPpp");

	async function onSubmit(values: z.infer<typeof formSchema>) {
		const foodData = {
			foodName: values.foodName,
			category: values.category,
			ingredients: values.ingredients,
			price: values.price,
			image: values.image,
		};

		console.log(foodData);

		const token = localStorage.getItem("token");
		await myAPI.put(`/food/${_id}`, foodData, {
			headers: {
				"Content-type": "application/json",
				Authorization: `${token}`,
			},
		});

		toast.success("Food has been successfully updated!", {
			description: `${values.foodName} has been updated at ${formattedDate}.`,
		});
		refreshFoods();
		if (setIsOpen) setIsOpen(false);
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="foodName"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Food Name</FormLabel>
							<FormControl>
								<div className="flex items-center space-x-2">
									<Input
										{...field}
										readOnly={!editableFields.foodName}
										className={
											editableFields.foodName
												? "border-blue-500"
												: "bg-gray-100"
										}
									/>
									<Button
										type="button"
										onClick={() => enableField("foodName")}
										variant="ghost"
										className="p-2 text-gray-600 hover:text-blue-600 bg-transparent">
										<Edit2Icon size={18} />
									</Button>
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="price"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Price</FormLabel>
							<FormControl>
								<div className="flex items-center space-x-2">
									<Input
										type="number"
										value={field.value}
										readOnly={!editableFields.price}
										onChange={(e) => field.onChange(parseFloat(e.target.value))}
										className={
											editableFields.price ? "border-blue-500" : "bg-gray-100"
										}
									/>
									<Button
										type="button"
										onClick={() => enableField("price")}
										variant="ghost"
										className="p-2 text-gray-600 hover:text-blue-600">
										<Edit2Icon size={18} />
									</Button>
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="category"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Dish Category</FormLabel>
							<FormControl>
								<div className="flex items-center space-x-2">
									<div className="flex-1">
										<Select
											disabled={!editableFields.category}
											onValueChange={field.onChange}
											defaultValue={field.value}>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="Select a category" />
											</SelectTrigger>
											<SelectContent>
												{categories.map(({ categoryName, _id }) => (
													<SelectItem key={_id} value={_id}>
														{categoryName}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</div>
									<Button
										type="button"
										onClick={() => enableField("category")}
										variant="ghost"
										className="p-2 text-gray-600 hover:text-blue-600">
										<Edit2Icon size={18} />
									</Button>
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="ingredients"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Ingredients</FormLabel>
							<FormControl>
								<div className="flex items-center space-x-2">
									<Input
										{...field}
										readOnly={!editableFields.ingredients}
										className={`h-20 ${
											editableFields.ingredients
												? "border-blue-500"
												: "bg-gray-100"
										}`}
									/>
									<Button
										type="button"
										onClick={() => enableField("ingredients")}
										variant="ghost"
										className="p-2 text-gray-600 hover:text-blue-600">
										<Edit2Icon size={18} />
									</Button>
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="image"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Image URL</FormLabel>
							<FormControl>
								<div className="flex items-center space-x-2">
									<Input
										type="url"
										{...field}
										readOnly={!editableFields.image}
										className={
											editableFields.image ? "border-blue-500" : "bg-gray-100"
										}
									/>
									<Button
										type="button"
										onClick={() => enableField("image")}
										variant="ghost"
										className="p-2 text-gray-600 hover:text-blue-600">
										<Edit2Icon size={18} />
									</Button>
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="flex justify-between">
					<DeleteFood
						foodName={foodName}
						id={_id}
						refreshFoods={refreshFoods}
					/>
					<div className="flex justify-between gap-1">
						<Button
							type="button"
							onClick={handleCancel}
							className="w-[40%] bg-gray-600">
							Cancel
						</Button>
						<Button type="submit" className=" bg-green-700">
							Save changes ✨
						</Button>
					</div>
				</div>
			</form>
		</Form>
	);
};
