import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Footer } from "@/components/site/Footer";
import { useReveal } from "@/hooks/use-reveal";
import { Calendar, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/news")({
  component: NewsPage,
  head: () => ({ meta: [{ title: "News · Applied Biotech" }, { name: "description", content: "Latest news, events and updates from Applied Biotech." }] }),
});

const items = [
  { tag: "Event", date: "May 12, 2026", title: "Science Camp 2026 Opens Registration", excerpt: "Our flagship 4-week holiday science camp returns for hands-on biotech discovery." },
  { tag: "Training", date: "Apr 28, 2026", title: "New Molecular Diagnostics Cohort", excerpt: "Internationally certified curriculum begins with 30 trainees from 6 countries." },
  { tag: "Equipment", date: "Apr 02, 2026", title: "Reagent Sale: Spring Catalogue", excerpt: "Discounts on PCR consumables, cell culture media and lab plasticware." },
  { tag: "Partnership", date: "Mar 15, 2026", title: "MOU Signed With Ebonyi State University", excerpt: "Collaboration on translational research and graduate fellowships." },
];

function NewsPage() {
  useReveal();
  return (
    <div className="min-h-screen bg-background">
      <PageHero eyebrow="News" title={<>What's <span className="gradient-text">happening</span></>} subtitle="Stories, events, training cohorts and industry updates from our team." />
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl grid gap-6 md:grid-cols-2">
          {items.map((n) => (
            <article key={n.title} className="reveal group rounded-2xl border border-border bg-card p-7 hover:shadow-brand hover:-translate-y-1 transition-all cursor-pointer">
              <div className="flex items-center gap-3 text-xs">
                <span className="px-2.5 py-1 rounded-full bg-brand/10 text-brand font-semibold uppercase tracking-wider">{n.tag}</span>
                <span className="text-muted-foreground flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />{n.date}</span>
              </div>
              <h3 className="mt-4 font-display font-bold text-xl group-hover:text-brand transition-colors">{n.title}</h3>
              <p className="mt-2 text-muted-foreground text-sm leading-relaxed">{n.excerpt}</p>
              <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand">Read more <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" /></div>
            </article>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}