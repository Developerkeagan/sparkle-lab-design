import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, ChevronDown, ShoppingBag } from "lucide-react";
import logo from "@/assets/logo.png";

const services: { label: string; slug: string }[] = [
  { label: "Molecular Lab Services", slug: "molecular-lab" },
  { label: "Lab Equipments & Reagents", slug: "equipment" },
  { label: "Training & Applied Biotech Institute", slug: "training" },
  { label: "Consulting", slug: "consulting" },
];

const navLinks = [
  { label: "Covid-19", to: "/covid-19" as const },
  { label: "Gallery", to: "/gallery" as const },
  { label: "News", to: "/news" as const },
  { label: "Contact", to: "/contact" as const },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [svcOpen, setSvcOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/85 backdrop-blur-xl border-b border-border/60 shadow-soft"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 lg:h-20">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="relative">
            <img src={logo} alt="Applied Biotech logo" className="h-9 w-9 rounded-lg" width={36} height={36} />
            <div className="absolute inset-0 rounded-lg gradient-brand opacity-0 group-hover:opacity-30 blur-md transition-opacity" />
          </div>
          <div className="leading-tight">
            <div className="font-display font-bold text-foreground text-base tracking-tight">Applied Biotech</div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Research · Training · Equipment</div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          <Link to="/about" className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">About Us</Link>

          <div
            className="relative"
            onMouseEnter={() => setSvcOpen(true)}
            onMouseLeave={() => setSvcOpen(false)}
          >
            <button className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors flex items-center gap-1">
              Services <ChevronDown className="h-3.5 w-3.5" />
            </button>
            <div
              className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 transition-all duration-200 ${
                svcOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1 pointer-events-none"
              }`}
            >
              <div className="w-72 rounded-2xl bg-popover border border-border shadow-brand p-2">
                {services.map((s) => (
                  <Link
                    key={s.slug}
                    to="/services/$slug"
                    params={{ slug: s.slug }}
                    className="block px-3 py-2.5 rounded-lg text-sm text-foreground/80 hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    {s.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {navLinks.map((l) => (
            <Link key={l.to} to={l.to} className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
              {l.label}
            </Link>
          ))}

          <Link
            to="/shop"
            className="ml-3 inline-flex items-center gap-2 rounded-full gradient-brand text-brand-foreground px-5 py-2.5 text-sm font-semibold shadow-brand hover:scale-105 transition-transform"
          >
            <ShoppingBag className="h-4 w-4" />
            Shop
          </Link>
        </nav>

        <button
          aria-label="Toggle menu"
          className="lg:hidden p-2 rounded-md text-foreground"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-background/95 backdrop-blur-xl border-t border-border animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="px-4 py-4 space-y-1 max-h-[80vh] overflow-y-auto">
            <Link to="/about" onClick={() => setOpen(false)} className="block px-3 py-2.5 rounded-lg text-foreground/80 hover:bg-accent">About Us</Link>
            <div className="px-3 pt-2 pb-1 text-xs uppercase tracking-wider text-muted-foreground">Services</div>
            {services.map((s) => (
              <Link key={s.slug} to="/services/$slug" params={{ slug: s.slug }} onClick={() => setOpen(false)} className="block px-3 py-2.5 rounded-lg text-foreground/80 hover:bg-accent text-sm">
                {s.label}
              </Link>
            ))}
            <div className="border-t border-border my-2" />
            {navLinks.map((l) => (
              <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="block px-3 py-2.5 rounded-lg text-foreground/80 hover:bg-accent">
                {l.label}
              </Link>
            ))}
            <Link to="/shop" onClick={() => setOpen(false)} className="mt-2 inline-flex items-center gap-2 rounded-full gradient-brand text-brand-foreground px-5 py-2.5 text-sm font-semibold">
              <ShoppingBag className="h-4 w-4" /> Shop
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}