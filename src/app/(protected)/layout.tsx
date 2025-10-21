import { AppSidebar } from "@/components/app-sidebar";
import { MainContent } from "@/components/main-content";
import { Navbar } from "@/components/navbar";
import { SidebarProvider } from "@/components/ui/sidebar";

const HomePageLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<SidebarProvider>
				<AppSidebar />
				<Navbar>
					<div className="flex">
						<main className="flex-1 h-full">
							<MainContent leftTitle="">{children}</MainContent>
						</main>
					</div>
				</Navbar>
			</SidebarProvider>
		</>
	);
};

export default HomePageLayout;
