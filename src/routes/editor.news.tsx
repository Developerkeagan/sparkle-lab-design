import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/dashboard/DashboardShell";
import { Card, Toolbar, RowMenu, Modal, Field, ImageUpload, inputCls, textareaCls, PrimaryBtn, GhostBtn } from "@/components/dashboard/widgets";
import { useSiteContent, slugify, type NewsPost } from "@/lib/site-content";
import { toast } from "sonner";

export const Route = createFileRoute("/editor/news")({ component: NewsAdmin });

const empty: NewsPost = { id: "", slug: "", tag: "Event", date: "", title: "", excerpt: "", body: "", cover: undefined };

function NewsAdmin() {
  const { news, saveNews, deleteNews } = useSiteContent();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<NewsPost>(empty);

  function startNew() { setEditing({ ...empty, date: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }) }); setOpen(true); }
  function startEdit(n: NewsPost) { setEditing(n); setOpen(true); }
  function submit() {
    if (!editing.title.trim()) return toast.error("Title is required");
    const id = editing.id || `n${Date.now()}`;
    const slug = editing.slug || slugify(editing.title);
    saveNews({ ...editing, id, slug });
    setOpen(false);
    toast.success("News article saved");
  }

  const filtered = news.filter((n) => (n.title + n.tag + n.excerpt).toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="space-y-6">
      <PageHeader title="News & announcements" subtitle="Write, edit and publish posts to the public News page." />
      <Toolbar onSearch={setQ} addLabel="New article" onAdd={startNew} />
      <Card className="relative">
        <div className="overflow-x-auto pb-48"><table className="w-full text-sm">
        <thead className="bg-muted/50 text-left text-muted-foreground text-xs uppercase">
          <tr><th className="px-4 py-3">Article</th><th>Tag</th><th>Date</th><th></th></tr>
        </thead>
        <tbody className="divide-y divide-border">
          {filtered.map((n) => (
            <tr key={n.id} className="hover:bg-muted/40">
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  {n.cover && <img src={n.cover} alt="" className="h-10 w-14 rounded-md object-cover" />}
                  <div className="min-w-0">
                    <div className="font-medium truncate">{n.title}</div>
                    <div className="text-xs text-muted-foreground truncate">/{n.slug}</div>
                  </div>
                </div>
              </td>
              <td><span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-brand/10 text-brand">{n.tag}</span></td>
              <td className="text-muted-foreground">{n.date}</td>
              <td className="pr-4"><RowMenu actions={[{ label: "Edit", onClick: () => startEdit(n) }, { label: "Delete", danger: true, onClick: () => { deleteNews(n.id); toast.success("Deleted"); } }]} /></td>
            </tr>
          ))}
          {filtered.length === 0 && <tr><td colSpan={4} className="px-4 py-12 text-center text-muted-foreground">No news posts yet.</td></tr>}
        </tbody>
      </table></div>
      </Card>

      <Modal open={open} onClose={() => setOpen(false)} title={editing.id ? "Edit article" : "New article"}
        footer={<><GhostBtn onClick={() => setOpen(false)}>Cancel</GhostBtn><PrimaryBtn onClick={submit}>Save</PrimaryBtn></>}>
        <div className="space-y-4">
          <ImageUpload label="Cover image" value={editing.cover} onChange={(c) => setEditing((e) => ({ ...e, cover: c }))} aspect="aspect-[16/9]" />
          <Field label="Title"><input className={inputCls} value={editing.title} onChange={(e) => setEditing((p) => ({ ...p, title: e.target.value, slug: p.slug || slugify(e.target.value) }))} /></Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Tag"><input className={inputCls} value={editing.tag} onChange={(e) => setEditing((p) => ({ ...p, tag: e.target.value }))} /></Field>
            <Field label="Date"><input className={inputCls} value={editing.date} onChange={(e) => setEditing((p) => ({ ...p, date: e.target.value }))} placeholder="May 12, 2026" /></Field>
          </div>
          <Field label="Excerpt"><textarea rows={2} className={textareaCls} value={editing.excerpt} onChange={(e) => setEditing((p) => ({ ...p, excerpt: e.target.value }))} /></Field>
          <Field label="Body"><textarea rows={6} className={textareaCls} value={editing.body} onChange={(e) => setEditing((p) => ({ ...p, body: e.target.value }))} /></Field>
        </div>
      </Modal>
    </div>
  );
}
