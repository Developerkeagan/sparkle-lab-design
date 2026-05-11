import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/dashboard/DashboardShell";
import { Card, Toolbar, RowMenu, Modal, Field, ImageUpload, inputCls, textareaCls, PrimaryBtn, GhostBtn } from "@/components/dashboard/widgets";
import { toast } from "sonner";

export const Route = createFileRoute("/editor/academy")({ component: () => {
  const [items, setItems] = useState([
    { id: "a1", title: "Molecular Diagnostics Fundamentals", level: "Beginner", status: "Live", updated: "2d ago" },
    { id: "a2", title: "PCR & Real-Time qPCR Mastery", level: "Intermediate", status: "Live", updated: "5d ago" },
    { id: "a3", title: "DNA Extraction & Purification", level: "Beginner", status: "Live", updated: "1w ago" },
    { id: "a4", title: "CRISPR Lab Workshop", level: "Advanced", status: "Draft", updated: "today" },
  ]);
  const [q, setQ] = useState(""); const [open, setOpen] = useState(false);
  const [cover, setCover] = useState<string | undefined>(undefined);
  return <div className="space-y-6">
    <PageHeader title="Academy content" subtitle="Edit lessons, modules and course materials." />
    <Toolbar onSearch={setQ} addLabel="New course" onAdd={() => setOpen(true)} />
    <Card className="overflow-hidden"><div className="overflow-x-auto"><table className="w-full text-sm">
      <thead className="bg-muted/50 text-left text-muted-foreground text-xs uppercase"><tr><th className="px-4 py-3">Course</th><th>Level</th><th>Status</th><th>Updated</th><th></th></tr></thead>
      <tbody className="divide-y divide-border">{items.filter((i) => i.title.toLowerCase().includes(q.toLowerCase())).map((c) => (
        <tr key={c.id} className="hover:bg-muted/40">
          <td className="px-4 py-3 font-medium">{c.title}</td><td>{c.level}</td>
          <td><span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${c.status === "Live" ? "bg-emerald-500/10 text-emerald-600" : "bg-muted text-muted-foreground"}`}>{c.status}</span></td>
          <td className="text-muted-foreground">{c.updated}</td>
          <td className="pr-4"><RowMenu actions={[{ label: "Edit lessons", onClick: () => toast.success("Open editor") }, { label: "Preview", onClick: () => toast.success("Preview") }, { label: "Delete", danger: true, onClick: () => setItems((p) => p.filter((x) => x.id !== c.id)) }]} /></td>
        </tr>
      ))}</tbody>
    </table></div></Card>
    <Modal open={open} onClose={() => setOpen(false)} title="New course" footer={<><GhostBtn onClick={() => setOpen(false)}>Cancel</GhostBtn><PrimaryBtn onClick={() => { setOpen(false); toast.success("Created"); }}>Create</PrimaryBtn></>}>
      <div className="space-y-4"><ImageUpload label="Cover" value={cover} onChange={setCover} aspect="aspect-[16/9]" /><Field label="Title"><input className={inputCls} /></Field><Field label="Outline"><textarea rows={4} className={textareaCls} /></Field></div>
    </Modal>
  </div>;
} });