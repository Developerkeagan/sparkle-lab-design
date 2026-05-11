import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/dashboard/DashboardShell";
import { Card, Modal, Field, Toolbar, RowMenu, ImageUpload, inputCls, textareaCls, PrimaryBtn, GhostBtn } from "@/components/dashboard/widgets";
import { Package, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { PRODUCTS, fmt } from "@/lib/products";

export const Route = createFileRoute("/editor/shop")({ component: EditorShop });

interface Item { id: string; name: string; price: number; stock: number; status: "Active" | "Draft"; img: string; category: string; description: string; }

function EditorShop() {
  const [items, setItems] = useState<Item[]>(PRODUCTS.slice(0, 8).map((p) => ({ ...p, status: "Active" as const })));
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Item | null>(null);

  function save(form: Item) {
    if (editing) {
      setItems((p) => p.map((x) => (x.id === form.id ? form : x)));
      toast.success("Saved");
    } else {
      setItems((p) => [{ ...form, id: `e${Date.now()}` }, ...p]);
      toast.success("Created");
    }
    setOpen(false); setEditing(null);
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Shop items" subtitle="Edit product copy, pricing, imagery and visibility." />
      <Toolbar onSearch={setQ} addLabel="New item" onAdd={() => { setEditing(null); setOpen(true); }} />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {items.filter((i) => i.name.toLowerCase().includes(q.toLowerCase())).map((p) => (
          <Card key={p.id} className="overflow-hidden group">
            <div className="aspect-[4/3] bg-muted overflow-hidden relative">
              <img src={p.img} alt={p.name} className="h-full w-full object-cover group-hover:scale-105 transition-transform" />
              <span className={`absolute top-2 left-2 inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${p.status === "Active" ? "bg-emerald-500/90 text-white" : "bg-muted text-muted-foreground"}`}>
                {p.status === "Active" ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />} {p.status}
              </span>
              <div className="absolute top-2 right-2"><RowMenu actions={[
                { label: "Edit", onClick: () => { setEditing(p); setOpen(true); } },
                { label: p.status === "Active" ? "Unpublish" : "Publish", onClick: () => setItems((prev) => prev.map((x) => x.id === p.id ? { ...x, status: x.status === "Active" ? "Draft" : "Active" } : x)) },
                { label: "Delete", danger: true, onClick: () => { setItems((prev) => prev.filter((x) => x.id !== p.id)); toast.success("Deleted"); } },
              ]} /></div>
            </div>
            <div className="p-4">
              <div className="text-xs text-muted-foreground capitalize">{p.category}</div>
              <div className="font-semibold text-sm mt-0.5 line-clamp-2 min-h-[2.5em]">{p.name}</div>
              <div className="mt-3 flex items-center justify-between">
                <div className="font-display font-bold text-base">{fmt(p.price)}</div>
                <div className={`text-xs ${p.stock === 0 ? "text-destructive" : p.stock < 20 ? "text-amber-600" : "text-muted-foreground"}`}>
                  <Package className="inline h-3 w-3 mr-1" />{p.stock}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <ItemModal key={editing?.id ?? "new"} open={open} onClose={() => { setOpen(false); setEditing(null); }} editing={editing} onSave={save} />
    </div>
  );
}

function ItemModal({ open, onClose, editing, onSave }: { open: boolean; onClose: () => void; editing: Item | null; onSave: (i: Item) => void }) {
  const [name, setName] = useState(editing?.name ?? "");
  const [price, setPrice] = useState(editing?.price ?? 0);
  const [stock, setStock] = useState(editing?.stock ?? 0);
  const [category, setCategory] = useState(editing?.category ?? "reagents");
  const [status, setStatus] = useState<"Active" | "Draft">(editing?.status ?? "Active");
  const [description, setDescription] = useState(editing?.description ?? "");
  const [img, setImg] = useState<string | undefined>(editing?.img);

  return (
    <Modal open={open} onClose={onClose} title={editing ? "Edit item" : "New item"}
      footer={<><GhostBtn onClick={onClose}>Cancel</GhostBtn>
        <PrimaryBtn onClick={() => { if (!name.trim()) return toast.error("Name required"); onSave({ id: editing?.id ?? "", name, price: +price, stock: +stock, category, status, description, img: img ?? "" }); }}>Save</PrimaryBtn></>}>
      <div className="space-y-4">
        <ImageUpload label="Product image" value={img} onChange={setImg} />
        <Field label="Product name"><input className={inputCls} value={name} onChange={(e) => setName(e.target.value)} /></Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Price (₦)"><input type="number" className={inputCls} value={price} onChange={(e) => setPrice(+e.target.value)} /></Field>
          <Field label="Stock"><input type="number" className={inputCls} value={stock} onChange={(e) => setStock(+e.target.value)} /></Field>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Category">
            <select className={inputCls} value={category} onChange={(e) => setCategory(e.target.value)}>
              {["reagents", "equipment", "consumables", "kits", "apparel", "accessories"].map((c) => <option key={c}>{c}</option>)}
            </select>
          </Field>
          <Field label="Status">
            <select className={inputCls} value={status} onChange={(e) => setStatus(e.target.value as any)}>
              <option>Active</option><option>Draft</option>
            </select>
          </Field>
        </div>
        <Field label="Description"><textarea rows={3} className={textareaCls} value={description} onChange={(e) => setDescription(e.target.value)} /></Field>
      </div>
    </Modal>
  );
}
