import "./globals.css";
import { StepProvider } from "./(auth)/createnewaccount/_components/StepProvider";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "./components/contextProvider/AuthContext";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className="w-screen flex flex-col bg-black">
				<AuthProvider>
					<StepProvider>{children}</StepProvider>
				</AuthProvider>
				<Toaster className="bg-red-400 text-white" />
			</body>
		</html>
	);
}
