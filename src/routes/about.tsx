import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { useReveal } from "@/hooks/use-reveal";
import { Target, Lightbulb, Mail, ChevronRight } from "lucide-react";
import profPortrait from "@/assets/prof-portrait.jpg";
import biotechGrid from "@/assets/biotech-grid.jpg";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About Us · Applied Biotech" },
      { name: "description", content: "Meet Prof. Nwadiuto Esiobu and the Applied Biotech team — our vision, mission and decentralized units." },
    ],
  }),
});

const units = [
  { id: "capacity", t: "Capacity Building", mandate: "Short and long-term modular professional certifications in biotechnology techniques.", email: "info@appliedbiotech.ng" },
  { id: "equipment", t: "Equipment Supplies", mandate: "Turnkey procurement and vendor management.", email: "sales@appliedbiotech.ng" },
  { id: "consultancy", t: "Consultancy, Contracts & Grants", mandate: "Grant writing and strategy, bio-economy policy advisory, and multi-institutional project management.", email: "info@appliedbiotech.ng" },
  { id: "lab", t: "Molecular Laboratory Services", mandate: "DNA/RNA sequencing, diagnostic assays, parentage testing, and molecular identification.", email: "lab_analyst@appliedbiotech.ng" },
  { id: "bio-mfg", t: "Bio-Manufacturing", mandate: "Production of local laboratory devices, specialized consumables, and market-ready reagents.", email: "president@appliedbiotech.ng" },
];

function AboutPage() {
  useReveal();
  const [activeUnit, setActiveUnit] = useState(units[0].id);
  const current = units.find((u) => u.id === activeUnit)!;
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* CEO Hero */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-secondary/60 via-background to-background" />
        <div className="mx-auto max-w-6xl grid lg:grid-cols-[1fr_1.1fr] gap-12 items-center">
          <div className="reveal order-2 lg:order-1">
            <span className="inline-block px-3 py-1 text-xs uppercase tracking-[0.25em] rounded-full bg-brand/10 text-brand font-semibold">Executive Statement</span>
            <h1 className="mt-5 font-display text-4xl md:text-6xl font-extrabold leading-[1.05]">
              A welcome from <span className="gradient-text">Prof. Nwadiuto Esiobu</span>
            </h1>
            <p className="mt-6 text-base md:text-lg text-muted-foreground leading-[1.85]">
              "Welcome to Applied Biotech International. Since our establishment in 2006, our mission has been to dismantle the structural and infrastructural barriers limiting life science research in developing economies. By integrating high-caliber technical services, elite capacity building, and reliable procurement, we empower African scientists to drive global biological innovations right from home soil."
            </p>
            <div className="mt-6 text-sm font-semibold text-foreground">— Founder & CEO, Applied Biotech International</div>
          </div>
          <div className="reveal order-1 lg:order-2 relative">
            <div className="relative rounded-[2rem] overflow-hidden shadow-brand aspect-[4/5]">
              <img src={profPortrait} alt="Prof. Nwadiuto Esiobu" width={1024} height={1280} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent" />
            </div>
            <div className="hidden lg:block absolute -bottom-6 -left-6 rounded-2xl bg-card border border-border shadow-soft p-4 animate-float-slow">
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Est.</div>
              <div className="font-display text-2xl font-bold text-brand">2006</div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision / Mission */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#06122c] text-background">
        <div className="absolute inset-0 opacity-30">
          <img src={biotechGrid} alt="" loading="lazy" className="w-full h-full object-cover" />
        </div>
        <div className="relative mx-auto max-w-6xl grid md:grid-cols-2 gap-6">
          {[
            { I: Lightbulb, t: "Our Vision", d: "To serve as the premier African gateway for advanced biotechnology application, transforming regional scientific capacity through global partnerships, structural precision, and accessible innovation." },
            { I: Target, t: "Our Mission", d: "To advance the life sciences by equipping research institutions with state-of-the-art laboratory assets, delivering uncompromised analytical testing services, and building an elite technical workforce capable of solving critical food security, healthcare, and environmental challenges across the continent." },
          ].map((b, i) => (
            <div key={b.t} className="reveal rounded-3xl border border-background/10 bg-background/[0.04] backdrop-blur-sm p-8 lg:p-10 hover:bg-background/[0.08] transition-colors" style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="h-12 w-12 grid place-items-center rounded-2xl gradient-brand text-brand-foreground"><b.I className="h-5 w-5" /></div>
              <h2 className="mt-6 font-display text-2xl md:text-3xl font-bold">{b.t}</h2>
              <p className="mt-4 text-background/75 leading-relaxed">{b.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Units */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="reveal max-w-3xl">
            <span className="text-xs uppercase tracking-[0.25em] text-brand font-semibold">Subsidiary Units</span>
            <h2 className="mt-3 font-display text-3xl md:text-5xl font-extrabold leading-[1.05]">Decentralized contacts, <span className="gradient-text">direct access.</span></h2>
            <p className="mt-4 text-muted-foreground">Tap a unit to view its mandate and lead contact.</p>
          </div>
          <div className="reveal mt-10 grid md:grid-cols-[1fr_1.3fr] gap-6">
            <div className="flex flex-col gap-2">
              {units.map((u, i) => (
                <button
                  key={u.id}
                  onClick={() => setActiveUnit(u.id)}
                  className={`text-left rounded-2xl border p-4 transition-all ${activeUnit === u.id ? "border-brand bg-brand/5 shadow-soft" : "border-border bg-card hover:border-brand/40"}`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Unit 0{i + 1}</div>
                      <div className="font-display font-bold mt-1">{u.t}</div>
                    </div>
                    <ChevronRight className={`h-4 w-4 transition-transform ${activeUnit === u.id ? "text-brand translate-x-1" : "text-muted-foreground"}`} />
                  </div>
                </button>
              ))}
            </div>
            <div className="rounded-3xl border border-border bg-card p-8 lg:p-10 shadow-soft min-h-[280px]">
              <span className="text-xs uppercase tracking-[0.25em] text-brand font-semibold">Core Mandate</span>
              <h3 className="mt-3 font-display text-2xl md:text-3xl font-bold">{current.t}</h3>
              <p className="mt-4 text-muted-foreground leading-relaxed">{current.mandate}</p>
              <div className="mt-7 flex items-center gap-3 rounded-2xl bg-secondary/60 p-4">
                <div className="h-10 w-10 grid place-items-center rounded-xl gradient-brand text-brand-foreground"><Mail className="h-5 w-5" /></div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Contact Lead</div>
                  <a href={`mailto:${current.email}`} className="font-semibold text-foreground hover:text-brand transition-colors">{current.email}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}