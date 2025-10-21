"use client";
import { ROUTES } from "@/core/constants/routes";
import { useAuthStore } from "@/modules/auth/store/auth.store";
import { BadgeInfo, LogOut, UserRoundCog } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { SidebarTrigger } from "./ui/sidebar";

export const Navbar = () => {
	const { push, replace } = useRouter();
	const { logout, user } = useAuthStore((s) => s);

	const handleLogout = async () => {
		await logout();
		replace(ROUTES.auth.login);
	};

	return (
		<header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
			<div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
				<SidebarTrigger className="-ml-1" />
				<h1 className="text-base font-medium">
					{user?.first_name} {user?.last_name}
				</h1>

				<div className="ml-auto flex items-center gap-2">
					<Button
						variant="outline"
						onClick={() => push("/help")}>
						<BadgeInfo className="h-4 w-4 mr-2" />
						<span className="md:hidden lg:block xs:sm:text-[10px] sm:text-[10px] md:text-[12px] lg:text-xs xl:text-base">
							Тусламж
						</span>
					</Button>
					<Button
						variant="outline"
						onClick={() => push("/profile")}>
						<UserRoundCog className="h-4 w-4 mr-2" />
						<span className="md:hidden lg:block xs:sm:text-[10px] sm:text-[10px] md:text-[12px] lg:text-xs xl:text-base">
							Профайл
						</span>
					</Button>
					<Button
						variant="outline"
						onClick={handleLogout}>
						<LogOut className="h-4 w-4 mr-2" />
						<span className="md:hidden lg:block xs:sm:text-[10px] sm:text-[10px] md:text-[12px] lg:text-xs xl:text-base">
							Гарах
						</span>
					</Button>
				</div>
			</div>
		</header>
	);
};
