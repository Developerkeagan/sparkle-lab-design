import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { useReveal } from "@/hooks/use-reveal";
import { Target, Lightbulb, Mail, ChevronRight, Building2, Microscope, Award, MapPin, Users, FlaskConical } from "lucide-react";
import profPortrait from "@/assets/prof-portrait.jpg";
import biotechGrid from "@/assets/biotech-grid.jpg";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About Us · Applied Biotech" },
      { name: "description", content: "Twenty years building African biotechnology. Meet the team, the labs we have stood up and the units that serve scientists across the continent." },
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

const labPortfolio = [
  { name: "Molecular Diagnostics Lab, Lagos", year: "2018", scope: "Design, build and commissioning of a BSL-2 PCR and sequencing facility serving public health surveillance.", tags: ["BSL-2", "PCR", "NGS"] },
  { name: "University Teaching Lab, Ogun State", year: "2020", scope: "Curriculum-aligned teaching lab for 120 students per cohort with safety zoning, fume hoods and modular benches.", tags: ["Teaching", "Safety"] },
  { name: "Mobile Outbreak Response Lab", year: "2021", scope: "Solar-powered, container-based mobile laboratory deployed for arboviral and respiratory pathogen surveillance.", tags: ["Mobile", "Surveillance"] },
  { name: "Industrial QC Bench, FMCG Client", year: "2022", scope: "Quality control bench for microbial and molecular testing in food and beverage manufacturing.", tags: ["QC", "Industry"] },
  { name: "Bio-Manufacturing Pilot Line", year: "2023", scope: "Pilot reagent manufacturing line producing nuclease-free water and master mixes for the AquaPure portfolio.", tags: ["Bio-mfg", "Pilot"] },
  { name: "Reference Research Hub, Abuja", year: "2024", scope: "Multi-institution research hub with shared instrumentation, cold-chain storage and bioinformatics workstations.", tags: ["Research", "Hub"] },
];

const timeline = [
  { y: "2006", t: "Founded by Prof. Nwadiuto Esiobu to close Africa's biotech capacity gap." },
  { y: "2012", t: "First cohort of certified molecular diagnostics technicians graduated." },
  { y: "2018", t: "Commissioned our flagship BSL-2 molecular diagnostics laboratory in Lagos." },
  { y: "2021", t: "Deployed the first solar-powered mobile outbreak response lab in West Africa." },
  { y: "2023", t: "Launched the AquaPure pilot manufacturing line for nuclease-free water." },
  { y: "2024", t: "Crossed 1000 scientists trained and 5 world-class hubs built end to end." },
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
            <div className="mt-6 text-sm font-semibold text-foreground">, Founder & CEO, Applied Biotech International</div>
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
            <h2 className="mt-3 font-display text-3xl md:text-5xl font-extrabold leading-[1.05]">Decentralised contacts, <span className="gradient-text">direct access.</span></h2>
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

      {/* Timeline */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-secondary/40">
        <div className="mx-auto max-w-6xl">
          <div className="reveal text-center max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-[0.25em] text-brand font-semibold">Our journey</span>
            <h2 className="mt-3 font-display text-3xl md:text-5xl font-extrabold leading-[1.05]">Twenty years on the bench.</h2>
            <p className="mt-4 text-muted-foreground">Milestones that shaped how we serve African biotechnology today.</p>
          </div>
          <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {timeline.map((m) => (
              <div key={m.y} className="reveal rounded-2xl border border-border bg-card p-6 shadow-soft hover:-translate-y-1 transition-all">
                <div className="font-display text-4xl font-extrabold gradient-text">{m.y}</div>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{m.t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lab Portfolio */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="reveal flex items-end justify-between flex-wrap gap-6">
            <div className="max-w-2xl">
              <span className="text-xs uppercase tracking-[0.25em] text-brand font-semibold">Labs we have built</span>
              <h2 className="mt-3 font-display text-3xl md:text-5xl font-extrabold leading-[1.05]">A working portfolio of <span className="gradient-text">real laboratories.</span></h2>
              <p className="mt-4 text-muted-foreground">From teaching benches to outbreak-response containers, here are some of the facilities Applied Biotech has designed, equipped or commissioned.</p>
            </div>
            <a href="mailto:info@appliedbiotech.ng" className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:gap-3 transition-all">
              Commission your lab <ChevronRight className="h-4 w-4" />
            </a>
          </div>
          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {labPortfolio.map((l) => (
              <article key={l.name} className="reveal group rounded-3xl border border-border bg-card overflow-hidden shadow-soft hover:shadow-brand hover:-translate-y-1 transition-all">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img src={biotechGrid} alt="" loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06122c]/85 via-[#06122c]/30 to-transparent" />
                  <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/90 text-foreground text-[10px] uppercase tracking-wider font-bold">
                    <Building2 className="h-3 w-3" /> Lab {l.year}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-display font-bold text-lg leading-snug">{l.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{l.scope}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {l.tags.map((t) => <span key={t} className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-full bg-brand/10 text-brand">{t}</span>)}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* By the numbers */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl rounded-[2rem] gradient-brand text-brand-foreground p-10 md:p-14 shadow-brand relative overflow-hidden">
          <div className="relative grid sm:grid-cols-4 gap-8 text-center">
            {[
              { I: MapPin, k: "5+", v: "Labs commissioned end to end" },
              { I: Users, k: "1000+", v: "Scientists trained" },
              { I: Award, k: "20+", v: "Years on the bench" },
              { I: FlaskConical, k: "94%", v: "Course completion rate" },
            ].map((s) => (
              <div key={s.v}>
                <s.I className="h-6 w-6 mx-auto opacity-80" />
                <div className="mt-3 font-display text-4xl md:text-5xl font-extrabold">{s.k}</div>
                <div className="mt-2 text-sm text-brand-foreground/85 leading-snug">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}