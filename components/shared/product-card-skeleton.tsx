import React from "react"
import { Skeleton } from "../ui/skeleton"

const ProductCardSkeleton: React.FC = () => (
  <div
    className="rounded-md bg-background p-4 border animate-pulse"
    style={{ minHeight: 180 }}
  >
    <Skeleton className="pb-4 uppercase font font-bold text-lg h-6 w-1/3 mb-4 rounded" />
    <div className="container grid gap-x-4 gap-y-8 lg:grid-cols-2">
      {Array.from({ length: 2 }).map((_, i) => (
        <Skeleton key={i} className="h-32 rounded-md" />
      ))}
    </div>
  </div>
)

export default ProductCardSkeleton
