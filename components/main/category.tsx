/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { routes } from "@/config/routes";
import { Separator } from "@/components/ui/separator";
import { IconShoppingCart } from "@tabler/icons-react";
import {
  ChevronRight,
  SquareDashedMousePointer,
  Pill,
  Flower2,
  ChefHat,
  PackageOpen,
} from "lucide-react";
import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";
import { useScopedI18n } from "@/locales/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CategoryResponseType } from "@/types";
import CategoryCard from "../shared/category-card";

type Step = {
  title: string;
  description: string;
  icon: React.ReactNode;
};
const steps: Step[] = [
  {
    title: "საკვები",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    icon: (
      <ChefHat className="size-10 stroke-white transition-all ease-in-out group-hover:size-12" />
    ),
  },
  {
    title: "გზავნილები",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    icon: (
      <PackageOpen className="size-10 stroke-white transition-all ease-in-out group-hover:size-12" />
    ),
  },
  {
    title: "აფთიაქი",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    icon: (
      <Pill className="size-10 stroke-white transition-all ease-in-out group-hover:size-12" />
    ),
  },
  {
    title: "სურსათი",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    icon: (
      <IconShoppingCart className="size-10 stroke-white transition-all ease-in-out group-hover:size-12" />
    ),
  },
  {
    title: "ყვავილები",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    icon: (
      <Flower2 className="size-10 stroke-white transition-all ease-in-out group-hover:size-12" />
    ),
  },
];

const CategoryContainer = () => {
  const scopedT = useScopedI18n("mainPage");

  const fetchCategoryListData = async (): Promise<CategoryResponseType[]> => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/web/home/category-list`
    );
    return data.data;
  };

  // Test Comment

  const {
    data: categoryListData,
    isLoading,
    isError,
    refetch,
  } = useQuery<CategoryResponseType[]>({
    queryKey: ["categoryListData"],
    queryFn: fetchCategoryListData,
  });
  return (
    <section className="lg:py-32 py-10 flex items-center justify-center bg-muted">
      <div className="container px-4 xl:px-0 max-w-7xl">
        <div className="flex items-center justify-between text-sm ">
          <div className="flex items-center gap-1 font-medium  sm:text-3xl font pt-1 ">
            <p> {scopedT("popularCategories")}</p>
          </div>
          <Link
            href={routes.category.categories}
            className="bg-green-50 hover:bg-green-100   dark:hover:bg-primary/90  text-primary py-1 px-3 rounded-md flex items-center dark:bg-primary dark:text-white text-xs font sm:text-sm"
          >
            {scopedT("viewAll")}
          </Link>
        </div>
        <Separator className="mt-3 mb-8 dark:bg-slate-700/70" />

        <div className="grid grid-cols-1 w-full sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 xl:grid-cols-5 ">
          {categoryListData?.map((category) => (
            <CategoryCard key={category.slug} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryContainer;
