import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { PageHero } from "@/components/site/PageHero";
import { useReveal } from "@/hooks/use-reveal";
import { ArrowRight, Layers } from "lucide-react";
import lab from "@/assets/hero-lab.jpg";
import dna from "@/assets/dna-bg.jpg";
import pip from "@/assets/pipette.jpg";
import kit from "@/assets/prod-kit.jpg";
import gel from "@/assets/prod-gel.jpg";
import micro from "@/assets/prod-microfuge.jpg";

export const Route = createFileRoute("/collections")({
  component: CollectionsPage,
  head: () => ({
    meta: [
      { title: "Collections — Applied Biotech" },
      { name: "description", content: "Curated bundles of lab equipment, reagents and educational kits." },
    ],
  }),
});

const collections = [
  { title: "Molecular Diagnostics Starter", desc: "Everything a new molecular lab needs to begin", items: 12, img: lab, tone: "from-blue-500/40 to-cyan-500/30" },
  { title: "PCR Essentials Bundle", desc: "Thermocycler-ready reagents, plates & primers", items: 9, img: pip, tone: "from-fuchsia-500/40 to-pink-500/30" },
  { title: "DNA Extraction Kit", desc: "High-yield extraction across sample types", items: 7, img: dna, tone: "from-emerald-500/40 to-teal-500/30" },
  { title: "Academy Lab Kit", desc: "Designed for our training programs", items: 14, img: kit, tone: "from-amber-500/40 to-orange-500/30" },
  { title: "Gel Electrophoresis Pack", desc: "Casting trays, agarose, ladders, dyes", items: 10, img: gel, tone: "from-violet-500/40 to-indigo-500/30" },
  { title: "Centrifuge & Consumables", desc: "Microfuges with sample tubes & racks", items: 11, img: micro, tone: "from-rose-500/40 to-red-500/30" },
];

function CollectionsPage() {
  useReveal();
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PageHero
        eyebrow="Curated Collections"
        title={<>Bundles built for <span className="gradient-text">real labs</span></>}
        subtitle="Save time and budget with collections curated by our scientists for specific workflows."
      />

      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map((c) => (
            <Link to="/shop" key={c.title} className="reveal group relative rounded-3xl overflow-hidden border border-border bg-card shadow-soft hover:shadow-brand transition-all hover:-translate-y-1">
              <div className="aspect-[4/3] overflow-hidden relative">
                <img src={c.img} alt={c.title} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className={`absolute inset-0 bg-gradient-to-t ${c.tone} mix-blend-overlay`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute top-3 left-3 inline-flex items-center gap-1 text-xs font-bold uppercase px-2.5 py-1 rounded-full bg-background/90">
                  <Layers className="h-3 w-3" /> {c.items} items
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                  <h3 className="font-display text-xl font-bold">{c.title}</h3>
                  <p className="text-sm text-white/80 mt-1">{c.desc}</p>
                  <div className="mt-3 inline-flex items-center gap-1 text-sm font-semibold">
                    Explore collection <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}