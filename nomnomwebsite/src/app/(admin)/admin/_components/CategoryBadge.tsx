import { useState, useEffect } from "react";
import axios from "axios";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export type CategoryWithNumber = {
  categoryName: string;
  numberOfFoods: number;
  onClick: () => void;
};

export const CategoryBadge = ({
  categoryName,
  numberOfFoods,
  onClick,
}: CategoryWithNumber) => {
  return (
    <Button
      className="text-[12px] p-4 h-9 items-center flex gap-2 rounded-full border-1 border-white/40"
      onClick={onClick}
    >
      <p>{categoryName}</p>
      <p className="h-5 flex px-[10px] items-center bg-white/15 rounded-full">
        {numberOfFoods}
      </p>
    </Button>
  );
};
