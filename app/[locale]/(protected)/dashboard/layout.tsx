import FooterContainer from "@/components/layouts/footer"
import HeaderContainer from "@/components/layouts/header"

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
