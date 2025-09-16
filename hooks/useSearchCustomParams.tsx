"use client"

import { useSearchParams, usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function useSearchCustomParams() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const [allQueryParams, setAllQueryParams] = useState(
    Object.fromEntries(searchParams.entries())
  )

  useEffect(() => {
    setAllQueryParams(Object.fromEntries(searchParams.entries()))
  }, [searchParams])

  const getQueryParamByKey = (key: string): string => {
    return searchParams.get(key) || ""
  }

  const setQueryParams = (params: Record<string, string>) => {
    const updatedParams = new URLSearchParams(searchParams.toString())

    Object.keys(params).forEach((key) => {
      updatedParams.set(key, params[key])
    })

    router.push(`${pathname}?${updatedParams.toString()}`)
  }

  const removeQueryParamByKey = (key: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete(key)

    router.push(`${pathname}?${params.toString()}`)
  }

  return {
    allQueryParams,
    getQueryParamByKey,
    setQueryParams, // Modified to accept multiple params
    removeQueryParamByKey,
  }
}
