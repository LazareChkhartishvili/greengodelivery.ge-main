/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import CompanyCard from "@/components/shared/company-card"
import Breadcrumbs from "@/components/shared/breadcrumbs"
import { Separator } from "@/components/ui/separator"
import { routes } from "@/config/routes"
import { CompanyResponseType } from "@/types"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { Search, SquareDashedMousePointer } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import React, { useEffect, useState } from "react"
import { useScopedI18n } from "@/locales/client"

const SingleCategoryContainer: React.FC = () => {
   const scopedT = useScopedI18n("categoryPage")
  const { slug } = useParams<{ slug: string }>()
  const fetchSingleCategoryData = async (): Promise<CompanyResponseType[]> => {
    const { data } = await axios.get(
      `https://api.greengo.delivery/api/web/filter/tskhaltubo/${slug}`
    )
    return data.data
  }

  const {
    data: singleCategoryData,
    isLoading,
    isError,
    refetch,
  } = useQuery<CompanyResponseType[]>({
    queryKey: ["singleCategoryData"],
    queryFn: fetchSingleCategoryData,
  })

  // Search
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [filteredCompanies, setFilteredCompanies] = useState<
    CompanyResponseType[]
  >([])

  useEffect(() => {
    if (singleCategoryData) {
      setFilteredCompanies(singleCategoryData)
    }
  }, [singleCategoryData])
  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    const searchValue = e.target.value.toLowerCase()

    if (searchValue === "") {
      setFilteredCompanies(singleCategoryData || [])
    } else {
      const filteredData = singleCategoryData?.filter((item) => {
        return (
          item.name_ka?.toLowerCase().includes(searchValue) ||
          item.name_en?.toLowerCase().includes(searchValue)
        )
      })
      setFilteredCompanies(filteredData || [])
    }
  }
  const breadcrumbData = [
    { label:  scopedT("main"), href: "/" },
    { label:  scopedT("allCategories"), href: routes.category.categories },
    { label: slug },
  ]
  

  return (
    <div className="container px-4 xl:px-0 max-w-7xl">
      <div className="flex justify-between ">
        {/* <div className="flex items-center justify-between text-sm sm:hidden">
          <div className="flex items-center w-full gap-1 pt-14 lg:pt-0 text-muted-foreground">
            <SquareDashedMousePointer className="size-5 text-primary" />
            <p className="text-2xl font lg:text-3xl">{slug}</p>
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

      <div className="grid grid-cols-1  sm:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-8">
        {filteredCompanies?.map((company) => (
          <CompanyCard key={company.slug} company={company} />
        ))}
      </div>
    </div>
  )
}

export default SingleCategoryContainer
