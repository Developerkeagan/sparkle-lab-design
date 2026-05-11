import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/dashboard/DashboardShell";
import { Card, Modal, Field, Toolbar, RowMenu, ImageUpload, inputCls, textareaCls, PrimaryBtn, GhostBtn } from "@/components/dashboard/widgets";
import { Globe, Edit3 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/editor/layouts")({ component: EditorLayouts });

interface Layout { id: string; page: string; title: string; subtitle: string; cover?: string; updated: string; }

const seed: Layout[] = [
  { id: "l1", page: "Home", title: "Advancing African Biotech", subtitle: "Research, training and equipment for next-gen labs.", updated: "2d ago" },
  { id: "l2", page: "About", title: "Built for discovery", subtitle: "Our story and mission.", updated: "1w ago" },
  { id: "l3", page: "Academy", title: "Learn at Applied Biotech", subtitle: "Hands-on courses for working scientists.", updated: "3d ago" },
  { id: "l4", page: "Shop", title: "Lab essentials, delivered", subtitle: "Reagents, consumables and equipment.", updated: "5d ago" },
];

function EditorLayouts() {
  const [items, setItems] = useState<Layout[]>(seed);
  const [q, setQ] = useState("");
  const [editing, setEditing] = useState<Layout | null>(null);

  return (
    <div className="space-y-6">
      <PageHeader title="Page layouts" subtitle="Edit hero copy, banners and section content per page." />
      <Toolbar onSearch={setQ} />

      <div className="grid sm:grid-cols-2 gap-4">
        {items.filter((i) => i.page.toLowerCase().includes(q.toLowerCase())).map((l) => (
          <Card key={l.id} className="p-5 flex gap-4">
            <div className="h-12 w-12 rounded-xl gradient-brand text-brand-foreground grid place-items-center shrink-0"><Globe className="h-5 w-5" /></div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <div className="font-semibold">{l.page} page</div>
                  <div className="text-xs text-muted-foreground">Updated {l.updated}</div>
                </div>
                <RowMenu actions={[
                  { label: "Edit", onClick: () => setEditing(l) },
                  { label: "Preview", onClick: () => toast.success("Preview opened") },
                ]} />
              </div>
              <div className="mt-3 text-sm font-medium line-clamp-1">{l.title}</div>
              <div className="text-xs text-muted-foreground line-clamp-2">{l.subtitle}</div>
              <button onClick={() => setEditing(l)} className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-brand hover:underline"><Edit3 className="h-3.5 w-3.5" /> Edit content</button>
            </div>
          </Card>
        ))}
      </div>

      <LayoutModal key={editing?.id} open={!!editing} onClose={() => setEditing(null)} editing={editing} onSave={(form) => { setItems((p) => p.map((x) => x.id === form.id ? { ...form, updated: "just now" } : x)); setEditing(null); toast.success("Layout updated"); }} />
    </div>
  );
}

function LayoutModal({ open, onClose, editing, onSave }: any) {
  const [title, setTitle] = useState(editing?.title ?? "");
  const [subtitle, setSubtitle] = useState(editing?.subtitle ?? "");
  const [cover, setCover] = useState<string | undefined>(editing?.cover);
  if (!editing) return null;
  return (
    <Modal open={open} onClose={onClose} title={`Edit ${editing.page} layout`}
      footer={<><GhostBtn onClick={onClose}>Cancel</GhostBtn><PrimaryBtn onClick={() => onSave({ ...editing, title, subtitle, cover })}>Save</PrimaryBtn></>}>
      <div className="space-y-4">
        <ImageUpload label="Hero / cover image" value={cover} onChange={setCover} aspect="aspect-[16/9]" />
        <Field label="Hero title"><input className={inputCls} value={title} onChange={(e) => setTitle(e.target.value)} /></Field>
        <Field label="Hero subtitle"><textarea rows={3} className={textareaCls} value={subtitle} onChange={(e) => setSubtitle(e.target.value)} /></Field>
      </div>
    </Modal>
  );
}
