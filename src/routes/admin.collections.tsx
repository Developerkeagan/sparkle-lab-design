import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/dashboard/DashboardShell";
import { Card, Modal, Field, Toolbar, RowMenu, ImageUpload, inputCls, textareaCls, PrimaryBtn, GhostBtn } from "@/components/dashboard/widgets";
import { Layers } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/collections")({ component: AdminCollections });

interface Coll { id: string; name: string; items: number; status: "Published" | "Draft"; updated: string; }

const seed: Coll[] = [
  { id: "c1", name: "Molecular Diagnostics Starter", items: 12, status: "Published", updated: "2 days ago" },
  { id: "c2", name: "PCR Essentials Bundle", items: 9, status: "Published", updated: "5 days ago" },
  { id: "c3", name: "Academy Lab Kit", items: 14, status: "Published", updated: "1 wk ago" },
  { id: "c4", name: "Holiday Promo Pack", items: 6, status: "Draft", updated: "today" },
];

function AdminCollections() {
  const [items, setItems] = useState(seed);
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [cover, setCover] = useState<string | undefined>(undefined);

  function add() {
    if (!name.trim()) return toast.error("Enter a name");
    setItems((prev) => [{ id: `c${Date.now()}`, name, items: 0, status: "Draft", updated: "just now" }, ...prev]);
    setName(""); setCover(undefined); setOpen(false); toast.success("Collection created");
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Collections" subtitle="Group products into curated bundles." />
      <Toolbar onSearch={setQ} addLabel="New collection" onAdd={() => setOpen(true)} />

      <Card className="overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-left text-muted-foreground text-xs uppercase">
            <tr><th className="px-4 py-3">Collection</th><th>Items</th><th>Status</th><th>Updated</th><th></th></tr>
          </thead>
          <tbody className="divide-y divide-border">
            {items.filter((i) => i.name.toLowerCase().includes(q.toLowerCase())).map((c) => (
              <tr key={c.id} className="hover:bg-muted/40">
                <td className="px-4 py-3 font-medium flex items-center gap-3">
                  <span className="h-9 w-9 rounded-xl gradient-brand grid place-items-center text-brand-foreground"><Layers className="h-4 w-4" /></span>
                  {c.name}
                </td>
                <td>{c.items}</td>
                <td><span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${c.status === "Published" ? "bg-emerald-500/10 text-emerald-600" : "bg-muted text-muted-foreground"}`}>{c.status}</span></td>
                <td className="text-muted-foreground">{c.updated}</td>
                <td className="pr-4"><RowMenu actions={[
                  { label: "Edit", onClick: () => toast.success("Open editor") },
                  { label: c.status === "Published" ? "Unpublish" : "Publish", onClick: () => setItems((p) => p.map((x) => x.id === c.id ? { ...x, status: x.status === "Published" ? "Draft" : "Published" } : x)) },
                  { label: "Delete", danger: true, onClick: () => { setItems((p) => p.filter((x) => x.id !== c.id)); toast.success("Deleted"); } },
                ]} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Modal open={open} onClose={() => setOpen(false)} title="New collection"
        footer={<><GhostBtn onClick={() => setOpen(false)}>Cancel</GhostBtn><PrimaryBtn onClick={add}>Create</PrimaryBtn></>}>
        <div className="space-y-4">
          <ImageUpload label="Cover image" value={cover} onChange={setCover} aspect="aspect-[16/9]" />
          <Field label="Collection name"><input className={inputCls} value={name} onChange={(e) => setName(e.target.value)} placeholder="E.g. Holiday Promo Pack" /></Field>
          <Field label="Description"><textarea rows={3} className={textareaCls} placeholder="Optional description" /></Field>
        </div>
      </Modal>
    </div>
  );
}