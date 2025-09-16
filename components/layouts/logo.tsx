import Image from "next/image"
import Link from "next/link"

export const Logo = () => (
  <Link href="/">
    <div className="h-10 w-10 ">
      <Image
        className="shrink-0 border rounded-full"
        src={"/images/logo.png"}
        alt="Logo"
        width={200}
        height={200}
      />
    </div>
  </Link>
)
