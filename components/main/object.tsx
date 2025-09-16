/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { ChevronRight, SquareDashedMousePointer } from "lucide-react"

import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { routes } from "@/config/routes"
import { useScopedI18n } from "@/locales/client"
import { CompanyResponseType } from "@/types"
import axios from "axios"
import { useQuery } from "@tanstack/react-query"
import CompanyCard from "../shared/company-card"

const ObjectContainer = () => {
  const scopedT = useScopedI18n("mainPage")
  const fetchCompanyListData = async (): Promise<CompanyResponseType[]> => {
    const { data } = await axios.get(
      `https://api.greengo.delivery/api/web/home/company-list`
    )
    return data.data.slice(0, 3) // Limit to 3 elements
  }

  const {
    data: companyListData,
    isLoading,
    isError,
    refetch,
  } = useQuery<CompanyResponseType[]>({
    queryKey: ["companyListData"],
    queryFn: fetchCompanyListData,
  })
  return (
    <section className="lg:py-32 py-10 flex items-center justify-center">
      <div className="container px-4 xl:px-0 max-w-7xl">
        <div className="flex items-center justify-between text-sm ">
          <div className="flex items-center gap-1 font-medium  sm:text-3xl font pt-1 ">
            <p> {scopedT("popularObjects")}</p>
          </div>
          <Link
            href={routes.company.companies}
            className="bg-green-50 hover:bg-green-100   dark:hover:bg-primary/90  text-primary py-1 px-3 rounded-md flex items-center dark:bg-primary dark:text-white text-xs font sm:text-sm"
          >
            {scopedT('viewAll')}
          </Link>
        </div>

        <Separator className="mt-3 mb-8" />
        {/*      <div className="flex flex-col justify-between gap-6 md:flex-row">
          <h2 className="text-3xl font font-medium md:w-1/2">
            {scopedT("popularObjects")}
          </h2>
          <p className="md:w-1/2">
            აღმოაჩინეთ ჩვენი საუკეთესო ობიექტები, რომლებიც შექმნილია თქვენი
            კომფორტისთვის და ეფექტურობისთვის. ჩვენ ვთავაზობთ ფართო არჩევანს,
            რომელიც მოიცავს ყველაფერს, რაც თქვენ გჭირდებათ.
          </p>
        </div> */}
        <div className="mt-11 grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {companyListData?.map((company) => (
            <CompanyCard key={company.slug} company={company} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ObjectContainer
