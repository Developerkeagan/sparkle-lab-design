import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/dashboard/DashboardShell";
import { Card, PrimaryBtn, GhostBtn, Field, inputCls, textareaCls } from "@/components/dashboard/widgets";
import { GripVertical, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/layouts")({ component: AdminLayouts });

function AdminLayouts() {
  const [sections, setSections] = useState([
    { id: "s1", name: "Hero", visible: true },
    { id: "s2", name: "Marquee", visible: true },
    { id: "s3", name: "Features", visible: true },
    { id: "s4", name: "Stats", visible: true },
    { id: "s5", name: "Testimonials", visible: true },
    { id: "s6", name: "CTA Banner", visible: false },
  ]);
  return (
    <div className="space-y-6">
      <PageHeader title="Site Layouts" subtitle="Reorder, toggle and edit homepage sections." actions={<PrimaryBtn onClick={() => toast.success("Layout saved")}>Save changes</PrimaryBtn>} />
      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="p-6 lg:col-span-2">
          <h3 className="font-display font-bold mb-4">Homepage sections</h3>
          <div className="space-y-2">
            {sections.map((s, i) => (
              <div key={s.id} className="flex items-center gap-3 p-3 rounded-xl border border-border hover:bg-muted/40">
                <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                <div className="flex-1"><div className="font-medium text-sm">{s.name}</div><div className="text-xs text-muted-foreground">Position {i + 1}</div></div>
                <button onClick={() => setSections((p) => p.map((x) => x.id === s.id ? { ...x, visible: !x.visible } : x))} className="p-2 rounded-lg hover:bg-accent" aria-label="Toggle">
                  {s.visible ? <Eye className="h-4 w-4 text-emerald-600" /> : <EyeOff className="h-4 w-4 text-muted-foreground" />}
                </button>
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-6 space-y-4">
          <h3 className="font-display font-bold">Hero settings</h3>
          <Field label="Headline"><input className={inputCls} defaultValue="Innovative Biotechnology" /></Field>
          <Field label="Subheadline"><textarea rows={3} className={textareaCls} defaultValue="Pioneering molecular diagnostics across West Africa." /></Field>
          <Field label="CTA label"><input className={inputCls} defaultValue="Explore services" /></Field>
          <GhostBtn onClick={() => toast.success("Reset to default")}>Reset section</GhostBtn>
        </Card>
      </div>
    </div>
  );
}