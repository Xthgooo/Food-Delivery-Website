import { Button } from "@/components/ui/button";
import { NomNomLogo } from "./Logo";
import Link from "next/link";
import { ShowCart } from "./foodOrder/ShowCart";
import { useAuth } from "./contextProvider/AuthContext";
import { UserProfile } from "./user/UserProfile";
import { useEffect, useState } from "react";
import { CartType } from "./foodOrder/ShowFoodDetails";

export const Header = () => {
  const { user } = useAuth();
  const [cartCount, setCartCount] = useState<number>(0);
  const updateCartCount = () => {
    const cart: CartType = JSON.parse(localStorage.getItem("cart") || "[]");
    const count = cart.reduce((acc, item) => acc + item.quantity, 0);
    setCartCount(count);
  };

  useEffect(() => {
    updateCartCount();

    window.addEventListener("cartUpdated", updateCartCount);
    return () => {
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, [user]);

  return (
    <div className="w-full flex justify-center">
      <div className="max-w-[1440px] w-full fixed top-0  h-17 flex px-22 bg-black/70 justify-between items-center z-1000">
        <Link href="/">
          <NomNomLogo flexRow={true} textColor="white" />
        </Link>

        <div className="flex gap-3">
          {user ? (
            <UserProfile user={user} />
          ) : (
            <>
              <Link href="/createnewaccount">
                <Button className="bg-white text-black rounded-full hover:text-white">
                  Sign Up
                </Button>
              </Link>
              <Link href="/login">
                <Button className="bg-[#EF4444] text-white rounded-full">
                  Log in
                </Button>
              </Link>
            </>
          )}
          <ShowCart cartCount={cartCount} />
        </div>
      </div>
    </div>
  );
};
