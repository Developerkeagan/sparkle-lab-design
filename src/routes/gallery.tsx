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
        <div className="mx-auto max-w-7xl grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {gallery.map((g) => (
            <div key={g.id} className="reveal group relative overflow-hidden rounded-2xl aspect-[4/3]">
              <img src={g.url} alt={g.caption ?? ""} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
          {gallery.length === 0 && <p className="col-span-full text-center text-muted-foreground py-12">No photos uploaded yet.</p>}
        </div>
      </section>
      <Footer />
    </div>
  );
}