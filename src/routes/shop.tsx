import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Footer } from "@/components/site/Footer";
import { Navbar } from "@/components/site/Navbar";
import { useReveal } from "@/hooks/use-reveal";
import {
  ShoppingCart, Heart, User, Search, Menu, ChevronLeft, ChevronRight,
  Truck, ShieldCheck, Headphones, RotateCcw, Star, Plus, Eye,
} from "lucide-react";
import hero1 from "@/assets/shop-hero-1.jpg";
import hero2 from "@/assets/shop-hero-2.jpg";
import pAgarose from "@/assets/prod-agarose.jpg";
import pFalcon from "@/assets/prod-falcon.jpg";
import pKit from "@/assets/prod-kit.jpg";
import pLab from "@/assets/prod-labcoat.jpg";
import pPip from "@/assets/prod-pipette.jpg";
import pPbs from "@/assets/prod-pbs.jpg";
import pGel from "@/assets/prod-gel.jpg";
import pMicro from "@/assets/prod-microfuge.jpg";

export const Route = createFileRoute("/shop")({
  component: ShopPage,
  head: () => ({
    meta: [
      { title: "Shop · Applied Biotech" },
      { name: "description", content: "Lab equipment, reagents and consumables — curated, in stock and ready to ship." },
    ],
  }),
});

type Product = { id: string; name: string; price: number; oldPrice?: number; img: string; tag?: string; rating: number };

const featured: Product[] = [
  { id: "1", name: "50ml Falcon Tubes (Sterile, 25 pack)", price: 25000, oldPrice: 30000, img: pFalcon, tag: "HOT", rating: 5 },
  { id: "2", name: "10ml Disposable Serological Pipettes", price: 25000, img: pPip, tag: "NEW", rating: 4 },
  { id: "3", name: "Microfuge Tube 1.5ml RNAse-free", price: 8500, img: pMicro, tag: "SALE", rating: 5 },
  { id: "4", name: "Pre-cast Agarose Gel Cassette", price: 20000, img: pGel, rating: 4 },
];

const topRated: Product[] = [
  { id: "5", name: "Parafilm M Roll 2 IN x 250 ft", price: 25000, img: pPip, rating: 5 },
  { id: "6", name: "QIAamp DSP DNA Blood Mini Kit", price: 240000, img: pKit, rating: 5 },
  { id: "7", name: "Lab Coat (ABNL Customized)", price: 10000, img: pLab, rating: 4 },
];

const bestSelling: Product[] = [
  { id: "8", name: "Pre-cast Gel", price: 20000, img: pGel, rating: 5 },
  { id: "9", name: "50ml Falcon Tubes (Sterile)", price: 15000, img: pFalcon, rating: 4 },
  { id: "10", name: "10ml Serological Pipettes", price: 25000, img: pPip, rating: 5 },
];

const latest: Product[] = [
  { id: "11", name: "Agarose (Molecular Grade)", price: 100000, img: pAgarose, rating: 5 },
  { id: "12", name: "PBS 10L 10X Powdered Concentrate", price: 250000, img: pPbs, rating: 4 },
  { id: "13", name: "10ml Disposable Pipettes (pack)", price: 25000, img: pPip, rating: 4 },
];

const slides = [
  {
    img: hero1,
    eyebrow: "Limited Time",
    title: "Great Deals on Lab Essentials",
    sub: "Up to 30% off select consumables and reagents — while stocks last.",
    cta: "Shop Now",
  },
  {
    img: hero2,
    eyebrow: "New Arrival",
    title: "Agarose · Molecular Grade",
    sub: "Premium-quality reagents for reliable, reproducible results.",
    cta: "Browse Reagents",
  },
];

const categories = [
  { name: "Reagents", count: 124 },
  { name: "Consumables", count: 86 },
  { name: "Equipment", count: 42 },
  { name: "Apparel", count: 18 },
  { name: "Kits", count: 33 },
  { name: "Accessories", count: 51 },
];

function fmt(n: number) {
  return "₦" + n.toLocaleString("en-NG") + ".00";
}

function ShopSubNav() {
  const links = [
    { label: "All Products", to: "/shop" as const },
    { label: "Reagents", to: "/shop" as const },
    { label: "Consumables", to: "/shop" as const },
    { label: "Equipment", to: "/shop" as const },
    { label: "Kits", to: "/shop" as const },
    { label: "Apparel", to: "/shop" as const },
    { label: "Deals", to: "/shop" as const },
  ];

  return (
    <div className="sticky top-16 lg:top-20 z-40 bg-background/90 backdrop-blur-xl border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-4">
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
          <button className="lg:hidden inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground shrink-0">
            <Menu className="h-4 w-4" /> All
          </button>
          {links.map((l, i) => (
            <Link
              key={i}
              to={l.to}
              className="shrink-0 px-3 py-1.5 text-sm font-medium text-foreground/70 hover:text-foreground rounded-full hover:bg-accent transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-2 max-w-sm w-full">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search products…"
              className="w-full h-9 pl-9 pr-3 rounded-full bg-secondary text-sm border border-transparent focus:border-brand focus:outline-none transition-colors"
            />
          </div>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <button aria-label="Account" className="h-9 w-9 grid place-items-center rounded-full hover:bg-accent text-foreground/80 transition-colors">
            <User className="h-[18px] w-[18px]" />
          </button>
          <button aria-label="Wishlist" className="relative h-9 w-9 grid place-items-center rounded-full hover:bg-accent text-foreground/80 transition-colors">
            <Heart className="h-[18px] w-[18px]" />
            <span className="absolute top-1 right-1 h-4 min-w-4 px-1 rounded-full text-[10px] font-bold bg-accent-cyan text-foreground grid place-items-center">2</span>
          </button>
          <button aria-label="Cart" className="relative h-9 w-9 grid place-items-center rounded-full hover:bg-accent text-foreground/80 transition-colors">
            <ShoppingCart className="h-[18px] w-[18px]" />
            <span className="absolute top-1 right-1 h-4 min-w-4 px-1 rounded-full text-[10px] font-bold gradient-brand text-brand-foreground grid place-items-center animate-pulse-ring">3</span>
          </button>
        </div>
      </div>
    </div>
  );
}

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
            <div
              key={idx}
              className={`col-start-1 row-start-1 md:col-span-2 grid md:grid-cols-2 items-center transition-all duration-700 ${
                i === idx ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6 pointer-events-none"
              }`}
            >
              <div className="p-8 md:p-14 order-2 md:order-1">
                <span className="inline-block text-[11px] font-bold uppercase tracking-[0.18em] px-3 py-1 rounded-full bg-brand/10 text-brand">
                  {s.eyebrow}
                </span>
                <h1 className="mt-4 font-display text-4xl md:text-6xl font-extrabold leading-[1.05] tracking-tight text-foreground">
                  {s.title}
                </h1>
                <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-md">{s.sub}</p>
                <button className="mt-7 inline-flex items-center gap-2 rounded-full gradient-brand text-brand-foreground px-7 py-3.5 text-sm font-bold shadow-brand hover:scale-105 transition-transform">
                  {s.cta}
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
              <div className="order-1 md:order-2 h-56 md:h-[440px] relative">
                <img
                  src={s.img}
                  alt={s.title}
                  width={1280}
                  height={768}
                  className="absolute inset-0 w-full h-full object-cover md:rounded-l-[3rem]"
                />
              </div>
            </div>
          ))}
        </div>
        <button
          aria-label="Previous"
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 grid place-items-center rounded-full bg-background/80 backdrop-blur shadow hover:bg-background transition-colors"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          aria-label="Next"
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 grid place-items-center rounded-full bg-background/80 backdrop-blur shadow hover:bg-background transition-colors"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              aria-label={`Slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all ${
                i === idx ? "w-8 gradient-brand" : "w-2 bg-foreground/25 hover:bg-foreground/40"
              }`}
            />
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
          <div
            key={i}
            className="reveal flex items-center gap-3 p-4 rounded-2xl bg-card border border-border hover:shadow-soft hover:-translate-y-0.5 transition-all"
          >
            <div className="h-11 w-11 grid place-items-center rounded-xl bg-brand/10 text-brand shrink-0">
              <it.icon className="h-5 w-5" />
            </div>
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
          {categories.map((c, i) => (
            <button
              key={i}
              className="reveal group relative aspect-square rounded-2xl bg-gradient-to-br from-secondary to-accent/40 border border-border p-4 flex flex-col justify-between text-left hover:shadow-brand hover:-translate-y-1 transition-all overflow-hidden"
            >
              <div className="absolute -right-6 -bottom-6 h-24 w-24 rounded-full gradient-brand opacity-10 group-hover:opacity-30 group-hover:scale-150 transition-all duration-500" />
              <div className="text-xs text-muted-foreground">{c.count} items</div>
              <div className="font-display font-bold text-foreground">{c.name}</div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({ p }: { p: Product }) {
  return (
    <div className="reveal group relative rounded-2xl bg-card border border-border overflow-hidden hover:shadow-brand hover:-translate-y-1 transition-all duration-300">
      {p.tag && (
        <span className={`absolute top-3 left-3 z-10 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
          p.tag === "HOT" ? "bg-destructive text-destructive-foreground"
          : p.tag === "SALE" ? "gradient-brand text-brand-foreground"
          : "bg-foreground text-background"
        }`}>{p.tag}</span>
      )}
      <div className="absolute top-3 right-3 z-10 flex flex-col gap-1.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
        <button aria-label="Wishlist" className="h-8 w-8 grid place-items-center rounded-full bg-background/95 shadow hover:bg-brand hover:text-brand-foreground transition-colors">
          <Heart className="h-4 w-4" />
        </button>
        <button aria-label="Quick view" className="h-8 w-8 grid place-items-center rounded-full bg-background/95 shadow hover:bg-brand hover:text-brand-foreground transition-colors">
          <Eye className="h-4 w-4" />
        </button>
      </div>
      <div className="aspect-square overflow-hidden bg-secondary/50">
        <img
          src={p.img}
          alt={p.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center gap-0.5 mb-1.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={`h-3 w-3 ${i < p.rating ? "fill-accent-cyan text-accent-cyan" : "text-border"}`} />
          ))}
        </div>
        <h3 className="font-medium text-sm text-foreground line-clamp-2 min-h-[2.5rem] group-hover:text-brand transition-colors">
          {p.name}
        </h3>
        <div className="mt-3 flex items-end justify-between">
          <div>
            <div className="font-display font-bold text-lg text-foreground">{fmt(p.price)}</div>
            {p.oldPrice && <div className="text-xs text-muted-foreground line-through">{fmt(p.oldPrice)}</div>}
          </div>
          <button
            aria-label="Add to cart"
            className="h-9 w-9 grid place-items-center rounded-full gradient-brand text-brand-foreground shadow-brand hover:scale-110 transition-transform"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function ProductSection({ title, eyebrow, items }: { title: string; eyebrow: string; items: Product[] }) {
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
          <h3 className="mt-3 font-display text-3xl md:text-5xl font-extrabold leading-tight">
            Microfuge Tube <span className="gradient-text">RNAse-free 1.5ml</span>
          </h3>
          <p className="mt-4 text-background/70 max-w-md">
            Premium-grade certified tubes — perfect for sensitive PCR and RNA work. Limited stock.
          </p>
          <div className="mt-6 flex items-center gap-4">
            <div className="font-display text-3xl font-bold text-accent-cyan">₦8,500</div>
            <div className="text-background/50 line-through">₦12,000</div>
            <span className="px-2 py-0.5 rounded-full bg-accent-cyan text-foreground text-xs font-bold">-30%</span>
          </div>
          <button className="mt-7 inline-flex items-center gap-2 rounded-full bg-background text-foreground px-6 py-3 text-sm font-bold hover:scale-105 transition-transform">
            Shop the Deal <ChevronRight className="h-4 w-4" />
          </button>
        </div>
        <div className="relative min-h-[300px]">
          <img src={pMicro} alt="Microfuge tubes" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
        </div>
      </div>
    </section>
  );
}

function Newsletter() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 mt-14">
      <div className="mx-auto max-w-5xl reveal text-center rounded-3xl bg-gradient-to-br from-secondary via-accent/30 to-secondary p-10 md:p-14 border border-border">
        <h3 className="font-display text-2xl md:text-3xl font-bold">Get 10% off your first order</h3>
        <p className="mt-2 text-muted-foreground">Join our newsletter for product drops, lab tips and exclusive deals.</p>
        <form onSubmit={(e) => e.preventDefault()} className="mt-6 flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
          <input
            type="email"
            required
            placeholder="you@lab.com"
            className="flex-1 h-12 px-5 rounded-full bg-background border border-border focus:border-brand focus:outline-none text-sm"
          />
          <button className="h-12 px-7 rounded-full gradient-brand text-brand-foreground font-bold text-sm shadow-brand hover:scale-105 transition-transform">
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}

function ShopPage() {
  useReveal();
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16 lg:pt-20">
        <ShopSubNav />
        <HeroCarousel />
        <PromoStrip />
        <CategoryGrid />
        <ProductSection eyebrow="Featured" title="Featured Products" items={featured} />
        <ProductSection eyebrow="Top Rated" title="Customer Favorites" items={topRated} />
        <DealBanner />
        <ProductSection eyebrow="Best Sellers" title="Best Selling Products" items={bestSelling} />
        <ProductSection eyebrow="New Arrivals" title="Latest Products" items={latest} />
        <Newsletter />
      </div>
      <Footer />
    </div>
  );
}
