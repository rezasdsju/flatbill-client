import LoadingSkeleton from "@/app/components/dashboard/flat-owner/LoadingSkeleton";
import MyFlat from "@/app/components/dashboard/flat-owner/MyFlat";
import { getFlatsByFlatOwner } from "@/lib/api/flats";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";

const MyFlatPage = async () => {
    const t = await getTranslations("myFlat");
    const flats = await getFlatsByFlatOwner()
    // console.log('flats: ', flats)
    return (
        <div>
            <Suspense
                fallback={
                    <div role="status" aria-label={t("loading")}>
                        <LoadingSkeleton />
                    </div>
                }
            >
                <MyFlat flats={flats} />
            </Suspense>
        </div>
    );
};

export default MyFlatPage;