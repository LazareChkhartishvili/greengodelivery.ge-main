import CompaniesContainer from "@/components/pages/companies/companies-container"
import { Metadata } from "next"
export const metadata: Metadata = {
  title: "Greengo Delivery",
  description: "Greengo Delivery",
}

function Companies() {
  return (
    <section className="md:py-[6rem] py-[5rem] flex items-center justify-center bg-muted">
      <CompaniesContainer />
    </section>
  )
}

export default Companies
