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
const sideBarItems = {
    "super-admin": [
        { name: "Dashboard", url: "/dashboard/super-admin", icon: LayoutDashboard },
        { name: "Apartments & Buildings", url: "/dashboard/super-admin/buildings", icon: Building2 },
        { name: "Subscriptions & Plans", url: "/dashboard/super-admin/subscriptions", icon: CreditCard },
        { name: "All Users", url: "/dashboard/super-admin/users", icon: Users },
        { name: "System Reports", url: "/dashboard/super-admin/reports", icon: FileBarChart2 },
        { name: "Platform Settings", url: "/dashboard/super-admin/settings", icon: Settings },
    ],

    "association-admin": [
        { name: "Dashboard", url: "/dashboard/admin", icon: LayoutDashboard },
        { name: "Flats & Units", url: "/dashboard/admin/flats", icon: Building2 },
        { name: "Owners & Tenants", url: "/dashboard/admin/members", icon: Users },
        { name: "Generate Bills", url: "/dashboard/admin/generate-bills", icon: Receipt },
        { name: "Rent & Bill Collection", url: "/dashboard/admin/collections", icon: CreditCard },
        { name: "Expenses & Approvals", url: "/dashboard/admin/expenses", icon: Wallet },
        { name: "Notices & Voting", url: "/dashboard/admin/notices", icon: Megaphone },
        { name: "Complaints", url: "/dashboard/admin/complaints", icon: MessageSquareWarning },
        { name: "Financial Reports", url: "/dashboard/admin/reports", icon: FileBarChart2 },
        { name: "Staff & Caretakers", url: "/dashboard/admin/staff", icon: ShieldCheck },
        { name: "Building Settings", url: "/dashboard/admin/settings", icon: Settings },
    ],

    "caretaker": [
        { name: "Dashboard", url: "/dashboard/caretaker", icon: LayoutDashboard },
        { name: "Cash Collection", url: "/dashboard/caretaker/cash-collection", icon: CreditCard },
        { name: "Meter Readings", url: "/dashboard/caretaker/meter-readings", icon: Gauge },
        { name: "Daily Expenses", url: "/dashboard/caretaker/expenses", icon: Wallet },
        { name: "Maintenance & Issues", url: "/dashboard/caretaker/complaints", icon: Wrench },
        { name: "Visitor & Parking Log", url: "/dashboard/caretaker/visitors", icon: ClipboardList },
        { name: "Notices", url: "/dashboard/caretaker/notices", icon: Megaphone },
    ],

    "flat-owner": [
        { name: "Dashboard", url: "/dashboard/owner", icon: LayoutDashboard },
        { name: "My Flats", url: "/dashboard/owner/my-flats", icon: Home },
        { name: "My Tenants", url: "/dashboard/owner/tenants", icon: UserCheck },
        { name: "Owner Bills & Dues", url: "/dashboard/owner/bills", icon: Receipt },
        { name: "Association Accounts", url: "/dashboard/owner/association-finance", icon: FileBarChart2 },
        { name: "Notices & Meetings", url: "/dashboard/owner/notices", icon: Megaphone },
        { name: "Complaints", url: "/dashboard/owner/complaints", icon: MessageSquareWarning },
        { name: "Profile & Settings", url: "/dashboard/owner/settings", icon: Settings },
    ],

    "tenant": [
        { name: "Dashboard", url: "/dashboard/tenant", icon: LayoutDashboard },
        { name: "My Bills & Pay", url: "/dashboard/tenant/bills", icon: CreditCard },
        { name: "Payment Receipts", url: "/dashboard/tenant/receipts", icon: Receipt },
        { name: "Raise Complaint", url: "/dashboard/tenant/complaints", icon: MessageSquareWarning },
        { name: "Notice Board", url: "/dashboard/tenant/notices", icon: Megaphone },
        { name: "Emergency Contacts", url: "/dashboard/tenant/contacts", icon: ShieldCheck },
        { name: "My Profile", url: "/dashboard/tenant/profile", icon: Settings },
    ],
}
export default function DashboardSideBar() {

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
                                <span>{item.name}</span>
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