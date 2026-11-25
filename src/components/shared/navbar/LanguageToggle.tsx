"use client";

import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { setLocale } from "@/i18n/set-locale";

export default function LanguageToggle() {
    const locale = useLocale();
    const router = useRouter();
    const [isChanging, setIsChanging] = useState(false);
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        document.documentElement.classList.remove("lang-switching");
    }, [locale]);

    const handleToggle = () => {
        if (isPending) return;
        document.documentElement.classList.add("lang-switching");
        startTransition(async () => {
            await setLocale(locale === "en" ? "bn" : "en");
            router.refresh();
        });
    };


    return (
        <button
            aria-busy={isPending}
            type="button"
            onClick={handleToggle}
            disabled={isPending}
            aria-label={locale === "en" ? "Switch to Bangla" : "Switch to English"}
            className="min-w-10 cursor-pointer rounded-md border px-2 py-2 text-sm font-medium disabled:opacity-50"
        >
            {isPending ? (
                <span className="inline-flex items-center gap-2">
                    <span className="size-4 animate-spin rounded-full border-2 border-blue-500/30 border-t-blue-600" />
                </span>
            ) : locale === "en" ? (
                <>
                    <span className="min-[345px]:hidden">বাং</span>
                    <span className="hidden min-[345px]:inline">বাংলা</span>
                </>
            ) : (
                <>
                    <span className="min-[345px]:hidden">Eng</span>
                    <span className="hidden min-[345px]:inline">English</span>
                </>
            )}
        </button>
    );
}