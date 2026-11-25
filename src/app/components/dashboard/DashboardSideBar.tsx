'use client'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"

import {
    LayoutDashboard,
    Building2,
    Users,
    Receipt,
    CreditCard,
    Wallet,
    Wrench,
    Megaphone,
    MessageSquareWarning,
    FileBarChart2,
    Gauge,
    UserCheck,
    ShieldCheck,
    Settings,
    ClipboardList,
    Home,
    User2,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTranslations } from "next-intl";
const sideBarItems = {
    "super-admin": [
        { name: "dashboard", url: "/dashboard/super-admin", icon: LayoutDashboard },
        { name: "apartmentsBuildings", url: "/dashboard/super-admin/buildings", icon: Building2 },
        { name: "subscriptionsPlans", url: "/dashboard/super-admin/subscriptions", icon: CreditCard },
        { name: "allUsers", url: "/dashboard/super-admin/users", icon: Users },
        { name: "systemReports", url: "/dashboard/super-admin/reports", icon: FileBarChart2 },
        { name: "platformSettings", url: "/dashboard/super-admin/settings", icon: Settings },
    ],

    "association-admin": [
        { name: "dashboard", url: "/dashboard/admin", icon: LayoutDashboard },
        { name: "flatsUnits", url: "/dashboard/admin/flats", icon: Building2 },
        { name: "ownersTenants", url: "/dashboard/admin/members", icon: Users },
        { name: "generateBills", url: "/dashboard/admin/generate-bills", icon: Receipt },
        { name: "rentBillCollection", url: "/dashboard/admin/collections", icon: CreditCard },
        { name: "expensesApprovals", url: "/dashboard/admin/expenses", icon: Wallet },
        { name: "noticesVoting", url: "/dashboard/admin/notices", icon: Megaphone },
        { name: "complaints", url: "/dashboard/admin/complaints", icon: MessageSquareWarning },
        { name: "financialReports", url: "/dashboard/admin/reports", icon: FileBarChart2 },
        { name: "staffCaretakers", url: "/dashboard/admin/staff", icon: ShieldCheck },
        { name: "buildingSettings", url: "/dashboard/admin/settings", icon: Settings },
    ],

    caretaker: [
        { name: "dashboard", url: "/dashboard/caretaker", icon: LayoutDashboard },
        { name: "cashCollection", url: "/dashboard/caretaker/cash-collection", icon: CreditCard },
        { name: "meterReadings", url: "/dashboard/caretaker/meter-readings", icon: Gauge },
        { name: "dailyExpenses", url: "/dashboard/caretaker/expenses", icon: Wallet },
        { name: "maintenanceIssues", url: "/dashboard/caretaker/complaints", icon: Wrench },
        { name: "visitorParkingLog", url: "/dashboard/caretaker/visitors", icon: ClipboardList },
        { name: "notices", url: "/dashboard/caretaker/notices", icon: Megaphone },
    ],

    "flat-owner": [
        { name: "dashboard", url: "/dashboard/owner", icon: LayoutDashboard },
        { name: "myFlats", url: "/dashboard/owner/my-flats", icon: Home },
        { name: "myTenants", url: "/dashboard/owner/tenants", icon: UserCheck },
        { name: "ownerBillsDues", url: "/dashboard/owner/bills", icon: Receipt },
        { name: "associationAccounts", url: "/dashboard/owner/association-finance", icon: FileBarChart2 },
        { name: "noticesMeetings", url: "/dashboard/owner/notices", icon: Megaphone },
        { name: "complaints", url: "/dashboard/owner/complaints", icon: MessageSquareWarning },
        { name: "profileSettings", url: "/dashboard/owner/settings", icon: Settings },
    ],

    tenant: [
        { name: "dashboard", url: "/dashboard/tenant", icon: LayoutDashboard },
        { name: "myBillsPay", url: "/dashboard/tenant/bills", icon: CreditCard },
        { name: "paymentReceipts", url: "/dashboard/tenant/receipts", icon: Receipt },
        { name: "raiseComplaint", url: "/dashboard/tenant/complaints", icon: MessageSquareWarning },
        { name: "noticeBoard", url: "/dashboard/tenant/notices", icon: Megaphone },
        { name: "emergencyContacts", url: "/dashboard/tenant/contacts", icon: ShieldCheck },
        { name: "myProfile", url: "/dashboard/tenant/profile", icon: Settings },
    ],
}
export default function DashboardSideBar() {
    const t = useTranslations("dashboardSidebar")
    const { data: session, isPending } = authClient.useSession()
    const user = session?.user
    // const role = session?.user?.role || 'tenant'
    return (
        <Sidebar collapsible="icon">
            <SidebarHeader />
            <SidebarContent>
                <SidebarGroup />
                <SidebarMenu>
                    {sideBarItems['flat-owner'].map((item) => (
                        <SidebarMenuItem key={item.name}>
                            <SidebarMenuButton render={<Link href={item.url} />}>
                                <item.icon />
                                <span>{t(item.name)}</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>

                <SidebarGroup />
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton>
                            <Avatar>
                                <AvatarImage
                                    src={user?.image ?? undefined}
                                    alt={user?.name ?? "Profile"}
                                />
                                <AvatarFallback>
                                    {user?.name?.trim().charAt(0).toUpperCase() || <User2 />}
                                </AvatarFallback>
                            </Avatar>
                            <div className="min-w-0 flex-1 text-left">
                                <p className="truncate text-sm font-medium">{user?.name}</p>
                                <p className="truncate text-xs text-muted-foreground">{user?.email}</p>
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}