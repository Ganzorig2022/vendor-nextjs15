"use client";
// import Loading from '@/components/ui/loading'
import { AppSidebar } from "@/components/app-sidebar";
import { MainContent } from "@/components/main-content";
import { Navbar } from "@/components/navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useIsFetching } from "@tanstack/react-query";

const HomePageLayout = ({ children }: { children: React.ReactNode }) => {
	const isFetching = useIsFetching()
	console.log("isFetching", isFetching)
	// if (isFetching) return <Loading />

	return (
		<>
			<SidebarProvider>
				<AppSidebar />
				<Navbar>
					{" "}
					<div className="flex">
						<main className="flex-1 h-full">
							<MainContent leftTitle="Дашбоард">
								{children}
							</MainContent>
						</main>
					</div>
				</Navbar>
			</SidebarProvider>
		</>
	);
};

export default HomePageLayout;
