"use client";

import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AddCategoryDialogContent } from "./DialogContent";
import { useState } from "react";

export const AddCategory = ({
  refreshCategories,
}: {
  refreshCategories: () => void;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="p-4 h-9 items-center flex gap-2 rounded-full border-1 border-white/40 bg-transparent hover:border-white">
        <Plus color="white" />
        <p className="text-white text-[12px] font-medium">Add Category</p>
      </DialogTrigger>
      <DialogContent className="w-[460px] h-[227px] bg-white text-black ">
        <DialogHeader>
          <DialogTitle>Add new category</DialogTitle>
        </DialogHeader>
        <AddCategoryDialogContent
          refreshCategories={refreshCategories}
          setIsOpen={setIsOpen}
        />
      </DialogContent>
    </Dialog>
  );
};
