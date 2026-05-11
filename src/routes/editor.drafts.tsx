import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/dashboard/DashboardShell";
import { Card, Toolbar, RowMenu, Modal, Field, ImageUpload, inputCls, textareaCls, PrimaryBtn, GhostBtn } from "@/components/dashboard/widgets";
import { FileText, Send } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/editor/drafts")({ component: Drafts });

interface Draft { id: string; title: string; type: "Course" | "Product" | "News" | "Page"; updated: string; cover?: string; body: string; }

const seed: Draft[] = [
  { id: "d1", title: "CRISPR Lab Workshop — module 4", type: "Course", updated: "1h ago", body: "" },
  { id: "d2", title: "New Pre-cast Gel listing", type: "Product", updated: "3h ago", body: "" },
  { id: "d3", title: "Q4 newsletter announcement", type: "News", updated: "yesterday", body: "" },
  { id: "d4", title: "Updated About page", type: "Page", updated: "2d ago", body: "" },
];

function Drafts() {
  const [items, setItems] = useState(seed);
  const [q, setQ] = useState("");
  const [editing, setEditing] = useState<Draft | null>(null);
  const [creating, setCreating] = useState(false);

  return (
    <div className="space-y-6">
      <PageHeader title="Drafts" subtitle="Continue editing or publish your in-progress content." />
      <Toolbar onSearch={setQ} addLabel="New draft" onAdd={() => setCreating(true)} />

      <Card className="overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-left text-muted-foreground text-xs uppercase">
            <tr><th className="px-4 py-3">Draft</th><th>Type</th><th>Updated</th><th></th></tr>
          </thead>
          <tbody className="divide-y divide-border">
            {items.filter((i) => i.title.toLowerCase().includes(q.toLowerCase())).map((d) => (
              <tr key={d.id} className="hover:bg-muted/40">
                <td className="px-4 py-3 font-medium flex items-center gap-3">
                  <span className="h-9 w-9 rounded-xl bg-brand/10 text-brand grid place-items-center"><FileText className="h-4 w-4" /></span>
                  {d.title}
                </td>
                <td><span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-muted text-foreground">{d.type}</span></td>
                <td className="text-muted-foreground">{d.updated}</td>
                <td className="pr-4"><RowMenu actions={[
                  { label: "Continue editing", onClick: () => setEditing(d) },
                  { label: "Publish", onClick: () => { setItems((p) => p.filter((x) => x.id !== d.id)); toast.success("Published"); } },
                  { label: "Delete", danger: true, onClick: () => { setItems((p) => p.filter((x) => x.id !== d.id)); toast.success("Deleted"); } },
                ]} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <DraftModal key={editing?.id ?? (creating ? "new" : "")} open={!!editing || creating} editing={editing} onClose={() => { setEditing(null); setCreating(false); }} onSave={(d: any) => {
        if (editing) setItems((p) => p.map((x) => x.id === editing.id ? { ...d, id: editing.id, updated: "just now" } : x));
        else setItems((p) => [{ ...d, id: `d${Date.now()}`, updated: "just now" }, ...p]);
        setEditing(null); setCreating(false);
        toast.success("Saved");
      }} onPublish={(_d: any) => {
        if (editing) setItems((p) => p.filter((x) => x.id !== editing.id));
        setEditing(null); setCreating(false);
        toast.success("Published — moved to live content");
      }} />
    </div>
  );
}

function DraftModal({ open, onClose, editing, onSave, onPublish }: any) {
  const [title, setTitle] = useState(editing?.title ?? "");
  const [type, setType] = useState<Draft["type"]>(editing?.type ?? "Page");
  const [body, setBody] = useState(editing?.body ?? "");
  const [cover, setCover] = useState<string | undefined>(editing?.cover);
  return (
    <Modal open={open} onClose={onClose} title={editing ? "Edit draft" : "New draft"}
      footer={<>
        <GhostBtn onClick={onClose}>Cancel</GhostBtn>
        <GhostBtn onClick={() => onSave({ title, type, body, cover })}>Save draft</GhostBtn>
        <PrimaryBtn onClick={() => onPublish({ title, type, body, cover })}><Send className="h-4 w-4" />Publish</PrimaryBtn>
      </>}>
      <div className="space-y-4">
        <ImageUpload label="Cover" value={cover} onChange={setCover} aspect="aspect-[16/9]" />
        <Field label="Title"><input className={inputCls} value={title} onChange={(e) => setTitle(e.target.value)} /></Field>
        <Field label="Type">
          <select className={inputCls} value={type} onChange={(e) => setType(e.target.value as any)}>
            <option>Page</option><option>Course</option><option>Product</option><option>News</option>
          </select>
        </Field>
        <Field label="Body"><textarea rows={6} className={textareaCls} value={body} onChange={(e) => setBody(e.target.value)} /></Field>
      </div>
    </Modal>
  );
}
