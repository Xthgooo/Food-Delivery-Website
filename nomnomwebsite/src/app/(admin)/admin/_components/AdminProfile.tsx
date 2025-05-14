import { useAuth } from "@/app/components/contextProvider/AuthContext";
import { Button } from "@/components/ui/button";
import { User2Icon } from "lucide-react";

export const AdminProfile = () => {
  const { signOut } = useAuth();

  return (
    <div className="flex flex-col gap-4 items-center">
      <div className="w-full h-9 flex items-center gap-3">
        <div className="lg:w-9 lg:h-9 w-7 h-7 rounded-[50%] overflow-hidden bg-pink-300 flex justify-center items-center border-white border-2">
          <User2Icon color="white" />
        </div>
        <p className="lg:text-m text-[15px] text-white italic">
          Welcome Ariunzul!
        </p>
      </div>
      <Button
        className="bg-red-800 text-white w-fit text-xs h-fit p-2"
        onClick={signOut}
      >
        Sign Out
      </Button>
    </div>
  );
};
