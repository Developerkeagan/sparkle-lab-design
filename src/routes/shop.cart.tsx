import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Loader2 } from "lucide-react";
import { useShop } from "@/lib/shop";
import { fmt } from "@/lib/products";
import { useState, useEffect, useMemo } from "react";
import useFetch from "@/hooks/useFetch";
import { toast } from "sonner";

export const Route = createFileRoute("/shop/cart")({
  component: CartPage,
  head: () => ({ meta: [{ title: "Your Cart · Applied Biotech Shop" }] }),
});

function CartPage() {
  const { cartItems: cart, setQty, removeFromCart, clearCart } = useShop();
  const [products, setProducts] = useState<any[]>([]);
  const { loading, fetchData } = useFetch();

  // Rehydrate the cart items by matching local IDs with live product data
  useEffect(() => {
    console.log("Cart State (Local):", cart);
    fetchData("/api/v1/shop/products").then(res => {
      console.log("Fetched Products (Server):", res);
      
      if (!res) {
        toast.error("Failed to sync cart: No response from server.");
        return;
      }

      // Accept multiple response shapes: array, { data: [...] }, { products: [...] }
      const list = Array.isArray(res) ? res : (res.data || res.products || []);
      
      if (Array.isArray(list) && list.length > 0) {
        setProducts(list);
      } else {
        toast.error("The product registry is empty. Items cannot be synchronized.");
      }
    });
  }, [fetchData]);
  
  const items = useMemo(() => {
    return cart.map((c: any) => {
      const lookupKey = c.id || c.product || c.productId || c._id;
      const p = products.find(x => x._id === lookupKey || x.id === lookupKey);
      return {
        id: lookupKey || c.id || c.product || c.productId || c._id,
        name: p?.productName || p?.name || c.name || "Loading...",
        price: Number(p?.price ?? p?.salePrice ?? c.price ?? 0),
        img: p?.productImage || p?.image || c.img || "",
        category: p?.category || p?.productCategory || c.category || "",
        qty: typeof c.qty === "number" ? c.qty : (c.quantity ?? 1),
        ...c,
      };
    });
  }, [cart, products]);
  
  const cartTotal = useMemo(() => items.reduce((acc: number, it: any) => acc + (it.price * it.qty), 0), [items]);

  const shipping = cartTotal > 100000 || cartTotal === 0 ? 0 : 5000;
  const total = cartTotal + shipping;

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-brand font-bold">Cart</div>
            <h1 className="font-display text-3xl md:text-4xl font-bold mt-1">Your Cart ({cart.length})</h1>
          </div>
          {cart.length > 0 && (
            <button onClick={clearCart} className="text-sm font-medium text-muted-foreground hover:text-destructive">Clear cart</button>
          )}
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-20">
            <div className="mx-auto h-20 w-20 rounded-full bg-secondary grid place-items-center mb-6"><ShoppingBag className="h-10 w-10 text-muted-foreground" /></div>
            <h2 className="font-display text-3xl font-bold">Your cart is empty</h2>
            <p className="mt-2 text-muted-foreground">Start adding lab essentials to see them here.</p>
            <Link to="/shop" className="mt-6 inline-flex items-center gap-2 rounded-full gradient-brand text-brand-foreground px-6 py-3 text-sm font-bold shadow-brand hover:scale-105 transition-transform">
              Continue shopping <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1fr_360px] gap-8">
            <div className="space-y-3">
              {loading && products.length === 0 ? (
                Array.from({ length: cart.length }).map((_, idx) => (
                  <div key={idx} className="bg-card border border-border rounded-2xl p-3 sm:p-4 flex gap-4 animate-pulse">
                    <div className="h-24 w-24 sm:h-28 sm:w-28 rounded-xl bg-muted shrink-0" />
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div className="h-4 bg-muted rounded w-3/4" />
                      <div className="h-3 bg-muted rounded w-1/2 mt-1" />
                      <div className="flex items-center justify-between gap-3 pt-3">
                        <div className="h-8 w-24 bg-muted rounded-full" />
                        <div className="h-6 w-20 bg-muted rounded" />
                        <div className="h-8 w-8 bg-muted rounded-full" />
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                items.map((it) => (
                  <div key={it.id} className="bg-card border border-border rounded-2xl p-3 sm:p-4 flex gap-4">
                    <Link to="/shop/product/$id" params={{ id: it.id }} className="h-24 w-24 sm:h-28 sm:w-28 rounded-xl overflow-hidden bg-secondary shrink-0">
                      <img src={it.img} alt={it.name} className="w-full h-full object-cover" />
                    </Link>
                    <div className="flex-1 min-w-0 flex flex-col">
                      <Link to="/shop/product/$id" params={{ id: it.id }} className="font-semibold text-foreground line-clamp-2 hover:text-brand">{it.name}</Link>
                      <div className="text-xs text-muted-foreground capitalize mt-0.5">{it.category}</div>
                      <div className="mt-auto flex items-center justify-between gap-3 pt-3">
                        <div className="inline-flex items-center rounded-full border border-border">
                          <button onClick={() => setQty(it.id, it.qty - 1)} className="h-8 w-8 grid place-items-center hover:bg-accent rounded-l-full"><Minus className="h-3.5 w-3.5" /></button>
                          <span className="px-3 text-sm font-semibold tabular-nums">{it.qty}</span>
                          <button onClick={() => setQty(it.id, it.qty + 1)} className="h-8 w-8 grid place-items-center hover:bg-accent rounded-r-full"><Plus className="h-3.5 w-3.5" /></button>
                        </div>
                        <div className="font-display font-bold">{fmt(it.price * it.qty)}</div>
                        <button onClick={() => removeFromCart(it.id)} aria-label="Remove" className="h-8 w-8 grid place-items-center rounded-full hover:bg-destructive/10 text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <aside className="bg-card border border-border rounded-2xl p-6 h-fit lg:sticky lg:top-36">
              <h3 className="font-display font-bold text-lg">Order summary</h3>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span className="font-semibold">{fmt(cartTotal)}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span className="font-semibold">{shipping === 0 ? "Free" : fmt(shipping)}</span></div>
                <div className="border-t border-border pt-3 flex justify-between text-base"><span className="font-semibold">Total</span><span className="font-display font-bold text-brand">{fmt(total)}</span></div>
              </div>
              <Link to="/shop/checkout" className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-full gradient-brand text-brand-foreground px-6 py-3 text-sm font-bold shadow-brand hover:scale-[1.02] transition-transform">
                Checkout <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/shop" className="mt-2 w-full inline-flex items-center justify-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold hover:bg-accent">
                Continue shopping
              </Link>
            </aside>
          </div>
        )}
      </div>
    </section>
  );
}
