import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Footer } from "@/components/site/Footer";
import { useReveal } from "@/hooks/use-reveal";
import { Mail, Phone, MapPin, Send, Clock, Loader2 } from "lucide-react";
import { useSiteContent } from "@/lib/site-content";
import { toast } from "sonner";
import useFetch from "@/hooks/useFetch";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({ meta: [{ title: "Contact · Applied Biotech" }, { name: "description", content: "Get in touch with the Applied Biotech team." }] }),
});

function ContactPage() {
  useReveal();
  const { contact } = useSiteContent();
  const { loading, fetchData } = useFetch();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      fullName: `${fd.get("first")} ${fd.get("last")}`,
      email: fd.get("email"),
      subject: fd.get("subject"),
      message: fd.get("message"),
    };

    try {
      const res = await fetchData("/api/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (res) {
        toast.success("Message sent — we'll be in touch.");
        (e.target as HTMLFormElement).reset();
      }
    } catch (err) { toast.error("Failed to send message"); }
  }

  return (
    <div className="min-h-screen bg-background">
      <PageHero eyebrow="Contact" title={<>Let's <span className="gradient-text">talk</span></>} subtitle="Tell us about your project, training need or equipment request." />
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl grid gap-10 lg:grid-cols-2">
          <div className="reveal space-y-6">
            {[
              { I: MapPin, t: "Visit", v: contact.address },
              { I: Phone, t: "Call", v: contact.phone },
              { I: Mail, t: "Email", v: contact.email },
              { I: Clock, t: "Hours", v: contact.hours },
            ].map(({ I, t, v }) => (
              <div key={t} className="flex items-start gap-4 p-5 rounded-2xl border border-border bg-card hover:shadow-soft transition-shadow">
                <div className="h-11 w-11 grid place-items-center rounded-xl gradient-brand text-brand-foreground"><I className="h-5 w-5" /></div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">{t}</div>
                  <div className="mt-1 font-semibold text-foreground">{v}</div>
                </div>
              </div>
            ))}
          </div>
          <form className="reveal rounded-2xl border border-border bg-card p-7 shadow-soft space-y-4" onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2">
              <input name="first" required className="rounded-lg border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand" placeholder="First name" />
              <input name="last" required className="rounded-lg border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand" placeholder="Last name" />
            </div>
            <input name="email" required type="email" className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand" placeholder="Email" />
            <input name="subject" required className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand" placeholder="Subject" />
            <textarea name="message" required rows={5} className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand" placeholder="Your message" />
            <button disabled={loading} className="inline-flex items-center gap-2 rounded-full gradient-brand text-brand-foreground px-6 py-3 font-semibold shadow-brand hover:scale-[1.02] transition-transform disabled:opacity-70">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />} Send message
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </div>
  );
}