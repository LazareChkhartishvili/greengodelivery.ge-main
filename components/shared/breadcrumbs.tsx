/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react"

import {
  Breadcrumbs,
  BreadcrumbItem,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumbs"
import Link from "next/link"

// Example breadcrumb data
interface BreadcrumbItem {
  label: string | undefined
  href?: string | undefined
}

interface BreadcrumbsSharedProps {
  data: BreadcrumbItem[]
  className?: string | undefined
}

const BreadcrumbsShared: React.FC<BreadcrumbsSharedProps> = ({
  data,
  className,
}) => (
  <Breadcrumbs className={`flex font h-10 ${className}`}>
    {data?.map((item: BreadcrumbItem, idx: any) => (
      <BreadcrumbItem key={idx}>
        {item.href ? (
          <Link href={item.href} className="hover:underline">
            {item.label}
          </Link>
        ) : (
          <BreadcrumbPage className="text-primary">{item.label}</BreadcrumbPage>
        )}
        {idx < data.length - 1 && <BreadcrumbSeparator />}
      </BreadcrumbItem>
    ))}
  </Breadcrumbs>
)

export default BreadcrumbsShared
