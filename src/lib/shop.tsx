import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";
import { toast } from "sonner";
import { PRODUCTS, type Product } from "./products";

export type CartLine = { id: string; qty: number };

interface ShopValue {
  cart: CartLine[];
  wishlist: string[];
  cartCount: number;
  cartTotal: number;
  wishlistCount: number;
  addToCart: (id: string, qty?: number) => void;
  removeFromCart: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clearCart: () => void;
  toggleWishlist: (id: string) => void;
  inWishlist: (id: string) => boolean;
  cartItems: (Product & { qty: number })[];
}

const Ctx = createContext<ShopValue | null>(null);

const CART_KEY = "ab.shop.cart";
const WISH_KEY = "ab.shop.wishlist";

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);

  useEffect(() => {
    try {
      const c = localStorage.getItem(CART_KEY);
      const w = localStorage.getItem(WISH_KEY);
      if (c) setCart(JSON.parse(c));
      if (w) setWishlist(JSON.parse(w));
    } catch {}
  }, []);

  useEffect(() => { try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch {} }, [cart]);
  useEffect(() => { try { localStorage.setItem(WISH_KEY, JSON.stringify(wishlist)); } catch {} }, [wishlist]);

  const addToCart = useCallback((id: string, qty = 1) => {
    setCart((prev) => {
      const ex = prev.find((l) => l.id === id);
      if (ex) return prev.map((l) => (l.id === id ? { ...l, qty: l.qty + qty } : l));
      return [...prev, { id, qty }];
    });
    const p = PRODUCTS.find((p) => p.id === id);
    toast.success(`${p?.name ?? "Item"} added to cart`);
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart((prev) => prev.filter((l) => l.id !== id));
    toast.success("Removed from cart");
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    if (qty <= 0) return setCart((prev) => prev.filter((l) => l.id !== id));
    setCart((prev) => prev.map((l) => (l.id === id ? { ...l, qty } : l)));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const toggleWishlist = useCallback((id: string) => {
    setWishlist((prev) => {
      if (prev.includes(id)) {
        toast.success("Removed from wishlist");
        return prev.filter((x) => x !== id);
      }
      toast.success("Added to wishlist");
      return [...prev, id];
    });
  }, []);

  const inWishlist = useCallback((id: string) => wishlist.includes(id), [wishlist]);

  const cartItems = cart
    .map((l) => {
      const p = PRODUCTS.find((p) => p.id === l.id);
      return p ? { ...p, qty: l.qty } : null;
    })
    .filter(Boolean) as (Product & { qty: number })[];

  const cartCount = cart.reduce((s, l) => s + l.qty, 0);
  const cartTotal = cartItems.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <Ctx.Provider value={{
      cart, wishlist, cartCount, cartTotal, wishlistCount: wishlist.length,
      addToCart, removeFromCart, setQty, clearCart, toggleWishlist, inWishlist, cartItems,
    }}>
      {children}
    </Ctx.Provider>
  );
}

export function useShop() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useShop must be used within ShopProvider");
  return v;
}
