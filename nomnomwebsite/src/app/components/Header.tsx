import { Button } from "@/components/ui/button";
import { NomNomLogo } from "./Logo";
import Link from "next/link";
import { ShowCart } from "./foodOrder/ShowCart";
import { useAuth } from "./contextProvider/AuthContext";
import { UserProfile } from "./user/UserProfile";

export const Header = () => {
	const { user } = useAuth();

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
					<ShowCart />
				</div>
			</div>
		</div>
	);
};
