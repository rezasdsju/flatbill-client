import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonAvatar() {
    return (
        <div className="flex w-fit items-center gap-4">
            <Skeleton className="size-10 shrink-0 rounded-full" />
            <div className="hidden sm:grid gap-1 sm:gap-2">
                <Skeleton className="h-4  w-23" />
                <Skeleton className="h-4 w-13" />
            </div>
        </div>
    )
}
