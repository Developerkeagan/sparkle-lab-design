import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Footer } from "@/components/site/Footer";
import { useReveal } from "@/hooks/use-reveal";
import { MapPin, Briefcase, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/careers")({
  component: CareersPage,
  head: () => ({
    meta: [
      { title: "Careers · Applied Biotech" },
      { name: "description", content: "Join Applied Biotech, open roles in molecular science, training, engineering and operations." },
    ],
  }),
});

const roles = [
  { t: "Senior Molecular Biologist", loc: "Abuja, NG", type: "Full-time", team: "Lab Services" },
  { t: "Bioinformatics Analyst", loc: "Remote · Africa", type: "Full-time", team: "Research" },
  { t: "Training Coordinator, Academy", loc: "Abuja, NG", type: "Full-time", team: "Capacity Building" },
  { t: "Field Engineer, Mobile Labs", loc: "Lagos, NG", type: "Full-time", team: "Infrastructure" },
  { t: "Grants & Partnerships Officer", loc: "Hybrid", type: "Full-time", team: "Consultancy" },
  { t: "QC Technician, Bio-Manufacturing", loc: "Abuja, NG", type: "Full-time", team: "Manufacturing" },
];

function CareersPage() {
  useReveal();
  return (
    <div className="min-h-screen bg-background">
      <PageHero eyebrow="Careers" title={<>Build the future of <span className="gradient-text">African biotech.</span></>} subtitle="Bench scientists, engineers, educators and strategists welcome." />
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl space-y-4">
          {roles.map((r, i) => (
            <div key={r.t} className="reveal group rounded-2xl border border-border bg-card p-6 hover:border-brand/40 hover:shadow-soft transition-all flex flex-wrap items-center gap-4 justify-between" style={{ transitionDelay: `${i * 40}ms` }}>
              <div className="flex-1 min-w-[240px]">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Briefcase className="h-3.5 w-3.5" /> {r.team}
                </div>
                <h3 className="mt-1 font-display font-bold text-lg group-hover:text-brand transition-colors">{r.t}</h3>
                <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {r.loc}</span>
                  <span>·</span><span>{r.type}</span>
                </div>
              </div>
              <a href="mailto:careers@appliedbiotech.ng?subject=Application" className="inline-flex items-center gap-2 rounded-full gradient-brand text-brand-foreground px-5 py-2.5 text-sm font-semibold shadow-brand hover:scale-105 transition-transform">
                Apply <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          ))}
        </div>
        <div className="reveal mt-14 mx-auto max-w-3xl text-center rounded-3xl border border-border bg-card p-8 shadow-soft">
          <h2 className="font-display text-2xl font-bold">Don't see your role?</h2>
          <p className="mt-2 text-muted-foreground">Send your CV and a brief note about how you'd contribute.</p>
          <a href="mailto:careers@appliedbiotech.ng" className="mt-5 inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-5 py-2.5 text-sm font-semibold hover:bg-accent transition-colors">careers@appliedbiotech.ng</a>
        </div>
      </section>
      <Footer />
    </div>
  );
}