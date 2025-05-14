"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "sonner";
import { FoodsType } from "@/app/(customer)/page";
import { boolean } from "zod";
import { useState } from "react";

export const DeleteCategory = ({
  categoryName,
  id,
  refreshCategories,
  foods,
}: {
  categoryName: string;
  id: string;
  refreshCategories: () => void;
  foods: FoodsType[];
}) => {
  const [deletingConfirmation, setDeletingConfirmation] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleInitialDeleteClick = () => {
    if (foods.length >= 1) {
      setDeletingConfirmation(true);
    } else {
      handleDeleteCategory();
    }
  };
  const token = localStorage.getItem("token");

  const handleDeleteCategory = async () => {
    try {
      await axios.delete(`http://localhost:3001/category/${id}`, {
        headers: {
          "Content-type": "application/json",
          Authorization: `${token}`,
        },
      });

      toast.success("Category has been deleted", {
        description: `${categoryName} has been deleted on ${new Date().toLocaleString()}`,
      });
      refreshCategories();
      setDialogOpen(false);
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error("Failed to delete category", {
        description: "An error occurred.",
      });
    }
  };

  const handleDeleteFoodsAndCategory = async () => {
    try {
      await Promise.all(
        foods.map(async ({ _id }) => {
          await axios.delete(`http://localhost:3001/food/${_id}`, {
            headers: {
              "Content-type": "application/json",
              Authorization: `${token}`,
            },
          });
        })
      );

      await axios.delete(`http://localhost:3001/category/${id}`, {
        headers: {
          "Content-type": "application/json",
          Authorization: `${token}`,
        },
      });

      toast.success("Category and all foods have been deleted.");
      refreshCategories();
      setDialogOpen(false);
    } catch (error) {
      toast.error("Failed to delete foods/category.");
      console.error("Error deleting foods/category:", error);
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger className="bg-black w-8 h-[30px] flex justify-center items-center rounded-md hover:bg-black/30">
        <Trash2Icon color="white" size={16} />
      </DialogTrigger>

      <DialogContent>
        {!deletingConfirmation ? (
          <DialogHeader className="flex flex-col gap-10">
            <DialogTitle className="w-full flex justify-center">
              Do you want to delete the category "{categoryName}"?
            </DialogTitle>
            <div className="flex gap-4 justify-center">
              <Button
                className="w-[40%] bg-red-700"
                onClick={handleInitialDeleteClick}
              >
                Delete
              </Button>
              <Button
                className="w-[40%] bg-green-900"
                onClick={() => setDialogOpen(false)}
              >
                Keep
              </Button>
            </div>
          </DialogHeader>
        ) : (
          <DialogHeader className="flex flex-col gap-10">
            <DialogTitle className="w-full flex justify-center text-center">
              Are you sure you want to delete **all foods** in "{categoryName}"
              and the category itself?
            </DialogTitle>
            <div className="flex gap-4 justify-center">
              <Button
                className="w-[40%] bg-red-700"
                onClick={handleDeleteFoodsAndCategory}
              >
                Confirm
              </Button>
              <Button
                className="w-[40%] bg-green-900"
                onClick={() => setDialogOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </DialogHeader>
        )}
      </DialogContent>
    </Dialog>
  );
};
