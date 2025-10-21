"use client";
import { ROUTES } from "@/core/constants/routes";
import { useAuthStore } from "@/modules/auth/store/auth.store";
import { BadgeInfo, LogOut, UserRoundCog } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "./ui/button";
import { SidebarInset, SidebarTrigger } from "./ui/sidebar";

export const Navbar = ({ children }: { children: React.ReactNode }) => {
	const { push, replace } = useRouter();
	const logout = useAuthStore((s) => s.logout);

	const handleLogout = async () => {
		await logout();
		replace(ROUTES.auth.login);
	};

	return (
		<SidebarInset>
			<header className="flex h-16 shrink-0 items-center gap-2 border-b w-full">
				<div className="flex items-center gap-2 px-3 justify-between w-full">
					<SidebarTrigger />
					<div className="flex gap-2 items-center">
						<Button
							variant="outline"
							onClick={() => push("/help")}>
							<BadgeInfo className="h-4 w-4 mr-2" />
							<span className="md:hidden lg:block xs:sm:text-[10px] sm:text-[10px] md:text-[12px] lg:text-sm xl:text-base">
								Тусламж
							</span>
						</Button>
						<Button
							variant="outline"
							onClick={() => push("/profile")}>
							<UserRoundCog className="h-4 w-4 mr-2" />
							<span className="md:hidden lg:block xs:sm:text-[10px] sm:text-[10px] md:text-[12px] lg:text-sm xl:text-base">
								Профайл
							</span>
						</Button>
						<Button
							variant="outline"
							onClick={handleLogout}>
							<LogOut className="h-4 w-4 mr-2" />
							<span className="md:hidden lg:block xs:sm:text-[10px] sm:text-[10px] md:text-[12px] lg:text-sm xl:text-base">
								Гарах
							</span>
						</Button>
					</div>
				</div>
			</header>
			<div className="flex flex-1 flex-col gap-4 p-4">
				<div className="min-h-screen flex-1 rounded-xl bg-muted/50 md:min-h-min">
					{children}
				</div>
			</div>
		</SidebarInset>
	);
};