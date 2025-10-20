import "@/styles/globals.css";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { Toaster } from "sonner";
import { Providers } from "./providers";
import { twMerge } from "tailwind-merge";

export const metadata: Metadata = {
	title: "QPay Vendor Web",
	description: "Created by Qpay Mongolia",
};

const nunito = Nunito({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
	variable: "--font-nunito",
});

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html
			lang="en"
			suppressHydrationWarning>
			<body className={twMerge("bg-background", nunito.variable)}>
				<Providers>{children}</Providers>
				<Toaster
					position="top-center"
					richColors
					closeButton
				/>
			</body>
		</html>
	);
}
