import { createFileRoute } from "@tanstack/react-router";
import { PRODUCTS } from "@/lib/products";
import { ProductCard } from "@/components/shop/ProductCard";

export const Route = createFileRoute("/shop/deals")({
  component: DealsPage,
  head: () => ({ meta: [{ title: "Deals · Applied Biotech Shop" }] }),
});

function DealsPage() {
  const deals = PRODUCTS.filter((p) => p.oldPrice || p.tag === "SALE" || p.tag === "HOT");
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <div className="text-xs uppercase tracking-[0.2em] text-brand font-bold">Limited Time</div>
          <h1 className="font-display text-3xl md:text-4xl font-bold mt-1">Hot Deals & Offers</h1>
          <p className="mt-2 text-muted-foreground max-w-xl">Hand-picked offers on lab essentials — refreshed weekly.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {deals.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      </div>
    </section>
  );
}
