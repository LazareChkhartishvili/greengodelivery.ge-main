"use client"
import React from "react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Button } from "../ui/button"
import { useChangeLocale, useCurrentLocale } from "@/locales/client"
import { LanguagesIcon } from "lucide-react"

function LangSwitcher() {
  const locale = useCurrentLocale()
  const changeLocale = useChangeLocale()

  return (
    <div className="flex gap-2 ">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="cursor-pointer "
            variant="outline"
            aria-label="Language"
          >
            <LanguagesIcon className="h-5 w-5 " />
            <p className="md:block hidden"> {locale.toUpperCase()}</p>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="font ">
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={changeLocale.bind(null, "ka")}
          >
            KA - ქართული
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={changeLocale.bind(null, "en")}
          >
            EN - English
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default LangSwitcher
