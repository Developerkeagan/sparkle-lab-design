import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { useReveal } from "@/hooks/use-reveal";
import { Award, Target, Users, Lightbulb } from "lucide-react";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About Us · Applied Biotech" },
      { name: "description", content: "Learn about Applied Biotech — our mission, vision, and people advancing molecular diagnostics, training and biotech consulting." },
    ],
  }),
});

function AboutPage() {
  useReveal();
  const values = [
    { icon: Target, title: "Mission", text: "Pioneer innovative biotech pathways that empower healthier communities." },
    { icon: Lightbulb, title: "Vision", text: "Become Africa's most trusted partner in molecular science and training." },
    { icon: Award, title: "Excellence", text: "Master-level execution, calibrated equipment, internationally certified processes." },
    { icon: Users, title: "People", text: "A team of scientists, educators and engineers working at the frontier." },
  ];
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-secondary/60 to-background">
        <div className="mx-auto max-w-4xl text-center reveal">
          <span className="inline-block px-3 py-1 text-xs uppercase tracking-[0.2em] rounded-full bg-brand/10 text-brand font-semibold">About</span>
          <h1 className="mt-5 font-display text-4xl md:text-6xl font-bold text-foreground">Advancing Biotech, <span className="gradient-text">Empowering Lives</span></h1>
          <p className="mt-6 text-lg text-muted-foreground">Applied Biotech is a multidisciplinary organisation delivering molecular lab services, equipment supply, training and consulting across West Africa and beyond.</p>
        </div>
      </section>
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <div key={v.title} className="reveal rounded-2xl border border-border bg-card p-6 hover:shadow-soft hover:-translate-y-1 transition-all">
              <div className="h-11 w-11 grid place-items-center rounded-xl gradient-brand text-brand-foreground"><v.icon className="h-5 w-5" /></div>
              <h3 className="mt-4 font-display font-bold text-lg">{v.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{v.text}</p>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}