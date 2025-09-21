"use client";
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { cartApi } from "@/lib/cart-api";
import { getCartTokenLS, setCartTokenLS } from "@/lib/cart-token";

interface CartContextType {
  totalQty: number;
  totalPrice: number;
  refreshCart: () => Promise<void>;
  addToCart: (productId: number, qty?: number) => Promise<void>;
  updateCart: (productId: number, qty: number) => Promise<void>;
  removeFromCart: (productId: number) => Promise<void>;
  clearCart: () => Promise<void>;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [totalQty, setTotalQty] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const refreshCart = useCallback(async () => {
    const token = getCartTokenLS();
    if (!token) return;
    try {
      const cart = await cartApi.get(token);
      setTotalQty(cart?.total_qty || 0);
      setTotalPrice(cart?.total_price || 0);
    } catch (error) {
      console.error("Failed to refresh cart:", error);
    }
  }, []);

  const addToCart = useCallback(
    async (productId: number, qty = 1) => {
      try {
        let token = getCartTokenLS();
        token = await cartApi.init(token || undefined);
        setCartTokenLS(token);
        await cartApi.add(token, productId, qty);
        await refreshCart();
        setIsCartOpen(true); // Auto-open cart after adding
      } catch (error) {
        console.error("Failed to add to cart:", error);
      }
    },
    [refreshCart]
  );

  const updateCart = useCallback(
    async (productId: number, qty: number) => {
      try {
        const token = getCartTokenLS();
        if (!token) return;
        await cartApi.update(token, productId, qty);
        await refreshCart();
      } catch (error) {
        console.error("Failed to update cart:", error);
      }
    },
    [refreshCart]
  );

  const removeFromCart = useCallback(
    async (productId: number) => {
      try {
        const token = getCartTokenLS();
        if (!token) return;
        await cartApi.remove(token, productId);
        await refreshCart();
      } catch (error) {
        console.error("Failed to remove from cart:", error);
      }
    },
    [refreshCart]
  );

  const clearCart = useCallback(async () => {
    try {
      const token = getCartTokenLS();
      if (!token) return;
      await cartApi.clear(token);
      await refreshCart();
    } catch (error) {
      console.error("Failed to clear cart:", error);
    }
  }, [refreshCart]);

  // Initialize cart on mount
  useEffect(() => {
    (async () => {
      const existing = getCartTokenLS();
      const token = await cartApi.init(existing || undefined);
      setCartTokenLS(token);
      await refreshCart();
    })();
  }, [refreshCart]);

  const value: CartContextType = {
    totalQty,
    totalPrice,
    refreshCart,
    addToCart,
    updateCart,
    removeFromCart,
    clearCart,
    isCartOpen,
    setIsCartOpen,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
