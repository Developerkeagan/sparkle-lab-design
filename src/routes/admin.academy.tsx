import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useCallback } from "react";
import { PageHeader } from "@/components/dashboard/DashboardShell";
import { Card, Toolbar, RowMenu, Modal, Field, ImageUpload, inputCls, textareaCls, PrimaryBtn, GhostBtn } from "@/components/dashboard/widgets";
import { GraduationCap, Users, Loader2 } from "lucide-react";
import { toast } from "sonner";
import useFetch from "@/hooks/useFetch";

export const Route = createFileRoute("/admin/academy")({ component: AdminAcademy });

interface Course {
  id: string;
  title: string;
  students: number;
  weeks: number;
  level: string;
  price: number;
  status: string;
  description: string;
  coverImage?: string;
}

function AdminAcademy() {
  const [items, setItems] = useState<Course[]>([]);
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);

  // Form state
  const [title, setTitle] = useState("");
  const [level, setLevel] = useState("Beginner");
  const [weeks, setWeeks] = useState(4);
  const [price, setPrice] = useState(180);
  const [description, setDescription] = useState("");
  const [cover, setCover] = useState<any>(null);

  const { loading, fetchData } = useFetch();

  const loadCourses = useCallback(async () => {
    try {
      const result = await fetchData("/api/v1/academy");
      if (result) {
        setItems(result.map((c: any) => ({
          id: c._id,
          title: c.courseTitle,
          students: c.students || 0,
          weeks: c.weeks || 4,
          level: c.levelDescription,
          price: c.price,
          status: c.status || "Live",
          description: Array.isArray(c.outline) ? c.outline.join('\n') : "",
          coverImage: c.image
        })));
      }
    } catch (err) {}
  }, [fetchData]);

  useEffect(() => { loadCourses(); }, [loadCourses]);

  async function handleCreate() {
    if (!title.trim()) return toast.error("Course title required");
    if (!cover) return toast.error("Course cover image required");
    
    const formData = new FormData();
    formData.append("courseTitle", title);
    formData.append("levelDescription", level);
    formData.append("price", String(price));
    
    // Map syllabus text to the required Array of Strings
    const outlineArray = description.split('\n').map(s => s.trim()).filter(Boolean);
    formData.append("outline", JSON.stringify(outlineArray));

    if (typeof cover !== "string") formData.append("image", cover);
    else formData.append("image", cover);

    try {
      await fetchData("/api/v1/academy", { method: "POST", body: formData });
      toast.success("Course created");
      setOpen(false);
      loadCourses();
    } catch (err: any) {
      toast.error(err.message || "Failed to create course");
    }
  }

  async function handleDelete(id: string) {
    try {
      await fetchData(`/api/v1/academy/${id}`, { method: "DELETE" });
      toast.success("Course deleted");
      loadCourses();
    } catch (err) { toast.error("Delete failed"); }
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Academy" subtitle="Manage all courses, instructors and enrollments." />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat icon={GraduationCap} label="Total courses" value={items.length} />
        <Stat icon={Users} label="Active students" value={items.reduce((acc, c) => acc + c.students, 0).toLocaleString()} />
        <Stat icon={GraduationCap} label="Live courses" value={items.filter((i) => i.status === "Live").length} />
        <Stat icon={Users} label="Avg. completion" value="94%" />
      </div>

      <Toolbar onSearch={setQ} addLabel="New course" onAdd={() => setOpen(true)} />

      <Card className="relative overflow-visible">
        {loading && items.length === 0 && (
          <div className="absolute inset-0 bg-background/50 z-10 grid place-items-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
        )}
        <div className="overflow-x-auto pb-48">
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
                  <td className="font-semibold">₦{c.price.toLocaleString()}</td>
                  <td><span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${c.status === "Live" ? "bg-emerald-500/10 text-emerald-600" : "bg-muted text-muted-foreground"}`}>{c.status}</span></td>
                  <td className="pr-4"><RowMenu actions={[
                    { label: "Edit content", onClick: () => toast.success("Open editor") },
                    { label: "Manage students", onClick: () => toast.success("Roster opened") },
                    { label: "Delete", danger: true, onClick: () => handleDelete(c.id) },
                  ]} /></td>
                </tr>
              ))}
              {!loading && items.length === 0 && <tr><td colSpan={7} className="py-12 text-center text-muted-foreground">No courses found.</td></tr>}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal open={open} onClose={() => setOpen(false)} title="New course"
        footer={<><GhostBtn onClick={() => setOpen(false)}>Cancel</GhostBtn><PrimaryBtn disabled={loading} onClick={handleCreate}>{loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create"}</PrimaryBtn></>}>
        <div className="space-y-4">
          <ImageUpload label="Course cover" value={cover} onChange={setCover} aspect="aspect-[16/9]" />
          <Field label="Course title"><input className={inputCls} value={title} onChange={e => setTitle(e.target.value)} placeholder="E.g. Advanced Microbiology" /></Field>
          <div className="grid grid-cols-3 gap-3">
            <Field label="Level"><select className={inputCls} value={level} onChange={e => setLevel(e.target.value)}><option>Beginner</option><option>Intermediate</option><option>Advanced</option></select></Field>
            <Field label="Weeks"><input type="number" value={weeks} onChange={e => setWeeks(+e.target.value)} className={inputCls} /></Field>
            <Field label="Price (₦)"><input type="number" value={price} onChange={e => setPrice(+e.target.value)} className={inputCls} /></Field>
          </div>
          <Field label="Outline (One per line)"><textarea rows={4} className={textareaCls} value={description} onChange={e => setDescription(e.target.value)} placeholder="Introduction to diagnostics&#10;PCR design fundamentals&#10;..." /></Field>
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