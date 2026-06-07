import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { useReveal } from "@/hooks/use-reveal";
import {
  ArrowRight, FlaskConical, ShoppingBag, GraduationCap, BrainCircuit,
  ChevronRight, Building2, Users, Beaker, Mail,
} from "lucide-react";

export const Route = createFileRoute("/services")({
  component: ServicesPage,
  head: () => ({
    meta: [
      { title: "Services · Applied Biotech" },
      { name: "description", content: "Molecular lab services, equipment & reagents, training and institute, and consulting, engineered for institutions." },
    ],
  }),
});

const clusters = [
  { id: "molecular-lab", n: "01", I: FlaskConical, t: "Molecular Lab Services", sub: "High-throughput analysis & flexible bench access." },
  { id: "equipment", n: "02", I: ShoppingBag, t: "Lab Equipment & Reagents", sub: "Authorized distribution & sovereign reagents." },
  { id: "training", n: "03", I: GraduationCap, t: "Training & Institute", sub: "Modular courses, workshops & workforce upskilling." },
  { id: "consultancy", n: "04", I: BrainCircuit, t: "Consultancy", sub: "Lab design, strategy and implementation." },
];

function ServicesPage() {
  useReveal();
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-secondary/60 via-background to-background relative overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full gradient-brand opacity-[0.08] blur-3xl pointer-events-none" />
        <div className="relative mx-auto max-w-5xl text-center reveal">
          <span className="inline-block px-3 py-1 text-xs uppercase tracking-[0.25em] rounded-full bg-brand/10 text-brand font-semibold">Services</span>
          <h1 className="mt-5 font-display text-4xl md:text-6xl font-extrabold leading-[1.05]">
            End-to-end science, <span className="gradient-text">delivered.</span>
          </h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-3xl mx-auto">
            Four interlocking clusters, each one engineered to remove a structural barrier between you and discovery.
          </p>
        </div>
        <div className="relative mt-12 mx-auto max-w-6xl grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {clusters.map((c, i) => (
            <a key={c.id} href={`#${c.id}`} className="reveal group rounded-2xl border border-border bg-card p-5 hover:border-brand/40 hover:-translate-y-1 hover:shadow-soft transition-all" style={{ transitionDelay: `${i * 50}ms` }}>
              <div className="flex items-center justify-between">
                <div className="h-11 w-11 grid place-items-center rounded-xl gradient-brand text-brand-foreground"><c.I className="h-5 w-5" /></div>
                <span className="font-display text-2xl font-extrabold text-foreground/15 group-hover:text-brand/50 transition-colors">{c.n}</span>
              </div>
              <div className="mt-4 font-display font-bold">{c.t}</div>
              <div className="text-xs text-muted-foreground mt-1">{c.sub}</div>
            </a>
          ))}
        </div>
      </section>

      {/* CLUSTER 1, Molecular Lab Services */}
      <Cluster id="molecular-lab" n="Cluster 01" title="Molecular Lab Services" intro="Outsource your most sensitive workflows to our state-of-the-art facility. Automated extraction frameworks, strict contamination barriers, certified controls.">
        <div className="reveal grid md:grid-cols-2 gap-4">
          {[
            { n: "01", t: "Molecular Pathogen ID & Typing", d: "High-specificity multiplex PCR for viral, bacterial and fungal profiling. AMR strain tracking and gene-mapping." },
            { n: "02", t: "Genomics & Sequencing Prep", d: "High-yield DNA/RNA extraction, Sanger setup, PCR amplicon purification, NGS library preparation." },
            { n: "03", t: "Forensic & Genetic Fidelity", d: "Ultra-precise STR locus profiling for parentage and forensic verification, livestock breeding fidelity analysis." },
            { n: "04", t: "Eco-Microbiome & Metagenomics", d: "Metagenomic total DNA tracking, soil biodiversity, water quality assays, bioremediation monitoring." },
          ].map((x) => (
            <div key={x.n} className="group rounded-2xl border border-border bg-card p-6 hover:border-brand/40 hover:-translate-y-1 hover:shadow-soft transition-all">
              <div className="flex items-baseline gap-3">
                <span className="font-display font-extrabold text-2xl text-brand/40">{x.n}</span>
                <h4 className="font-display font-bold uppercase text-sm tracking-wider">{x.t}</h4>
              </div>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{x.d}</p>
            </div>
          ))}
        </div>
        <div className="reveal mt-8 flex flex-wrap gap-3">
          <Link to="/contact" className="inline-flex items-center gap-2 rounded-full gradient-brand text-brand-foreground px-6 py-3 font-semibold shadow-brand hover:scale-[1.03] transition-transform">
            Request Analysis Pricing <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Rent-A-Lab subsection */}
        <div className="reveal mt-12 grid lg:grid-cols-[1.2fr_1fr] gap-8 rounded-3xl border border-border bg-secondary/40 p-8 lg:p-10">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-brand font-semibold">Rent-A-Lab</span>
            <h3 className="mt-2 font-display text-2xl md:text-3xl font-bold">Bypass capital cost. Secure bench space.</h3>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              Rent fully functional bench space equipped with calibrated thermocyclers, biosafety cabinets and gel-doc systems at our premium Abuja hub, for thesis work, independent studies or corporate validations.
            </p>
          </div>
          <div className="flex flex-col justify-center gap-3">
            <Link to="/rent-a-lab" className="inline-flex items-center justify-center gap-2 rounded-full gradient-brand text-brand-foreground px-6 py-3.5 font-semibold shadow-brand hover:scale-[1.02] transition-transform">
              Secure Bench Space <ArrowRight className="h-4 w-4" />
            </Link>
            <span className="text-xs text-muted-foreground text-center">Routes to our intake form → lab management team.</span>
          </div>
        </div>
      </Cluster>

      {/* CLUSTER 2, Equipment & Reagents */}
      <Cluster id="equipment" n="Cluster 02" title="Lab Equipment & Reagents" intro="We bridge global manufacturing with the African research ecosystem, local stocking, validated handling and authorized distribution." dark>
        <div className="reveal grid lg:grid-cols-3 gap-5">
          {[
            {
              roman: "I", t: "Analytical Instrumentation",
              items: [
                "Real-time QuantStudio platforms, gradient PCR & digital block cyclers",
                "Microcentrifuges, refrigerated arrays, electrophoresis tanks & transilluminators",
                "Nano-spectrophotometers, gel-doc imaging stations, analytical balances",
                "Class II Type A2 Biosafety Cabinets & laminar flow hoods",
              ],
            },
            {
              roman: "II", t: "Molecular Reagents & Bio-Chemicals",
              items: [
                "High-fidelity DNA polymerases, master mixes, reverse transcriptases",
                "Magnetic-bead and silica-membrane DNA/RNA extraction kits",
                "qPCR master mixes, restriction enzymes, DNA ladders",
                "AquaPure™ Nuclease-Free Molecular Grade Water",
              ],
            },
            {
              roman: "III", t: "Deployable Infrastructure & Consumables",
              items: [
                "Pre-engineered Mobile Molecular Laboratories",
                "Solar-powered laboratory container modules",
                "Pre-sterilized serological pipettes & filter tips",
                "Optical 96-well PCR plates, culture plates, cryo-vials",
              ],
            },
          ].map((col) => (
            <div key={col.roman} className="rounded-2xl border border-background/15 bg-background/[0.04] p-7 hover:bg-background/[0.07] transition-colors">
              <div className="flex items-baseline gap-3">
                <span className="font-display font-extrabold text-2xl text-accent-cyan">{col.roman}</span>
                <h4 className="font-display font-bold uppercase text-sm tracking-wider">{col.t}</h4>
              </div>
              <ul className="mt-5 space-y-2.5 text-sm text-background/75">
                {col.items.map((it) => (
                  <li key={it} className="flex gap-2"><span className="text-accent-cyan mt-1.5">, </span><span>{it}</span></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="reveal mt-10 grid md:grid-cols-[1fr_auto] gap-6 items-center">
          <p className="text-sm text-background/70 max-w-2xl">
            Looking for specialized machinery, mobile transit modules, custom oligonucleotide primers or specific cold-chain reagents not listed? Use our shop enquiries form to request an unlisted procurement quote.
          </p>
          <Link to="/shop" className="inline-flex items-center justify-center gap-2 rounded-full bg-background text-foreground px-7 py-4 font-semibold hover:scale-[1.03] transition-transform self-start md:self-auto">
            Shop Now <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Cluster>

      {/* CLUSTER 3, Training & Institute */}
      <Cluster id="training" n="Cluster 03" title="Training & Institute" intro="Three pathways: short modular courses, immersive multi-day workshops, and institutional workforce upskilling.">
        <div className="reveal grid lg:grid-cols-3 gap-5">
          <ServiceBlock I={GraduationCap} title="Modular Hands-On Courses" body="Intensive, career-focused masterclasses, from foundational DNA extractions and gel visualization to primer design and downstream data interpretation." cta="Get a Course" to="/academy" />
          <ServiceBlock I={Users} title="Hands-On Workshops" body="Immersive multi-day cohorts covering real-time PCR diagnostics, microbial metagenomics and bioinformatics. The register button routes to a secure application portal that handles payment, pre-readings and waitlist locking." cta="Register Now" to="/academy" badge="Currently Enrolling" />
          <ServiceBlock I={Building2} title="Institutional Workforce Upskilling" body="We partner with research institutes, multi-national organizations and ministries, onboarding cohorts, upskilling legacy staff, embedding long-term institutional competency." cta="Upskill Your Team" to="/contact" />
        </div>
      </Cluster>

      {/* CLUSTER 4, Consultancy */}
      <Cluster id="consultancy" n="Cluster 04" title="Consultancy" intro="From architectural lab design to executive strategic advisory.">
        <div className="reveal grid lg:grid-cols-2 gap-5">
          <ServiceBlock I={Beaker} title="Lab Equipment & Design" body="Comprehensive architectural space-planning, air-handling zoning (pre- vs. post-PCR containment), baseline instrumentation profiling, and regulatory readiness audits for international accreditation." cta="Build Your Lab" to="/contact" sub="Request a technical design consultation and layout blueprint." />
          <ServiceBlock I={Mail} title="Strategic Consultancy & Implementation" body="High-level structural project advisory for global development grants, public sector bio-economy strategies, and multi-institutional project management." cta="Initiate Strategic Brief" href="mailto:president@appliedbiotech.ng" sub="Routes directly to Prof. Esiobu's executive email." />
        </div>
      </Cluster>

      <Footer />
    </div>
  );
}

function Cluster({ id, n, title, intro, children, dark }: { id: string; n: string; title: string; intro: string; children: React.ReactNode; dark?: boolean }) {
  return (
    <section id={id} className={`py-20 md:py-28 px-4 sm:px-6 lg:px-8 scroll-mt-24 ${dark ? "bg-[#06122c] text-background" : ""}`}>
      <div className="mx-auto max-w-7xl">
        <div className="reveal max-w-3xl">
          <span className={`text-xs uppercase tracking-[0.25em] font-semibold ${dark ? "text-accent-cyan" : "text-brand"}`}>{n}</span>
          <h2 className="mt-3 font-display text-3xl md:text-5xl font-extrabold leading-[1.05]">{title}</h2>
          <p className={`mt-5 text-base md:text-lg leading-relaxed ${dark ? "text-background/75" : "text-muted-foreground"}`}>{intro}</p>
        </div>
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}

function ServiceBlock({ I, title, body, cta, to, href, sub, badge }: { I: React.ElementType; title: string; body: string; cta: string; to?: string; href?: string; sub?: string; badge?: string }) {
  const btnClass = "mt-6 inline-flex items-center gap-2 rounded-full gradient-brand text-brand-foreground px-5 py-3 text-sm font-semibold shadow-brand hover:scale-[1.03] transition-transform";
  return (
    <div className="group rounded-3xl border border-border bg-card p-7 hover:border-brand/40 hover:-translate-y-1 hover:shadow-brand transition-all">
      <div className="flex items-center justify-between">
        <div className="h-12 w-12 grid place-items-center rounded-xl gradient-brand text-brand-foreground group-hover:scale-110 transition-transform"><I className="h-5 w-5" /></div>
        {badge && <span className="text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-600 font-semibold">{badge}</span>}
      </div>
      <h3 className="mt-5 font-display font-bold text-xl">{title}</h3>
      <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{body}</p>
      {to ? (
        <Link to={to} className={btnClass}>{cta} <ChevronRight className="h-4 w-4" /></Link>
      ) : (
        <a href={href} className={btnClass}>{cta} <ChevronRight className="h-4 w-4" /></a>
      )}
      {sub && <div className="mt-3 text-xs text-muted-foreground">{sub}</div>}
    </div>
  );
}