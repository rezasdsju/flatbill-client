"use client"

import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";




const useSignOut = () => {
    const [isSigningOut, setIsSigningOut] = useState(false)

    const router = useRouter()
    const handleSignOut = async () => {
        if (isSigningOut) return

        setIsSigningOut(true)

        const { data, error } = await authClient.signOut()
        if (error) {
            setIsSigningOut(false)

            toast.error("Sign-out failed", {
                description: error.message || "An error occurred while signing out. Please try again.",
            })

            return
        }

        if (data) {
            toast.success("Signed out successfully", {
                description: "You have been securely signed out.",
            })

            router.replace("/sign-in")
        }
    }
    return { handleSignOut, isSigningOut }
};

export default useSignOut;