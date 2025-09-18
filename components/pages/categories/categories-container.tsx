/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React from "react";
import CategoryCard from "@/components/shared/category-card";
import { Separator } from "@/components/ui/separator";
import { SquareDashedMousePointer } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CategoryResponseType } from "@/types";
import CategoryCardSkeleton from "@/components/shared/category-card-skeleton";
import Breadcrumbs from "@/components/shared/breadcrumbs";
import { useScopedI18n } from "@/locales/client";

const CategoriesContainer: React.FC = () => {
  const scopedT = useScopedI18n("categoryPage");
  const fetchCategoryListData = async (): Promise<CategoryResponseType[]> => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/web/home/category-list`
    );
    return data.data;
  };

  const {
    data: categoryListData,
    isLoading,
    isError,
    refetch,
  } = useQuery<CategoryResponseType[]>({
    queryKey: ["categoryListData"],
    queryFn: fetchCategoryListData,
  });

  const breadcrumbData = [
    { label: scopedT("main"), href: "/" },
    { label: scopedT("allCategories") },
  ];

  return (
    <div className="container px-4 xl:px-0 max-w-7xl">
      {/* <div className="flex items-center justify-between text-sm sm:hidden">
        <div className="flex items-center w-full gap-1 pt-14 lg:pt-0 text-muted-foreground">
          <SquareDashedMousePointer className="size-5 text-primary" />
          <p className="text-2xl font lg:text-3xl">ყველა კატეგორია</p>
        </div>
      </div> */}
      <Breadcrumbs data={breadcrumbData} />
      <Separator className="mt-3 mb-8" />
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-8">
        {isLoading ? (
          <>
            {Array.from({ length: 4 }).map((_, index) => (
              <CategoryCardSkeleton key={index} />
            ))}
          </>
        ) : (
          categoryListData?.map((category) => (
            <CategoryCard key={category.slug} category={category} />
          ))
        )}
      </div>
    </div>
  );
};

export default CategoriesContainer;
