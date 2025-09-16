import SingleCompanyContainer from "@/components/pages/single-company/single-company-container"
import { Metadata } from "next"
export const metadata: Metadata = {
  title: "Greengo Delivery",
  description: "Greengo Delivery",
}

function SingleCompany() {
  return (
    <section className="md:py-[6rem] py-[8rem]  flex items-center justify-center bg-muted">
      <SingleCompanyContainer />
    </section>
  )
}

export default SingleCompany
