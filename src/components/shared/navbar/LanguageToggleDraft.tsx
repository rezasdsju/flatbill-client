"use client";

import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { setLocale } from "@/i18n/set-locale";

export default function LanguageToggle() {
    const locale = useLocale();
    const router = useRouter();
    const [isChanging, setIsChanging] = useState(false);

    const handleToggle = async () => {
        setIsChanging(true);

        try {
            await setLocale(locale === "en" ? "bn" : "en");
            router.refresh();
        } finally {
            setIsChanging(false);
        }
    };

    return (
        <button
            type="button"
            onClick={handleToggle}
            disabled={isChanging}
            aria-label={locale === "en" ? "Switch to Bangla" : "Switch to English"}
            className="rounded-md border px-3 py-2 text-sm font-medium disabled:opacity-50"
        >
            {isChanging ? "…" : locale === "en" ? "বাংলা" : "English"}
        </button>
    );
}