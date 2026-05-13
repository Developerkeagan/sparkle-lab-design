import { createFileRoute, Link } from "@tanstack/react-router";
import { CATEGORIES, PRODUCTS } from "@/lib/products";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/shop/categories")({
  component: CategoriesIndex,
  head: () => ({ meta: [{ title: "All Categories · Applied Biotech Shop" }] }),
});

function CategoriesIndex() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <div className="text-xs uppercase tracking-[0.2em] text-brand font-bold">Browse</div>
          <h1 className="font-display text-3xl md:text-4xl font-bold mt-1">All Categories</h1>
          <p className="mt-2 text-muted-foreground">Find exactly what your lab needs.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {CATEGORIES.map((c) => {
            const items = PRODUCTS.filter((p) => p.category === c.slug);
            const cover = items[0]?.img;
            return (
              <Link key={c.slug} to="/shop/category/$slug" params={{ slug: c.slug }} className="group rounded-2xl overflow-hidden border border-border bg-card hover:shadow-brand hover:-translate-y-1 transition-all">
                <div className="aspect-[4/3] bg-secondary overflow-hidden">
                  {cover ? <img src={cover} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" /> : <div className="w-full h-full grid place-items-center text-muted-foreground text-sm">No items</div>}
                </div>
                <div className="p-5 flex items-center justify-between">
                  <div>
                    <div className="font-display font-bold text-lg">{c.name}</div>
                    <div className="text-xs text-muted-foreground">{items.length} products</div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-brand opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
