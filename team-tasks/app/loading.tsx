import { Skeleton } from "@/components/ui/skeleton"

function TaskSkeleton() {
  return (
    <div className="bg-card border border-border/50 rounded-xl p-4 space-y-3" style={{ boxShadow: 'var(--task-shadow)' }}>
      <div className="flex items-start justify-between gap-2">
        <Skeleton className="h-4 w-3/4 rounded-lg" />
        <Skeleton className="h-6 w-6 rounded-lg" />
      </div>
      <Skeleton className="h-3 w-full rounded-lg" />
      <div className="flex items-center gap-2 pt-1">
        <Skeleton className="h-5 w-16 rounded-md" />
        <Skeleton className="h-5 w-20 rounded-md" />
      </div>
      <div className="flex items-center gap-2 pt-2">
        <Skeleton className="h-6 w-6 rounded-full" />
        <div className="space-y-1.5">
          <Skeleton className="h-3 w-20 rounded-lg" />
          <Skeleton className="h-2 w-14 rounded-lg" />
        </div>
      </div>
    </div>
  )
}

function ColumnSkeleton() {
  return (
    <div className="flex-1 min-w-80">
      <div className="bg-card/40 border border-border/40 rounded-2xl overflow-hidden">
        {/* Column Header */}
        <div className="px-5 py-4 border-b border-border/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Skeleton className="h-9 w-9 rounded-xl" />
              <div className="space-y-1.5">
                <Skeleton className="h-4 w-24 rounded-lg" />
                <Skeleton className="h-3 w-14 rounded-lg" />
              </div>
            </div>
            <Skeleton className="h-8 w-8 rounded-xl" />
          </div>
        </div>
        {/* Tasks */}
        <div className="p-3 space-y-3">
          <TaskSkeleton />
          <TaskSkeleton />
          <TaskSkeleton />
        </div>
      </div>
    </div>
  )
}

function StatSkeleton() {
  return (
    <div className="bg-card/60 border border-border/50 rounded-2xl px-5 py-4 min-w-[140px]">
      <Skeleton className="h-3 w-12 rounded-lg mb-2" />
      <Skeleton className="h-7 w-10 rounded-lg mb-1" />
      <Skeleton className="h-3 w-16 rounded-lg" />
    </div>
  )
}

export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto max-w-[1800px] px-6 lg:px-10">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <Skeleton className="h-9 w-9 rounded-xl" />
              <div className="space-y-1.5">
                <Skeleton className="h-5 w-24 rounded-lg" />
                <Skeleton className="h-3 w-20 rounded-lg" />
              </div>
            </div>
            <Skeleton className="h-9 w-9 rounded-xl" />
          </div>
        </div>
      </header>

      <main className="p-6">
        {/* Hero section */}
        <div className="mb-10">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="space-y-3">
              <Skeleton className="h-12 w-72 rounded-xl" />
              <Skeleton className="h-5 w-96 rounded-lg" />
            </div>

            {/* Stats cards */}
            <div className="flex gap-4 flex-wrap">
              <StatSkeleton />
              <StatSkeleton />
              <StatSkeleton />
            </div>
          </div>
        </div>

        {/* Kanban Columns */}
        <div className="flex gap-6 overflow-x-auto pb-4">
          <ColumnSkeleton />
          <ColumnSkeleton />
          <ColumnSkeleton />
        </div>
      </main>
    </div>
  )
}
