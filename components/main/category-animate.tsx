"use client"
import React from "react"
import { motion } from "framer-motion"

function CategoryAnimate({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <motion.div
      initial={{ y: 500, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 2.5 }}
    >
      {children}
    </motion.div>
  )
}

export default CategoryAnimate
