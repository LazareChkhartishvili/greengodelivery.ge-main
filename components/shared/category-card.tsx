/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { Card, CardContent } from "../ui/card"
import { IconShoppingCart } from "@tabler/icons-react"
import { Pill, Flower2, ChefHat, PackageOpen } from "lucide-react"
import { CategoryResponseType } from "@/types"
import { routes } from "@/config/routes"
import Link from "next/link"
import { useCurrentLocale } from "@/locales/client"

function CategoryCard({ category }: { category: CategoryResponseType }) {
  const locale = useCurrentLocale()
  return (
    <Link
      key={category.slug}
      href={routes.category.singleCategory(category.slug)}
    >
      <Card className="group  cursor-pointer">
        <CardContent className="flex h-full flex-col items-center gap-5 p-0 pt-10 pb-5">
          {/* Temporary solution */}
          {/*       <div className="flex size-20 items-center justify-center rounded-3xl bg-primary">
            {category.name_en === "Food" ? (
              <ChefHat className="size-10 stroke-white transition-all ease-in-out group-hover:size-12" />
            ) : category.name_en === "Packages" ? (
              <PackageOpen className="size-10 stroke-white transition-all ease-in-out group-hover:size-12" />
            ) : category.name_en === "Pharmacy" ? (
              <Pill className="size-10 stroke-white transition-all ease-in-out group-hover:size-12" />
            ) : category.name_en === "Grocery" ? (
              <IconShoppingCart className="size-10 stroke-white transition-all ease-in-out group-hover:size-12" />
            ) : category.name_en === "Flowers" ? (
              <Flower2 className="size-10 stroke-white transition-all ease-in-out group-hover:size-12" />
            ) : (
              <div className="size-10 stroke-white transition-all ease-in-out group-hover:size-12">
                Null
              </div>
            )}
          </div> */}
          <div className="flex size-20 items-center justify-center rounded-3xl bg-primary group-hover:scale-110 transition-transform duration-300">
            <div
              dangerouslySetInnerHTML={{
                __html: category.svg ?? "",
              }}
            />
          </div>
          <div className="flex w-full flex-col items-center gap-4 px-4 pt-5 ">
            <h3 className="w-full text-center text-xl font font-medium  tracking-tighter text-foreground">
              {locale === "ka" ? category.name_ka : category.name_en}
            </h3>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

export default CategoryCard
