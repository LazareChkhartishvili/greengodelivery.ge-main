/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import React, { useEffect, useState } from "react"
import CompanyCard from "@/components/shared/company-card"
import { Separator } from "@/components/ui/separator"
import { Search, SquareDashedMousePointer } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import axios from "axios"
import { useQuery } from "@tanstack/react-query"
import { CompanyResponseType } from "@/types"
import CompanyCardSkeleton from "@/components/shared/company-card-skeleton"
import useSearchCustomParams from "@/hooks/useSearchCustomParams"
import Breadcrumbs from "@/components/shared/breadcrumbs"
import { useScopedI18n } from "@/locales/client"

const CompaniesContainer: React.FC = () => {
  const scopedT = useScopedI18n("companyPage")
  const { getQueryParamByKey } = useSearchCustomParams()
  const searchQuery = getQueryParamByKey("search") || ""
  const fetchCompanyListData = async (): Promise<CompanyResponseType[]> => {
    const { data } = await axios.get(
      `https://api.greengo.delivery/api/web/search?search=${searchQuery}`
    )
    return data.data
  }

  const {
    data: companyListData,
    isLoading,
    isError,
    refetch,
  } = useQuery<CompanyResponseType[]>({
    queryKey: ["companyListData", searchQuery],
    queryFn: fetchCompanyListData,
  })

  /*   // Search
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [filteredCompanies, setFilteredCompanies] = useState<
    CompanyResponseType[]
  >([])

  useEffect(() => {
    if (companyListData) {
      setFilteredCompanies(companyListData)
    }
  }, [companyListData])
  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    const searchValue = e.target.value.toLowerCase()

    if (searchValue === "") {
      setFilteredCompanies(companyListData || [])
    } else {
      const filteredData = companyListData?.filter((item) => {
        return (
          item.name_ka?.toLowerCase().includes(searchValue) ||
          item.name_en?.toLowerCase().includes(searchValue)
        )
      })
      setFilteredCompanies(filteredData || [])
    }
  } */

  const breadcrumbData = [
    { label: scopedT('main'), href: "/" },
    ...(searchQuery
      ? [
          { label: scopedT("allObjects"), href: "/companies" },
          { label: `ძებნა: ${searchQuery}` },
        ]
      : [{ label: scopedT("allObjects") }]),
  ]
  //{locale === 'ka' ? company.name_ka : company.name_en}

  return (
    <div className="container px-4 xl:px-0 max-w-7xl">
      <div className="flex justify-between ">
        {/* <div className="flex items-center justify-between text-sm sm:hidden">
          <div className="flex items-center w-full gap-1 pt-14 lg:pt-0 text-muted-foreground">
            <SquareDashedMousePointer className="size-5 text-primary" />
            <p className="text-2xl font lg:text-3xl">ყველა ობიექტი</p>
          </div>
        </div> */}
        <Breadcrumbs data={breadcrumbData} />
        {/*         <div className="relative hidden md:block">
          <Search className="h-5 w-5 absolute mt-2 ml-2.5" />
          <Input
            className="pl-9 bg-white dark:bg-background w-[260px]"
            placeholder="ძებნა"
            value={searchTerm}
            onChange={searchHandler}
          />
        </div> */}
      </div>
      <Separator className="mt-3 mb-8" />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-8">
        {isLoading ? (
          <>
            {Array.from({ length: 6 }).map((_, index) => (
              <CompanyCardSkeleton key={index} />
            ))}
          </>
        ) : companyListData && companyListData.length > 0 ? (
          companyListData.map((company) => (
            <CompanyCard key={company.slug} company={company} />
          ))
        ) : (
          <div className="col-span-full h-screen text-center text-muted-foreground py-8">
            ობიექტი ვერ მოიძებნა
          </div>
        )}
      </div>
    </div>
  )
}

export default CompaniesContainer
