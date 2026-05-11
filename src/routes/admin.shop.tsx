import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/dashboard/DashboardShell";
import { Card, Modal, Field, Toolbar, RowMenu, ImageUpload, inputCls, textareaCls, PrimaryBtn, GhostBtn } from "@/components/dashboard/widgets";
import { Package, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import pAgarose from "@/assets/prod-agarose.jpg";
import pFalcon from "@/assets/prod-falcon.jpg";
import pKit from "@/assets/prod-kit.jpg";
import pPip from "@/assets/prod-pipette.jpg";
import pGel from "@/assets/prod-gel.jpg";
import pMicro from "@/assets/prod-microfuge.jpg";

export const Route = createFileRoute("/admin/shop")({ component: AdminShop });

interface Product { id: string; name: string; price: number; stock: number; status: "Active" | "Draft"; img: string; category: string; }

const seed: Product[] = [
  { id: "p1", name: "Agarose Powder 100g", price: 48, stock: 120, status: "Active", img: pAgarose, category: "Reagents" },
  { id: "p2", name: "Falcon Tubes 50ml (50pk)", price: 22, stock: 320, status: "Active", img: pFalcon, category: "Consumables" },
  { id: "p3", name: "DNA Extraction Kit", price: 180, stock: 24, status: "Active", img: pKit, category: "Kits" },
  { id: "p4", name: "Pipette Set 10–1000μL", price: 240, stock: 8, status: "Active", img: pPip, category: "Equipment" },
  { id: "p5", name: "Gel Doc Kit", price: 96, stock: 0, status: "Draft", img: pGel, category: "Equipment" },
  { id: "p6", name: "Microfuge Tubes 1.5ml", price: 14, stock: 540, status: "Active", img: pMicro, category: "Consumables" },
];

function AdminShop() {
  const [items, setItems] = useState<Product[]>(seed);
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);

  const filtered = items.filter((i) => i.name.toLowerCase().includes(q.toLowerCase()));

  function save(form: Omit<Product, "id"> & { id?: string }) {
    if (form.id) {
      setItems((prev) => prev.map((p) => (p.id === form.id ? { ...p, ...form } as Product : p)));
      toast.success("Product updated");
    } else {
      const id = `p${Date.now()}`;
      setItems((prev) => [{ id, ...form, img: form.img || pKit } as Product, ...prev]);
      toast.success("Product added");
    }
    setOpen(false); setEditing(null);
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Shop" subtitle="Manage products, pricing and stock." />
      <Toolbar onSearch={setQ} addLabel="New product" onAdd={() => { setEditing(null); setOpen(true); }} />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((p) => (
          <Card key={p.id} className="overflow-hidden group">
            <div className="aspect-[4/3] bg-muted overflow-hidden relative">
              <img src={p.img} alt={p.name} className="h-full w-full object-cover group-hover:scale-105 transition-transform" />
              <span className={`absolute top-2 left-2 inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${p.status === "Active" ? "bg-emerald-500/90 text-white" : "bg-muted text-muted-foreground"}`}>
                {p.status === "Active" ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />} {p.status}
              </span>
              <div className="absolute top-2 right-2">
                <RowMenu actions={[
                  { label: "Edit", onClick: () => { setEditing(p); setOpen(true); } },
                  { label: "Duplicate", onClick: () => toast.success("Duplicated") },
                  { label: "Delete", danger: true, onClick: () => { setItems((prev) => prev.filter((x) => x.id !== p.id)); toast.success("Deleted"); } },
                ]} />
              </div>
            </div>
            <div className="p-4">
              <div className="text-xs text-muted-foreground">{p.category}</div>
              <div className="font-semibold text-sm mt-0.5 line-clamp-2 min-h-[2.5em]">{p.name}</div>
              <div className="mt-3 flex items-center justify-between">
                <div className="font-display font-bold text-lg">${p.price}</div>
                <div className={`text-xs ${p.stock === 0 ? "text-destructive" : p.stock < 20 ? "text-amber-600" : "text-muted-foreground"}`}>
                  <Package className="inline h-3 w-3 mr-1" />{p.stock} in stock
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <ProductModal key={editing?.id ?? "new"} open={open} onClose={() => { setOpen(false); setEditing(null); }} editing={editing} onSave={save} />
    </div>
  );
}

function ProductModal({ open, onClose, editing, onSave }: { open: boolean; onClose: () => void; editing: Product | null; onSave: (p: any) => void }) {
  const [name, setName] = useState(editing?.name || "");
  const [price, setPrice] = useState(editing?.price || 0);
  const [stock, setStock] = useState(editing?.stock || 0);
  const [category, setCategory] = useState(editing?.category || "Reagents");
  const [status, setStatus] = useState<"Active" | "Draft">(editing?.status || "Active");
  const [img, setImg] = useState<string | undefined>(editing?.img);

  return (
    <Modal open={open} onClose={onClose} title={editing ? "Edit product" : "New product"}
      footer={<>
        <GhostBtn onClick={onClose}>Cancel</GhostBtn>
        <PrimaryBtn onClick={() => onSave({ id: editing?.id, name, price: Number(price), stock: Number(stock), category, status, img })}>Save</PrimaryBtn>
      </>}>
      <div className="space-y-4">
        <ImageUpload label="Product image" value={img} onChange={setImg} />
        <Field label="Product name"><input className={inputCls} value={name} onChange={(e) => setName(e.target.value)} /></Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Price ($)"><input type="number" className={inputCls} value={price} onChange={(e) => setPrice(+e.target.value)} /></Field>
          <Field label="Stock"><input type="number" className={inputCls} value={stock} onChange={(e) => setStock(+e.target.value)} /></Field>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Category">
            <select className={inputCls} value={category} onChange={(e) => setCategory(e.target.value)}>
              {["Reagents", "Equipment", "Consumables", "Kits"].map((c) => <option key={c}>{c}</option>)}
            </select>
          </Field>
          <Field label="Status">
            <select className={inputCls} value={status} onChange={(e) => setStatus(e.target.value as any)}>
              <option>Active</option><option>Draft</option>
            </select>
          </Field>
        </div>
        <Field label="Description"><textarea className={textareaCls} rows={3} placeholder="Short description for product listing" /></Field>
      </div>
    </Modal>
  );
}