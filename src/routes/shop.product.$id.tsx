import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Star, Heart, Plus, Minus, ShoppingBag, Truck, ShieldCheck, RotateCcw, ArrowLeft } from "lucide-react";
import { getProduct, fmt, PRODUCTS } from "@/lib/products";
import { useShop } from "@/lib/shop";
import { ProductCard } from "@/components/shop/ProductCard";

export const Route = createFileRoute("/shop/product/$id")({
  component: ProductDetail,
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [
      { title: `${loaderData.product.name} · Applied Biotech Shop` },
      { name: "description", content: loaderData.product.description },
    ] : [],
  }),
  errorComponent: ({ error }) => <div className="p-10 text-center text-destructive">{error.message}</div>,
  notFoundComponent: () => (
    <div className="p-20 text-center">
      <h1 className="font-display text-3xl font-bold">Product not found</h1>
      <Link to="/shop" className="mt-4 inline-block text-brand font-semibold">Back to shop →</Link>
    </div>
  ),
});

function ProductDetail() {
  const { product } = Route.useLoaderData();
  const { addToCart, toggleWishlist, inWishlist } = useShop();
  const [qty, setQty] = useState(1);
  const wished = inWishlist(product.id);
  const sameCat = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id);
  const fillers = PRODUCTS.filter((p) => p.id !== product.id && !sameCat.some((s) => s.id === p.id));
  const related = [...sameCat, ...fillers].slice(0, 4);

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-10">
      <div className="mx-auto max-w-7xl">
        <Link to="/shop" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6"><ArrowLeft className="h-4 w-4" /> All products</Link>

        <div className="grid lg:grid-cols-2 gap-10">
          <div className="rounded-3xl overflow-hidden bg-secondary aspect-square">
            <img src={product.img} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-brand font-bold">{product.category}</div>
            <h1 className="font-display text-3xl md:text-4xl font-bold mt-2">{product.name}</h1>
            <div className="mt-3 flex items-center gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`h-4 w-4 ${i < product.rating ? "fill-accent-cyan text-accent-cyan" : "text-border"}`} />
              ))}
              <span className="text-sm text-muted-foreground">({product.rating}.0)</span>
            </div>

            <div className="mt-5 flex items-end gap-3">
              <div className="font-display font-extrabold text-4xl text-foreground">{fmt(product.price)}</div>
              {product.oldPrice && <div className="text-base text-muted-foreground line-through pb-1">{fmt(product.oldPrice)}</div>}
            </div>

            <p className="mt-5 text-foreground/80 leading-relaxed">{product.description}</p>

            <div className="mt-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 text-xs font-semibold">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> {product.stock} in stock
            </div>

            <div className="mt-7 flex items-center gap-3">
              <div className="inline-flex items-center rounded-full border border-border">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="h-11 w-11 grid place-items-center hover:bg-accent rounded-l-full"><Minus className="h-4 w-4" /></button>
                <span className="px-4 text-base font-semibold tabular-nums">{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} className="h-11 w-11 grid place-items-center hover:bg-accent rounded-r-full"><Plus className="h-4 w-4" /></button>
              </div>
              <button onClick={() => addToCart(product.id, qty)} className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-full gradient-brand text-brand-foreground px-7 py-3 text-sm font-bold shadow-brand hover:scale-[1.02] transition-transform">
                <ShoppingBag className="h-4 w-4" /> Add to cart
              </button>
              <button onClick={() => toggleWishlist(product.id)} aria-label="Wishlist" className={`h-11 w-11 grid place-items-center rounded-full border border-border transition-colors ${wished ? "bg-brand text-brand-foreground border-brand" : "hover:bg-accent"}`}>
                <Heart className={`h-4 w-4 ${wished ? "fill-current" : ""}`} />
              </button>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-3 text-xs">
              <div className="flex items-center gap-2 p-3 rounded-xl bg-card border border-border"><Truck className="h-4 w-4 text-brand" /> Free over ₦100k</div>
              <div className="flex items-center gap-2 p-3 rounded-xl bg-card border border-border"><ShieldCheck className="h-4 w-4 text-brand" /> Secure pay</div>
              <div className="flex items-center gap-2 p-3 rounded-xl bg-card border border-border"><RotateCcw className="h-4 w-4 text-brand" /> 14-day return</div>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="font-display text-2xl font-bold mb-6">You may also like</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
              {related.map((p) => <ProductCard key={p.id} p={p} />)}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
