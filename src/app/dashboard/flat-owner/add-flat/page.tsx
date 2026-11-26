import AddNewFlat from "@/app/components/dashboard/flat-owner/AddNewFlat";
import { getTranslations } from "next-intl/server";

const AddFlatPage = async () => {
    const t = await getTranslations("addFlat");
    return (
        <main className="mx-auto w-full max-w-7xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
            <header className="max-w-2xl space-y-2">
                {/* <p className="text-sm font-medium text-primary">{t("page.owner")}</p> */}
                <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                    {t("page.title")}
                </h1>
                <p className="text-sm leading-6 text-muted-foreground">
                    {t("page.description")}
                </p>
            </header>
            <AddNewFlat />
        </main>
    );
};

export default AddFlatPage;