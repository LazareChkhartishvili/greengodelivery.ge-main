import React from "react"
import Template from "./template"

function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <Template>{children}</Template>
}

export default PublicLayout
