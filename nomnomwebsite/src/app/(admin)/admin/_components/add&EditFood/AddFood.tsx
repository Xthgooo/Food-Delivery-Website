"use client";
import { AddFoodButton } from "./AddFoodButton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AddFoodForm } from "./AddFoodForm";
import { Plus } from "lucide-react";
import { useState } from "react";

export const AddFood = ({
  categoryName,
  refreshFoods,
  categoryID,
}: {
  categoryName: string;
  categoryID: string;
  refreshFoods: () => void;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="bg-white w-8 h-[30px] flex justify-center items-center rounded-md hover:bg-white/30 ">
        <Plus color="red" size={16} />
      </DialogTrigger>
      <DialogContent className="w-[460px]  bg-white text-black">
        <DialogHeader>
          <DialogTitle>Add new food to {categoryName}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <AddFoodForm
          categoryName={categoryName}
          categoryID={categoryID}
          refreshFoods={refreshFoods}
          setIsOpen={setIsOpen}
        />
      </DialogContent>
    </Dialog>
  );
};
