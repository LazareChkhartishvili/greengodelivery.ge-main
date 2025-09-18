/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import CompanyCard from "@/components/shared/company-card";
import Breadcrumbs from "@/components/shared/breadcrumbs";
import { Separator } from "@/components/ui/separator";
import { routes } from "@/config/routes";
import { CompanyResponseType } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { useScopedI18n } from "@/locales/client";

const SingleCategoryContainer: React.FC = () => {
  const scopedT = useScopedI18n("categoryPage");
  const { slug } = useParams<{ slug: string }>();

  console.log("[CategoryPage] slug:", slug);

  const fetchSingleCategoryData = async (): Promise<CompanyResponseType[]> => {
    console.log("[CategoryPage] fetching companies for category:", slug);
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/web/category/${slug}`
    );
    console.log("[CategoryPage] raw response:", data);
    return data?.data ?? data; // თუ data.data არ არის, დააბრუნე data
  };

  const {
    data: singleCategoryData,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<CompanyResponseType[], Error>({
    queryKey: ["singleCategoryData", slug],
    queryFn: fetchSingleCategoryData,
    enabled: !!slug,
  });

  console.log("[CategoryPage] isLoading:", isLoading);
  console.log("[CategoryPage] isError:", isError, "error:", error?.message);
  console.log(
    "[CategoryPage] singleCategoryData:",
    Array.isArray(singleCategoryData)
      ? `array(${singleCategoryData.length})`
      : typeof singleCategoryData,
    singleCategoryData
  );

  // Search
  const [searchTerm, setSearchTerm] = useState<string>("");
  const filteredCompanies = useMemo(() => {
    const source = singleCategoryData ?? [];
    if (!searchTerm.trim()) return source;
    const lower = searchTerm.toLowerCase();
    const filtered = source.filter((item) => {
      const ka = item.name_ka?.toLowerCase() ?? "";
      const en = item.name_en?.toLowerCase() ?? "";
      return ka.includes(lower) || en.includes(lower);
    });
    console.log("[CategoryPage] filteredCompanies:", filtered.length);
    return filtered;
  }, [singleCategoryData, searchTerm]);

  const breadcrumbData = [
    { label: scopedT("main"), href: "/" },
    { label: scopedT("allCategories"), href: routes.category.categories },
    { label: slug },
  ];

  if (isLoading) {
    return (
      <div className="container px-4 xl:px-0 max-w-7xl">
        <p>Loading...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container px-4 xl:px-0 max-w-7xl">
        <p className="text-red-500">Error: {error?.message}</p>
      </div>
    );
  }

  if (!singleCategoryData || singleCategoryData.length === 0) {
    console.log("[CategoryPage] No companies for category:", slug);
    return (
      <div className="container px-4 xl:px-0 max-w-7xl">
        <Breadcrumbs data={breadcrumbData} />
        <Separator className="mt-3 mb-8" />
        <p className="text-muted-foreground">
          ვერ მოიძებნა კომპანიები ამ კატეგორიაში.
        </p>
      </div>
    );
  }

  return (
    <div className="container px-4 xl:px-0 max-w-7xl">
      <div className="flex justify-between ">
        <Breadcrumbs data={breadcrumbData} />
      </div>
      <Separator className="mt-3 mb-8" />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-8">
        {filteredCompanies.map((company) => (
          <CompanyCard key={company.slug} company={company} />
        ))}
      </div>
    </div>
  );
};

export default SingleCategoryContainer;
