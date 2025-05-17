"use client";

import { AdminContextProvider } from "./_components/contextProvider/AdminContextProvider";
import { AdminButtonsSidebar } from "./_components/AdminButtonSideBar";
import { useAuth } from "@/app/components/contextProvider/AuthContext";

export default function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const { user } = useAuth();

	return user?.role === "Admin" ? (
		<AdminContextProvider>
			<div className="w-vw flex justify-center">
				<div className="w-[1440px] h-vh bg-black flex flex-row ">
					<AdminButtonsSidebar />
					<div className="lg:ml-[240px] ml-[180px] w-full h-vh flex flex-col gap-6  py-6">
						{children}
					</div>
				</div>
			</div>
		</AdminContextProvider>
	) : (
		<div className="text-white text-9xl">`&quot;`Unauthorized`&quot;`</div>
	);
}
