import CategoriesContainer from "@/components/pages/categories/categories-container"
import { Metadata } from "next"
export const metadata: Metadata = {
  title: "Greengo Delivery",
  description: "Greengo Delivery",
}

function CategoriesPage() {
  return (
    <section className="md:py-[6rem] py-[5rem]  flex items-center justify-center bg-muted">
      <CategoriesContainer />
    </section>
  )
}

export default CategoriesPage
