import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { useReveal } from "@/hooks/use-reveal";
import {
  ArrowRight, ChevronRight, Sparkles, FlaskConical, ShoppingBag, GraduationCap,
  BrainCircuit, Lightbulb, Play, Shield, Cpu, Award, Atom, Newspaper, Mail, Microscope,
  CheckCircle2, Building2, Beaker, Tag as TagIcon,
} from "lucide-react";
import useFetch from "@/hooks/useFetch";
import heroVirus from "@/assets/hero-virus.jpg";
import heroPipette from "@/assets/hero-pipette.jpg";
import heroBioeconomy from "@/assets/hero-bioeconomy.jpg";
import aquapure from "@/assets/aquapure.jpg";
import mobileLab from "@/assets/mobile-lab.jpg";
import profPortrait from "@/assets/prof-portrait.jpg";
import biotechGrid from "@/assets/biotech-grid.jpg";
import { useSiteContent } from "@/lib/site-content";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Applied Biotech, Build the Future of African Biotechnology" },
      { name: "description", content: "Train as a scientist, equip your lab, partner on breakthrough research and help shape the bio-economy with Applied Biotech." },
    ],
  }),
});

function Index() {
  useReveal();
  const { fetchData } = useFetch();
  useEffect(() => {
    fetchData("/api/v1/analytics/hit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ page: "landing" }),
    }).catch(() => {});
  }, [fetchData]);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <Hero />
      <Marquee />
      <QuickDoors />
      <PetalNavigator />
      <ConsultSection />
      <DealOfWeek />
      <FeaturedRotator />
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

const HERO_SLIDES = [
  { headline: "Leading the biotechnology revolution in Africa", sub: "Train, equip and partner with a lab that already turns African biology into world-class results. Pick a path and step in.", img: heroVirus, alt: "Abstract virus morphology with DNA strands", cta: { label: "Explore Our R&D", to: "/rd-portfolio" as const } },
  { headline: "Powering the bioeconomy in Africa", sub: "Source sovereign reagents, deploy validated assays and certify your team on benches built for real diagnostic work.", img: heroPipette, alt: "Gloved hand pipetting into a microfuge tube", cta: { label: "Start Learning", to: "/academy" as const } },
  { headline: "Championing biotechnology solutions in Africa", sub: "From PCR consumables to full institutional lab builds, we put the tools, training and talent in your hands.", img: heroBioeconomy, alt: "Glowing DNA helix with bio-circuit patterns", cta: { label: "Equip Your Lab", to: "/shop" as const } },
];

function Hero() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % HERO_SLIDES.length), 5500);
    return () => clearInterval(t);
  }, []);
  const slide = HERO_SLIDES[i];
  return (
    <section className="relative pt-28 lg:pt-36 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary via-background to-background" />
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full gradient-brand opacity-[0.12] blur-3xl animate-float-slow" />
        <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full bg-accent-cyan opacity-[0.10] blur-3xl animate-float-slow" style={{ animationDelay: "2s" }} />
      </div>
      <div className="mx-auto max-w-7xl grid lg:grid-cols-[1.05fr_1fr] gap-14 items-center">
        <div>
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand/10 text-brand text-xs font-semibold uppercase tracking-[0.2em]">
            <span className="h-1.5 w-1.5 rounded-full bg-brand animate-pulse-ring" />
            Be a part of the breakthrough
          </span>
          <div className="relative min-h-[280px] md:min-h-[340px] mt-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.7, ease: [0.22, 0.9, 0.3, 1] }}
              >
                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-foreground leading-[1.02]">
                  {slide.headline.split(" ").slice(0, -2).join(" ")}{" "}
                  <span className="gradient-text">{slide.headline.split(" ").slice(-2).join(" ")}</span>
                </h1>
                <p className="mt-6 text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed">{slide.sub}</p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Link to={slide.cta.to} className="inline-flex items-center gap-2 rounded-full gradient-brand text-brand-foreground px-6 py-3.5 font-semibold shadow-brand hover:scale-[1.03] transition-transform">
                    {slide.cta.label} <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-card border border-border text-foreground px-6 py-3.5 font-semibold hover:bg-accent transition-colors">
                    Partner With Us
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="mt-8 flex items-center gap-2">
            {HERO_SLIDES.map((_, idx) => (
              <button key={idx} onClick={() => setI(idx)} aria-label={`Slide ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all ${idx === i ? "w-10 bg-brand" : "w-4 bg-border hover:bg-muted-foreground"}`} />
            ))}
          </div>
        </div>
        <div className="relative order-first lg:order-none">
          <div className="relative rounded-[2rem] overflow-hidden shadow-brand aspect-square bg-[#0a1838]">
            <AnimatePresence mode="wait">
              <motion.img
                key={slide.img}
                src={slide.img}
                alt={slide.alt}
                width={1024}
                height={1024}
                initial={{ opacity: 0, scale: 1.12 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 1.1, ease: [0.22, 0.9, 0.3, 1] }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-tr from-[#0a1838]/40 via-transparent to-transparent" />
            <div className="absolute top-5 left-5 rounded-full bg-background/85 backdrop-blur-xl border border-border px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] font-semibold text-foreground flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-cyan animate-pulse" /> Live R&D
            </div>
          </div>
          <div className="hidden lg:block absolute -bottom-6 -left-6 rounded-2xl bg-card border border-border shadow-soft p-4 animate-float-slow">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Scientists Trained</div>
            <div className="font-display text-2xl font-bold text-brand">1000+</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const items = ["Run your first PCR", "Earn a CMD certificate", "Stock your bench", "Deploy a mobile lab", "Train your team", "Sequence your sample", "Build your career", "Move science forward"];
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

const FEATURED_SLIDES = [
  { eyebrow: "Run Cleaner Reactions", headline: "Get AquaPure, the water your PCR deserves.", body: "Validated nuclease-free water that ends contamination headaches. Use it across master mixes, NGS prep and cell culture and watch your yields jump.", img: aquapure, cta: { label: "Order AquaPure", to: "/shop" as const } },
  { eyebrow: "Lead the Bioeconomy", headline: "Patent your breakthrough, we will help you scale it.", body: "Locally sourced biological assets, validated, protected and ready for market. From climate resilient bioinoculants to sovereign diagnostic kits.", img: heroBioeconomy, cta: { label: "See R&D Pipeline", to: "/rd-portfolio" as const } },
];

function FeaturedRotator() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % FEATURED_SLIDES.length), 6500);
    return () => clearInterval(t);
  }, []);
  const s = FEATURED_SLIDES[i];
  return (
    <section className="relative py-24 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#06122c] text-background">
      <div className="absolute inset-0 opacity-40">
        <img src={biotechGrid} alt="" loading="lazy" className="w-full h-full object-cover" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#06122c]/40 via-[#06122c]/70 to-[#06122c]" />
      <div className="relative mx-auto max-w-7xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.7 }}
            className="grid lg:grid-cols-[1fr_1.1fr] gap-12 items-center"
          >
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-accent-cyan font-semibold">{s.eyebrow}</span>
              <h2 className="mt-4 font-display text-3xl md:text-5xl font-extrabold leading-[1.05]">{s.headline}</h2>
              <p className="mt-5 text-base md:text-lg text-background/75 leading-relaxed max-w-xl">{s.body}</p>
              <Link to={s.cta.to} className="mt-8 inline-flex items-center gap-2 rounded-full gradient-brand text-brand-foreground px-7 py-4 font-semibold shadow-brand hover:scale-[1.03] transition-transform">
                {s.cta.label} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <motion.div
              initial={{ scale: 1.15, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: [0.22, 0.9, 0.3, 1] }}
              className="relative rounded-3xl overflow-hidden aspect-[4/3] border border-background/10 bg-background/[0.04]"
            >
              <img src={s.img} alt={s.headline} loading="lazy" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#06122c]/40 via-transparent to-transparent" />
            </motion.div>
          </motion.div>
        </AnimatePresence>
        <div className="mt-10 flex items-center gap-2">
          {FEATURED_SLIDES.map((_, idx) => (
            <button key={idx} onClick={() => setI(idx)} aria-label={`Featured ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all ${idx === i ? "w-10 bg-accent-cyan" : "w-4 bg-background/20 hover:bg-background/40"}`} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PetalNavigator() {
  const petals: { label: string; sub: string; color: string; I: typeof ShoppingBag; action: { type: "link"; to: any } | { type: "scroll"; id: string } }[] = [
    { label: "Shop here", sub: "Reagents & instruments", color: "#2563eb", I: ShoppingBag, action: { type: "link", to: "/shop" } },
    { label: "Academy", sub: "Train & get certified", color: "#16a34a", I: GraduationCap, action: { type: "link", to: "/academy" } },
    { label: "Consult", sub: "Strategy & advisory", color: "#dc2626", I: BrainCircuit, action: { type: "scroll", id: "consult" } },
    { label: "Rent a lab", sub: "Bench time, on demand", color: "#94a3b8", I: Beaker, action: { type: "link", to: "/rent-a-lab" } },
  ];
  function handle(p: typeof petals[number]) {
    if (p.action.type === "scroll") {
      const el = document.getElementById(p.action.id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background via-secondary/30 to-background">
      <div className="mx-auto max-w-6xl text-center">
        <span className="text-xs uppercase tracking-[0.25em] text-brand font-semibold">Engage with us</span>
        <h2 className="mt-3 font-display text-3xl md:text-5xl font-extrabold">Pick a petal, <span className="gradient-text">take an action.</span></h2>
        <p className="mt-4 text-muted-foreground max-w-xl mx-auto">Four direct ways to start working with Applied Biotech today.</p>
      </div>
      <div className="relative mx-auto mt-16 h-[480px] sm:h-[560px] w-full max-w-[560px]">
        {petals.map((p, idx) => {
          const angle = (idx / petals.length) * Math.PI * 2 - Math.PI / 2;
          const radius = 165;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          const rot = (angle * 180) / Math.PI + 90;
          const inner = (
            <motion.div
              whileHover={{ scale: 1.06 }}
              className="group relative grid h-[170px] w-[130px] place-items-center text-white font-semibold shadow-brand transition-all"
              style={{
                background: `radial-gradient(circle at 50% 25%, ${p.color}ee, ${p.color}cc 55%, ${p.color}66)`,
                borderRadius: "50% 50% 50% 50% / 70% 70% 30% 30%",
                transform: `rotate(${rot}deg)`,
              }}
            >
              <div className="flex flex-col items-center gap-1.5 px-2 text-center" style={{ transform: `rotate(${-rot}deg)` }}>
                <p.I className="h-6 w-6 transition-transform group-hover:rotate-12" />
                <span className="text-sm font-bold tracking-wide leading-tight">{p.label}</span>
                <span className="text-[10px] uppercase tracking-wider opacity-85 leading-tight">{p.sub}</span>
              </div>
              <div className="absolute inset-0 ring-1 ring-white/25 group-hover:ring-white/60 transition" style={{ borderRadius: "inherit" }} />
            </motion.div>
          );
          return (
            <motion.div
              key={p.label}
              className="absolute left-1/2 top-1/2"
              style={{ x: x - 65, y: y - 85 }}
              initial={{ opacity: 0, scale: 0.3 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, type: "spring", stiffness: 110 }}
            >
              {p.action.type === "link" ? (
                <Link to={p.action.to}>{inner}</Link>
              ) : (
                <button onClick={() => handle(p)} className="block">{inner}</button>
              )}
            </motion.div>
          );
        })}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-32 w-32 rounded-full gradient-brand grid place-items-center shadow-brand"
          animate={{ rotate: 360 }}
          transition={{ duration: 28, ease: "linear", repeat: Infinity }}
        >
          <Link to="/contact" className="h-28 w-28 rounded-full bg-background grid place-items-center hover:bg-secondary transition-colors" style={{ animation: "spin 28s linear infinite reverse" }}>
            <div className="text-center">
              <div className="font-display font-extrabold text-brand text-base leading-none">Engage</div>
              <div className="font-display font-extrabold text-brand text-base leading-none mt-0.5">Us</div>
              <div className="text-[9px] uppercase tracking-wider text-muted-foreground mt-1">Tap to talk</div>
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function ConsultSection() {
  const bullets = [
    "Identify opportunities others miss",
    "Connect research with real-world applications",
    "Access expert guidance on biotechnology innovation",
    "Build stronger commercialisation and growth strategies",
    "Navigate challenges with confidence",
    "Position your organisation at the forefront of biotech",
  ];
  return (
    <section id="consult" className="relative py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-brand/5 via-background to-accent-cyan/5" />
      <div className="mx-auto max-w-7xl grid lg:grid-cols-[1.1fr_1fr] gap-14 items-center">
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand/10 text-brand text-xs font-semibold uppercase tracking-[0.2em]">
            <BrainCircuit className="h-3.5 w-3.5" /> Consultancy
          </span>
          <h2 className="mt-5 font-display text-3xl md:text-5xl font-extrabold leading-[1.05]">
            Turn your biotechnology vision into <span className="gradient-text">reality.</span>
          </h2>
          <p className="mt-5 text-muted-foreground leading-relaxed text-base md:text-lg">
            The next breakthrough in biotechnology will not come from ideas alone. It will come from the organisations that know how to turn innovation into impact.
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Whether you are a researcher seeking commercialisation pathways, a startup looking for strategic direction, or an organisation exploring biotechnology opportunities, our consulting services help you move faster, make smarter decisions and unlock greater value from your innovations.
          </p>
          <div className="mt-7 grid sm:grid-cols-2 gap-3">
            {bullets.map((b) => (
              <div key={b} className="flex items-start gap-2.5 text-sm">
                <CheckCircle2 className="h-5 w-5 text-brand shrink-0 mt-0.5" />
                <span className="text-foreground/85 leading-snug">{b}</span>
              </div>
            ))}
          </div>
          <p className="mt-7 text-foreground/85 italic">
            Your next breakthrough deserves more than potential. It deserves a strategy.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full gradient-brand text-brand-foreground px-7 py-4 font-semibold shadow-brand hover:scale-[1.03] transition-transform">
              Book a consultation <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/services/$slug" params={{ slug: "consulting" }} className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-4 font-semibold hover:bg-accent">
              Read full scope
            </Link>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative">
          <div className="absolute -top-6 -left-6 h-24 w-24 rounded-full gradient-brand opacity-20 blur-2xl" />
          <div className="absolute -bottom-6 -right-6 h-32 w-32 rounded-full bg-accent-cyan opacity-20 blur-2xl" />
          <div className="relative rounded-3xl overflow-hidden border border-border shadow-brand aspect-[4/5]">
            <img src={profPortrait} alt="Strategy session at Applied Biotech" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-background">
              <div className="text-[10px] uppercase tracking-[0.25em] opacity-80">Africa's leading biotech champions</div>
              <div className="mt-1 font-display font-bold text-xl leading-tight">20 years of turning ambitious ideas into measurable results.</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function DealOfWeek() {
  const { fetchData } = useFetch();
  const [deal, setDeal] = useState<any | null>(null);
  useEffect(() => {
    fetchData("/api/v1/shop/deal-of-the-week").then((d) => { if (d && d.product) setDeal(d); }).catch(() => {});
  }, [fetchData]);
  if (!deal) return null;
  const productId = deal.product?._id || deal.product;
  const productImage = deal.product?.productImage;
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="relative rounded-[2rem] bg-foreground text-background p-8 md:p-14 overflow-hidden shadow-brand">
          <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full gradient-brand opacity-30 blur-3xl" />
          <div className="absolute -bottom-24 -left-20 w-80 h-80 rounded-full bg-accent-cyan opacity-20 blur-3xl" />
          <div className="relative grid lg:grid-cols-[1.1fr_1fr] gap-10 items-center">
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-cyan/20 text-accent-cyan text-[10px] uppercase tracking-[0.25em] font-bold">
                <TagIcon className="h-3.5 w-3.5" /> {deal.eyebrow || "Deal of the week"}
              </span>
              <h2 className="mt-4 font-display text-3xl md:text-5xl font-extrabold leading-[1.05] text-background">
                {deal.headline || "This week's featured deal"}
              </h2>
              <p className="mt-4 text-background/75 max-w-xl leading-relaxed">{deal.blurb}</p>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <div className="font-display text-4xl font-extrabold text-accent-cyan">₦{Number(deal.salePrice || 0).toLocaleString()}</div>
                {deal.oldPrice ? <div className="text-background/50 line-through text-base">₦{Number(deal.oldPrice).toLocaleString()}</div> : null}
                {deal.discountLabel ? <span className="px-3 py-1 rounded-full bg-accent-cyan text-foreground text-xs font-bold">{deal.discountLabel}</span> : null}
              </div>
              <div className="mt-7 flex flex-wrap gap-3">
                {productId ? (
                  <Link to="/shop/product/$id" params={{ id: String(productId) }} className="inline-flex items-center gap-2 rounded-full bg-background text-foreground px-7 py-4 font-semibold hover:scale-[1.03] transition-transform">
                    Grab the deal <ArrowRight className="h-4 w-4" />
                  </Link>
                ) : (
                  <Link to="/shop" className="inline-flex items-center gap-2 rounded-full bg-background text-foreground px-7 py-4 font-semibold hover:scale-[1.03] transition-transform">
                    Visit the shop <ArrowRight className="h-4 w-4" />
                  </Link>
                )}
                <Link to="/shop/deals" className="inline-flex items-center gap-2 rounded-full border border-background/30 text-background px-6 py-4 font-semibold hover:bg-background/10">
                  See all deals
                </Link>
              </div>
            </div>
            {productImage && (
              <div className="relative">
                <div className="aspect-square rounded-3xl overflow-hidden bg-background/5 border border-background/10">
                  <img src={productImage} alt={deal.headline || "Featured product"} className="w-full h-full object-cover" />
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function WhatWeDo() {
  const cards = [
    { n: "01", I: Atom, t: "Drive a discovery that matters",
      d: "Plug into the genomics, molecular epidemiology and bio-innovation work moving African public health forward. Bring your hypothesis, we'll bring the bench, the bioinformatics and twenty years of experience.",
      cta: "Co-build a project", to: "/rd-portfolio" as const },
    { n: "02", I: ShoppingBag, t: "Stock your bench in days, not months",
      d: "Stop waiting on customs. Order Tier-1 reagents, calibrated instruments and ready-to-ship consumables backed by local warranty, cold-chain integrity and live technical support.",
      cta: "Browse the shop", to: "/shop" as const },
    { n: "03", I: GraduationCap, t: "Become a certified molecular scientist",
      d: "Pipette, plate, run and analyse, on real benches, with real samples. Walk out with an internationally-recognised certification and the muscle memory of a working lab scientist.",
      cta: "Enrol today", to: "/academy" as const },
    { n: "04", I: BrainCircuit, t: "Build the lab you've been sketching",
      d: "Design, fund and stand up the molecular facility your institution needs, from grant strategy to biosafety zoning to accreditation. We've done it across five hubs and we'll do it with you.",
      cta: "Brief our advisors", to: "/contact" as const },
    { n: "05", I: Lightbulb, t: "Turn local biology into a global asset",
      d: "Got an idea for a bioinoculant, a kit or a sovereign reagent? We help you validate it, patent it and bring it to market, proudly built on African biodiversity.",
      cta: "Pitch your innovation", to: "/ip-publications" as const },
  ];
  return (
    <section className="relative py-24 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 -z-10 opacity-[0.35]">
        <img src={biotechGrid} alt="" loading="lazy" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/70 to-background" />
      </div>
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-xs uppercase tracking-[0.25em] text-brand font-semibold">What We Do</span>
          <h2 className="mt-3 font-display text-3xl md:text-5xl font-extrabold leading-[1.05]">
            Five ways to plug in and <span className="gradient-text">change the bench.</span>
          </h2>
          <p className="mt-5 text-muted-foreground text-lg">
            Whether you're learning, building, supplying or scaling, there's a door for you here.
          </p>
        </div>
        <div className="mt-14 max-w-3xl mx-auto flex flex-col gap-10">
          {cards.map((c) => (
            <motion.div
              key={c.n}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.22, 0.9, 0.3, 1] }}
            >
              <Link to={c.to} className="group block">
                <div className="relative h-44 sm:h-52 rounded-3xl overflow-hidden shadow-brand">
                  <img src={biotechGrid} alt="" loading="lazy" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-br from-[#06122c]/85 via-[#06122c]/55 to-[#0a1838]/80" />
                  <div className="absolute top-5 left-5 flex items-center gap-3">
                    <div className="h-12 w-12 grid place-items-center rounded-xl bg-background/95 text-brand"><c.I className="h-6 w-6" /></div>
                    <span className="font-display text-xs uppercase tracking-[0.25em] text-background/80">Step {c.n}</span>
                  </div>
                </div>
                <div className="mt-5 px-1">
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground leading-tight group-hover:text-brand transition-colors">{c.t}</h3>
                  <p className="mt-3 text-base text-muted-foreground leading-relaxed">{c.d}</p>
                  <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand">
                    {c.cta} <ChevronRight className="h-4 w-4 group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Welcome() {
  const [playing, setPlaying] = useState(false);
  const videoId = "dQw4w9WgXcQ";
  return (
    <section className="py-24 md:py-28 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl grid lg:grid-cols-[1fr_1.1fr] gap-10 items-center">
        <div className="reveal">
          <span className="text-xs uppercase tracking-[0.25em] text-brand font-semibold">Founder · CEO</span>
          <h2 className="mt-3 font-display text-3xl md:text-5xl font-extrabold leading-[1.05]">
            Hear why we built this, from <span className="gradient-text">Prof. Nwadiuto Esiobu</span>
          </h2>
          <p className="mt-5 text-muted-foreground leading-relaxed">
            A two-minute message on what brought us here, who we're building for, and how you can be part of the next chapter.
          </p>
          <Link to="/about" className="mt-7 inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 font-semibold hover:bg-accent transition-colors">
            Read the full statement <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="reveal">
          <div className="relative rounded-3xl overflow-hidden shadow-brand aspect-video bg-foreground group">
            {playing ? (
              <iframe src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} title="Welcome from Prof. Nwadiuto Esiobu" allow="autoplay; encrypted-media" allowFullScreen className="absolute inset-0 w-full h-full" />
            ) : (
              <button onClick={() => setPlaying(true)} className="absolute inset-0 w-full h-full">
                <img src={profPortrait} alt="Prof. Nwadiuto Esiobu, Founder & CEO of Applied Biotech" loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
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
            <span className="text-xs uppercase tracking-[0.25em] text-brand font-semibold">Stories From The Bench</span>
            <h2 className="mt-3 font-display text-3xl md:text-5xl font-extrabold">See what your peers are shipping</h2>
            <p className="mt-4 text-muted-foreground">Cohort launches, breakthroughs in the field, and the moments that move our community forward.</p>
          </div>
          <Link to="/news" className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:gap-3 transition-all">Read all stories <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {items.map((n, i) => (
            <Link key={n.id} to="/news/$slug" params={{ slug: n.slug }}
              className="reveal group relative rounded-3xl overflow-hidden bg-card border border-border hover:-translate-y-2 hover:shadow-brand transition-all duration-500"
              style={{ transitionDelay: `${i * 60}ms` }}>
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
                  Read the story <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
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
    { I: Sparkles, t: "Bench you can trust", d: "Calibrated assays, validated SOPs and zero contamination tolerance, every single run." },
    { I: Cpu, t: "Labs that show up", d: "Designed, built and maintained end-to-end. No abandoned facilities, no broken kit." },
    { I: Award, t: "Certifications that travel", d: "Train here, work anywhere. CMD-recognised curriculum trusted across the continent." },
    { I: Shield, t: "Twenty years of receipts", d: "A scientific bench backed by two decades of peer-reviewed, field-proven research." },
  ];
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="reveal text-center max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-[0.25em] text-brand font-semibold">Why Applied Biotech</span>
          <h2 className="mt-3 font-display text-3xl md:text-5xl font-extrabold">Four reasons to <span className="gradient-text">build with us.</span></h2>
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
    { k: "20+", v: "Years moving African molecular science forward" },
    { k: "1000+", v: "Scientists & technicians we've helped certify" },
    { k: "5+", v: "World-class research hubs we've built end-to-end" },
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
            <h2 className="font-display text-3xl md:text-5xl font-bold leading-tight">Your next breakthrough starts with a conversation.</h2>
            <p className="mt-3 text-brand-foreground/85 max-w-xl">Book a discovery call and tell us about the project, the cohort or the bench you're trying to build. We'll meet you where you are.</p>
          </div>
          <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-background text-foreground px-7 py-4 font-semibold hover:scale-105 transition-transform shadow-soft self-start md:self-center">
            Book your call <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function QuickDoors() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl grid gap-6 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="group relative rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-500 to-emerald-700 text-white p-8 md:p-10 shadow-brand"
        >
          <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-white/10 blur-3xl group-hover:bg-white/20 transition" />
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-[10px] uppercase tracking-[0.2em] font-bold">
            <GraduationCap className="h-3.5 w-3.5" /> Academy
          </span>
          <h3 className="mt-4 font-display text-3xl md:text-4xl font-extrabold leading-tight">Train with working scientists.</h3>
          <p className="mt-3 text-white/85 max-w-md">Hands-on cohorts in molecular diagnostics, PCR, sequencing and bioinformatics. Read at your pace, book the practical, earn the certification.</p>
          <div className="mt-6 flex flex-wrap gap-2 text-xs">
            {["Self-paced reading", "1:1 coaching", "Practical labs", "Certificates"].map((t) => (
              <span key={t} className="px-2.5 py-1 rounded-full bg-white/15">{t}</span>
            ))}
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link to="/academy" className="inline-flex items-center gap-2 h-11 px-5 rounded-full bg-white text-emerald-700 font-bold text-sm shadow-soft hover:scale-[1.03] transition-transform">
              Explore courses <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/academy/dashboard" className="inline-flex items-center gap-2 h-11 px-5 rounded-full border border-white/30 text-white font-semibold text-sm hover:bg-white/10 transition-colors">
              My dashboard
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
          className="group relative rounded-3xl overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-8 md:p-10 shadow-brand"
        >
          <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-white/10 blur-3xl group-hover:bg-white/20 transition" />
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-[10px] uppercase tracking-[0.2em] font-bold">
            <ShoppingBag className="h-3.5 w-3.5" /> Shop
          </span>
          <h3 className="mt-4 font-display text-3xl md:text-4xl font-extrabold leading-tight">Stock your bench in days.</h3>
          <p className="mt-3 text-white/85 max-w-md">Tier-1 reagents, calibrated instruments, sovereign consumables, backed by local warranty and live technical support. Order today, ship tomorrow.</p>
          <div className="mt-6 flex flex-wrap gap-2 text-xs">
            {["PCR & RT-qPCR", "Cell culture", "NGS consumables", "Lab plasticware"].map((t) => (
              <span key={t} className="px-2.5 py-1 rounded-full bg-white/15">{t}</span>
            ))}
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link to="/shop" className="inline-flex items-center gap-2 h-11 px-5 rounded-full bg-white text-blue-700 font-bold text-sm shadow-soft hover:scale-[1.03] transition-transform">
              Shop now <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/shop/deals" className="inline-flex items-center gap-2 h-11 px-5 rounded-full border border-white/30 text-white font-semibold text-sm hover:bg-white/10 transition-colors">
              See deals
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
