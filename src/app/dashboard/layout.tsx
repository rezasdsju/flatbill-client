import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import DashboardSideBar from "../components/dashboard/DashboardSideBar"


export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <DashboardSideBar />
            <main className="flex-1 min-w-0">
                <SidebarTrigger />
                {children}
            </main>
        </SidebarProvider>
    )
}