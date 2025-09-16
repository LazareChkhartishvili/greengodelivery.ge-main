/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useScopedI18n } from "@/locales/client"
import { DribbbleIcon, GithubIcon, TwitchIcon, TwitterIcon } from "lucide-react"
import Link from "next/link"

const FooterContainer = () => {
  const scopedT = useScopedI18n("footer")
  const footerLinks = [
    {
      title: scopedT("overview"),
      href: "#",
    },
    {
      title: scopedT("features"),
      href: "#",
    },
    {
      title: scopedT("pricing"),
      href: "#",
    },
    {
      title: scopedT("careers"),
      href: "#",
    },
    {
      title: scopedT("help"),
      href: "#",
    },
    {
      title: scopedT("privacy"),
      href: "#",
    },
  ]

  return (
    <div className="flex flex-col bg-muted">
      <div className="grow bg-muted" />
      <footer>
        <div className="max-w-screen-xl mx-auto">
          <div className="py-12 flex flex-col sm:flex-row items-start justify-between gap-x-8 gap-y-10 px-6 xl:px-0">
            <div>
              {/* Logo */}

              <ul className="mt-6 flex items-center gap-4 flex-wrap">
                {footerLinks.map(({ title, href }) => (
                  <li key={title}>
                    <Link
                      href={href}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      {title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Subscribe Newsletter */}
            {/*      <div className="max-w-xs w-full">
              <h6 className="font-semibold">{scopedT("stayUpToDate")}</h6>
              <form className="mt-6 flex items-center gap-2">
                <Input
                  className=" bg-white dark:bg-background "
                  type="email"
                  placeholder={scopedT("enterYourEmail")}
                />
                <Button className="text-white">{scopedT("subscribe")}</Button>
              </form>
            </div> */}
          </div>
          <Separator />
          <div className="pt-8 pb-20 flex flex-col-reverse sm:flex-row items-center justify-between gap-x-2 gap-y-5 px-6 xl:px-0">
            {/* Copyright */}
            <span className="text-muted-foreground">
              &copy; {new Date().getFullYear()}{" "}
              <Link href="/" target="_blank">
                Greengo Delivery
              </Link>
              . All rights reserved.
            </span>

            <div className="flex items-center gap-5 text-muted-foreground">
              <Link href="#" target="_blank">
                <TwitterIcon className="h-5 w-5" />
              </Link>
              <Link href="#" target="_blank">
                <DribbbleIcon className="h-5 w-5" />
              </Link>
              <Link href="#" target="_blank">
                <TwitchIcon className="h-5 w-5" />
              </Link>
              <Link href="#" target="_blank">
                <GithubIcon className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default FooterContainer
