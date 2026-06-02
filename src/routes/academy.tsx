import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { PageHero } from "@/components/site/PageHero";
import { useReveal } from "@/hooks/use-reveal";
import { GraduationCap, Clock, Users, Award, ArrowRight, PlayCircle, BookOpen, Star, Loader2, X, LogOut, Lock, LayoutDashboard, MessageCircle, UserPlus } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import useFetch from "@/hooks/useFetch";
import { useAcademy } from "@/lib/academy";
import { useSiteContent } from "@/lib/site-content";
import { toast } from "sonner";

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
  const navigate = useNavigate();
  const [courses, setCourses] = useState<any[]>([]);
  const { loading, fetchData } = useFetch();
  const academy = useAcademy();
  const { practicalDates } = useSiteContent();
  const [selected, setSelected] = useState<any | null>(null);
  const [authTab, setAuthTab] = useState<"signin" | "signup">("signin");
  const [authForm, setAuthForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [authBusy, setAuthBusy] = useState(false);
  const [practical, setPractical] = useState<string>("");

  // Embedded mini-dashboard auth form (independent from the buy modal)
  const [miniTab, setMiniTab] = useState<"signin" | "signup">("signin");
  const [miniForm, setMiniForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [miniBusy, setMiniBusy] = useState(false);

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

  function openBuy(c: any) {
    setSelected(c);
    setPractical("");
    setAuthForm({ name: "", email: "", password: "", confirm: "" });
    setAuthTab("signin");
  }

  async function submitAuth(e: React.FormEvent) {
    e.preventDefault();
    setAuthBusy(true);
    try {
      if (authTab === "signin") {
        await academy.signIn(authForm.email, authForm.password);
      } else {
        if (!authForm.name.trim()) throw new Error("Name required");
        if (authForm.password.length < 6) throw new Error("Password must be 6+ chars");
        if (authForm.password !== authForm.confirm) throw new Error("Passwords do not match");
        await academy.signUp({ name: authForm.name, email: authForm.email, password: authForm.password });
      }
    } catch (err: any) {
      toast.error(err.message || "Authentication failed");
    } finally {
      setAuthBusy(false);
    }
  }

  function confirmBuy() {
    if (!selected) return;
    const pages = [
      `Welcome to ${selected.title}.\n\nThis course was designed to take you from concept to confident hands-on practice. Use Next and Back below to move through pages — your progress saves automatically.`,
      `Module 1 — Foundations\n\nWe start with the fundamentals of ${selected.level.toLowerCase()} practice: lab safety, instrument familiarity, and the scientific reasoning behind each step you'll perform.`,
      `Module 2 — Hands-on Workflow\n\nWalk through the full workflow end-to-end. You'll see annotated photos, common pitfalls, and the exact protocols our scientists use in production work.`,
      `Module 3 — Quality & Troubleshooting\n\nLearn to read your own results, spot contamination signatures, and recover from the most common failures without restarting from scratch.`,
      `Practical session\n\nAttend the in-person practical on the date you chose. Bring your reusable PPE; everything else is provided. A certificate is issued on completion.`,
    ];
    const pageImages = selected.img ? [selected.img, selected.img, selected.img, selected.img, selected.img] : undefined;
    academy.enroll({
      courseId: selected.id,
      title: selected.title,
      cover: selected.img,
      price: selected.price,
      pages,
      pageImages,
    });
    if (practical) academy.setPracticalDate(selected.id, practical);
    setSelected(null);
  }

  async function submitMini(e: React.FormEvent) {
    e.preventDefault();
    setMiniBusy(true);
    try {
      if (miniTab === "signin") {
        await academy.signIn(miniForm.email, miniForm.password);
      } else {
        if (!miniForm.name.trim()) throw new Error("Name required");
        if (miniForm.password.length < 6) throw new Error("Password must be 6+ chars");
        if (miniForm.password !== miniForm.confirm) throw new Error("Passwords do not match");
        await academy.signUp({ name: miniForm.name, email: miniForm.email, password: miniForm.password });
      }
      navigate({ to: "/academy/dashboard" });
    } catch (err: any) {
      toast.error(err.message || "Authentication failed");
    } finally {
      setMiniBusy(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PageHero
        eyebrow="Applied Biotech Academy"
        title={<>Build the skills that <span className="gradient-text">launch your career</span></>}
        subtitle="Train alongside working scientists, earn certifications recognised across West Africa, and walk out ready to run a real lab."
      />

      {/* Mini-Dashboard / Auth section */}
      <section className="py-10 px-4">
        <div className="max-w-7xl mx-auto rounded-3xl border border-border bg-card shadow-soft overflow-hidden grid lg:grid-cols-[1.1fr_1fr]">
          <div className="p-8 bg-gradient-to-br from-brand/10 via-transparent to-accent-cyan/10">
            <span className="text-xs uppercase tracking-[0.2em] text-brand font-semibold">Your Mini Dashboard</span>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl font-extrabold leading-tight">
              {academy.user ? `Welcome back, ${academy.user.name.split(" ")[0]}.` : "Sign in to your Academy"}
            </h2>
            <p className="mt-3 text-sm text-muted-foreground max-w-md">
              {academy.user
                ? "Your courses, your progress, your practical dates — all in one place. Open the full dashboard or jump back into your last lesson."
                : "Create an account to enrol in courses, track your reading progress, book practicals and request 1:1 coaching from working scientists."}
            </p>

            {academy.user ? (
              <div className="mt-6 space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  <MiniStat I={BookOpen} k={String(academy.enrollments.length)} v="Courses" />
                  <MiniStat I={Award} k={`${academy.enrollments.length === 0 ? 0 : Math.round(academy.enrollments.reduce((a, e) => a + academy.progressPct(e.courseId), 0) / academy.enrollments.length)}%`} v="Avg progress" />
                  <MiniStat I={Clock} k={String(academy.enrollments.filter((e) => e.practicalDate).length)} v="Practicals" />
                </div>
                {academy.enrollments[0] && (
                  <div className="rounded-2xl border border-border bg-background p-4">
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Last page read</div>
                    <div className="mt-1 font-semibold leading-snug truncate">{academy.enrollments[0].title}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">Page {academy.enrollments[0].currentPage + 1} of {academy.enrollments[0].pageImages?.length ?? academy.enrollments[0].pages.length}</div>
                    <Link to="/academy/read/$courseId" params={{ courseId: academy.enrollments[0].courseId }} className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-brand hover:underline">Continue reading <ArrowRight className="h-4 w-4" /></Link>
                  </div>
                )}
                <div className="flex flex-wrap gap-2">
                  <Link to="/academy/dashboard" className="inline-flex items-center gap-2 h-11 px-5 rounded-xl gradient-brand text-brand-foreground text-sm font-bold shadow-soft">
                    <LayoutDashboard className="h-4 w-4" /> Open my dashboard
                  </Link>
                  <Link to="/contact" className="inline-flex items-center gap-2 h-11 px-5 rounded-xl border border-border text-sm font-semibold hover:bg-accent">
                    <MessageCircle className="h-4 w-4" /> Request a coach
                  </Link>
                  <button onClick={academy.signOut} className="inline-flex items-center gap-2 h-11 px-4 rounded-xl text-sm text-muted-foreground hover:text-foreground">
                    <LogOut className="h-4 w-4" /> Sign out
                  </button>
                </div>
              </div>
            ) : (
              <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
                <li className="inline-flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-brand" /> Resume any lesson from your last page</li>
                <li className="inline-flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-brand" /> Book practical lab sessions on your schedule</li>
                <li className="inline-flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-brand" /> Request a coach for 1:1 guidance, anytime</li>
              </ul>
            )}
          </div>

          <div className="p-8 border-t lg:border-t-0 lg:border-l border-border">
            {academy.user ? (
              <div className="h-full flex flex-col justify-center">
                <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl gradient-brand text-brand-foreground font-bold text-lg">
                  {academy.user.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                </div>
                <div className="mt-4 font-display text-lg font-bold">{academy.user.name}</div>
                <div className="text-sm text-muted-foreground">{academy.user.email}</div>
                <Link to="/academy/dashboard" className="mt-6 inline-flex items-center justify-center gap-2 h-11 rounded-xl gradient-brand text-brand-foreground text-sm font-bold">
                  Go to dashboard <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ) : (
              <>
                <div className="flex gap-1 p-1 rounded-xl bg-secondary">
                  <button onClick={() => setMiniTab("signin")} className={`flex-1 h-9 rounded-lg text-sm font-semibold ${miniTab === "signin" ? "bg-background shadow-soft" : ""}`}>Sign in</button>
                  <button onClick={() => setMiniTab("signup")} className={`flex-1 h-9 rounded-lg text-sm font-semibold ${miniTab === "signup" ? "bg-background shadow-soft" : ""}`}>Create account</button>
                </div>
                <form onSubmit={submitMini} className="mt-4 space-y-3">
                  {miniTab === "signup" && (
                    <input required placeholder="Full name" value={miniForm.name} onChange={(e) => setMiniForm({ ...miniForm, name: e.target.value })} className="w-full h-11 px-3 rounded-xl bg-secondary text-sm border border-transparent focus:border-brand focus:outline-none" />
                  )}
                  <input required type="email" placeholder="Email" value={miniForm.email} onChange={(e) => setMiniForm({ ...miniForm, email: e.target.value })} className="w-full h-11 px-3 rounded-xl bg-secondary text-sm border border-transparent focus:border-brand focus:outline-none" />
                  <input required type="password" placeholder="Password" value={miniForm.password} onChange={(e) => setMiniForm({ ...miniForm, password: e.target.value })} className="w-full h-11 px-3 rounded-xl bg-secondary text-sm border border-transparent focus:border-brand focus:outline-none" />
                  {miniTab === "signup" && (
                    <input required type="password" placeholder="Confirm password" value={miniForm.confirm} onChange={(e) => setMiniForm({ ...miniForm, confirm: e.target.value })} className="w-full h-11 px-3 rounded-xl bg-secondary text-sm border border-transparent focus:border-brand focus:outline-none" />
                  )}
                  <button disabled={miniBusy} type="submit" className="w-full h-11 rounded-xl gradient-brand text-brand-foreground text-sm font-bold disabled:opacity-60 inline-flex items-center justify-center gap-2">
                    {miniBusy ? <Loader2 className="h-4 w-4 animate-spin" /> : miniTab === "signin" ? <>Sign in & open dashboard <ArrowRight className="h-4 w-4" /></> : <><UserPlus className="h-4 w-4" /> Create account</>}
                  </button>
                </form>
                <p className="mt-3 text-[11px] text-muted-foreground text-center">By continuing you agree to our terms of service.</p>
              </>
            )}
          </div>
        </div>
      </section>

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
                      <button onClick={() => openBuy(c)} className="mt-2 w-full h-10 rounded-xl border border-border text-sm font-semibold hover:bg-accent transition-colors inline-flex items-center justify-center gap-2">
                        {academy.isEnrolled(c.id) ? (<><BookOpen className="h-4 w-4" /> Open in library</>) : (<><Lock className="h-4 w-4" /> Buy & read</>)}
                      </button>
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

      {/* My Library */}
      <section className="py-12 px-4 bg-accent/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-6">
            <div>
              <h2 className="font-display text-3xl font-bold">My Library</h2>
              <p className="text-muted-foreground text-sm mt-1">Pick up where you left off.</p>
            </div>
          </div>
          {!academy.user ? (
            <div className="rounded-2xl border border-dashed border-border bg-card p-10 text-center text-sm text-muted-foreground">Sign in to see the courses you own and continue reading.</div>
          ) : academy.enrollments.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-card p-10 text-center text-sm text-muted-foreground">You haven't bought a course yet. Pick one above to get started.</div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {academy.enrollments.map((e) => {
                const pct = academy.progressPct(e.courseId);
                return (
                  <article key={e.courseId} className="rounded-2xl border border-border bg-card overflow-hidden shadow-soft">
                    {e.cover && <div className="aspect-[16/9] overflow-hidden"><img src={e.cover} alt="" className="h-full w-full object-cover" /></div>}
                    <div className="p-5">
                      <h3 className="font-display font-bold text-lg leading-snug">{e.title}</h3>
                      {e.practicalDate && <div className="mt-1 text-xs text-muted-foreground">Practical: {new Date(e.practicalDate).toLocaleDateString()}</div>}
                      <div className="mt-3 h-1.5 rounded-full bg-secondary overflow-hidden"><div className="h-full gradient-brand" style={{ width: `${pct}%` }} /></div>
                      <div className="mt-1 text-xs text-muted-foreground">{pct}% complete</div>
                      <Link to="/academy/read/$courseId" params={{ courseId: e.courseId }} className="mt-4 w-full h-10 rounded-xl gradient-brand text-brand-foreground text-sm font-semibold inline-flex items-center justify-center gap-2">Continue reading <ArrowRight className="h-4 w-4" /></Link>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Buy / Auth modal */}
      {selected && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm grid place-items-center px-4 animate-fade-in" onClick={() => setSelected(null)}>
          <div className="w-full max-w-md rounded-2xl bg-card border border-border shadow-brand overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="font-display font-bold">{academy.user ? "Confirm purchase" : "Sign in to buy"}</div>
              <button onClick={() => setSelected(null)} className="h-8 w-8 grid place-items-center rounded-full hover:bg-accent"><X className="h-4 w-4" /></button>
            </div>

            {!academy.user ? (
              <div className="p-5">
                <div className="flex gap-1 p-1 rounded-xl bg-secondary mb-4">
                  <button onClick={() => setAuthTab("signin")} className={`flex-1 h-9 rounded-lg text-sm font-semibold ${authTab === "signin" ? "bg-background shadow-soft" : ""}`}>Sign in</button>
                  <button onClick={() => setAuthTab("signup")} className={`flex-1 h-9 rounded-lg text-sm font-semibold ${authTab === "signup" ? "bg-background shadow-soft" : ""}`}>Create account</button>
                </div>
                <form onSubmit={submitAuth} className="space-y-3">
                  {authTab === "signup" && (
                    <input required placeholder="Full name" value={authForm.name} onChange={(e) => setAuthForm({ ...authForm, name: e.target.value })} className="w-full h-11 px-3 rounded-xl bg-secondary text-sm border border-transparent focus:border-brand focus:outline-none" />
                  )}
                  <input required type="email" placeholder="Email" value={authForm.email} onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })} className="w-full h-11 px-3 rounded-xl bg-secondary text-sm border border-transparent focus:border-brand focus:outline-none" />
                  <input required type="password" placeholder="Password" value={authForm.password} onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })} className="w-full h-11 px-3 rounded-xl bg-secondary text-sm border border-transparent focus:border-brand focus:outline-none" />
                  {authTab === "signup" && (
                    <input required type="password" placeholder="Confirm password" value={authForm.confirm} onChange={(e) => setAuthForm({ ...authForm, confirm: e.target.value })} className="w-full h-11 px-3 rounded-xl bg-secondary text-sm border border-transparent focus:border-brand focus:outline-none" />
                  )}
                  <button disabled={authBusy} type="submit" className="w-full h-11 rounded-xl gradient-brand text-brand-foreground text-sm font-bold disabled:opacity-60 inline-flex items-center justify-center">
                    {authBusy ? <Loader2 className="h-4 w-4 animate-spin" /> : authTab === "signin" ? "Sign in" : "Create account"}
                  </button>
                </form>
              </div>
            ) : (
              <div className="p-5 space-y-4">
                <div className="flex gap-3">
                  {selected.img && <img src={selected.img} alt="" className="h-16 w-24 rounded-lg object-cover" />}
                  <div className="flex-1 min-w-0">
                    <div className="font-display font-bold leading-snug">{selected.title}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{selected.level} · {selected.weeks} weeks</div>
                  </div>
                  <div className="font-display font-bold text-lg shrink-0">₦{Number(selected.price).toLocaleString()}</div>
                </div>

                {practicalDates.length > 0 && (
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground">Pick a practical date</label>
                    <select value={practical} onChange={(e) => setPractical(e.target.value)} className="mt-1 w-full h-11 px-3 rounded-xl bg-secondary text-sm border border-transparent focus:border-brand focus:outline-none">
                      <option value="">No preference</option>
                      {practicalDates.map((d) => (
                        <option key={d} value={d}>{new Date(d).toLocaleDateString(undefined, { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</option>
                      ))}
                    </select>
                  </div>
                )}

                {academy.isEnrolled(selected.id) ? (
                  <Link to="/academy/read/$courseId" params={{ courseId: selected.id }} onClick={() => setSelected(null)} className="block w-full h-11 rounded-xl gradient-brand text-brand-foreground text-sm font-bold inline-flex items-center justify-center">Open reader</Link>
                ) : (
                  <button onClick={confirmBuy} className="w-full h-11 rounded-xl gradient-brand text-brand-foreground text-sm font-bold">Buy now</button>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

function MiniStat({ I, k, v }: { I: typeof BookOpen; k: string; v: string }) {
  return (
    <div className="rounded-xl bg-background border border-border p-3">
      <I className="h-4 w-4 text-brand" />
      <div className="mt-1.5 font-display text-lg font-bold leading-none">{k}</div>
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">{v}</div>
    </div>
  );
}