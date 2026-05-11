import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useReveal } from "@/hooks/use-reveal";
import { ChevronLeft, ChevronRight, Truck, ShieldCheck, Headphones, RotateCcw } from "lucide-react";
import hero1 from "@/assets/shop-hero-1.jpg";
import hero2 from "@/assets/shop-hero-2.jpg";
import pMicro from "@/assets/prod-microfuge.jpg";
import { PRODUCTS, CATEGORIES, fmt } from "@/lib/products";
import { ProductCard } from "@/components/shop/ProductCard";

export const Route = createFileRoute("/shop/")({ component: ShopHome });

const slides = [
  { img: hero1, eyebrow: "Limited Time", title: "Great Deals on Lab Essentials", sub: "Up to 30% off select consumables and reagents — while stocks last.", cta: "Shop Deals", to: "/shop/deals" as const },
  { img: hero2, eyebrow: "New Arrival", title: "Agarose · Molecular Grade", sub: "Premium-quality reagents for reliable, reproducible results.", cta: "Browse Reagents", to: "/shop/category/$slug" as const, slug: "reagents" },
];

function HeroCarousel() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % slides.length), 5500);
    return () => clearInterval(t);
  }, []);
  const next = () => setI((p) => (p + 1) % slides.length);
  const prev = () => setI((p) => (p - 1 + slides.length) % slides.length);
  return (
    <section className="px-4 sm:px-6 lg:px-8 pt-6">
      <div className="mx-auto max-w-7xl relative overflow-hidden rounded-3xl bg-gradient-to-br from-accent/40 via-secondary to-accent/30 shadow-soft">
        <div className="grid md:grid-cols-2 items-center min-h-[360px] md:min-h-[440px]">
          {slides.map((s, idx) => (
            <div key={idx} className={`col-start-1 row-start-1 md:col-span-2 grid md:grid-cols-2 items-center transition-all duration-700 ${i === idx ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6 pointer-events-none"}`}>
              <div className="p-8 md:p-14 order-2 md:order-1">
                <span className="inline-block text-[11px] font-bold uppercase tracking-[0.18em] px-3 py-1 rounded-full bg-brand/10 text-brand">{s.eyebrow}</span>
                <h1 className="mt-4 font-display text-4xl md:text-6xl font-extrabold leading-[1.05] tracking-tight text-foreground">{s.title}</h1>
                <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-md">{s.sub}</p>
                {(s as any).slug ? (
                  <Link to={s.to as any} params={{ slug: (s as any).slug }} className="mt-7 inline-flex items-center gap-2 rounded-full gradient-brand text-brand-foreground px-7 py-3.5 text-sm font-bold shadow-brand hover:scale-105 transition-transform">
                    {s.cta} <ChevronRight className="h-4 w-4" />
                  </Link>
                ) : (
                  <Link to={s.to as any} className="mt-7 inline-flex items-center gap-2 rounded-full gradient-brand text-brand-foreground px-7 py-3.5 text-sm font-bold shadow-brand hover:scale-105 transition-transform">
                    {s.cta} <ChevronRight className="h-4 w-4" />
                  </Link>
                )}
              </div>
              <div className="order-1 md:order-2 h-56 md:h-[440px] relative">
                <img src={s.img} alt={s.title} width={1280} height={768} className="absolute inset-0 w-full h-full object-cover md:rounded-l-[3rem]" />
              </div>
            </div>
          ))}
        </div>
        <button aria-label="Previous" onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 grid place-items-center rounded-full bg-background/80 backdrop-blur shadow hover:bg-background transition-colors"><ChevronLeft className="h-5 w-5" /></button>
        <button aria-label="Next" onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 grid place-items-center rounded-full bg-background/80 backdrop-blur shadow hover:bg-background transition-colors"><ChevronRight className="h-5 w-5" /></button>
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, idx) => (
            <button key={idx} onClick={() => setI(idx)} aria-label={`Slide ${idx + 1}`} className={`h-2 rounded-full transition-all ${i === idx ? "w-8 gradient-brand" : "w-2 bg-foreground/25 hover:bg-foreground/40"}`} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PromoStrip() {
  const items = [
    { icon: Truck, title: "Free Delivery", sub: "Orders over ₦100k" },
    { icon: ShieldCheck, title: "Secure Payment", sub: "100% protected" },
    { icon: RotateCcw, title: "Easy Returns", sub: "14-day window" },
    { icon: Headphones, title: "24/7 Support", sub: "We're here to help" },
  ];
  return (
    <section className="px-4 sm:px-6 lg:px-8 mt-8">
      <div className="mx-auto max-w-7xl grid grid-cols-2 md:grid-cols-4 gap-3">
        {items.map((it, i) => (
          <div key={i} className="reveal flex items-center gap-3 p-4 rounded-2xl bg-card border border-border hover:shadow-soft hover:-translate-y-0.5 transition-all">
            <div className="h-11 w-11 grid place-items-center rounded-xl bg-brand/10 text-brand shrink-0"><it.icon className="h-5 w-5" /></div>
            <div className="min-w-0">
              <div className="font-semibold text-sm text-foreground truncate">{it.title}</div>
              <div className="text-xs text-muted-foreground truncate">{it.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function CategoryGrid() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 mt-14">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-end justify-between mb-6">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-brand font-bold">Browse</div>
            <h2 className="font-display text-2xl md:text-3xl font-bold mt-1">Shop by Category</h2>
          </div>
          <Link to="/shop" className="text-sm font-semibold text-brand hover:underline">View all →</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {CATEGORIES.map((c, i) => (
            <Link key={i} to="/shop/category/$slug" params={{ slug: c.slug }} className="reveal group relative aspect-square rounded-2xl bg-gradient-to-br from-secondary to-accent/40 border border-border p-4 flex flex-col justify-between text-left hover:shadow-brand hover:-translate-y-1 transition-all overflow-hidden">
              <div className="absolute -right-6 -bottom-6 h-24 w-24 rounded-full gradient-brand opacity-10 group-hover:opacity-30 group-hover:scale-150 transition-all duration-500" />
              <div className="text-xs text-muted-foreground">{PRODUCTS.filter((p) => p.category === c.slug).length} items</div>
              <div className="font-display font-bold text-foreground">{c.name}</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductSection({ title, eyebrow, items }: { title: string; eyebrow: string; items: typeof PRODUCTS }) {
  return (
    <section className="px-4 sm:px-6 lg:px-8 mt-14">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-end justify-between mb-6">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-brand font-bold">{eyebrow}</div>
            <h2 className="font-display text-2xl md:text-3xl font-bold mt-1">{title}</h2>
          </div>
          <Link to="/shop" className="text-sm font-semibold text-brand hover:underline">See all →</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {items.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      </div>
    </section>
  );
}

function DealBanner() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 mt-14">
      <div className="mx-auto max-w-7xl reveal grid md:grid-cols-2 rounded-3xl overflow-hidden bg-foreground text-background relative">
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full gradient-brand opacity-30 blur-3xl" />
        <div className="p-10 md:p-14 relative">
          <div className="text-xs uppercase tracking-[0.2em] text-accent-cyan font-bold">Deal of the Week</div>
          <h3 className="mt-3 font-display text-3xl md:text-5xl font-extrabold leading-tight">Microfuge Tube <span className="gradient-text">RNAse-free 1.5ml</span></h3>
          <p className="mt-4 text-background/70 max-w-md">Premium-grade certified tubes — perfect for sensitive PCR and RNA work. Limited stock.</p>
          <div className="mt-6 flex items-center gap-4">
            <div className="font-display text-3xl font-bold text-accent-cyan">{fmt(8500)}</div>
            <div className="text-background/50 line-through">{fmt(12000)}</div>
            <span className="px-2 py-0.5 rounded-full bg-accent-cyan text-foreground text-xs font-bold">-30%</span>
          </div>
          <Link to="/shop/product/$id" params={{ id: "3" }} className="mt-7 inline-flex items-center gap-2 rounded-full bg-background text-foreground px-6 py-3 text-sm font-bold hover:scale-105 transition-transform">
            Shop the Deal <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="relative min-h-[300px]"><img src={pMicro} alt="Microfuge tubes" loading="lazy" className="absolute inset-0 w-full h-full object-cover" /></div>
      </div>
    </section>
  );
}

function Newsletter() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 mt-14 mb-14">
      <div className="mx-auto max-w-5xl reveal text-center rounded-3xl bg-gradient-to-br from-secondary via-accent/30 to-secondary p-10 md:p-14 border border-border">
        <h3 className="font-display text-2xl md:text-3xl font-bold">Get 10% off your first order</h3>
        <p className="mt-2 text-muted-foreground">Join our newsletter for product drops, lab tips and exclusive deals.</p>
        <form onSubmit={(e) => { e.preventDefault(); (e.currentTarget.querySelector("input") as HTMLInputElement).value = ""; import("sonner").then(({ toast }) => toast.success("Subscribed! Check your inbox.")); }} className="mt-6 flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
          <input type="email" required placeholder="you@lab.com" className="flex-1 h-12 px-5 rounded-full bg-background border border-border focus:border-brand focus:outline-none text-sm" />
          <button className="h-12 px-7 rounded-full gradient-brand text-brand-foreground font-bold text-sm shadow-brand hover:scale-105 transition-transform">Subscribe</button>
        </form>
      </div>
    </section>
  );
}

function ShopHome() {
  useReveal();
  return (
    <>
      <HeroCarousel />
      <PromoStrip />
      <CategoryGrid />
      <ProductSection eyebrow="Featured" title="Featured Products" items={PRODUCTS.slice(0, 4)} />
      <ProductSection eyebrow="Top Rated" title="Customer Favorites" items={PRODUCTS.filter((p) => p.rating === 5).slice(0, 4)} />
      <DealBanner />
      <ProductSection eyebrow="Best Sellers" title="Best Selling Products" items={PRODUCTS.slice(7, 11)} />
      <ProductSection eyebrow="New Arrivals" title="Latest Products" items={PRODUCTS.slice(-4)} />
      <Newsletter />
    </>
  );
}
