/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import Breadcrumbs from "@/components/shared/breadcrumbs"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { routes } from "@/config/routes"
import { CompanyResponseType } from "@/types"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import {
  Dribbble,
  Github,
  Linkedin,
  Phone,
  Search,
  SquareDashedMousePointer,
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import React from "react"
import { useCallback, useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import ProductCard from "@/components/shared/product-card"
import ProductCardSkeleton from "@/components/shared/product-card-skeleton"
import { useCurrentLocale, useScopedI18n } from "@/locales/client"

const SingleCompanyContainer: React.FC = () => {
   const scopedT = useScopedI18n("companyPage")
   
   const locale = useCurrentLocale()
  const { slug } = useParams() ?? {}
  const fetchSingleCompanyData = async (): Promise<CompanyResponseType> => {
    const { data } = await axios.get(
      `https://api.greengo.delivery/api/web/company/${slug}`
    )
    return data.data
  }
  const {
    data: singleCompanyData,
    isLoading,
    isError,
    refetch,
  } = useQuery<CompanyResponseType>({
    queryKey: ["singleCompanyData", slug],
    queryFn: fetchSingleCompanyData,
    enabled: !!slug,
  })

  console.log(singleCompanyData)

  const categories = React.useMemo(
    () => singleCompanyData?.product_category ?? [],
    [singleCompanyData]
  )

  const products = React.useMemo(
    () =>
      singleCompanyData?.product_category?.flatMap((cat) => cat.products) ?? [],
    [singleCompanyData]
  )

  // Search functionality
  const [searchTerm, setSearchTerm] = useState("")

  const filteredProducts = React.useMemo(() => {
    if (!searchTerm.trim()) return products
    const lower = searchTerm.toLowerCase()
    return products.filter(
      (p) =>
        p.name_ka?.toLowerCase().includes(lower) ||
        p.name_en?.toLowerCase().includes(lower)
    )
  }, [products, searchTerm])

  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  // New feature
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const observerRef = useRef<IntersectionObserver | null>(null)
  const isScrollingRef = useRef(false)

  useEffect(() => {
    if (categories.length > 0 && !activeCategory) {
      setActiveCategory(categories[0].slug)
    }
  }, [categories, activeCategory])

  // Dynamically set top padding based on which category is clicked
  const [topPadding, setTopPadding] = useState(200)

  const setupObserver = useCallback(() => {
    observerRef.current?.disconnect()
    let debounceTimeout: NodeJS.Timeout

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (isScrollingRef.current) return

        if (debounceTimeout) clearTimeout(debounceTimeout)

        debounceTimeout = setTimeout(() => {
          const entry = entries.find((entry) => entry.isIntersecting)
          if (entry) {
            const category = entry.target.getAttribute("data-category")
            if (category) {
              setActiveCategory(category)
            }
          }
        }, 150)
      },
      {
        root: null,
        rootMargin: `-${topPadding}px 0px -100% 0px`,
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    )

    Object.entries(categoryRefs.current).forEach(([slug, el]) => {
      if (el) {
        el.setAttribute("data-category", slug)
        observerRef.current?.observe(el)
      }
    })

    return () => {
      if (debounceTimeout) clearTimeout(debounceTimeout)
    }
  }, [topPadding])

  useEffect(() => {
    const cleanup = setupObserver()
    return () => {
      cleanup()
      observerRef.current?.disconnect()
    }
  }, [setupObserver])

  const handleCategoryClick = (slug: string) => {
    setSearchTerm("") // Clear search term when clicking a category
    const isMobile = window.innerWidth < 768
    setActiveCategory(slug)
    setTopPadding((prev) =>
      isMobile
        ? 100
        : categories.length > 0 && slug === categories[0].slug
        ? 200
        : 105
    )
    isScrollingRef.current = true
  }

  useEffect(() => {
    if (!activeCategory) return
    const element = document.getElementById(`faq-${activeCategory}`)
    if (element) {
      element.style.scrollMargin = `${topPadding}px`
      element.scrollIntoView({ behavior: "smooth", block: "start" })
      setTimeout(() => {
        isScrollingRef.current = false
      }, 1000)
    }
  }, [activeCategory, topPadding])

  const breadcrumbData = [
    { label: scopedT('main'), href: "/" },
    { label: scopedT('allObjects'), href: routes.company.companies },
    { label: singleCompanyData?.name_ka },
  ]

  return (
    <div className="container px-4 xl:px-0 max-w-7xl">
      <div className="flex justify-between ">
        {/* <div className="flex items-center justify-between text-sm sm:hidden">
          <div className="flex items-center w-full gap-1 pt-14 lg:pt-0 text-muted-foreground">
            <SquareDashedMousePointer className="size-5 text-primary" />
            <p className="text-2xl font lg:text-3xl">
              {singleCompanyData?.name_ka}
            </p>
          </div>
        </div> */}

        <Breadcrumbs data={breadcrumbData} className="hidden md:flex" />
        <div
          className={cn(
            "relative",
            "md:w-[260px]", // Desktop width
            "w-full", // Mobile width
            "fixed md:static", // Fixed on mobile, static on desktop
            "left-0 right-0 top-15 md:z-0 z-50 py-2 md:py-0 px-4 md:px-0 md:bg-transparent md:bg-none md:dark:bg-transparent dark:bg-background bg-white " // Fixed positioning for mobile
          )}
        >
          <Search className="h-5 w-5 absolute mt-2 ml-2.5" />
          <Input
            className={cn(
              "pl-9 bg-white dark:bg-background",
              "w-full", // Always full width
              "md:w-[260px]", // Desktop width
              "rounded-md" // Remove border radius on mobile
            )}
            placeholder={`Search in ${ locale === "ka" ? singleCompanyData?.name_ka : singleCompanyData?.name_en}`}
            onChange={searchHandler}
            value={searchTerm}
          />
        </div>
      </div>
      <Separator className="mt-3 mb-8 md:block hidden" />

      <section className="min-h-screen">
        <div className=" ">
          <div className="mt-8 grid gap-8   md:grid-cols-[140px_1fr_260px] md:gap-6 ">
            {/* Sidebar Left */}
            <div
              className="md:bg-transparent md:bg-none md:dark:bg-transparent dark:bg-background bg-white md:ml-0 ml-[-20px] w-full px-5 md:px-0 z-50 top-28 md:gap-0 gap-4 flex-row md:overflow-x-hidden overflow-x-scroll sticky md:top-24 flex h-fit md:flex-col  max-md:fixed font  truncate scrollbar-hide"
              style={{
                scrollbarWidth: "none", // Firefox
                msOverflowStyle: "none", // IE 10+
              }}
            >
              <style jsx>{`
                .scrollbar-hide::-webkit-scrollbar {
                  display: none;
                }
              `}</style>
              {categories.map((cat, index) => (
                <div
                  key={cat.slug}
                  onClick={() => handleCategoryClick(cat.slug)}
                  className={`justify-start text-left py-1 transition-colors cursor-pointer px-0 ${
                    activeCategory === cat.slug
                      ? " text-primary md:border-0 border-b-3 border-primary "
                      : " hover:opacity-75 hover:text-primary "
                  }`}
                >
                  {locale === "ka" ? cat.name_ka : cat.name_en}
                  {index !== categories.length - 1 && (
                    <Separator className="mt-2 md:block hidden" />
                  )}
                </div>
              ))}
            </div>

            {/* Product Items by Category (Main Content) */}
            <div className="space-y-6">
              {isLoading ? (
                Array.from({ length: 3 }).map((_, idx) => (
                  <ProductCardSkeleton key={idx} />
                ))
              ) : searchTerm ? (
                <div
                  className={cn("rounded-md bg-background", "p-4 border")}
                  style={{ scrollMargin: `${topPadding}px` }}
                >
                  <p className="pb-4 uppercase font font-bold text-lg text-primary">
                    {scopedT("search")}
                  </p>
                  <div className="container grid gap-x-4 gap-y-8 lg:grid-cols-2">
                    {filteredProducts.length === 0 ? (
                      <p className="text-muted-foreground">
                        {scopedT("productNotFound")}
                      </p>
                    ) : (
                      filteredProducts.map((item, index) => (
                        <ProductCard key={index} product={item} />
                      ))
                    )}
                  </div>
                </div>
              ) : (
                categories.map((cat) => {
                  const slug = cat.slug
                  const categoryItems = products.filter(
                    (item) => item.product_category_slug === slug
                  )

                  return (
                    <div
                      key={slug}
                      id={`faq-${slug}`}
                      ref={(el) => {
                        categoryRefs.current[slug] = el
                      }}
                      className={cn("rounded-md bg-background", "p-4 border")}
                      style={{ scrollMargin: `${topPadding}px` }}
                    >
                      <div>
                        <p
                          className={` pb-4 uppercase font font-bold text-lg ${
                            activeCategory === slug ? "text-primary" : ""
                          }`}
                        >
                           {locale === "ka" ? cat.name_ka : cat.name_en}
                        </p>
                        <div className="container  grid gap-x-4 gap-y-8 lg:grid-cols-2">
                          {categoryItems.map((item, index) => (
                            <ProductCard key={index} product={item} />
                          ))}
                        </div>
                      </div>
                    </div>
                  )
                })
              )}
            </div>

            {/* Mobile Call Button */}
            <div className="fixed bottom-8 left-0  right-0 z-40 w-full  px-10 flex items-center justify-center md:hidden">
              <div
                aria-label="Login"
                className="rounded-full bg-primary  font text-white shadow-xs hover:bg-primary/90 w-full h-11 items-center justify-center flex  cursor-pointer"
              >
                <a
                  className="flex gap-2 items-center justify-center text-lg"
                  href="tel:+995598401240"
                >
                  <Phone className=" w-6 h-6" />
                  <p> {scopedT("call")}</p>
                </a>
                {/*     <Link href="/login">{scopedT("signIn")}</Link> */}
              </div>
            </div>
            {/* Sidebar Right */}
            <aside className="sticky top-24 h-fit ">
              <div className="p-4 bg-background border rounded-md">
                <h3 className="font-bold font text-lg mb-2">
                  {locale === "ka" ? singleCompanyData?.name_ka : singleCompanyData?.name_en}
                  
                </h3>
                <p className="mb-2 line-clamp-2 ">
                
                   {locale === "ka" ? singleCompanyData?.description_ka : singleCompanyData?.description_en}
                </p>
                <div className="flex flex-col gap-2 ">
                  <span className="text-sm text-muted-foreground">
                    {scopedT("email")} {singleCompanyData?.email || "N/A"}
                  </span>
                  <span className="text-sm text-muted-foreground">
                     {scopedT("phone")} {singleCompanyData?.phone || "N/A"}
                  </span>
                </div>
                {singleCompanyData?.address_latitude &&
                  singleCompanyData?.address_longitude && (
                    <div className="rounded-md overflow-hidden border mt-4">
                      <iframe
                        title="Company Location"
                        width="100%"
                        height="150"
                        style={{ border: 0 }}
                        loading="lazy"
                        allowFullScreen
                        referrerPolicy="no-referrer-when-downgrade"
                        src={`https://www.google.com/maps?q=${singleCompanyData.address_latitude},${singleCompanyData.address_longitude}&hl=ka&z=16&output=embed`}
                      />
                    </div>
                  )}
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  )
}

export default SingleCompanyContainer
