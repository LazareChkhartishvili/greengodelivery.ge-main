import SingleCategoryContainer from "@/components/pages/single-category/single-category-container"
import { Metadata } from "next"
export const metadata: Metadata = {
  title: "Greengo Delivery",
  description: "Greengo Delivery",
}

function SingleCategoryPage() {
  return (
    <section className="md:py-[6rem] py-[5rem] flex items-center justify-center bg-muted">
      <SingleCategoryContainer />
    </section>
  )
}

export default SingleCategoryPage
