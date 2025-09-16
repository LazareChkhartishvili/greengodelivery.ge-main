"use client";
import axios from "axios";

const BASE = "http://127.0.0.1:8000/api/web";

export const cartApi = {
  async init(existing?: string): Promise<string> {
    if (existing) return existing;
    const { data } = await axios.post(`${BASE}/cart/init`, {});
    return data?.data?.token;
  },
  async get(token: string) {
    const { data } = await axios.get(`${BASE}/cart/${token}`);
    return data?.data; // { items, total_qty, total_price }
  },
  async add(token: string, productId: number, qty = 1) {
    const { data } = await axios.post(`${BASE}/cart/add`, {
      token,
      product_id: productId,
      qty,
    });
    return data?.data;
  },
  async update(token: string, productId: number, qty: number) {
    const { data } = await axios.post(`${BASE}/cart/update`, {
      token,
      product_id: productId,
      qty,
    });
    return data?.data;
  },
  async remove(token: string, productId: number) {
    const { data } = await axios.post(`${BASE}/cart/remove`, {
      token,
      product_id: productId,
    });
    return data?.data;
  },
  async clear(token: string) {
    const { data } = await axios.post(`${BASE}/cart/clear`, { token });
    return data?.data;
  },
};
