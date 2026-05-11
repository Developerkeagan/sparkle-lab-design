import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/dashboard/DashboardShell";
import { Card, Modal, Field, Toolbar, RowMenu, ImageUpload, inputCls, textareaCls, PrimaryBtn, GhostBtn } from "@/components/dashboard/widgets";
import { toast } from "sonner";

export const Route = createFileRoute("/editor/collections")({ component: EditorCollections });

interface Coll { id: string; name: string; items: number; status: "Published" | "Draft"; cover?: string; description: string; }

const seed: Coll[] = [
  { id: "c1", name: "Molecular Diagnostics Starter", items: 12, status: "Published", description: "Everything you need for entry-level diagnostics." },
  { id: "c2", name: "PCR Essentials Bundle", items: 9, status: "Published", description: "Curated PCR consumables and reagents." },
  { id: "c3", name: "Academy Lab Kit", items: 14, status: "Published", description: "The official academy enrollment kit." },
  { id: "c4", name: "Holiday Promo Pack", items: 6, status: "Draft", description: "Limited-time holiday bundle." },
];

function EditorCollections() {
  const [items, setItems] = useState<Coll[]>(seed);
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Coll | null>(null);

  function save(form: Coll) {
    if (editing) {
      setItems((p) => p.map((x) => (x.id === form.id ? form : x)));
      toast.success("Saved");
    } else {
      setItems((p) => [{ ...form, id: `c${Date.now()}`, items: 0 }, ...p]);
      toast.success("Created");
    }
    setOpen(false); setEditing(null);
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Collections" subtitle="Group products into curated bundles." />
      <Toolbar onSearch={setQ} addLabel="New collection" onAdd={() => { setEditing(null); setOpen(true); }} />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.filter((i) => i.name.toLowerCase().includes(q.toLowerCase())).map((c) => (
          <Card key={c.id} className="overflow-hidden">
            <div className="aspect-[16/9] bg-gradient-to-br from-secondary to-accent/40 relative">
              {c.cover ? <img src={c.cover} alt={c.name} className="w-full h-full object-cover" /> : (
                <div className="absolute inset-0 grid place-items-center text-muted-foreground text-sm">No cover</div>
              )}
              <span className={`absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full ${c.status === "Published" ? "bg-emerald-500/90 text-white" : "bg-background/90 text-muted-foreground"}`}>{c.status}</span>
              <div className="absolute top-2 right-2"><RowMenu actions={[
                { label: "Edit", onClick: () => { setEditing(c); setOpen(true); } },
                { label: c.status === "Published" ? "Unpublish" : "Publish", onClick: () => setItems((p) => p.map((x) => x.id === c.id ? { ...x, status: x.status === "Published" ? "Draft" : "Published" } : x)) },
                { label: "Delete", danger: true, onClick: () => { setItems((p) => p.filter((x) => x.id !== c.id)); toast.success("Deleted"); } },
              ]} /></div>
            </div>
            <div className="p-4">
              <div className="font-semibold">{c.name}</div>
              <div className="text-xs text-muted-foreground line-clamp-2 mt-1">{c.description}</div>
              <div className="mt-3 text-xs text-muted-foreground">{c.items} items</div>
            </div>
          </Card>
        ))}
      </div>

      <CollModal key={editing?.id ?? "new"} open={open} onClose={() => { setOpen(false); setEditing(null); }} editing={editing} onSave={save} />
    </div>
  );
}

function CollModal({ open, onClose, editing, onSave }: { open: boolean; onClose: () => void; editing: any; onSave: (c: any) => void }) {
  const [name, setName] = useState(editing?.name ?? "");
  const [description, setDescription] = useState(editing?.description ?? "");
  const [status, setStatus] = useState<"Published" | "Draft">(editing?.status ?? "Draft");
  const [cover, setCover] = useState<string | undefined>(editing?.cover);

  return (
    <Modal open={open} onClose={onClose} title={editing ? "Edit collection" : "New collection"}
      footer={<><GhostBtn onClick={onClose}>Cancel</GhostBtn>
        <PrimaryBtn onClick={() => { if (!name.trim()) return toast.error("Name required"); onSave({ id: editing?.id, name, description, status, cover, items: editing?.items ?? 0 }); }}>Save</PrimaryBtn></>}>
      <div className="space-y-4">
        <ImageUpload label="Cover image" value={cover} onChange={setCover} aspect="aspect-[16/9]" />
        <Field label="Collection name"><input className={inputCls} value={name} onChange={(e) => setName(e.target.value)} /></Field>
        <Field label="Description"><textarea rows={3} className={textareaCls} value={description} onChange={(e) => setDescription(e.target.value)} /></Field>
        <Field label="Status">
          <select className={inputCls} value={status} onChange={(e) => setStatus(e.target.value as any)}>
            <option>Published</option><option>Draft</option>
          </select>
        </Field>
      </div>
    </Modal>
  );
}
