import { AppSidebar } from "@/components/app-sidebar";
import { MainContent } from "@/components/main-content";
import { Navbar } from "@/components/navbar";
import { SidebarProvider } from "@/components/ui/sidebar";

const HomePageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <Navbar>
        <div className="flex w-full h-full overflow-hidden">
          <main className="flex-1 h-full overflow-auto">
            <MainContent leftTitle="">
              <div className="w-full overflow-x-auto">{children}</div>
            </MainContent>
          </main>
        </div>
      </Navbar>
    </SidebarProvider>
  );
};


export default HomePageLayout;
