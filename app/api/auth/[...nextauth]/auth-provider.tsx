"use client"

import { SessionProvider } from "next-auth/react"

export default function AuthProvider({
  children,
  session,
}: {
  children: React.ReactNode
  session: undefined
}): React.ReactNode {
  return <SessionProvider session={session}>{children}</SessionProvider>
}
