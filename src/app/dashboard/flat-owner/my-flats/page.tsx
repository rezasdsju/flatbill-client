import LoadingSkeleton from "@/app/components/dashboard/flat-owner/LoadingSkeleton";
import MyFlat from "@/app/components/dashboard/flat-owner/MyFlat";
import { getFlatsByFlatOwner } from "@/lib/api/flats";
import { Suspense } from "react";

const MyFlatPage = async () => {
    const flats = await getFlatsByFlatOwner()
    console.log('flats: ', flats)
    return (
        <div>
            <Suspense fallback={<LoadingSkeleton />}>
                <MyFlat flats={flats} />
            </Suspense>
        </div>
    );
};

export default MyFlatPage;