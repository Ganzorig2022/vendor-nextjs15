"use client";

import { Toaster } from "@/components/ui/sonner";
import { ThemeToggler } from "@/components/ui/theme-toggler";
import { QueryProvider } from "@/core/providers/QueryProvider";
import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
	return (
		<QueryProvider>
			<ThemeProvider
				attribute="class"
				defaultTheme="light"
				enableSystem>
				{children}
				<Toaster
					position="top-center"
					richColors
					closeButton
				/>
				<ThemeToggler />
			</ThemeProvider>
		</QueryProvider>
	);
}
