import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, FormEvent } from "react";
import { useAuth } from "@/lib/auth";
import { Navbar } from "@/components/site/Navbar";
import { Eye, EyeOff, LogIn, Loader2, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  component: LoginPage,
  head: () => ({ meta: [{ title: "Login — Applied Biotech" }] }),
});

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const u = await login(identifier, password);
      toast.success(`Welcome back, ${u.name.split(" ")[0]}`);
      navigate({ to: u.role === "admin" ? "/admin" : "/editor" });
    } catch (err: any) {
      toast.error(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 lg:pt-32 pb-16 px-4 grid lg:grid-cols-2 max-w-7xl mx-auto gap-10 items-center">
        <div className="hidden lg:block">
          <div className="relative rounded-3xl gradient-brand p-10 text-brand-foreground shadow-brand overflow-hidden">
            <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
            <ShieldCheck className="h-10 w-10 mb-6" />
            <h2 className="font-display text-4xl font-bold leading-tight">Welcome back to <br /> Applied Biotech</h2>
            <p className="mt-4 text-brand-foreground/85 max-w-md">Sign in to manage your academy, shop, collections and site settings.</p>
            <div className="mt-10 grid gap-3 text-sm">
              <div className="rounded-xl bg-white/10 backdrop-blur p-4">
                <div className="font-semibold">Admin demo</div>
                <div className="opacity-80">admin@gmail.com · admin123</div>
              </div>
              <div className="rounded-xl bg-white/10 backdrop-blur p-4">
                <div className="font-semibold">Editor demo</div>
                <div className="opacity-80">editor@gmail.com · editor123</div>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={onSubmit} className="bg-card border border-border rounded-3xl p-8 sm:p-10 shadow-soft">
          <h1 className="font-display text-3xl font-bold text-foreground">Sign in</h1>
          <p className="text-sm text-muted-foreground mt-1">Use your username or email and password.</p>

          <label className="block mt-6 text-sm font-medium text-foreground">Username or email</label>
          <input
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
            placeholder="admin@gmail.com"
            className="mt-1.5 w-full h-11 rounded-xl border border-input bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />

          <label className="block mt-4 text-sm font-medium text-foreground">Password</label>
          <div className="relative mt-1.5">
            <input
              type={show ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full h-11 rounded-xl border border-input bg-background px-4 pr-11 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <button type="button" onClick={() => setShow((s) => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground" aria-label="Toggle password">
              {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>

          <div className="flex items-center justify-between mt-3 text-sm">
            <label className="flex items-center gap-2 text-muted-foreground">
              <input type="checkbox" className="rounded border-input" /> Remember me
            </label>
            <Link to="/forgot-password" className="text-primary font-medium hover:underline">Forgot password?</Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full h-11 rounded-xl gradient-brand text-brand-foreground font-semibold inline-flex items-center justify-center gap-2 shadow-brand hover:scale-[1.01] transition-transform disabled:opacity-70"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogIn className="h-4 w-4" />}
            Sign in
          </button>

          <div className="mt-6 text-xs text-center text-muted-foreground">
            Demo only · No account creation. Use credentials shown on the left.
          </div>
        </form>
      </div>
    </div>
  );
}