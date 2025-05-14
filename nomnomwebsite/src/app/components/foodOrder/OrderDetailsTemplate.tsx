"use client";

import { FoodOrderInfo } from "@/app/(admin)/admin/_components/contextProvider/AdminContextProvider";
import { Clock, MapPinHouseIcon, SoupIcon } from "lucide-react";
import { Line } from "../assets/Line";
import clsx from "clsx";

type OrderType = {
  order: FoodOrderInfo;
};

function formatPrettyDate(isoDate: string): string {
  const date = new Date(isoDate);
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export const OrderDetailsTemplate = ({ order }: OrderType) => {
  return (
    <div className="w-full px-3 flex flex-col gap-3">
      <div className="w-full flex flex-col text-white gap-3">
        <div className="w-full flex justify-between items-center h-7">
          <div className="flex gap-2">
            <p>Total price:</p>
            <p className="text-[16px] font-bold">${order.totalPrice}</p>
          </div>
          <div
            className={clsx(
              "h-7 px-[20px] text-[12px] flex justify-center items-center rounded-full border",
              {
                "border-red-500 text-red-500": order.status === "Pending",
                "border-green-500 text-green-500": order.status === "Delivered",
                "border-gray-400 text-gray-400":
                  order.status !== "Pending" && order.status !== "Delivered",
              }
            )}
          >
            {order.status}
          </div>
        </div>
        <div className="w-full flex flex-col gap-[10px] text-xs ">
          {order.foodOrderItems.map((food, index) => (
            <div key={index} className="w-full flex justify-between h-5">
              <div className="flex gap-2 text-white items-center">
                <SoupIcon size={16} />
                <p>{food.food.foodName}</p>
              </div>
              <p>x {food.quantity}</p>
            </div>
          ))}
        </div>
        <div className="w-full flex gap-[10px] h-5 items-center text-xs">
          <Clock size={16} />
          <p>{formatPrettyDate(order.createdAt)}</p>
        </div>
        <div className="w-full flex gap-[10px] h-5 text-xs">
          <MapPinHouseIcon size={16} />
          <p>{order.address}</p>
        </div>
      </div>
      <hr className="border-t border-white/50" />
    </div>
  );
};
