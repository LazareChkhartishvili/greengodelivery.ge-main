import CategoryContainer from "@/components/main/category"
import ObjectContainer from "@/components/main/object"
import SlideContainer from "@/components/main/slide"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Greengo Delivery",
  description: "Greengo Delivery",
}

export default function Home() {
  return (
    <>
      <SlideContainer />
      <CategoryContainer />
      <ObjectContainer />
    </>
  )
}
