import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonAvatar() {
  return (
    <div className="flex w-fit items-center gap-4">
      <Skeleton className="size-10 shrink-0 rounded-full" />
      <div className="grid gap-1 sm:gap-2">
        <Skeleton className="h-4 w-20 sm:w-37.5" />
        <Skeleton className="h-4 w-15 sm:w-25" />
      </div>
    </div>
  )
}
