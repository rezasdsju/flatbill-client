'use client'
import { LoaderCircle, LogOutIcon } from "lucide-react";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogMedia,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { PresentTenantRecord } from "@/types/flatTypes";
import { useState } from "react";
import { toast } from "sonner";
import { moveOutTenant } from "@/lib/actions/tenants";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

const getTenantInitial = (tenant: PresentTenantRecord) =>
    (tenant.name?.trim().charAt(0) || tenant.email.trim().charAt(0) || "?").toUpperCase();

const MoveOutTenant = ({ tenants, flatId }: { tenants: PresentTenantRecord[], flatId: string }) => {
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const [isMovingOut, setIsMovingOut] = useState(false)
    const t = useTranslations('myTenants')
    const handleMoveOut = async (tenantId: string) => {
        if (!flatId) {
            toast.error(t("moveOut.flatMissing"))
            return
        }
        if (!tenantId) {
            toast.error(t("moveOut.tenantMissing"))
            return
        }

        setIsMovingOut(true)
        try {
            const result = await moveOutTenant(flatId, tenantId)
            if (!result?.success) {
                toast.error(
                    t("moveOut.failure"),
                    result?.message ? { description: result.message } : undefined
                )
                return
            }

            toast.success(t("moveOut.success"))
            setOpen(false)
            router.refresh()
        } catch (error) {
            toast.error(
                t("moveOut.failure"),
                error instanceof Error ? { description: error.message } : undefined
            )
        } finally {
            setIsMovingOut(false)
        }
    }
    return (
        <AlertDialog
            open={open}
            onOpenChange={(nextOpen) => {
                if (!isMovingOut) {
                    setOpen(nextOpen);
                }
            }}
        >
            <AlertDialogTrigger
                render={
                    <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="shrink-0"
                        disabled={isMovingOut}
                    >
                        {t("moveOut.trigger")}
                    </Button>
                }
            />
            <AlertDialogContent size="sm">
                <AlertDialogHeader>
                    <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                        <LogOutIcon />
                    </AlertDialogMedia>
                    <AlertDialogTitle>{t("moveOut.title")}</AlertDialogTitle>
                    <AlertDialogDescription className="space-y-3 text-left">
                        <span className="block">
                            {t("moveOut.description")}
                        </span>
                        <div className="block space-y-2 rounded-lg border border-border bg-muted/50 p-2.5 text-xs">
                            {tenants.map((tenant) => (
                                <div key={tenant._id} className="flex items-center gap-3 rounded-md">
                                    <Avatar size="lg" className="border border-border">
                                        {tenant.image && (
                                            <AvatarImage
                                                src={tenant.image}
                                                alt={tenant.name || tenant.email}
                                            />
                                        )}
                                        <AvatarFallback className="bg-primary/10 font-semibold text-primary">
                                            {getTenantInitial(tenant)}
                                        </AvatarFallback>
                                    </Avatar>

                                    <div className="min-w-0 space-y-0.5">
                                        <span className="block truncate font-medium text-foreground">
                                            {tenant.name || tenant.email}
                                        </span>
                                        {tenant.name && (
                                            <span className="block truncate text-muted-foreground">
                                                {tenant.email}
                                            </span>
                                        )}
                                        {tenant.phone && (
                                            <span className="block text-muted-foreground">
                                                {tenant.phone}
                                            </span>
                                        )}
                                    </div>
                                    <div>
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            size="sm"
                                            disabled={isMovingOut}
                                            onClick={() => void handleMoveOut(tenant._id)}
                                        >
                                            {isMovingOut && (
                                                <LoaderCircle className="animate-spin" aria-hidden="true" />
                                            )}
                                            {isMovingOut
                                                ? t("moveOut.loading")
                                                : t("moveOut.confirm")}
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel variant="outline" disabled={isMovingOut}>
                        {t("moveOut.cancel")}
                    </AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default MoveOutTenant;