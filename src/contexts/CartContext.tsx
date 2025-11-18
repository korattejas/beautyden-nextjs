"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { BookingService } from "@/types/booking";

export interface CartItem extends BookingService {
  quantity?: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (service: BookingService) => void;
  removeItem: (serviceId: string) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = "beautyden_cart";

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartItem[];
        setItems(parsed);
      }
    } catch (e) {
      console.error("Failed to load cart from storage", e);
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error("Failed to persist cart to storage", e);
    }
  }, [items]);

  const addItem = React.useCallback((service: BookingService) => {
    setItems((prev) => {
      const exists = prev.find((i) => i.id === service.id);
      if (exists) return prev; // avoid duplicates for services; they are unique selections
      return [...prev, { ...service, quantity: 1 }];
    });
  }, []);

  const removeItem = React.useCallback((serviceId: string) => {
    setItems((prev) => prev.filter((i) => i.id !== serviceId));
  }, []);

  const clearCart = () => setItems([]);

  const totalItems = items.length;
  const totalPrice = useMemo(() => {
    return items.reduce((sum: number, s) => {
      const priceStr = s.price || s.discount_price || "0";
      // Extract first number from price string (handles "300" or "300-500" format)
      const priceMatch = priceStr.toString().match(/(\d+)/);
      const price = priceMatch ? parseFloat(priceMatch[1]) : 0;
      return sum + price;
    }, 0);
  }, [items]);

  const value: CartContextType = {
    items,
    addItem,
    removeItem,
    clearCart,
    totalItems,
    totalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = (): CartContextType => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};


