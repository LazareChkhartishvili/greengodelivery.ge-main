"use client";

export function getCartTokenLS(): string | null {
  try {
    return localStorage.getItem("gg-cart-token");
  } catch {
    return null;
  }
}
export function setCartTokenLS(token: string) {
  try {
    localStorage.setItem("gg-cart-token", token);
  } catch {}
}
