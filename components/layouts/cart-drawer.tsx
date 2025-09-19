"use client";
import { X, Plus, Minus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import { cartApi } from "@/lib/cart-api";
import { getCartTokenLS } from "@/lib/cart-token";

interface CartDrawerProps {
  onClose: () => void;
  onCartChange?: (totalQty: number) => void;
}
type CartItem = {
  id: number;
  product_id: number;
  slug?: string;
  name_ka?: string | null;
  name_en?: string | null;
  price: number | string | null;
  qty: number;
  picture?: string | null;
};

export const CartDrawer = ({ onClose, onCartChange }: CartDrawerProps) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const refresh = useCallback(async () => {
    const token = getCartTokenLS();
    if (!token) return;
    const cart = await cartApi.get(token);
    setItems(cart?.items || []);
    setTotalPrice(cart?.total_price || 0);
    onCartChange?.(cart?.total_qty || 0);
  }, [onCartChange]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const inc = async (productId: number) => {
    const token = getCartTokenLS();
    if (!token) return;
    const current = items.find((i) => i.product_id === productId)?.qty || 0;
    await cartApi.update(token, productId, current + 1);
    await refresh();
  };
  const dec = async (productId: number) => {
    const token = getCartTokenLS();
    if (!token) return;
    const current = items.find((i) => i.product_id === productId)?.qty || 0;
    const next = Math.max(0, current - 1);
    if (next === 0) await cartApi.remove(token, productId);
    else await cartApi.update(token, productId, next);
    await refresh();
  };
  const remove = async (productId: number) => {
    const token = getCartTokenLS();
    if (!token) return;
    await cartApi.remove(token, productId);
    await refresh();
  };
  const clear = async () => {
    const token = getCartTokenLS();
    if (!token) return;
    await cartApi.clear(token);
    await refresh();
  };

  return (
    <div className="fixed right-0 top-0 h-full w-full max-w-[722px] bg-background text-foreground border-l border-border z-50 shadow-xl animate-slideIn flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h2 className="text-xl font-bold">თქვენი შეკვეთა</h2>
        <div className="flex items-center gap-2">
          {items.length > 0 && (
            <button
              onClick={clear}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              გასუფთავება
            </button>
          )}
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-muted transition-colors"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {items.length === 0 ? (
          <p className="text-muted-foreground">კალათა ცარიელია</p>
        ) : (
          items.map((it) => (
            <div
              key={it.product_id}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <Image
                  src={it.picture || "/fallback-image.svg"}
                  alt={it.name_ka || it.name_en || "product"}
                  width={60}
                  height={60}
                  className="rounded-md object-cover"
                />
                <div>
                  <p className="font-medium">
                    {it.name_ka || it.name_en || it.slug}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {Number(it.price || 0).toFixed(2)} ₾
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 border border-border rounded-lg px-2 py-1">
                  <button
                    onClick={() => dec(it.product_id)}
                    className="p-1 hover:bg-muted rounded transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span>{it.qty}</span>
                  <button
                    onClick={() => inc(it.product_id)}
                    className="p-1 hover:bg-muted rounded transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <button
                  onClick={() => remove(it.product_id)}
                  className="p-2 hover:bg-muted rounded transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="p-4 border-t border-border space-y-3">
        <div className="flex items-center justify-between text-lg">
          <span>ჯამი</span>
          <span className="font-semibold">
            {Number(totalPrice).toFixed(2)} ₾
          </span>
        </div>
        <button className="w-full bg-primary hover:bg-primary/90 transition-colors text-primary-foreground font-semibold py-3 rounded-lg">
          დასრულება შეკვეთა
        </button>
      </div>
    </div>
  );
};
