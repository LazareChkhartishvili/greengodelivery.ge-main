"use client"
import { useState } from "react"
import { ProductType } from "@/types"
import Image from "next/image"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useCurrentLocale } from "@/locales/client"

function ProductCard({ product }: { product: ProductType }) {
  const locale = useCurrentLocale()

  const [openDialog, setOpenDialog] = useState(false)
  return (
    <>
      <div
        onClick={() => setOpenDialog(true)}
        className="flex flex-row border rounded-md hover:scale-103 hover:border-primary cursor-pointer group transition duration-200 overflow-hidden"
      >
        <div className="aspect-square p-2 size-32 ">
          <Image
            width={200}
            height={200}
            src={product.picture || "/fallback-image.jpg"}
            alt={locale === 'ka' ? product.name_ka : product.name_en}
            className="w-full h-full rounded-md object-cover transition duration-200"
          />
        </div>

        <div className="flex flex-1 flex-col items-start mt-1  transition duration-200 overflow-hidden">
          <p className="w-full text-left font-medium font group-hover:text-primary transition duration-200 truncate">
           {locale === 'ka' ? product.name_ka : product.name_en}
          </p>
          <div className="flex items-center ">
            <p className="text-sm text-muted-foreground">{product.price} ₾</p>
            {product.old_price && (
              <p className="text-xs text-muted-foreground line-through ml-2">
                {product.old_price} ₾
              </p>
            )}
          </div>

          <Separator className="my-1  w-full" />
          <p className="text-xs text-muted-foreground line-clamp-4 mb-2">
            {locale === 'ka' ? product.description_ka : product.description_en}
          </p>
        </div>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-[625px] overflow-hidden">
          <DialogHeader>
            <div className="flex flex-1 flex-col items-start mt-1 transition duration-200 overflow-hidden">
              <DialogTitle>
                <p> {locale === 'ka' ? product.name_ka : product.name_en}</p>

                <div className="flex items-center mt-0.5">
                  <p className="text-sm text-muted-foreground">
                    {product.price} ₾
                  </p>
                  {product.old_price && (
                    <p className="text-xs text-muted-foreground line-through ml-2">
                      {product.old_price} ₾
                    </p>
                  )}
                </div>
              </DialogTitle>
              <Separator className="my-1 w-full" />
              <DialogDescription> {locale === 'ka' ? product.description_ka : product.description_en}</DialogDescription>
            </div>
          </DialogHeader>
          <div className="aspect-square   ">
            <Image
              width={400}
              height={400}
              src={product.picture || "/fallback-image.jpg"}
              alt=  {locale === 'ka' ? product.name_ka : product.name_en}
              className="w-full h-full rounded-md object-cover transition duration-200"
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default ProductCard
