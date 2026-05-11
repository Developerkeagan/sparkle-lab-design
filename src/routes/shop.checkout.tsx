import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Lock, ArrowLeft, CheckCircle2 } from "lucide-react";
import { useShop } from "@/lib/shop";
import { fmt } from "@/lib/products";
import { toast } from "sonner";

export const Route = createFileRoute("/shop/checkout")({
  component: CheckoutPage,
  head: () => ({ meta: [{ title: "Checkout · Applied Biotech Shop" }] }),
});

function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useShop();
  const navigate = useNavigate();
  const [done, setDone] = useState(false);
  const shipping = cartTotal > 100000 || cartTotal === 0 ? 0 : 5000;
  const total = cartTotal + shipping;

  function placeOrder(e: React.FormEvent) {
    e.preventDefault();
    setDone(true);
    clearCart();
    toast.success("Order placed!");
  }

  if (done) {
    return (
      <section className="px-4 sm:px-6 lg:px-8 py-20">
        <div className="mx-auto max-w-md text-center bg-card border border-border rounded-3xl p-10">
          <div className="mx-auto h-16 w-16 rounded-full bg-emerald-500/10 text-emerald-600 grid place-items-center mb-4"><CheckCircle2 className="h-9 w-9" /></div>
          <h1 className="font-display text-3xl font-bold">Order confirmed</h1>
          <p className="mt-2 text-muted-foreground">Thanks! A confirmation email is on its way.</p>
          <Link to="/shop" className="mt-6 inline-flex items-center gap-2 rounded-full gradient-brand text-brand-foreground px-6 py-3 text-sm font-bold shadow-brand">Back to shop</Link>
        </div>
      </section>
    );
  }

  if (cartItems.length === 0) {
    return (
      <section className="px-4 sm:px-6 lg:px-8 py-20 text-center">
        <p className="text-muted-foreground">Your cart is empty.</p>
        <Link to="/shop" className="mt-4 inline-block text-brand font-semibold">Continue shopping →</Link>
      </section>
    );
  }

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-10">
      <div className="mx-auto max-w-6xl">
        <button onClick={() => navigate({ to: "/shop/cart" })} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-4">
          <ArrowLeft className="h-4 w-4" /> Back to cart
        </button>
        <h1 className="font-display text-3xl md:text-4xl font-bold">Checkout</h1>

        <form onSubmit={placeOrder} className="mt-8 grid lg:grid-cols-[1fr_360px] gap-8">
          <div className="space-y-8">
            <Section title="Contact">
              <Field label="Email"><input required type="email" className={input} /></Field>
              <Field label="Phone"><input required type="tel" className={input} /></Field>
            </Section>
            <Section title="Shipping address">
              <div className="grid sm:grid-cols-2 gap-3">
                <Field label="First name"><input required className={input} /></Field>
                <Field label="Last name"><input required className={input} /></Field>
              </div>
              <Field label="Address"><input required className={input} /></Field>
              <div className="grid sm:grid-cols-3 gap-3">
                <Field label="City"><input required className={input} /></Field>
                <Field label="State"><input required className={input} /></Field>
                <Field label="Postal code"><input required className={input} /></Field>
              </div>
            </Section>
            <Section title="Payment">
              <Field label="Card number"><input required placeholder="•••• •••• •••• ••••" className={input} /></Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Expiry"><input required placeholder="MM/YY" className={input} /></Field>
                <Field label="CVC"><input required placeholder="•••" className={input} /></Field>
              </div>
            </Section>
          </div>

          <aside className="bg-card border border-border rounded-2xl p-6 h-fit lg:sticky lg:top-36">
            <h3 className="font-display font-bold text-lg">Summary</h3>
            <div className="mt-4 space-y-3 max-h-64 overflow-y-auto">
              {cartItems.map((it) => (
                <div key={it.id} className="flex gap-3 text-sm">
                  <div className="h-12 w-12 rounded-lg overflow-hidden bg-secondary shrink-0"><img src={it.img} alt={it.name} className="w-full h-full object-cover" /></div>
                  <div className="flex-1 min-w-0">
                    <div className="line-clamp-1">{it.name}</div>
                    <div className="text-muted-foreground text-xs">Qty {it.qty}</div>
                  </div>
                  <div className="font-semibold">{fmt(it.price * it.qty)}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 border-t border-border pt-4 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span className="font-semibold">{fmt(cartTotal)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span className="font-semibold">{shipping === 0 ? "Free" : fmt(shipping)}</span></div>
              <div className="border-t border-border pt-2 flex justify-between text-base"><span className="font-semibold">Total</span><span className="font-display font-bold text-brand">{fmt(total)}</span></div>
            </div>
            <button type="submit" className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-full gradient-brand text-brand-foreground px-6 py-3 text-sm font-bold shadow-brand hover:scale-[1.02] transition-transform">
              <Lock className="h-4 w-4" /> Place order · {fmt(total)}
            </button>
          </aside>
        </form>
      </div>
    </section>
  );
}

const input = "w-full h-10 rounded-xl border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring";
function Field({ label, children }: any) { return <label className="block text-sm"><span className="font-medium">{label}</span><div className="mt-1.5">{children}</div></label>; }
function Section({ title, children }: any) {
  return <div className="bg-card border border-border rounded-2xl p-6 space-y-3"><h3 className="font-display font-bold text-lg">{title}</h3>{children}</div>;
}
