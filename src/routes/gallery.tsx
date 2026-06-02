import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Footer } from "@/components/site/Footer";
import { useReveal } from "@/hooks/use-reveal";
import { useSiteContent } from "@/lib/site-content";

export const Route = createFileRoute("/gallery")({
  component: GalleryPage,
  head: () => ({ meta: [{ title: "Gallery · Applied Biotech" }, { name: "description", content: "Photos from our labs, training sessions and field work." }] }),
});

function GalleryPage() {
  useReveal();
  const { gallery } = useSiteContent();
  return (
    <div className="min-h-screen bg-background">
      <PageHero eyebrow="Gallery" title={<>Inside our <span className="gradient-text">work</span></>} subtitle="Moments from the lab, the field and the classroom." />
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {gallery.map((g) => (
            <article key={g.id} className="reveal group rounded-2xl bg-card border border-border overflow-hidden shadow-soft hover:shadow-brand transition-all hover:-translate-y-1">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={g.url} alt={g.name ?? g.caption ?? ""} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
              </div>
              <div className="p-5">
                <h3 className="font-display font-bold text-lg leading-snug">{g.name || "Untitled"}</h3>
                {g.description && <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{g.description}</p>}
              </div>
            </article>
          ))}
          {gallery.length === 0 && <p className="col-span-full text-center text-muted-foreground py-12">No photos uploaded yet.</p>}
        </div>
      </section>
      <Footer />
    </div>
  );
}