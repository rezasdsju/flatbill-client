import { requireRole } from "@/lib/core/server";
import React from "react";



const FlatOwnerDashboardLayout = async ({ children }: { children: React.ReactNode }) => {
    await requireRole('flat-owner')
    return children
};

export default FlatOwnerDashboardLayout;