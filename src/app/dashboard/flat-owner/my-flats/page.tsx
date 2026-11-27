import LoadingSkeleton from "@/app/components/dashboard/flat-owner/LoadingSkeleton";
import MyFlat from "@/app/components/dashboard/flat-owner/MyFlat";
import { getFlatsByFlatOwner } from "@/lib/api/flats";
import { getTenantsByFlatOwner } from "@/lib/api/users";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";

const MyFlatPage = async () => {
    const t = await getTranslations("myFlat");
    const flats = await getFlatsByFlatOwner()
    // console.log('flats: ', flats)
    const tenants = await getTenantsByFlatOwner()
    // console.log(tenants)
    return (
        <div>
            <Suspense
                fallback={
                    <div role="status" aria-label={t("loading")}>
                        <LoadingSkeleton />
                    </div>
                }
            >
                <MyFlat flats={flats} tenants={tenants}/>
            </Suspense>
        </div>
    );
};

export default MyFlatPage;