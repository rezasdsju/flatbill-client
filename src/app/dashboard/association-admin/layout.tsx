import { requireRole } from "@/lib/core/server";
import React from "react";



const AssociationAdminDashboardLayout = async ({ children }: { children: React.ReactNode }) => {
    await requireRole('association-admin')
    return children
};

export default AssociationAdminDashboardLayout;