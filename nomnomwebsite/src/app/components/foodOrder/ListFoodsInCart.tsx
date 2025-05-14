import { useState, useEffect } from "react";
import { FoodCardInCart } from "./FoodCardInCart";

import { PaymentInfo } from "./PaymentInfo";
import { Loader } from "lucide-react";
import { OneOrder } from "@/app/(admin)/admin/_components/contextProvider/AdminContextProvider";

export const ListFoodsInCart = () => {
  const [cartItems, setCartItems] = useState<OneOrder[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const resetCart = () => {
    setCartItems([]);
  };

  const initCart = async () => {
    setLoading(true);

    const cart = localStorage.getItem("cart");

    if (!cart) {
      setLoading(false);
      return;
    }

    const parsedCart = JSON.parse(cart);
    setCartItems(parsedCart);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
  };

  useEffect(() => {
    initCart();
  }, []);

  const handleQuantityChange = (foodID: string, newQuantity: number) => {
    const updatedCart = cartItems.map(({ food, quantity }) =>
      food._id === foodID ? { food, quantity: newQuantity } : { food, quantity }
    );

    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const handleRemoveFromCart = (foodID: string) => {
    const updatedCart = cartItems.filter(({ food }) => food._id !== foodID);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full h-[600px] p-4 flex flex-col gap-5">
        <p className="font-semibold text-[15px] text-white">My Cart</p>

        <div className="w-full flex flex-col text-white overflow-y-scroll">
          {loading && (
            <div className="flex justify-center items-center py-20">
              <Loader className="animate-spin" />
            </div>
          )}
          {!loading &&
            (cartItems.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              cartItems.map(({ food, quantity }, index) => (
                <div key={index} className="w-full flex flex-col">
                  <FoodCardInCart
                    foodID={food._id}
                    quantity={quantity}
                    handleRemoveFromCart={handleRemoveFromCart}
                    handleQuantityChange={handleQuantityChange}
                  />
                  <div className="w-full flex h-5 items-center">
                    <hr className="w-full border-t border-white/50 " />
                  </div>
                </div>
              ))
            ))}
        </div>
      </div>
      <div className="absolute top-[632px] left-0 w-full h-24 bg-gradient-to-b from-transparent to-black z-20 pointer-events-none" />
      <div className="w-full">
        <PaymentInfo cartItems={cartItems} refreshCart={resetCart} />
      </div>
    </div>
  );
};
