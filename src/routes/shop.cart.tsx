import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useShop } from "@/lib/shop";
import { fmt } from "@/lib/products";

export const Route = createFileRoute("/shop/cart")({
  component: CartPage,
  head: () => ({ meta: [{ title: "Your Cart · Applied Biotech Shop" }] }),
});

function CartPage() {
  const { cartItems, cartTotal, setQty, removeFromCart, clearCart } = useShop();
  const shipping = cartTotal > 100000 ? 0 : cartTotal === 0 ? 0 : 5000;
  const total = cartTotal + shipping;

  if (cartItems.length === 0) {
    return (
      <section className="px-4 sm:px-6 lg:px-8 py-20">
        <div className="mx-auto max-w-md text-center">
          <div className="mx-auto h-20 w-20 rounded-full bg-secondary grid place-items-center mb-6"><ShoppingBag className="h-10 w-10 text-muted-foreground" /></div>
          <h1 className="font-display text-3xl font-bold">Your cart is empty</h1>
          <p className="mt-2 text-muted-foreground">Start adding lab essentials to see them here.</p>
          <Link to="/shop" className="mt-6 inline-flex items-center gap-2 rounded-full gradient-brand text-brand-foreground px-6 py-3 text-sm font-bold shadow-brand hover:scale-105 transition-transform">
            Continue shopping <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-brand font-bold">Cart</div>
            <h1 className="font-display text-3xl md:text-4xl font-bold mt-1">Your Cart ({cartItems.length})</h1>
          </div>
          <button onClick={clearCart} className="text-sm font-medium text-muted-foreground hover:text-destructive">Clear cart</button>
        </div>

        <div className="grid lg:grid-cols-[1fr_360px] gap-8">
          <div className="space-y-3">
            {cartItems.map((it) => (
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
            ))}
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
      </div>
    </section>
  );
}
