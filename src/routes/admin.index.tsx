import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard/DashboardShell";
import { useAuth } from "@/lib/auth";
import {
  AreaChart, Area, BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell, Legend,
} from "recharts";
import {
  TrendingUp, DollarSign, Heart, MousePointerClick, Users, Package, ArrowUpRight, ArrowDownRight, Download,
} from "lucide-react";

export const Route = createFileRoute("/admin/")({
  component: Overview,
});

const yearlyClicks = [
  { m: "Jan", v: 12400 }, { m: "Feb", v: 14820 }, { m: "Mar", v: 18200 }, { m: "Apr", v: 16400 },
  { m: "May", v: 22300 }, { m: "Jun", v: 25800 }, { m: "Jul", v: 28100 }, { m: "Aug", v: 30200 },
  { m: "Sep", v: 27500 }, { m: "Oct", v: 31200 }, { m: "Nov", v: 33800 }, { m: "Dec", v: 36400 },
];
const monthlySales = [
  { d: "W1", v: 8200 }, { d: "W2", v: 12400 }, { d: "W3", v: 9800 }, { d: "W4", v: 14600 },
];
const trafficSources = [
  { name: "Direct", value: 38 },
  { name: "Search", value: 32 },
  { name: "Social", value: 18 },
  { name: "Referral", value: 12 },
];
const COLORS = ["oklch(0.42 0.18 255)", "oklch(0.62 0.2 240)", "oklch(0.78 0.15 200)", "oklch(0.769 0.188 70.08)"];

function Overview() {
  const { user } = useAuth();
  return (
    <div className="space-y-6">
      <PageHeader
        title={`Welcome back, ${user?.name.split(" ")[0]}`}
        subtitle="Here's what's happening across the academy, shop and site today."
        actions={
          <button className="h-9 inline-flex items-center gap-2 px-4 rounded-xl border border-border bg-card text-sm font-medium hover:bg-accent">
            <Download className="h-4 w-4" /> Export report
          </button>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat icon={MousePointerClick} label="Site clicks (YTD)" value="296,540" delta="+18.4%" up />
        <Stat icon={DollarSign} label="Total sales" value="$184,920" delta="+12.1%" up />
        <Stat icon={Heart} label="Wishlist items" value="4,820" delta="+6.8%" up />
        <Stat icon={Users} label="Active students" value="1,284" delta="-2.3%" up={false} />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-card rounded-2xl border border-border p-6 shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-display font-bold text-lg">Site clicks · This year</h3>
              <p className="text-xs text-muted-foreground">Trending up over the last 12 months</p>
            </div>
            <span className="inline-flex items-center gap-1 text-emerald-600 text-sm font-semibold"><TrendingUp className="h-4 w-4" /> +18.4%</span>
          </div>
          <div className="h-72">
            <ResponsiveContainer>
              <AreaChart data={yearlyClicks}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.62 0.2 240)" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="oklch(0.62 0.2 240)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.929 0.013 255.508)" />
                <XAxis dataKey="m" stroke="oklch(0.5 0.03 250)" fontSize={12} />
                <YAxis stroke="oklch(0.5 0.03 250)" fontSize={12} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid oklch(0.929 0.013 255.508)" }} />
                <Area type="monotone" dataKey="v" stroke="oklch(0.42 0.18 255)" strokeWidth={2.5} fill="url(#g1)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-card rounded-2xl border border-border p-6 shadow-soft">
          <h3 className="font-display font-bold text-lg mb-1">Traffic sources</h3>
          <p className="text-xs text-muted-foreground mb-4">Breakdown over last 30 days</p>
          <div className="h-56">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={trafficSources} dataKey="value" innerRadius={45} outerRadius={75} paddingAngle={3}>
                  {trafficSources.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                </Pie>
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="bg-card rounded-2xl border border-border p-6 shadow-soft">
          <h3 className="font-display font-bold text-lg mb-4">Sales · This month</h3>
          <div className="h-56">
            <ResponsiveContainer>
              <BarChart data={monthlySales}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.929 0.013 255.508)" />
                <XAxis dataKey="d" stroke="oklch(0.5 0.03 250)" fontSize={12} />
                <YAxis stroke="oklch(0.5 0.03 250)" fontSize={12} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid oklch(0.929 0.013 255.508)" }} />
                <Bar dataKey="v" fill="oklch(0.62 0.2 240)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-2 bg-card rounded-2xl border border-border p-6 shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-bold text-lg">Recent orders</h3>
            <button className="text-xs font-semibold text-primary hover:underline">View all</button>
          </div>
          <div className="overflow-x-auto -mx-2">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-muted-foreground text-xs uppercase tracking-wider">
                  <th className="px-2 py-2">Order</th>
                  <th className="px-2 py-2">Customer</th>
                  <th className="px-2 py-2">Status</th>
                  <th className="px-2 py-2 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  { id: "#AB-1042", c: "Nneka A.", s: "Paid", t: "$320" },
                  { id: "#AB-1041", c: "Salim O.", s: "Pending", t: "$180" },
                  { id: "#AB-1040", c: "Grace E.", s: "Shipped", t: "$540" },
                  { id: "#AB-1039", c: "Mark T.", s: "Paid", t: "$92" },
                  { id: "#AB-1038", c: "Aisha K.", s: "Refunded", t: "$220" },
                ].map((o) => (
                  <tr key={o.id} className="hover:bg-muted/40">
                    <td className="px-2 py-3 font-mono text-xs">{o.id}</td>
                    <td className="px-2 py-3">{o.c}</td>
                    <td className="px-2 py-3"><StatusPill s={o.s} /></td>
                    <td className="px-2 py-3 text-right font-semibold">{o.t}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { l: "New enrollments", v: "186", icon: Users },
          { l: "Products live", v: "248", icon: Package },
          { l: "Avg. order", v: "$148", icon: DollarSign },
          { l: "Conversion", v: "3.42%", icon: TrendingUp },
        ].map((s) => (
          <div key={s.l} className="bg-card border border-border rounded-2xl p-4 flex items-center gap-3">
            <span className="h-10 w-10 rounded-xl bg-primary/10 text-primary grid place-items-center"><s.icon className="h-5 w-5" /></span>
            <div>
              <div className="text-xs text-muted-foreground">{s.l}</div>
              <div className="font-display font-bold text-lg">{s.v}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Stat({ icon: Icon, label, value, delta, up }: any) {
  return (
    <div className="bg-card rounded-2xl border border-border p-5 shadow-soft">
      <div className="flex items-center justify-between">
        <span className="h-10 w-10 rounded-xl bg-primary/10 text-primary grid place-items-center"><Icon className="h-5 w-5" /></span>
        <span className={`inline-flex items-center gap-0.5 text-xs font-semibold ${up ? "text-emerald-600" : "text-red-500"}`}>
          {up ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}{delta}
        </span>
      </div>
      <div className="mt-4 font-display text-2xl font-bold">{value}</div>
      <div className="text-xs text-muted-foreground mt-1">{label}</div>
    </div>
  );
}

function StatusPill({ s }: { s: string }) {
  const map: Record<string, string> = {
    Paid: "bg-emerald-500/10 text-emerald-600",
    Pending: "bg-amber-500/10 text-amber-600",
    Shipped: "bg-blue-500/10 text-blue-600",
    Refunded: "bg-red-500/10 text-red-500",
  };
  return <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${map[s] || "bg-muted text-muted-foreground"}`}>{s}</span>;
}