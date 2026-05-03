import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Footer } from "@/components/site/Footer";
import { useReveal } from "@/hooks/use-reveal";
import { ShoppingCart } from "lucide-react";
import pip from "@/assets/pipette.jpg";
import dna from "@/assets/dna-bg.jpg";
import hero from "@/assets/hero-lab.jpg";

export const Route = createFileRoute("/shop")({
  component: ShopPage,
  head: () => ({ meta: [{ title: "Shop · Applied Biotech" }, { name: "description", content: "Buy lab equipment, reagents and consumables." }] }),
});

const products = [
  { name: "PCR Master Mix Kit", price: 189, img: pip, tag: "Reagent" },
  { name: "Digital Microscope X400", price: 1240, img: hero, tag: "Equipment" },
  { name: "DNA Extraction Kit", price: 95, img: dna, tag: "Reagent" },
  { name: "Micropipette Set (5pc)", price: 320, img: pip, tag: "Equipment" },
  { name: "Cell Culture Media 500ml", price: 48, img: dna, tag: "Reagent" },
  { name: "Centrifuge 24-place", price: 2150, img: hero, tag: "Equipment" },
];

function ShopPage() {
  useReveal();
  return (
    <div className="min-h-screen bg-background">
      <PageHero eyebrow="Shop" title={<>Lab gear, <span className="gradient-text">delivered</span></>} subtitle="Curated catalogue of lab equipment, reagents and consumables." />
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <div key={p.name} className="reveal group rounded-2xl border border-border bg-card overflow-hidden hover:shadow-brand hover:-translate-y-1 transition-all">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={p.img} alt={p.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
              <div className="p-5">
                <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-brand/10 text-brand font-semibold">{p.tag}</span>
                <h3 className="mt-3 font-display font-bold text-lg">{p.name}</h3>
                <div className="mt-4 flex items-center justify-between">
                  <div className="text-2xl font-bold text-foreground">${p.price}</div>
                  <button className="inline-flex items-center gap-2 rounded-full gradient-brand text-brand-foreground px-4 py-2 text-sm font-semibold hover:scale-105 transition-transform">
                    <ShoppingCart className="h-4 w-4" /> Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}