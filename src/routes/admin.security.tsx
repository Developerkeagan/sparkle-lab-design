import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard/DashboardShell";
import { Card } from "@/components/dashboard/widgets";
import { ShieldCheck, AlertTriangle, KeyRound, Activity } from "lucide-react";

export const Route = createFileRoute("/admin/security")({ component: () => (
  <div className="space-y-6">
    <PageHeader title="Security" subtitle="Audit logs, two-factor authentication and access policies." />
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {[{ i: ShieldCheck, l: "Security score", v: "92 / 100", c: "text-emerald-600" }, { i: AlertTriangle, l: "Open alerts", v: "2", c: "text-amber-600" }, { i: KeyRound, l: "2FA enabled", v: "8 / 12", c: "text-primary" }, { i: Activity, l: "Logins (24h)", v: "47", c: "text-foreground" }].map((s) => (
        <Card key={s.l} className="p-5"><s.i className={`h-6 w-6 ${s.c}`} /><div className="mt-3 font-display text-2xl font-bold">{s.v}</div><div className="text-xs text-muted-foreground">{s.l}</div></Card>
      ))}
    </div>
    <Card className="p-6">
      <h3 className="font-display font-bold mb-4">Recent activity</h3>
      <div className="space-y-3 text-sm">
        {[{ a: "Admin login", w: "Dr. Ada Okafor", t: "2 min ago", ip: "102.89.x.x" }, { a: "Password changed", w: "Tunde Bello", t: "1 hr ago", ip: "102.89.x.x" }, { a: "Failed login attempt", w: "unknown@x.com", t: "3 hr ago", ip: "45.12.x.x" }, { a: "New invite sent", w: "grace@bio.org", t: "yesterday", ip: "—" }].map((e, i) => (
          <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-border"><div><div className="font-medium">{e.a}</div><div className="text-xs text-muted-foreground">{e.w} · {e.ip}</div></div><div className="text-xs text-muted-foreground">{e.t}</div></div>
        ))}
      </div>
    </Card>
  </div>
) });