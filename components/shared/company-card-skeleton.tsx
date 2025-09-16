import React from "react"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

const CompanyCardSkeleton: React.FC = () => (
  <Card className="overflow-hidden cursor-pointer pt-0">
    <div>
      <Skeleton className="aspect-video w-full h-[205px] object-cover" />
    </div>
    <div className="ps-5">
      <Skeleton className="mb-1 mt-4 h-6 w-3/4" />
    </div>
  </Card>
)

export default CompanyCardSkeleton
