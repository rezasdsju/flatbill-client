import { requireRole } from "@/lib/core/server";
import React from "react";



const CaretakerDashboardLayout = async ({ children }: { children: React.ReactNode }) => {
    await requireRole('caretaker')
    return children
};

export default CaretakerDashboardLayout;