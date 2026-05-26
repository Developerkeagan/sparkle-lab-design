import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { ProductCard } from "@/components/shop/ProductCard";
import useFetch from "@/hooks/useFetch";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/shop/deals")({
  component: DealsPage,
  head: () => ({ meta: [{ title: "Deals · Applied Biotech Shop" }] }),
});

function DealsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const { loading, fetchData } = useFetch();

  useEffect(() => {
    fetchData("/api/v1/shop/products").then(res => {
      if (res) {
        const normalized = res.map((p: any) => ({
          id: p._id,
          name: p.productName,
          price: p.price,
          img: p.productImage,
          category: p.category,
          rating: 5,
          oldPrice: p.discountedPrice
        }));
        setProducts(normalized);
      }
    });
  }, [fetchData]);

  const deals = products.filter((p) => p.oldPrice);

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <div className="text-xs uppercase tracking-[0.2em] text-brand font-bold">Limited Time</div>
          <h1 className="font-display text-3xl md:text-4xl font-bold mt-1">Hot Deals & Offers</h1>
          <p className="mt-2 text-muted-foreground max-w-xl">Hand-picked offers on lab essentials — refreshed weekly.</p>
        </div>
        {loading ? (
          <div className="py-20 flex justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
        ) : deals.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">No active deals at the moment. Check back soon!</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {deals.map((p) => <ProductCard key={p.id} p={p} />)}
          </div>
        )}
      </div>
    </section>
  );
}
