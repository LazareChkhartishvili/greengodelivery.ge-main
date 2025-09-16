"use client";
import Image from "next/image";
import { Card } from "../ui/card";
import { motion } from "framer-motion";
import { CompanyResponseType } from "@/types";
import Link from "next/link";
import { routes } from "@/config/routes";
import { useCurrentLocale } from "@/locales/client";

function CompanyCard({ company }: { company: CompanyResponseType }) {
  const locale = useCurrentLocale();
  return (
    <Link href={routes.company.singleCompany(company.slug)}>
      <Card key={company.slug} className="overflow-hidden cursor-pointer pt-0">
        <motion.div
          whileHover={{
            scale: 1.03,
            transition: { duration: 0.5 },
          }}
          whileTap={{ scale: 0.9 }}
        >
          <Image
            width={400}
            height={200}
            src={company.picture || "/fallback-image.jpg"}
            alt={
              company.name_ka || company.name_en || "Company Image" || "Test"
            }
            className="aspect-video w-full object-cover"
          />
          <h2 className="text-2xl p-4">{company.slug}</h2>
        </motion.div>

        <div className="ps-5">
          <p className="mb-1 font font-medium">
            {" "}
            {locale === "ka" ? company.name_ka : company.name_en}
          </p>
        </div>
      </Card>
    </Link>
  );
}

export default CompanyCard;
