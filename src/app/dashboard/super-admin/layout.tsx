import { requireRole } from "@/lib/core/server";
import React from "react";



const SuperAdminDashboardLayout = async ({ children }: { children: React.ReactNode }) => {
    await requireRole('super-admin')
    return children
};

export default SuperAdminDashboardLayout;