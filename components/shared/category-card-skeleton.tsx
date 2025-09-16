import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

const CategoryCardSkeleton: React.FC = () => (
  <Card className="group cursor-pointer animate-pulse">
    <CardContent className="flex h-full flex-col items-center gap-5 p-0 pt-10 pb-5">
      <div className="flex size-20 items-center justify-center rounded-3xl bg-primary/30 group-hover:scale-110 transition-transform duration-300">
        <Skeleton className="w-10 h-10 rounded-full bg-primary/40" />
      </div>
      <div className="flex w-full flex-col items-center gap-4 px-4 pt-5">
        <Skeleton className="w-2/4 h-6 rounded bg-muted" />
      </div>
    </CardContent>
  </Card>
)

export default CategoryCardSkeleton
