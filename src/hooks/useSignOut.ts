"use client"

import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslations } from "next-intl";




const useSignOut = () => {
    const t = useTranslations("auth")
    const [isSigningOut, setIsSigningOut] = useState(false)

    const router = useRouter()
    const handleSignOut = async () => {
        if (isSigningOut) return

        setIsSigningOut(true)

        const { data, error } = await authClient.signOut()
        if (error) {
            setIsSigningOut(false)

            toast.error(t("signOutFailed"), {
                description: error.message || t("signOutFailedDescription"),
            })

            return
        }

        if (data) {
            toast.success(t("signedOut"), {
                description: t("signedOutDescription"),
            })

            router.replace("/sign-in")
        }
    }
    return { handleSignOut, isSigningOut }
};

export default useSignOut;