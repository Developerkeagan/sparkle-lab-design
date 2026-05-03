import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { useReveal } from "@/hooks/use-reveal";
import {
  ArrowRight, FlaskConical, Microscope, GraduationCap, BrainCircuit,
  ShieldCheck, Sparkles, Beaker, ChevronRight, Quote,
} from "lucide-react";
import heroImg from "@/assets/hero-lab.jpg";
import dnaImg from "@/assets/dna-bg.jpg";
import pipImg from "@/assets/pipette.jpg";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Applied Biotech — Innovative Biotechnology, Training & Lab Solutions" },
      { name: "description", content: "Pioneering molecular diagnostics, lab equipment supply, biotech training and consulting across West Africa." },
    ],
  }),
});

function Index() {
  useReveal();
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <Hero />
      <Marquee />
      <Services />
      <About />
      <Stats />
      <News />
      <Testimonial />
      <CTA />
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative pt-28 lg:pt-36 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary via-background to-background" />
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full gradient-brand opacity-[0.12] blur-3xl animate-float-slow" />
        <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full bg-accent-cyan opacity-[0.1] blur-3xl animate-float-slow" style={{ animationDelay: "2s" }} />
      </div>
      <div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-12 items-center">
        <div className="reveal">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand/10 text-brand text-xs font-semibold uppercase tracking-[0.18em]">
            <span className="h-1.5 w-1.5 rounded-full bg-brand animate-pulse-ring" />
            Innovating Biotechnology
          </span>
          <h1 className="mt-6 font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-foreground leading-[1.05]">
            Pioneering pathways to <span className="gradient-text">healthier</span> lives
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
            Molecular diagnostics, calibrated lab equipment, internationally certified training and biotech consulting — engineered for institutions advancing science across Africa.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/services/$slug" params={{ slug: "molecular-lab" }} className="inline-flex items-center gap-2 rounded-full gradient-brand text-brand-foreground px-6 py-3.5 font-semibold shadow-brand hover:scale-105 transition-transform">
              Explore Services <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-card border border-border text-foreground px-6 py-3.5 font-semibold hover:bg-accent transition-colors">
              Talk to us
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">
            {[{ k: "20+", v: "Years" }, { k: "30k+", v: "Tests Run" }, { k: "12", v: "Countries" }].map((s) => (
              <div key={s.v}>
                <div className="font-display text-2xl font-bold text-foreground">{s.k}</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="reveal relative">
          <div className="relative rounded-3xl overflow-hidden shadow-brand aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5]">
            <img src={heroImg} alt="Scientists at work in Applied Biotech laboratory" width={1920} height={1080} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/0 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-background/85 backdrop-blur-xl p-4 border border-border">
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-xl gradient-brand grid place-items-center text-brand-foreground"><Sparkles className="h-5 w-5" /></div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">Now Enrolling</div>
                  <div className="font-semibold text-foreground text-sm">Molecular Diagnostics Cohort 2026</div>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden lg:block absolute -top-6 -right-6 rounded-2xl bg-card border border-border shadow-soft p-4 animate-float-slow">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Turnaround</div>
            <div className="font-display text-2xl font-bold text-brand">24h</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const items = ["Molecular Diagnostics", "PCR & Sequencing", "GLP Compliance", "Reagent Supply", "Bioinformatics", "Capacity Building", "Lab Design"];
  return (
    <div className="border-y border-border bg-card/50 overflow-hidden">
      <div className="flex gap-12 py-5 animate-[marquee_30s_linear_infinite] whitespace-nowrap">
        {[...items, ...items, ...items].map((it, i) => (
          <span key={i} className="text-sm uppercase tracking-[0.25em] text-muted-foreground font-medium flex items-center gap-12">
            {it} <span className="text-brand">◆</span>
          </span>
        ))}
      </div>
      <style>{`@keyframes marquee {0%{transform:translateX(0)}100%{transform:translateX(-33.333%)}}`}</style>
    </div>
  );
}

function Services() {
  const items = [
    { I: FlaskConical, slug: "molecular-lab", t: "Molecular Lab Services", d: "RT-PCR, sequencing, pathogen ID and custom assay development." },
    { I: Microscope, slug: "equipment", t: "Lab Equipment & Reagents", d: "Calibrated equipment, reagents and consumables from trusted brands." },
    { I: GraduationCap, slug: "training", t: "Training & Institute", d: "Internationally certified hands-on training programs." },
    { I: BrainCircuit, slug: "consulting", t: "Consulting", d: "Lab design, R&D strategy, accreditation and capacity building." },
  ];
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="reveal max-w-2xl">
          <span className="text-xs uppercase tracking-[0.2em] text-brand font-semibold">What We Do</span>
          <h2 className="mt-3 font-display text-3xl md:text-5xl font-bold text-foreground">Comprehensive biotech <span className="gradient-text">solutions</span></h2>
          <p className="mt-4 text-muted-foreground">Everything you need to build a powerhouse lab from one trusted partner.</p>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((s, idx) => (
            <Link key={s.slug} to="/services/$slug" params={{ slug: s.slug }} className="reveal group rounded-2xl border border-border bg-card p-7 hover:shadow-brand hover:-translate-y-2 hover:border-brand/40 transition-all duration-300" style={{ transitionDelay: `${idx * 40}ms` }}>
              <div className="h-12 w-12 grid place-items-center rounded-xl gradient-brand text-brand-foreground group-hover:scale-110 transition-transform">
                <s.I className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-display font-bold text-lg text-foreground">{s.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.d}</p>
              <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                Learn more <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  const features = [
    { I: ShieldCheck, t: "ISO-aligned QC" },
    { I: Beaker, t: "Validated SOPs" },
    { I: Sparkles, t: "Master technicians" },
    { I: GraduationCap, t: "Certified curriculum" },
  ];
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-foreground text-background">
      <div className="absolute inset-0 opacity-30">
        <img src={dnaImg} alt="" className="w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-foreground/80" />
      </div>
      <div className="relative mx-auto max-w-7xl grid lg:grid-cols-2 gap-12 items-center">
        <div className="reveal">
          <div className="rounded-3xl overflow-hidden shadow-brand aspect-[4/3]">
            <img src={pipImg} alt="Lab technician working" loading="lazy" className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="reveal">
          <span className="text-xs uppercase tracking-[0.2em] text-accent-cyan font-semibold">Why Applied Biotech</span>
          <h2 className="mt-3 font-display text-3xl md:text-5xl font-bold leading-tight">Science you can <span className="gradient-text">trust</span>, delivered with care.</h2>
          <p className="mt-5 text-background/75 leading-relaxed">
            Two decades of bench experience, international partnerships and a relentless commitment to quality. We don't just supply science — we live it.
          </p>
          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            {features.map((f) => (
              <div key={f.t} className="flex items-center gap-3 rounded-xl bg-background/5 border border-background/10 p-4 hover:bg-background/10 transition-colors">
                <div className="h-10 w-10 grid place-items-center rounded-lg gradient-brand text-brand-foreground"><f.I className="h-5 w-5" /></div>
                <span className="font-semibold">{f.t}</span>
              </div>
            ))}
          </div>
          <Link to="/about" className="mt-8 inline-flex items-center gap-2 rounded-full bg-background text-foreground px-6 py-3 font-semibold hover:scale-105 transition-transform">
            About us <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const stats = [
    { k: "30k+", v: "Samples Processed" },
    { k: "24h", v: "Avg Turnaround" },
    { k: "98%", v: "Client Retention" },
    { k: "12", v: "Countries Served" },
  ];
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl rounded-3xl gradient-brand text-brand-foreground p-10 md:p-14 shadow-brand">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 text-center">
          {stats.map((s) => (
            <div key={s.v} className="reveal">
              <div className="font-display text-5xl md:text-6xl font-bold">{s.k}</div>
              <div className="mt-2 text-sm uppercase tracking-wider text-brand-foreground/80">{s.v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function News() {
  const items = [
    { tag: "Event", t: "Science Camp 2026 Opens", d: "Hands-on biotech for students." },
    { tag: "Training", t: "Molecular Diagnostics Cohort", d: "30 trainees, 6 countries." },
    { tag: "Equipment", t: "Spring Reagent Catalogue", d: "Bulk discounts available." },
  ];
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="reveal flex items-end justify-between flex-wrap gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-brand font-semibold">News</span>
            <h2 className="mt-3 font-display text-3xl md:text-5xl font-bold">Latest from the lab</h2>
          </div>
          <Link to="/news" className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:gap-3 transition-all">View all <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {items.map((n, i) => (
            <article key={n.t} className="reveal group rounded-2xl border border-border bg-card overflow-hidden hover:shadow-brand hover:-translate-y-1 transition-all" style={{ transitionDelay: `${i * 60}ms` }}>
              <div className="aspect-[16/10] overflow-hidden">
                <img src={[heroImg, pipImg, dnaImg][i]} alt="" loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
              <div className="p-6">
                <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-brand/10 text-brand font-semibold">{n.tag}</span>
                <h3 className="mt-3 font-display font-bold text-lg group-hover:text-brand transition-colors">{n.t}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{n.d}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonial() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="reveal mx-auto max-w-4xl text-center rounded-3xl bg-card border border-border p-10 md:p-16 shadow-soft">
        <Quote className="h-10 w-10 text-brand mx-auto" />
        <blockquote className="mt-6 font-display text-2xl md:text-3xl font-medium text-foreground leading-snug">
          "Working with Applied Biotech transformed our lab capabilities. From training to equipment to consulting — the team simply delivered."
        </blockquote>
        <div className="mt-8">
          <div className="font-semibold text-foreground">Prof. Solomon Bamidele</div>
          <div className="text-sm text-muted-foreground">Director, National Biotech Development Agency</div>
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="reveal mx-auto max-w-6xl rounded-3xl gradient-brand text-brand-foreground p-10 md:p-16 shadow-brand relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-background/10 blur-3xl" />
        <div className="relative grid md:grid-cols-[1fr_auto] gap-8 items-center">
          <div>
            <h2 className="font-display text-3xl md:text-5xl font-bold leading-tight">Ready to advance your lab?</h2>
            <p className="mt-3 text-brand-foreground/85 max-w-xl">Book a discovery call and learn how Applied Biotech can support your next project, training cohort or research program.</p>
          </div>
          <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-background text-foreground px-7 py-4 font-semibold hover:scale-105 transition-transform shadow-soft self-start md:self-center">
            Request a consultation <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
