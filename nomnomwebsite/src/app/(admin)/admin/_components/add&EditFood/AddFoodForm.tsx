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
import axios from "axios";
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

export const AddFoodForm = ({
	categoryID,
	refreshFoods,
	setIsOpen,
}: {
	categoryName: string;
	categoryID: string;
	refreshFoods: () => void;
	setIsOpen: (open: boolean) => void;
}) => {
	const [categories, setCategories] = useState<CategoryType[]>([]);

	const getCategories = async () => {
		const categoriesData = await axios.get(`${process.env.API_URL}/category`);
		setCategories(categoriesData.data.categories);
	};

	useEffect(() => {
		getCategories();
	}, []);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			foodName: "",
			category: categoryID,
			ingredients: "",
			price: 0,
			image: "",
		},
	});

	const handleCancel = () => {
		if (setIsOpen) setIsOpen(false);
	};

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

		await axios.post(`${process.env.API_URL}/food`, foodData, {
			headers: {
				"Content-type": "application/json",
				Authorization: `${token}`,
			},
		});
		toast.success("Food successfully created!", {
			description: `${values.foodName} has been added to the menu.`,
		});
		refreshFoods();
		setIsOpen(false);
	}
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<div className="flex gap-4 justify-between">
					<FormField
						control={form.control}
						name="foodName"
						render={({ field }) => (
							<FormItem className="w-[70%]">
								<FormLabel>Food Name</FormLabel>
								<FormControl>
									<Input placeholder="e.g. Spaghetti" {...field} />
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
								<FormControl className="w-full">
									<Input
										type="number"
										placeholder="e.g. 9.99"
										onChange={(e) => field.onChange(parseFloat(e.target.value))}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<FormField
					control={form.control}
					name="category"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Dish Category</FormLabel>
							<FormControl>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Select a category" />
									</SelectTrigger>
									<SelectContent>
										{categories.map(({ categoryName, _id }) => {
											return (
												<SelectItem key={_id} value={_id}>
													{categoryName}
												</SelectItem>
											);
										})}
									</SelectContent>
								</Select>
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
								<Input
									placeholder="e.g. Tomato, Basil, Olive Oil"
									{...field}
									className="h-20"
								/>
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
								<Input
									type="url"
									placeholder="https://your-image-host.com/image.jpg"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="flex justify-between">
					<Button
						type="button"
						onClick={handleCancel}
						className="w-[40%] bg-gray-600">
						Cancel
					</Button>
					<Button type="submit" className="w-[50%] bg-red-500">
						Add food
					</Button>
				</div>
			</form>
		</Form>
	);
};
