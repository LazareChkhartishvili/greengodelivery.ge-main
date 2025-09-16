"use client";
import { useState } from "react";
import { ProductType } from "@/types";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCurrentLocale } from "@/locales/client";
import { cartApi } from "@/lib/cart-api";
import { getCartTokenLS, setCartTokenLS } from "@/lib/cart-token";
import { ShoppingCart, Eye, Heart, Star } from "lucide-react";

function ProductCard({ product }: { product: ProductType }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function addToCart(product: any, qty = 1) {
    let token = getCartTokenLS();
    token = await cartApi.init(token || undefined);
    setCartTokenLS(token);
    await cartApi.add(token, product.id, qty);
    // სურვილისამებრ: toast ან Drawer გახსნა
  }

  const locale = useCurrentLocale();

  const [openDialog, setOpenDialog] = useState(false);
  return (
    <>
      <div
        onClick={() => setOpenDialog(true)}
        className="flex flex-row border rounded-lg hover:scale-[1.02] hover:border-primary/50 hover:shadow-lg cursor-pointer group transition-all duration-300 overflow-hidden bg-card"
      >
        <div className="aspect-square p-3 size-32 relative">
          <Image
            width={200}
            height={200}
            src={product.picture || "/fallback-image.jpg"}
            alt={locale === "ka" ? product.name_ka : product.name_en}
            className="w-full h-full rounded-lg object-cover transition duration-300 group-hover:scale-105"
          />
          {/* Quick view overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 rounded-lg flex items-center justify-center">
            <Eye className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-between p-3 transition duration-200 overflow-hidden">
          <div className="space-y-2">
            <div className="flex items-start justify-between">
              <h3 className="font-semibold text-sm leading-tight group-hover:text-primary transition duration-200 line-clamp-2">
                {locale === "ka" ? product.name_ka : product.name_en}
              </h3>
              <Heart className="w-4 h-4 text-muted-foreground hover:text-red-500 transition-colors duration-200 cursor-pointer" />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-primary">
                {product.price} ₾
              </span>
              {product.old_price && (
                <span className="text-sm text-muted-foreground line-through">
                  {product.old_price} ₾
                </span>
              )}
            </div>

            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-xs text-muted-foreground ml-1">(4.8)</span>
            </div>
          </div>

          <div className="space-y-3 mt-3">
            <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
              {locale === "ka"
                ? product.description_ka
                : product.description_en}
            </p>

            <button
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product);
              }}
              className="w-full z-40 cursor-pointer inline-flex items-center justify-center gap-2 rounded-lg bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:bg-primary/90 transition-colors duration-200 shadow-sm"
            >
              <ShoppingCart className="w-4 h-4" />
              კალათაში დამატება
            </button>
          </div>
        </div>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-[700px] overflow-hidden">
          <DialogHeader className="space-y-4">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-xl font-bold">
                {locale === "ka" ? product.name_ka : product.name_en}
              </DialogTitle>
              {/* <Heart className="w-5 h-5 text-muted-foreground hover:text-red-500 transition-colors duration-200 cursor-pointer" /> */}
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-primary">
                  {product.price} ₾
                </span>
                {product.old_price && (
                  <span className="text-lg text-muted-foreground line-through">
                    {product.old_price} ₾
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="text-sm text-muted-foreground ml-2">
                  (4.8)
                </span>
              </div>
            </div>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="aspect-square">
              <Image
                width={400}
                height={400}
                src={product.picture || "/fallback-image.jpg"}
                alt={locale === "ka" ? product.name_ka : product.name_en}
                className="w-full h-full rounded-lg object-cover"
              />
            </div>

            <div className="space-y-4">
              <DialogDescription className="text-base leading-relaxed">
                {locale === "ka"
                  ? product.description_ka
                  : product.description_en}
              </DialogDescription>

              <button
                onClick={() => addToCart(product)}
                className="w-full cursor-pointer transition-all hover:scale-105 duration-300 inline-flex items-center justify-center gap-2 rounded-lg bg-primary text-primary-foreground px-6 py-3 text-base font-medium hover:bg-primary/90 shadow-sm"
              >
                <ShoppingCart className="w-5 h-5" />
                კალათაში დამატება
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ProductCard;
