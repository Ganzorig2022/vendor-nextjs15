import { AppSidebar } from "@/components/app-sidebar";
import { Navbar } from "@/components/navbar";
import { SidebarProvider } from "@/components/ui/sidebar";

const HomePageLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<SidebarProvider>
			<AppSidebar />
			<Navbar>
				<div className="flex w-full h-full overflow-hidden">
					<main className="flex-1 h-full overflow-auto">
						<div className="w-full overflow-x-auto">{children}</div>
					</main>
				</div>
			</Navbar>
		</SidebarProvider>
	);
};

export default HomePageLayout;
