"use client";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";
import { myAPI } from "@/axios";

export const DeleteFood = ({
	foodName,
	id,
	refreshFoods,
}: {
	foodName: string;
	id: string;
	refreshFoods: () => void;
}) => {
	const [deletingConfirmation, setDeletingConfirmation] = useState(false);
	const [dialogOpen, setDialogOpen] = useState(false);

	const handleInitialDeleteClick = () => {
		setDeletingConfirmation(true);
	};

	const handleFoodDelete = async () => {
		try {
			await myAPI.delete(`/food/${id}`);

			toast.success("Food has been deleted", {
				description: `${foodName} has been deleted on ${new Date().toLocaleString()}`,
			});
			refreshFoods();
			setDialogOpen(false);
		} catch (error) {
			console.error("Error deleting food", error);
			toast.error("Failed to delete food", {
				description: "An error occurred.",
			});
		}
	};

	return (
		<Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
			<DialogTrigger className="bg-red-700 w-20  flex justify-center items-center rounded-md hover:bg-black/30">
				<Trash2Icon color="white" size={20} />
			</DialogTrigger>

			<DialogContent>
				{!deletingConfirmation ? (
					<DialogHeader className="flex flex-col gap-10">
						<DialogTitle className="w-full flex justify-center">
							Do you want to delete the food `&quot;`{foodName} `&quot;`?
						</DialogTitle>
						<div className="flex gap-4 justify-center">
							<Button
								className="w-[40%] bg-red-700"
								onClick={handleInitialDeleteClick}>
								Delete
							</Button>
							<Button
								className="w-[40%] bg-green-900"
								onClick={() => setDialogOpen(false)}>
								Keep
							</Button>
						</div>
					</DialogHeader>
				) : (
					<DialogHeader className="flex flex-col gap-10">
						<DialogTitle className="w-full flex justify-center text-center">
							Are you sure you want to delete the food:{foodName}
						</DialogTitle>
						<div className="flex gap-4 justify-center">
							<Button className="w-[40%] bg-red-700" onClick={handleFoodDelete}>
								Confirm
							</Button>
							<Button
								className="w-[40%] bg-green-900"
								onClick={() => setDialogOpen(false)}>
								Cancel
							</Button>
						</div>
					</DialogHeader>
				)}
			</DialogContent>
		</Dialog>
	);
};
