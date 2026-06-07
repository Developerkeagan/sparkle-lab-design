import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useCallback } from "react";
import { PageHeader } from "@/components/dashboard/DashboardShell";
import { Card, Toolbar, RowMenu } from "@/components/dashboard/widgets";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import useFetch from "@/hooks/useFetch";

export const Route = createFileRoute("/editor/orders")({ component: AdminOrders });

interface Order {
  id: string;
  email: string;
  createdAt: string;
  items: any[];
  totalAmount: number;
  status: string;
}

function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<string>("All");
  const { loading, fetchData } = useFetch();

  const stats = ["All", "Paid", "Pending", "Shipped", "Refunded", "Cancelled"];

  const loadOrders = useCallback(async () => {
    try {
      const result = await fetchData("/api/v1/payments/orders-ledger"); // Corrected path
      if (result) setOrders(result.map((o: any) => ({
        id: o._id,
        email: o.email,
        createdAt: o.createdAt,
        items: o.items || [],
        totalAmount: o.totalAmount,
        status: o.status || "pending"
      })));
    } catch (err) {}
  }, [fetchData]);

  useEffect(() => { loadOrders(); }, [loadOrders]);

  async function updateStatus(id: string, next: string) {
    try {
      await fetchData(`/api/v1/payments/orders/${id}/status-update`, { // Corrected path
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: next })
      });
      toast.success(`Order marked as ${next}`);
      loadOrders();
    } catch (err) { toast.error("Failed to update status"); }
  }

  const filtered = orders.filter((o) =>
    (filter === "All" || String(o.status || "").toLowerCase() === filter.toLowerCase()) &&
    (String(o.id || "").toLowerCase().includes(q.toLowerCase()) || String(o.email || "").toLowerCase().includes(q.toLowerCase()))
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

      <Card className="relative overflow-visible">
        {loading && orders.length === 0 && (
          <div className="absolute inset-0 bg-background/50 z-10 grid place-items-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
        )}
        <div className="overflow-x-auto pb-48">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-left text-muted-foreground text-xs uppercase">
              <tr><th className="px-4 py-3">Tracking ID</th><th>Customer</th><th>Date</th><th>Items</th><th>Total</th><th>Status</th><th></th></tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((o) => (
                <tr key={o.id} className="hover:bg-muted/40">
                  <td className="px-4 py-3 font-mono text-[10px]">{o.id}</td>
                  <td><div className="font-medium">{o.email}</div></td>
                  <td className="text-muted-foreground">{new Date(o.createdAt).toLocaleDateString()}</td>
                  <td>{o.items.length}</td>
                  <td className="font-semibold">₦{o.totalAmount.toLocaleString()}</td>
                  <td><StatusPill s={o.status} /></td>
                  <td className="pr-4"><RowMenu actions={[
                    { label: "View", onClick: () => toast.success(`Open ${o.id}`) },
                    { 
                      label: "Copy Tracking ID", 
                      onClick: () => { 
                        navigator.clipboard.writeText(o.id); 
                        toast.success("Tracking ID copied to clipboard"); 
                      } 
                    },
                    { label: "Mark shipped", onClick: () => updateStatus(o.id, "Shipped") },
                    { label: "Refund", danger: true, onClick: () => updateStatus(o.id, "Refunded") },
                  ]} /></td>
                </tr>
              ))}
              {!loading && filtered.length === 0 && <tr><td colSpan={7} className="py-12 text-center text-muted-foreground">No matches found.</td></tr>}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function StatusPill({ s }: { s: string }) {
  const map: Record<string, string> = {
    paid: "bg-emerald-500/10 text-emerald-600",
    pending: "bg-amber-500/10 text-amber-600",
    failed: "bg-red-500/10 text-red-500",
    shipped: "bg-blue-500/10 text-blue-600",
    refunded: "bg-red-500/10 text-red-500",
    cancelled: "bg-muted text-muted-foreground",
  };
  const status = String(s || "").toLowerCase().trim() || "pending";
  return <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold capitalize ${map[status] || "bg-muted text-muted-foreground"}`}>{status}</span>;
}