import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/dashboard/DashboardShell";
import { Card, Toolbar, RowMenu } from "@/components/dashboard/widgets";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/orders")({ component: AdminOrders });

const seed = [
  { id: "#AB-1042", c: "Nneka Adamu", email: "nneka@lab.io", date: "May 8, 2026", total: 320, items: 3, status: "Paid" },
  { id: "#AB-1041", c: "Salim Ojo", email: "salim@uniben.edu", date: "May 8, 2026", total: 180, items: 2, status: "Pending" },
  { id: "#AB-1040", c: "Grace Ekene", email: "grace@biotech.ng", date: "May 7, 2026", total: 540, items: 5, status: "Shipped" },
  { id: "#AB-1039", c: "Mark T.", email: "mark@labworks.co", date: "May 7, 2026", total: 92, items: 1, status: "Paid" },
  { id: "#AB-1038", c: "Aisha Kano", email: "aisha@bio.org", date: "May 6, 2026", total: 220, items: 2, status: "Refunded" },
  { id: "#AB-1037", c: "John Bello", email: "john@uni.edu", date: "May 6, 2026", total: 410, items: 4, status: "Paid" },
  { id: "#AB-1036", c: "Mariam B.", email: "mariam@x.com", date: "May 5, 2026", total: 75, items: 1, status: "Cancelled" },
];

function AdminOrders() {
  const [orders, setOrders] = useState(seed);
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<string>("All");

  const stats = ["All", "Paid", "Pending", "Shipped", "Refunded", "Cancelled"];

  const filtered = orders.filter((o) =>
    (filter === "All" || o.status === filter) &&
    (o.id.toLowerCase().includes(q.toLowerCase()) || o.c.toLowerCase().includes(q.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <PageHeader title="Orders" subtitle="Track and fulfill all customer orders." />
      <Toolbar onSearch={setQ}>
        <div className="flex gap-1 overflow-x-auto bg-card border border-border rounded-xl p-1">
          {stats.map((s) => (
            <button key={s} onClick={() => setFilter(s)} className={`px-3 py-1.5 text-xs rounded-lg font-semibold whitespace-nowrap ${filter === s ? "gradient-brand text-brand-foreground" : "hover:bg-accent"}`}>{s}</button>
          ))}
        </div>
      </Toolbar>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-left text-muted-foreground text-xs uppercase">
              <tr><th className="px-4 py-3">Order</th><th>Customer</th><th>Date</th><th>Items</th><th>Total</th><th>Status</th><th></th></tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((o) => (
                <tr key={o.id} className="hover:bg-muted/40">
                  <td className="px-4 py-3 font-mono text-xs">{o.id}</td>
                  <td><div className="font-medium">{o.c}</div><div className="text-xs text-muted-foreground">{o.email}</div></td>
                  <td className="text-muted-foreground">{o.date}</td>
                  <td>{o.items}</td>
                  <td className="font-semibold">${o.total}</td>
                  <td><StatusPill s={o.status} /></td>
                  <td className="pr-4"><RowMenu actions={[
                    { label: "View", onClick: () => toast.success(`Open ${o.id}`) },
                    { label: "Mark shipped", onClick: () => setOrders((p) => p.map((x) => x.id === o.id ? { ...x, status: "Shipped" } : x)) },
                    { label: "Refund", danger: true, onClick: () => setOrders((p) => p.map((x) => x.id === o.id ? { ...x, status: "Refunded" } : x)) },
                  ]} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function StatusPill({ s }: { s: string }) {
  const map: Record<string, string> = {
    Paid: "bg-emerald-500/10 text-emerald-600",
    Pending: "bg-amber-500/10 text-amber-600",
    Shipped: "bg-blue-500/10 text-blue-600",
    Refunded: "bg-red-500/10 text-red-500",
    Cancelled: "bg-muted text-muted-foreground",
  };
  return <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${map[s]}`}>{s}</span>;
}