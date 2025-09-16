import FooterContainer from "@/components/layouts/footer"
import HeaderContainer from "@/components/layouts/header"
import React from "react"

function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <HeaderContainer />
      {children}
      <FooterContainer />
    </>
  )
}

export default PublicLayout
