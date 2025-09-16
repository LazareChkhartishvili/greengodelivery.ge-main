"use client"
import React from "react"
import { Button } from "../ui/button"
import { signOut } from "next-auth/react"
import { Phone } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

import { SessionUser } from "@/types"
import Link from "next/link"
import { useScopedI18n } from "@/locales/client"

function HeaderButtons({ session }: { session: SessionUser | null }) {
  const scopedT = useScopedI18n("header")
  const nameInitialsHandler = (name: string) => {
    const nameParts = name.split(" ")
    if (nameParts.length > 1) {
      return nameParts[0][0] + nameParts[1][0]
    }
    return nameParts[0][0]
  }
  return (
    <>
      {session ? (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
              <AvatarFallback>
                {nameInitialsHandler(session?.user?.data?.name)}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>
              <Link href="/dashboard">ჩემი პროფილი</Link>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => signOut()}>
              გასვლა
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button
          type="button"
          aria-label="Login"
          className="rounded-full text-white cursor-pointer"
        >
          <a
            className="flex gap-2 items-center justify-center"
            href="tel:+995598401240"
          >
            <Phone className="mt-0.5" />
            <p className="md:block hidden"> {scopedT("call")}</p>
          </a>
          {/*     <Link href="/login">{scopedT("signIn")}</Link> */}
        </Button>
      )}
    </>
  )
}

export default HeaderButtons
