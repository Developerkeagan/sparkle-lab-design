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
      { title: "Academy, Applied Biotech" },
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
  const [dbDates, setDbDates] = useState<string[]>([]);
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
        const list = Array.isArray(res) ? res : res.data || [];
        const normalized = list.map((c: any) => ({
          id: c._id,
          title: c.courseTitle,
          level: c.levelDescription,
          weeks: c.weeks || 4,
          students: c.students || 0,
          price: c.price,
          img: c.image,
          description: c.description || c.summary || "",
          outline: Array.isArray(c.outline) ? c.outline : (typeof c.outline === "string" && c.outline ? c.outline.split(/\n+/).filter(Boolean) : []),
          duration: c.duration || (c.weeks ? `${c.weeks} weeks` : "Self-paced"),
          format: c.format || "Hybrid · Online theory + on-site practical",
          certificate: c.certificate ?? true,
          tag: c.status === "Draft" ? "Upcoming" : c.students > 1000 ? "Bestseller" : "",
          rating: 4.8 + (Math.random() * 0.2) // Fallback for UI polish
        }));
        setCourses(normalized);
      }
    });
  }, [fetchData]);

  useEffect(() => {
    fetchData("/api/v1/content/settings/practical-dates").then(res => {
      if (res) setDbDates(res);
    });
  }, [fetchData]);

  // Sync enrollments from backend when user is logged in
  useEffect(() => {
    if (academy.user) {
      fetchData("/api/v1/academy/my-enrollments")
        .then(res => {
          if (res && Array.isArray(res)) {
            // Synchronize global academy state with server data
            res.forEach(e => academy.enroll(e));
          }
        })
        .catch(() => {}); 
    }
  }, [fetchData, academy.user?.email]);

  const totalStudents = useMemo(() => courses.reduce((acc, c) => acc + c.students, 0), [courses]);

  function openBuy(c: any) {
    setSelected(c);
    setPractical("");
    setAuthForm({ name: "", email: "", password: "", confirm: "" });
    setAuthTab("signin");
  }

  async function submitAuth(e: React.FormEvent) {
    e.preventDefault();
    if (authTab === "signup" && authForm.password !== authForm.confirm) {
      return toast.error("Passwords do not match");
    }

    setAuthBusy(true);
    try {
      const endpoint = authTab === "signin" ? "/api/v1/academy/auth/login" : "/api/v1/academy/auth/register";
      const userEmail = String(authForm.email || "").trim();

      const payload = authTab === "signin" 
        ? { email: userEmail, username: userEmail, password: authForm.password } 
        : { 
            fullName: String(authForm.name || "").trim(), 
            username: userEmail, 
            email: userEmail, 
            password: authForm.password,
            confirmPassword: authForm.confirm 
          };

      console.log("Auth endpoint:", endpoint, "payload:", payload);
      const res = await fetchData(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (res && res.user) {
        const u = res.user;
        const normalizedUser = {
          ...u,
          name: String(u.fullName || u.name || u.username || "Student"), 
          email: String(u.email || u.username || "").toLowerCase().trim(), 
          role: String(u.role || "student").toLowerCase().trim(), 
        };
        console.log("[Academy Auth] Normalization:", normalizedUser);

        if (typeof academy.signInFromServer === "function") {
          await academy.signInFromServer(normalizedUser, res.token);
        } else {
          // Fallback to legacy signIn(email, password) using email only to avoid calling .toLowerCase on an object
          await academy.signIn(String(normalizedUser.email || ""), "");
        }
        toast.success(authTab === "signin" ? "Welcome back!" : "Account created successfully");
      }
    } catch (err: any) {
      console.error("Sign-in/Sign-up error (submitAuth):", err); // Log error to console
      toast.error(err.message || "Authentication server error"); // Display toast for user
    } finally {
      setAuthBusy(false);
    }
  }

  async function confirmBuy() {
    if (!selected) return;
    try {
      const res = await fetchData("/api/v1/academy/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          courseId: selected.id, 
          practicalDate: practical || null 
        })
      });

      if (res) {
        academy.enroll(res); // Update local store with backend response
        toast.success("Enrollment confirmed");
        setSelected(null);
      }
    } catch (err: any) {
      toast.error(err.message || "Could not process enrollment");
    }
  }

  async function submitMini(e: React.FormEvent) {
    e.preventDefault();
    if (miniTab === "signup" && miniForm.password !== miniForm.confirm) {
      return toast.error("Passwords do not match");
    }

    setMiniBusy(true);
    try {
      const endpoint = miniTab === "signin" ? "/api/v1/academy/auth/login" : "/api/v1/academy/auth/register";
      const userEmail = String(miniForm.email || "").trim();

      const payload = miniTab === "signin" 
        ? { email: userEmail, username: userEmail, password: miniForm.password } 
        : { 
            fullName: String(miniForm.name || "").trim(), 
            username: userEmail, 
            email: userEmail, 
            password: miniForm.password,
            confirmPassword: miniForm.confirm 
          };

      const res = await fetchData(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (res && res.user) {
        const u = res.user;
        const normalizedUser = {
          ...u,
          name: String(u.fullName || u.name || u.username || "Student"), 
          email: String(u.email || u.username || "").toLowerCase().trim(), 
          role: String(u.role || "student").toLowerCase().trim(), 
        };
        console.log("[Academy Mini Auth] Normalization:", normalizedUser);

        if (typeof academy.signInFromServer === "function") {
          await academy.signInFromServer(normalizedUser, res.token);
        } else {
          await academy.signIn(String(normalizedUser.email || ""), "");
        }
        navigate({ to: "/academy/dashboard" });
      }
    } catch (err: any) {
      console.error("Sign-in/Sign-up error (submitMini):", err); // Log error to console
      toast.error(err.message || "Authentication failed"); // Display toast for user
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
              {academy.user ? `Welcome back, ${(academy.user.name || "").split(" ")[0] || "Student"}.` : "Sign in to your Academy"}
            </h2>
            <p className="mt-3 text-sm text-muted-foreground max-w-md">
              {academy.user
                ? "Your courses, your progress, your practical dates, all in one place. Open the full dashboard or jump back into your last lesson."
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
                  {(academy.user.name || "User").split(" ").map((n) => n[0]).slice(0, 2).join("")}
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
            { icon: Users, k: "1000+", v: "Students trained" },
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
                        <div className="font-display text-xl font-bold">₦{Number(c.price).toLocaleString()}</div>
                      </div>
                      <button onClick={() => openBuy(c)} className="mt-4 w-full h-10 rounded-xl gradient-brand text-brand-foreground text-sm font-semibold shadow-soft hover:scale-[1.02] transition-transform inline-flex items-center justify-center">
                        Enroll now
                      </button>
                      <button onClick={() => openBuy(c)} className="mt-2 w-full h-10 rounded-xl border border-border text-sm font-semibold hover:bg-accent transition-colors inline-flex items-center justify-center gap-2">
                        {academy.isEnrolled(c.id) ? (<><BookOpen className="h-4 w-4" /> Open in library</>) : (<><Lock className="h-4 w-4" /> Purchase</>)}
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
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm grid place-items-center px-4 py-8 overflow-y-auto animate-fade-in" onClick={() => setSelected(null)}>
          <div className="w-full max-w-3xl rounded-3xl bg-card border border-border shadow-brand overflow-hidden grid md:grid-cols-[1.1fr_1fr] my-auto" onClick={(e) => e.stopPropagation()}>
            {/* Left: course details */}
            <div className="relative bg-gradient-to-br from-brand/10 via-transparent to-accent-cyan/10 p-6 md:p-8">
              <button onClick={() => setSelected(null)} className="md:hidden absolute right-3 top-3 h-8 w-8 grid place-items-center rounded-full bg-background/80 hover:bg-accent"><X className="h-4 w-4" /></button>
              {selected.img && (
                <div className="rounded-2xl overflow-hidden aspect-[16/10] border border-border">
                  <img src={selected.img} alt={selected.title} className="w-full h-full object-cover" />
                </div>
              )}
              <h3 className="mt-5 font-display text-xl md:text-2xl font-extrabold leading-tight">{selected.title}</h3>
              {selected.description && <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{selected.description}</p>}
              <div className="mt-4 grid grid-cols-3 gap-2">
                <div className="rounded-xl bg-background border border-border p-3">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Level</div>
                  <div className="mt-1 text-sm font-bold leading-tight">{selected.level || "All levels"}</div>
                </div>
                <div className="rounded-xl bg-background border border-border p-3">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Duration</div>
                  <div className="mt-1 text-sm font-bold leading-tight">{selected.duration || `${selected.weeks} weeks`}</div>
                </div>
                <div className="rounded-xl bg-background border border-border p-3">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Format</div>
                  <div className="mt-1 text-xs font-semibold leading-tight">{selected.format || "Hybrid"}</div>
                </div>
              </div>
              <div className="mt-5">
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">Course outline</div>
                <ul className="mt-2 space-y-1.5 max-h-44 overflow-y-auto pr-1">
                  {(selected.outline && selected.outline.length > 0 ? selected.outline : [
                    "Introduction & lab safety",
                    "Core protocols & hands-on practice",
                    "Data analysis & interpretation",
                    "Practical assessment & certification",
                  ]).map((line: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand shrink-0" />
                      <span className="text-foreground/85 leading-snug">{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {selected.certificate && (
                <div className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-brand">
                  <Award className="h-4 w-4" /> Certificate of completion issued
                </div>
              )}
            </div>

            {/* Right: auth or buy */}
            <div className="p-6 md:p-8 border-t md:border-t-0 md:border-l border-border">
              <div className="hidden md:flex items-center justify-between mb-4">
                <div className="font-display font-bold">{academy.user ? "Confirm purchase" : "Sign in to enroll"}</div>
                <button onClick={() => setSelected(null)} className="h-8 w-8 grid place-items-center rounded-full hover:bg-accent"><X className="h-4 w-4" /></button>
              </div>

              {!academy.user ? (
                <div>
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
                <div className="space-y-4">
                  <div className="rounded-2xl bg-secondary/60 p-4 flex items-center justify-between gap-3">
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Total</div>
                      <div className="font-display text-2xl font-extrabold">₦{Number(selected.price).toLocaleString()}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Signed in</div>
                      <div className="text-sm font-semibold truncate max-w-[150px]">{academy.user.email}</div>
                    </div>
                  </div>

                {dbDates.length > 0 && (
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground">Pick a practical date</label>
                    <select value={practical} onChange={(e) => setPractical(e.target.value)} className="mt-1 w-full h-11 px-3 rounded-xl bg-secondary text-sm border border-transparent focus:border-brand focus:outline-none">
                      <option value="">No preference</option>
                      {dbDates.map((d) => (
                        <option key={d} value={d}>{new Date(d).toLocaleDateString(undefined, { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</option>
                      ))}
                    </select>
                  </div>
                )}

                {academy.isEnrolled(selected.id) ? (
                  <Link to="/academy/read/$courseId" params={{ courseId: selected.id }} onClick={() => setSelected(null)} className="w-full h-12 rounded-xl gradient-brand text-brand-foreground text-sm font-bold inline-flex items-center justify-center gap-2">Open reader <ArrowRight className="h-4 w-4" /></Link>
                ) : (
                  <button onClick={confirmBuy} className="w-full h-12 rounded-xl gradient-brand text-brand-foreground text-sm font-bold inline-flex items-center justify-center gap-2">Confirm enrollment <ArrowRight className="h-4 w-4" /></button>
                )}
                  <p className="text-[11px] text-muted-foreground text-center">Instant access. Cancel before the practical for a full refund.</p>
                </div>
              )}
            </div>
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