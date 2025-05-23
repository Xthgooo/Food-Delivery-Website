import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAuth, User } from "../contextProvider/AuthContext";
import { ShowUserDetails } from "./UserDetailsTemplate";
import { useRouter } from "next/navigation";

export const UserProfile = ({ user }: User) => {
  const { signOut } = useAuth();
  const router = useRouter();

  return (
    <Popover>
      <PopoverTrigger className="w-9 h-9 bg-white flex justify-center items-center rounded-full">
        {user?.profileEmoji}
      </PopoverTrigger>
      <PopoverContent className=" p-4 rounded-xl shadow-lg z-1000 text-xs text-gray-800 font-medium space-y-3 ">
        <p className="text-center text-[#EF4444] font-semibold text-sm">
          🎀 Account Info 🎀
        </p>
        <ShowUserDetails
          id={user?._id}
          title="Phone"
          value={user ? user.phoneNumber : "Not provided"}
        />
        <ShowUserDetails id={user?._id} title="Address" value={user?.address} />
        <Button
          onClick={() => {
            signOut();
            router.push("/");
          }}
          className="w-full mt-2 bg-white border-1 border-[#EF4444] hover:bg-[#EF4444] text-[#EF4444] hover:text-white text-xs py-1 rounded-md transition-all duration-150"
        >
          🚪 Sign Out
        </Button>
      </PopoverContent>
    </Popover>
  );
};
