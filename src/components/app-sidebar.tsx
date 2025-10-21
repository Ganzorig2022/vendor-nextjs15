import Link from "next/link";

import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { MENU_ITEMS } from "@/core/constants/values";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar collapsible="offcanvas" {...props}>
			<SidebarContent>
				<SidebarGroup>
					<Image
						src={"/logo.svg"}
						width={150}
						height={100}
						quality={100}
						alt="Qpay logo"
						priority
						className="mx-auto my-3"
					/>
					<SidebarGroupContent>
						<SidebarMenu>
							{MENU_ITEMS.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<Link
											href={item.url}
											className="font-medium text-base!">
											{item.title}
										</Link>
									</SidebarMenuButton>
									{item.items?.length ? (
										<SidebarMenuSub>
											{item.items.map((item) => (
												<SidebarMenuSubItem
													key={item.title}>
													<SidebarMenuSubButton
														asChild
														isActive={
															item.isActive
														}>
														<a
															href={item.url}
															className="text-base!">
															{item.title}
														</a>
													</SidebarMenuSubButton>
												</SidebarMenuSubItem>
											))}
										</SidebarMenuSub>
									) : null}
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	);
}
