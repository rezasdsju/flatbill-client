
import { Skeleton } from "@/components/ui/skeleton";

const LoadingSkeleton = () => {
  return (
    <div className="min-h-screen bg-slate-50/50 p-4 md:p-6 lg:p-8 dark:bg-background">
      <div className="mx-auto max-w-7xl space-y-6">

        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <Skeleton className="h-8 w-36" />
            <Skeleton className="h-4 w-72 max-w-full" />
          </div>
          <Skeleton className="h-10 w-36 rounded-lg" />
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="rounded-xl border bg-white p-4 shadow-xs dark:border-border dark:bg-card"
            >
              <Skeleton className="h-4 w-24" />
              <Skeleton className="mt-3 h-8 w-16" />
            </div>
          ))}
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 border-b pb-3 dark:border-border">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-9 w-24 rounded-lg" />
          ))}
        </div>

        {/* Desktop Table */}
        <div className="hidden overflow-hidden rounded-xl border bg-white shadow-xs dark:border-border dark:bg-card md:block">
          <div className="flex items-center gap-6 border-b bg-slate-50/80 px-6 py-4 dark:border-border dark:bg-muted/50">
            {Array.from({ length: 7 }).map((_, index) => (
              <Skeleton key={index} className="h-4 flex-1" />
            ))}
          </div>

          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="flex items-center gap-6 border-b px-6 py-5 last:border-0 dark:border-border"
            >
              <div className="flex flex-1 items-center gap-3">
                <Skeleton className="h-10 w-10 shrink-0 rounded-lg" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-5 flex-1" />
              ))}
            </div>
          ))}
        </div>

        {/* Mobile Cards */}
        <div className="grid grid-cols-1 gap-4 md:hidden">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="space-y-4 rounded-xl border bg-white p-4 shadow-xs dark:border-border dark:bg-card"
            >
              {/* Card Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-11 w-11 rounded-lg" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                </div>
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>

              {/* Specs & Rent */}
              <div className="grid grid-cols-2 gap-3 rounded-lg bg-slate-50 p-3 dark:bg-muted">
                <div className="space-y-2">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-3 w-28" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-5 w-20" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>

              {/* Tenant Info */}
              <div className="flex items-center justify-between border-t pt-3 dark:border-border">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-3 w-20" />
                </div>
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-1">
                <Skeleton className="h-9 flex-1 rounded-lg" />
                <Skeleton className="h-9 flex-1 rounded-lg" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default LoadingSkeleton;
