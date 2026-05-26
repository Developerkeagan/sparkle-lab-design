import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { useReveal } from "@/hooks/use-reveal";
import {
  ArrowRight, ChevronRight, Sparkles, FlaskConical, ShoppingBag, GraduationCap,
  BrainCircuit, Lightbulb, Play, Shield, Cpu, Award, Atom,
} from "lucide-react";
import useFetch from "@/hooks/useFetch";
import heroVirus from "@/assets/hero-virus.jpg";
import aquapure from "@/assets/aquapure.jpg";
import mobileLab from "@/assets/mobile-lab.jpg";
import profPortrait from "@/assets/prof-portrait.jpg";
import biotechGrid from "@/assets/biotech-grid.jpg";
import { useSiteContent } from "@/lib/site-content";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Applied Biotech — Innovating Biotechnology for Sustainable Development" },
      { name: "description", content: "Powering scientific discovery — molecular research, sample analysis, turnkey lab engineering, certified training, and strategic consultancy across Africa." },
    ],
  }),
});

function Index() {
  useReveal();
  const { fetchData } = useFetch();

  useEffect(() => {
    const trackVisit = async () => {
      try {
        await fetchData("/api/v1/analytics/hit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ page: "landing" }),
        });
      } catch (e) { console.warn("Analytics tracking failed", e); }
    };
    trackVisit();
  }, [fetchData]);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <Hero />
      <Marquee />
      <FeaturedInfrastructure />
      <WhatWeDo />
      <Welcome />
      <News />
      <Pillars />
      <MetricBanner />
      <CTA />
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative pt-28 lg:pt-36 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary via-background to-background" />
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full gradient-brand opacity-[0.12] blur-3xl animate-float-slow" />
        <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full bg-accent-cyan opacity-[0.10] blur-3xl animate-float-slow" style={{ animationDelay: "2s" }} />
      </div>
      <div className="mx-auto max-w-7xl grid lg:grid-cols-[1.05fr_1fr] gap-14 items-center">
        <div className="reveal">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand/10 text-brand text-xs font-semibold uppercase tracking-[0.2em]">
            <span className="h-1.5 w-1.5 rounded-full bg-brand animate-pulse-ring" />
            Innovating Biotechnology
          </span>
          <h1 className="mt-6 font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-foreground leading-[1.02]">
            INNOVATING <span className="gradient-text">BIOTECHNOLOGY</span>
          </h1>
          <p className="mt-6 font-display text-lg md:text-xl font-semibold text-foreground/85 leading-snug max-w-xl uppercase tracking-wide">
            Powering scientific discovery and enabling application of innovation for sustainable development.
          </p>
          <p className="mt-5 text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed">
            From advanced molecular research and precision sample analysis to turnkey equipment sales, certified capacity building and strategic consultancy — engineered for institutions driving the future of science.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link to="/rd-portfolio" className="inline-flex items-center gap-2 rounded-full gradient-brand text-brand-foreground px-6 py-3.5 font-semibold shadow-brand hover:scale-[1.03] transition-transform">
              Explore Our Portfolio <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-card border border-border text-foreground px-6 py-3.5 font-semibold hover:bg-accent transition-colors">
              Partner With Us
            </Link>
          </div>
        </div>
        <div className="reveal relative">
          <div className="relative rounded-[2rem] overflow-hidden shadow-brand aspect-square bg-[#0a1838] animate-[hero-scale_2.4s_cubic-bezier(.22,.9,.3,1)]">
            <img src={heroVirus} alt="Abstract futuristic virus morphology with DNA strands" width={1536} height={1536} className="w-full h-full object-cover animate-[hero-zoom_18s_ease-in-out_infinite_alternate]" />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#0a1838]/40 via-transparent to-transparent" />
            <div className="absolute top-5 left-5 rounded-full bg-background/85 backdrop-blur-xl border border-border px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] font-semibold text-foreground flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-cyan animate-pulse" /> Live R&D
            </div>
          </div>
          <div className="hidden lg:block absolute -bottom-6 -left-6 rounded-2xl bg-card border border-border shadow-soft p-4 animate-float-slow">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Hubs Designed</div>
            <div className="font-display text-2xl font-bold text-brand">5+</div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes hero-scale { 0%{transform:scale(.86);opacity:0} 100%{transform:scale(1);opacity:1} }
        @keyframes hero-zoom { 0%{transform:scale(1)} 100%{transform:scale(1.08)} }
      `}</style>
    </section>
  );
}

function Marquee() {
  const items = ["Molecular Diagnostics", "PCR & Sequencing", "AquaPure™ Reagents", "Mobile Molecular Labs", "Bioinformatics", "Capacity Building", "Lab Design", "Bio-Innovation"];
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

function FeaturedInfrastructure() {
  return (
    <section className="relative py-24 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#06122c] text-background">
      <div className="absolute inset-0 opacity-40">
        <img src={biotechGrid} alt="" loading="lazy" className="w-full h-full object-cover" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#06122c]/40 via-[#06122c]/70 to-[#06122c]" />
      <div className="relative mx-auto max-w-7xl">
        <div className="reveal max-w-3xl">
          <span className="text-xs uppercase tracking-[0.25em] text-accent-cyan font-semibold">New · Featured</span>
          <h2 className="mt-4 font-display text-3xl md:text-5xl font-extrabold leading-[1.05]">
            Introducing <span className="gradient-text">Reagent Sovereignty</span> & Rugged Diagnostics
          </h2>
          <p className="mt-5 text-base md:text-lg text-background/75 leading-relaxed">
            Sovereign reagents and deployable infrastructure — 100% locally manufactured, globally validated.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-2 items-stretch">
          <div className="reveal group relative rounded-3xl overflow-hidden border border-background/10 bg-background/[0.04] backdrop-blur-sm p-8">
            <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-accent-cyan/20 blur-3xl group-hover:bg-accent-cyan/30 transition-colors" />
            <div className="relative grid grid-cols-[1fr_auto] gap-6 items-center">
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-accent-cyan font-semibold">Product Focus</span>
                <h3 className="mt-2 font-display text-2xl md:text-3xl font-bold">AquaPure™ Nuclease-Free Water</h3>
                <p className="mt-3 text-sm text-background/70 leading-relaxed">
                  Deionized, sterile-filtered to 0.1µm, and validated via real-time PCR assays for zero enzymatic inhibition. Ideal for master mixes, cDNA synthesis, NGS prep, and delicate cell culture.
                </p>
              </div>
              <img src={aquapure} alt="AquaPure Nuclease-Free Water bottle" loading="lazy" width={400} height={520} className="h-52 w-auto object-contain drop-shadow-2xl transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-2" />
            </div>
          </div>

          <div className="reveal group relative rounded-3xl overflow-hidden border border-background/10 bg-background/[0.04] backdrop-blur-sm">
            <div className="aspect-[16/10] overflow-hidden">
              <img src={mobileLab} alt="Solar-powered mobile molecular laboratory" loading="lazy" className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110" />
            </div>
            <div className="p-7">
              <span className="text-[10px] uppercase tracking-[0.2em] text-accent-cyan font-semibold">Infrastructure</span>
              <h3 className="mt-2 font-display text-2xl md:text-3xl font-bold">Turnkey Mobile Molecular Labs</h3>
              <p className="mt-3 text-sm text-background/70 leading-relaxed">
                Ruggedized, solar-powered, self-sustaining mobile lab containers for rapid deployment in remote settings, epidemiological surveillance, and agricultural testing zones.
              </p>
            </div>
          </div>
        </div>

        <div className="reveal mt-12 flex flex-wrap gap-3">
          <Link to="/shop" className="inline-flex items-center gap-2 rounded-full gradient-brand text-brand-foreground px-7 py-4 font-semibold shadow-brand hover:scale-[1.03] transition-transform">
            Procure Reagents & Systems <ArrowRight className="h-4 w-4" />
          </Link>
          <Link to="/contact" className="inline-flex items-center gap-2 rounded-full border border-background/20 bg-background/5 text-background px-7 py-4 font-semibold hover:bg-background/10 transition-colors">
            Request bulk quote
          </Link>
        </div>
      </div>
    </section>
  );
}

function WhatWeDo() {
  const cards = [
    {
      n: "01", I: Atom, t: "Cutting-Edge Research",
      d: "We act as the core engine for local and international life science breakthroughs. Rigorous genomics, molecular epidemiology, and biotechnology-driven investigations that transform complex biological challenges into validated, scalable solutions for public health, agriculture and environmental conservation.",
      cta: "Explore Our R&D", to: "/rd-portfolio" as const,
    },
    {
      n: "02", I: ShoppingBag, t: "Equipment & Reagent Supply",
      d: "Eliminating supply chain friction for African laboratories. Direct, premium access to Tier-1 molecular hardware, diagnostic reagents and certified consumables — backed by local maintenance warranties, technical calibration and cold-chain integrity.",
      cta: "View Shop", to: "/shop" as const,
    },
    {
      n: "03", I: GraduationCap, t: "Capacity Building",
      d: "Bridging the gap between academic theory and industry execution. Through dedicated tech-transfer frameworks, we deliver exhaustive bench-level molecular training that transforms scientists, research fellows and lab officers into independent, certified technical experts.",
      cta: "View Academy", to: "/academy" as const,
    },
    {
      n: "04", I: BrainCircuit, t: "Strategic Consultancy",
      d: "Navigating the architectural and regulatory complexities of modern biotechnology. We advise international development partners, regulatory bodies and corporate entities on high-level bio-governance, grant formulation, project scaling and structural biosafety frameworks.",
      cta: "Consult an Expert", to: "/contact" as const,
    },
    {
      n: "05", I: Lightbulb, t: "Bio-Innovation",
      d: "Harnessing localized biodiversity to pioneer sovereign biological assets. From climate-resilient microbial bioinoculants that secure agricultural yields to resource-efficient diagnostic kits, we design, test and protect patentable indigenous technologies tailored for emerging markets.",
      cta: "View Innovations", to: "/ip-publications" as const,
    },
  ];
  return (
    <section className="relative py-24 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 -z-10 opacity-[0.35]">
        <img src={biotechGrid} alt="" loading="lazy" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/70 to-background" />
      </div>
      <div className="mx-auto max-w-7xl">
        <div className="reveal max-w-3xl">
          <span className="text-xs uppercase tracking-[0.25em] text-brand font-semibold">What We Do</span>
          <h2 className="mt-3 font-display text-3xl md:text-5xl font-extrabold leading-[1.05]">
            One vertically integrated platform for <span className="gradient-text">life science.</span>
          </h2>
          <p className="mt-5 text-muted-foreground text-lg">
            From the bench to the boardroom — we build the science, the systems and the scientists.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((c, i) => (
            <Link
              key={c.n}
              to={c.to}
              className="reveal group relative flex flex-col rounded-[2rem] border border-border bg-card/80 backdrop-blur-sm p-8 lg:p-10 hover:-translate-y-2 hover:border-brand/40 hover:shadow-brand transition-all duration-500 overflow-hidden"
              style={{ transitionDelay: `${i * 60}ms`, minHeight: "440px" }}
            >
              <div className="absolute -top-20 -right-20 w-56 h-56 rounded-full gradient-brand opacity-0 group-hover:opacity-[0.18] blur-3xl transition-opacity duration-700" />
              <div className="relative flex items-start justify-between">
                <span className="font-display text-5xl font-extrabold text-foreground/10 group-hover:text-brand/40 transition-colors">{c.n}</span>
                <div className="h-12 w-12 grid place-items-center rounded-2xl gradient-brand text-brand-foreground group-hover:scale-110 group-hover:rotate-3 transition-transform">
                  <c.I className="h-6 w-6" />
                </div>
              </div>
              <h3 className="relative mt-8 font-display text-2xl md:text-3xl font-bold text-foreground leading-tight">{c.t}</h3>
              <p className="relative mt-4 text-sm md:text-base text-muted-foreground leading-relaxed flex-1">{c.d}</p>
              <div className="relative mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand">
                {c.cta} <ChevronRight className="h-4 w-4 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function Welcome() {
  const [playing, setPlaying] = useState(false);
  // Placeholder YouTube ID — swap in editor dashboard later
  const videoId = "dQw4w9WgXcQ";
  return (
    <section className="py-24 md:py-28 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl grid lg:grid-cols-[1fr_1.1fr] gap-10 items-center">
        <div className="reveal">
          <span className="text-xs uppercase tracking-[0.25em] text-brand font-semibold">Founder · CEO</span>
          <h2 className="mt-3 font-display text-3xl md:text-5xl font-extrabold leading-[1.05]">
            A message from <span className="gradient-text">Prof. Nwadiuto Esiobu</span>
          </h2>
          <p className="mt-5 text-muted-foreground leading-relaxed">
            Hear directly from our founder on the mission, the science, and what's next for Applied Biotech.
          </p>
          <Link to="/about" className="mt-7 inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 font-semibold hover:bg-accent transition-colors">
            Read full statement <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="reveal">
          <div className="relative rounded-3xl overflow-hidden shadow-brand aspect-video bg-foreground group">
            {playing ? (
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                title="Welcome from Prof. Nwadiuto Esiobu"
                allow="autoplay; encrypted-media"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            ) : (
              <button onClick={() => setPlaying(true)} className="absolute inset-0 w-full h-full">
                <img src={profPortrait} alt="Prof. Nwadiuto Esiobu — Founder & CEO of Applied Biotech" loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/10 to-transparent" />
                <div className="absolute inset-0 grid place-items-center">
                  <div className="h-20 w-20 rounded-full bg-background/95 grid place-items-center shadow-brand group-hover:scale-110 transition-transform">
                    <Play className="h-7 w-7 text-brand ml-1" fill="currentColor" />
                  </div>
                </div>
                <div className="absolute bottom-5 left-5 right-5 text-left">
                  <div className="text-xs uppercase tracking-[0.2em] text-background/75 font-semibold">Watch</div>
                  <div className="font-display font-bold text-background text-xl">Prof. Nwadiuto Esiobu · Founder & CEO</div>
                </div>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function News() {
  const { news } = useSiteContent();
  const items = news.slice(0, 3);
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-secondary/40">
      <div className="mx-auto max-w-7xl">
        <div className="reveal flex items-end justify-between flex-wrap gap-4">
          <div className="max-w-xl">
            <span className="text-xs uppercase tracking-[0.25em] text-brand font-semibold">Insights & Updates</span>
            <h2 className="mt-3 font-display text-3xl md:text-5xl font-extrabold">Latest from the lab</h2>
            <p className="mt-4 text-muted-foreground">Diagnostics archives, peer-reviewed publications and upcoming cohorts.</p>
          </div>
          <Link to="/news" className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:gap-3 transition-all">View all <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {items.map((n, i) => (
            <Link
              key={n.id}
              to="/news/$slug"
              params={{ slug: n.slug }}
              className="reveal group relative rounded-3xl overflow-hidden bg-card border border-border hover:-translate-y-2 hover:shadow-brand transition-all duration-500"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img src={n.cover} alt={n.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full bg-brand/10 text-brand font-semibold">{n.tag}</span>
                  <span className="text-xs text-muted-foreground">{n.date}</span>
                </div>
                <h3 className="mt-4 font-display font-bold text-lg group-hover:text-brand transition-colors leading-snug">{n.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{n.excerpt}</p>
                <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                  Read more <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pillars() {
  const pillars = [
    { I: Sparkles, t: "Precision Analysis", d: "Calibrated assays, validated SOPs, zero contamination tolerance." },
    { I: Cpu, t: "Turnkey Infrastructure", d: "End-to-end facility design, deployment and maintenance." },
    { I: Award, t: "CMD Certified", d: "Internationally recognized quality and curriculum standards." },
    { I: Shield, t: "Intellectual Acuity", d: "Deep scientific bench backed by 20+ years of research." },
  ];
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="reveal text-center max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-[0.25em] text-brand font-semibold">Why Applied Biotech</span>
          <h2 className="mt-3 font-display text-3xl md:text-5xl font-extrabold">Built on four <span className="gradient-text">pillars.</span></h2>
        </div>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => (
            <div key={p.t} className="reveal group rounded-2xl border border-border bg-card p-7 hover:border-brand/40 hover:-translate-y-1 hover:shadow-soft transition-all" style={{ transitionDelay: `${i * 50}ms` }}>
              <div className="h-12 w-12 grid place-items-center rounded-xl gradient-brand text-brand-foreground group-hover:scale-110 transition-transform">
                <p.I className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-display font-bold text-lg uppercase tracking-wide">{p.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MetricBanner() {
  const stats = [
    { k: "20+", v: "Years of Advanced Molecular Research" },
    { k: "1000+", v: "High-Caliber Researchers & Technicians Trained" },
    { k: "5+", v: "World-Class Molecular Research Hubs Designed & Equipped" },
  ];
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl rounded-[2rem] gradient-brand text-brand-foreground p-10 md:p-16 shadow-brand relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-background/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-background/5 blur-3xl" />
        <div className="relative grid sm:grid-cols-3 gap-10 text-center">
          {stats.map((s) => (
            <div key={s.v} className="reveal">
              <div className="font-display text-5xl md:text-7xl font-extrabold tracking-tight">{s.k}</div>
              <div className="mt-3 text-sm md:text-base text-brand-foreground/85 leading-snug">{s.v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="pb-24 pt-4 px-4 sm:px-6 lg:px-8">
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
