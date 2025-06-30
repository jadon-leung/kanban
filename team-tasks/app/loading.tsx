import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

function TaskSkeleton() {
  return (
    <Card className="mb-3 bg-card/50 backdrop-blur-sm">
      <CardHeader className="pb-3 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-6 w-6 rounded" />
        </div>
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-2/3" />
        <Skeleton className="h-5 w-20 rounded-full" />
      </CardHeader>
      <CardContent className="pt-0 space-y-3">
        <div className="h-px bg-border opacity-50" />
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Skeleton className="h-3 w-3" />
            <Skeleton className="h-3 w-16" />
          </div>
          <div className="flex items-center gap-1">
            <Skeleton className="h-3 w-3" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-6 rounded-full" />
            <div className="space-y-1">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-2 w-12" />
            </div>
          </div>
          <Skeleton className="h-6 w-12 rounded" />
        </div>
      </CardContent>
    </Card>
  )
}

function ColumnSkeleton() {
  return (
    <div className="flex-1 min-w-80">
      <Card className="h-full bg-muted/30">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Skeleton className="h-3 w-3 rounded-full" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-6 w-8 rounded-full" />
            </div>
            <Skeleton className="h-6 w-6 rounded" />
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-2 max-h-[600px] overflow-y-auto">
            <TaskSkeleton />
            <TaskSkeleton />
            <TaskSkeleton />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function Loading() {
  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64" />
          <Skeleton className="h-3 w-40" />
        </div>
        <Skeleton className="h-9 w-24 rounded-md" />
      </div>

      {/* Kanban Columns */}
      <div className="flex gap-6 overflow-x-auto pb-4">
        <ColumnSkeleton />
        <ColumnSkeleton />
        <ColumnSkeleton />
      </div>
    </div>
  )
} 