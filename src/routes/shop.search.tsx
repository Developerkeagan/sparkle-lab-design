import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { PRODUCTS } from "@/lib/products";
import { ProductCard } from "@/components/shop/ProductCard";

const schema = z.object({ q: z.string().optional().default("") });

export const Route = createFileRoute("/shop/search")({
  component: SearchPage,
  validateSearch: (s) => schema.parse(s),
  head: () => ({ meta: [{ title: "Search · Applied Biotech Shop" }] }),
});

function SearchPage() {
  const { q } = Route.useSearch();
  const items = q ? PRODUCTS.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()) || p.description.toLowerCase().includes(q.toLowerCase())) : [];
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <div className="text-xs uppercase tracking-[0.2em] text-brand font-bold">Search</div>
          <h1 className="font-display text-3xl md:text-4xl font-bold mt-1">Results for "{q}"</h1>
          <p className="mt-2 text-muted-foreground">{items.length} products found</p>
        </div>
        {items.length === 0 ? (
          <p className="text-center text-muted-foreground py-20">Try a different search term.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {items.map((p) => <ProductCard key={p.id} p={p} />)}
          </div>
        )}
      </div>
    </section>
  );
}
