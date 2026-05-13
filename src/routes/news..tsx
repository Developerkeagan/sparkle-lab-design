import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Footer } from "@/components/site/Footer";
import { useSiteContent } from "@/lib/site-content";
import { ArrowLeft, Calendar } from "lucide-react";

export const Route = createFileRoute("/news/")({
  component: NewsDetail,
  head: ({ params }) => ({ meta: [{ title: `${params?.slug ?? "Article"} · Applied Biotech News` }] }),
  notFoundComponent: () => (
    <div className="min-h-screen grid place-items-center p-10 text-center">
      <div>
        <h1 className="font-display text-3xl font-bold">Article not found</h1>
        <Link to="/news" className="mt-4 inline-block text-brand font-semibold">← Back to news</Link>
      </div>
    </div>
  ),
});

function NewsDetail() {
  const { slug } = Route.useParams();
  const { news } = useSiteContent();
  const post = news.find((n) => n.slug === slug);
  if (!post) throw notFound();
  const others = news.filter((n) => n.id !== post.id).slice(0, 3);
  return (
    <div className="min-h-screen bg-background">
      <article className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="mx-auto max-w-3xl">
          <Link to="/news" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6"><ArrowLeft className="h-4 w-4" /> All news</Link>
          <div className="flex items-center gap-3 text-xs">
            <span className="px-2.5 py-1 rounded-full bg-brand/10 text-brand font-semibold uppercase tracking-wider">{post.tag}</span>
            <span className="text-muted-foreground flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />{post.date}</span>
          </div>
          <h1 className="mt-4 font-display text-3xl md:text-5xl font-extrabold leading-tight">{post.title}</h1>
          {post.cover && <img src={post.cover} alt="" className="mt-8 rounded-2xl w-full aspect-[16/9] object-cover" />}
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">{post.excerpt}</p>
          <div className="mt-6 prose prose-neutral max-w-none text-foreground/90 leading-relaxed whitespace-pre-line">{post.body}</div>
        </div>
      </article>
      {others.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-8 py-12 border-t border-border">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-display text-2xl font-bold mb-6">More stories</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {others.map((n) => (
                <Link key={n.id} to="/news/$slug" params={{ slug: n.slug }} className="group rounded-2xl border border-border bg-card overflow-hidden hover:shadow-brand transition-all">
                  {n.cover && <div className="aspect-[16/10] overflow-hidden"><img src={n.cover} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" /></div>}
                  <div className="p-5">
                    <div className="text-xs text-muted-foreground">{n.date}</div>
                    <div className="mt-2 font-display font-bold group-hover:text-brand transition-colors">{n.title}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
      <Footer />
    </div>
  );
}
