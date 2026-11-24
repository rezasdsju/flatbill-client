

import { Skeleton } from "@/components/ui/skeleton"

const LoadingSkeleton = () => {
    return (
        <div className="flex flex-col gap-3">
            <Skeleton className="h-4 w-20" />
        </div>
    );
};

export default LoadingSkeleton;