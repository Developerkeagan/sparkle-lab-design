import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/dashboard/DashboardShell";
import { Card, Toolbar, RowMenu, Modal, Field, ImageUpload, inputCls, textareaCls, PrimaryBtn, GhostBtn } from "@/components/dashboard/widgets";
import { GraduationCap, Users } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/academy")({ component: AdminAcademy });

const seed = [
  { id: "a1", title: "Molecular Diagnostics Fundamentals", students: 1240, weeks: 6, level: "Beginner", price: 180, status: "Live" },
  { id: "a2", title: "PCR & Real-Time qPCR Mastery", students: 860, weeks: 4, level: "Intermediate", price: 220, status: "Live" },
  { id: "a3", title: "DNA Extraction & Purification", students: 1502, weeks: 3, level: "Beginner", price: 140, status: "Live" },
  { id: "a4", title: "Biosafety & Lab Management", students: 540, weeks: 5, level: "Advanced", price: 260, status: "Live" },
  { id: "a5", title: "CRISPR Lab Workshop", students: 280, weeks: 2, level: "Advanced", price: 480, status: "Draft" },
];

function AdminAcademy() {
  const [items, setItems] = useState(seed);
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [cover, setCover] = useState<string | undefined>(undefined);

  return (
    <div className="space-y-6">
      <PageHeader title="Academy" subtitle="Manage all courses, instructors and enrollments." />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat icon={GraduationCap} label="Total courses" value={items.length} />
        <Stat icon={Users} label="Active students" value="4,422" />
        <Stat icon={GraduationCap} label="Live courses" value={items.filter((i) => i.status === "Live").length} />
        <Stat icon={Users} label="Avg. completion" value="94%" />
      </div>

      <Toolbar onSearch={setQ} addLabel="New course" onAdd={() => setOpen(true)} />

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-left text-muted-foreground text-xs uppercase">
              <tr><th className="px-4 py-3">Course</th><th>Level</th><th>Duration</th><th>Students</th><th>Price</th><th>Status</th><th></th></tr>
            </thead>
            <tbody className="divide-y divide-border">
              {items.filter((i) => i.title.toLowerCase().includes(q.toLowerCase())).map((c) => (
                <tr key={c.id} className="hover:bg-muted/40">
                  <td className="px-4 py-3 font-medium">{c.title}</td>
                  <td>{c.level}</td>
                  <td>{c.weeks} wks</td>
                  <td>{c.students.toLocaleString()}</td>
                  <td className="font-semibold">${c.price}</td>
                  <td><span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${c.status === "Live" ? "bg-emerald-500/10 text-emerald-600" : "bg-muted text-muted-foreground"}`}>{c.status}</span></td>
                  <td className="pr-4"><RowMenu actions={[
                    { label: "Edit content", onClick: () => toast.success("Open editor") },
                    { label: "Manage students", onClick: () => toast.success("Roster opened") },
                    { label: "Delete", danger: true, onClick: () => { setItems((p) => p.filter((x) => x.id !== c.id)); toast.success("Deleted"); } },
                  ]} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal open={open} onClose={() => setOpen(false)} title="New course"
        footer={<><GhostBtn onClick={() => setOpen(false)}>Cancel</GhostBtn><PrimaryBtn onClick={() => { setOpen(false); toast.success("Course created"); }}>Create</PrimaryBtn></>}>
        <div className="space-y-4">
          <ImageUpload label="Course cover" value={cover} onChange={setCover} aspect="aspect-[16/9]" />
          <Field label="Course title"><input className={inputCls} placeholder="E.g. Advanced Microbiology" /></Field>
          <div className="grid grid-cols-3 gap-3">
            <Field label="Level"><select className={inputCls}><option>Beginner</option><option>Intermediate</option><option>Advanced</option></select></Field>
            <Field label="Weeks"><input type="number" defaultValue={4} className={inputCls} /></Field>
            <Field label="Price ($)"><input type="number" defaultValue={180} className={inputCls} /></Field>
          </div>
          <Field label="Description"><textarea rows={3} className={textareaCls} placeholder="What will students learn?" /></Field>
        </div>
      </Modal>
    </div>
  );
}

function Stat({ icon: Icon, label, value }: any) {
  return <Card className="p-4 flex items-center gap-3">
    <span className="h-10 w-10 rounded-xl bg-primary/10 text-primary grid place-items-center"><Icon className="h-5 w-5" /></span>
    <div><div className="text-xs text-muted-foreground">{label}</div><div className="font-display font-bold text-lg">{value}</div></div>
  </Card>;
}