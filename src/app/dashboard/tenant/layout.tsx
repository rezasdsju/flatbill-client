import { requireRole } from "@/lib/core/server";
import React from "react";



const TenantDashboardLayout = async ({ children }: { children: React.ReactNode }) => {
    await requireRole('tenant')
    return children
};

export default TenantDashboardLayout;