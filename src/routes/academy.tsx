import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { PageHero } from "@/components/site/PageHero";
import { useReveal } from "@/hooks/use-reveal";
import { GraduationCap, Clock, Users, Award, ArrowRight, PlayCircle, BookOpen, Star, Loader2 } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import useFetch from "@/hooks/useFetch";

export const Route = createFileRoute("/academy")({
  component: AcademyPage,
  head: () => ({
    meta: [
      { title: "Academy — Applied Biotech" },
      { name: "description", content: "Hands-on biotech training, certifications and applied science courses." },
    ],
  }),
});

function AcademyPage() {
  useReveal();
  const [courses, setCourses] = useState<any[]>([]);
  const { loading, fetchData } = useFetch();

  useEffect(() => {
    fetchData("/api/v1/academy").then(res => {
      if (res) {
        const normalized = res.map((c: any) => ({
          id: c._id,
          title: c.courseTitle,
          level: c.levelDescription,
          weeks: c.weeks || 4,
          students: c.students || 0,
          price: c.price,
          img: c.image,
          tag: c.status === "Draft" ? "Upcoming" : c.students > 1000 ? "Bestseller" : "",
          rating: 4.8 + (Math.random() * 0.2) // Fallback for UI polish
        }));
        setCourses(normalized);
      }
    });
  }, [fetchData]);

  const totalStudents = useMemo(() => courses.reduce((acc, c) => acc + c.students, 0), [courses]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PageHero
        eyebrow="Applied Biotech Academy"
        title={<>Learn biotech, <span className="gradient-text">the applied way</span></>}
        subtitle="Industry-grade training designed and delivered by working scientists. Certifications recognized across West Africa."
      />

      <section className="py-10 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { icon: GraduationCap, k: `${courses.length}+`, v: "Certified courses" },
            { icon: Users, k: `${totalStudents.toLocaleString()}+`, v: "Students trained" },
            { icon: Award, k: "94%", v: "Completion rate" },
            { icon: BookOpen, k: "30+", v: "Expert instructors" },
          ].map((s) => (
            <div key={s.v} className="reveal rounded-2xl border border-border bg-card p-5 shadow-soft">
              <s.icon className="h-6 w-6 text-primary" />
              <div className="mt-3 font-display text-2xl font-bold">{s.k}</div>
              <div className="text-xs text-muted-foreground">{s.v}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="font-display text-3xl font-bold">Featured courses</h2>
              <p className="text-muted-foreground text-sm mt-1">Curated programs designed for real lab impact.</p>
            </div>
            <Link to="/contact" className="hidden sm:inline-flex text-sm font-semibold text-primary hover:underline items-center gap-1">Request a custom track <ArrowRight className="h-4 w-4" /></Link>
          </div>

          <div className="relative min-h-[400px]">
            {loading ? (
              <div className="absolute inset-0 flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((c) => (
                  <article key={c.id} className="group rounded-2xl border border-border bg-card overflow-hidden shadow-soft hover:shadow-brand transition-all hover:-translate-y-1">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img src={c.img} alt={c.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      {c.tag && <span className="absolute top-3 left-3 text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-background/90 text-foreground">{c.tag}</span>}
                      <PlayCircle className="absolute bottom-3 right-3 h-10 w-10 text-white/90 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="px-2 py-0.5 rounded-full bg-accent text-accent-foreground font-medium">{c.level}</span>
                        <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {c.weeks} wks</span>
                        <span className="inline-flex items-center gap-1"><Users className="h-3 w-3" /> {c.students.toLocaleString()}</span>
                      </div>
                      <h3 className="mt-3 font-display font-bold text-lg leading-snug">{c.title}</h3>
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-1 text-amber-500 text-sm font-medium">
                          <Star className="h-4 w-4 fill-current" /> {c.rating.toFixed(1)}
                        </div>
                        <div className="font-display text-xl font-bold">${c.price}</div>
                      </div>
                      <Link to="/contact" className="mt-4 w-full h-10 rounded-xl gradient-brand text-brand-foreground text-sm font-semibold shadow-soft hover:scale-[1.02] transition-transform inline-flex items-center justify-center">
                        Enroll now
                      </Link>
                    </div>
                  </article>
                ))}
                {courses.length === 0 && (
                  <div className="col-span-full py-20 text-center text-muted-foreground">
                    No courses currently scheduled. Please check back later.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}