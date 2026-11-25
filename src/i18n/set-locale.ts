"use server";

import { cookies } from "next/headers";

export async function setLocale(locale: string) {
    if (locale !== "en" && locale !== "bn") {
        throw new Error("Unsupported locale");
    }

    const store = await cookies();

    store.set("locale", locale, {
        path: "/",
        maxAge: 60 * 60 * 24 * 365,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
    });
}