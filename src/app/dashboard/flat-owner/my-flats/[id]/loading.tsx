
import { Skeleton } from "@/components/ui/skeleton";

const FlatDetailPageLoading = () => {
    const InfoSkeleton = () => (
        <div className="space-y-2">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-4 w-32 max-w-full" />
        </div>
    );

    const SectionSkeleton = ({
        items = 6,
        columns = "grid-cols-2 sm:grid-cols-3",
    }: {
        items?: number;
        columns?: string;
    }) => (
        <div className="rounded-xl border border-border bg-card p-4 shadow-sm sm:p-5">
            <div className="mb-5 flex items-center gap-2">
                <Skeleton className="size-5 rounded-md" />
                <Skeleton className="h-5 w-36" />
            </div>

            <div className={`grid ${columns} gap-x-4 gap-y-5`}>
                {Array.from({ length: items }).map((_, index) => (
                    <InfoSkeleton key={index} />
                ))}
            </div>
        </div>
    );

    const TenantSkeleton = () => (
        <div className="rounded-lg border border-border p-4">
            <Skeleton className="h-5 w-36" />

            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {Array.from({ length: 5 }).map((_, index) => (
                    <InfoSkeleton key={index} />
                ))}
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-background px-3 py-5 text-foreground sm:px-5 sm:py-7 lg:px-8">
            <div className="mx-auto max-w-7xl space-y-6">

                {/* Header */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-3">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-8 w-64 max-w-full sm:h-9 sm:w-80" />

                        <div className="flex items-center gap-2">
                            <Skeleton className="size-4 rounded-full" />
                            <Skeleton className="h-4 w-28" />
                            <Skeleton className="h-4 w-24" />
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <Skeleton className="h-7 w-24 rounded-full" />
                        <Skeleton className="h-7 w-24 rounded-full" />
                    </div>
                </div>

                {/* Images */}
                <div className="grid gap-4 md:grid-cols-2">
                    {Array.from({ length: 2 }).map((_, index) => (
                        <div
                            key={index}
                            className="overflow-hidden rounded-xl border border-border bg-card"
                        >
                            <Skeleton className="aspect-video w-full rounded-none" />
                            <div className="border-t border-border px-4 py-3">
                                <Skeleton className="h-4 w-28" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Financial Summary */}
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div
                            key={index}
                            className="rounded-xl border border-border bg-card p-4 shadow-sm"
                        >
                            <div className="flex items-center justify-between gap-3">
                                <Skeleton className="h-3 w-28" />
                                <Skeleton className="size-5 rounded-md" />
                            </div>
                            <Skeleton className="mt-3 h-7 w-32 max-w-full" />
                        </div>
                    ))}
                </div>

                {/* Information Sections */}
                <div className="grid gap-5 lg:grid-cols-2">

                    {/* Basic Information */}
                    <SectionSkeleton items={6} />

                    {/* Room Details */}
                    <div className="rounded-xl border border-border bg-card p-4 shadow-sm sm:p-5">
                        <div className="mb-5 flex items-center gap-2">
                            <Skeleton className="size-5 rounded-md" />
                            <Skeleton className="h-5 w-32" />
                        </div>

                        <div className="grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-3">
                            {Array.from({ length: 6 }).map((_, index) => (
                                <InfoSkeleton key={index} />
                            ))}
                        </div>

                        <div className="mt-5 grid gap-2 sm:grid-cols-2">
                            {Array.from({ length: 2 }).map((_, index) => (
                                <Skeleton
                                    key={index}
                                    className="h-11 w-full rounded-lg"
                                />
                            ))}
                        </div>
                    </div>

                    {/* Utilities */}
                    <SectionSkeleton
                        items={4}
                        columns="grid-cols-2"
                    />

                    {/* Amenities */}
                    <div className="rounded-xl border border-border bg-card p-4 shadow-sm sm:p-5">
                        <div className="mb-5 flex items-center gap-2">
                            <Skeleton className="size-5 rounded-md" />
                            <Skeleton className="h-5 w-28" />
                        </div>

                        <div className="grid gap-2 sm:grid-cols-2">
                            {Array.from({ length: 3 }).map((_, index) => (
                                <Skeleton
                                    key={index}
                                    className="h-11 w-full rounded-lg"
                                />
                            ))}
                        </div>
                    </div>

                    {/* Additional Charges */}
                    <SectionSkeleton
                        items={4}
                        columns="grid-cols-2"
                    />

                    {/* Flat Owner */}
                    <SectionSkeleton
                        items={3}
                        columns="grid-cols-1 sm:grid-cols-2"
                    />
                </div>

                {/* Present Tenants */}
                <div className="rounded-xl border border-border bg-card p-4 shadow-sm sm:p-5">
                    <div className="mb-5 flex items-center gap-2">
                        <Skeleton className="size-5 rounded-md" />
                        <Skeleton className="h-5 w-36" />
                    </div>

                    <div className="grid gap-3 md:grid-cols-2">
                        {Array.from({ length: 2 }).map((_, index) => (
                            <TenantSkeleton key={index} />
                        ))}
                    </div>
                </div>

                {/* Past Tenants */}
                <div className="rounded-xl border border-border bg-card p-4 shadow-sm sm:p-5">
                    <div className="mb-5 flex items-center gap-2">
                        <Skeleton className="size-5 rounded-md" />
                        <Skeleton className="h-5 w-28" />
                    </div>

                    <div className="grid gap-3 md:grid-cols-2">
                        {Array.from({ length: 2 }).map((_, index) => (
                            <TenantSkeleton key={index} />
                        ))}
                    </div>
                </div>

                {/* Notes */}
                <div className="rounded-xl border border-border bg-card p-4 shadow-sm sm:p-5">
                    <div className="mb-5 flex items-center gap-2">
                        <Skeleton className="size-5 rounded-md" />
                        <Skeleton className="h-5 w-20" />
                    </div>

                    <div className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-11/12" />
                        <Skeleton className="h-4 w-2/3" />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default FlatDetailPageLoading;
