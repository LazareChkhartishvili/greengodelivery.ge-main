import React from "react"

import { IconLoader2 } from "@tabler/icons-react"

function Loader({ className }: { className?: string }) {
  return (
    <div
      className={`${className} h-dvh w-full flex items-center justify-center text-3xl`}
    >
      <IconLoader2 size={96} stroke={1} className="animate-spin text-black" />
    </div>
  )
}

export default Loader
