import { cookies } from "next/headers";
import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async () => {
    const store = await cookies();
    const locale = store.get("locale")?.value === "bn" ? "bn" : "en";

    const messages =
        locale === "bn"
            ? (await import("../messages/bn.json")).default
            : (await import("../messages/en.json")).default;

    return { locale, messages };
});