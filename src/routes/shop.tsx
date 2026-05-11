import { createFileRoute, Link, Outlet, useRouterState, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Footer } from "@/components/site/Footer";
import { Navbar } from "@/components/site/Navbar";
import { ShoppingCart, Heart, User, Search, Menu } from "lucide-react";
import { useShop } from "@/lib/shop";

export const Route = createFileRoute("/shop")({
  component: ShopLayout,
  head: () => ({
    meta: [
      { title: "Shop · Applied Biotech" },
      { name: "description", content: "Lab equipment, reagents and consumables — curated, in stock and ready to ship." },
    ],
  }),
});

function ShopSubNav() {
  const { cartCount, wishlistCount } = useShop();
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const path = useRouterState({ select: (r) => r.location.pathname });

  const links = [
    { label: "All Products", to: "/shop" as const },
    { label: "Reagents", to: "/shop/category/$slug" as const, params: { slug: "reagents" } },
    { label: "Consumables", to: "/shop/category/$slug" as const, params: { slug: "consumables" } },
    { label: "Equipment", to: "/shop/category/$slug" as const, params: { slug: "equipment" } },
    { label: "Kits", to: "/shop/category/$slug" as const, params: { slug: "kits" } },
    { label: "Apparel", to: "/shop/category/$slug" as const, params: { slug: "apparel" } },
    { label: "Deals", to: "/shop/deals" as const },
  ];

  function onSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (q.trim()) navigate({ to: "/shop/search", search: { q: q.trim() } });
  }

  function isActive(to: string, params?: any) {
    if (to === "/shop") return path === "/shop";
    if (params?.slug) return path === `/shop/category/${params.slug}`;
    return path === to;
  }

  return (
    <div className="sticky top-16 lg:top-20 z-40 bg-background/90 backdrop-blur-xl border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-4">
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
          <span className="lg:hidden inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground shrink-0">
            <Menu className="h-4 w-4" /> Browse
          </span>
          {links.map((l, i) => {
            const active = isActive(l.to, (l as any).params);
            const cls = `shrink-0 px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${
              active ? "bg-brand/10 text-brand" : "text-foreground/70 hover:text-foreground hover:bg-accent"
            }`;
            return (l as any).params ? (
              <Link key={i} to={l.to as any} params={(l as any).params} className={cls}>{l.label}</Link>
            ) : (
              <Link key={i} to={l.to as any} className={cls}>{l.label}</Link>
            );
          })}
        </div>
        <form onSubmit={onSearchSubmit} className="hidden md:flex items-center gap-2 max-w-sm w-full">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search products…"
              className="w-full h-9 pl-9 pr-3 rounded-full bg-secondary text-sm border border-transparent focus:border-brand focus:outline-none transition-colors"
            />
          </div>
        </form>
        <div className="flex items-center gap-1 shrink-0">
          <Link to="/shop/account" aria-label="Account" className="h-9 w-9 grid place-items-center rounded-full hover:bg-accent text-foreground/80 transition-colors">
            <User className="h-[18px] w-[18px]" />
          </Link>
          <Link to="/shop/wishlist" aria-label="Wishlist" className="relative h-9 w-9 grid place-items-center rounded-full hover:bg-accent text-foreground/80 transition-colors">
            <Heart className="h-[18px] w-[18px]" />
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-1 h-4 min-w-4 px-1 rounded-full text-[10px] font-bold bg-accent-cyan text-foreground grid place-items-center">{wishlistCount}</span>
            )}
          </Link>
          <Link to="/shop/cart" aria-label="Cart" className="relative h-9 w-9 grid place-items-center rounded-full hover:bg-accent text-foreground/80 transition-colors">
            <ShoppingCart className="h-[18px] w-[18px]" />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 h-4 min-w-4 px-1 rounded-full text-[10px] font-bold gradient-brand text-brand-foreground grid place-items-center animate-pulse-ring">{cartCount}</span>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
}

function ShopLayout() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16 lg:pt-20">
        <ShopSubNav />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
