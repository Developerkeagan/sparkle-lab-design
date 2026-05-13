import { createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";
import { PageHeader } from "@/components/dashboard/DashboardShell";
import { Card, PrimaryBtn } from "@/components/dashboard/widgets";
import { useSiteContent } from "@/lib/site-content";
import { Upload, Trash2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/editor/gallery")({ component: GalleryAdmin });

function GalleryAdmin() {
  const { gallery, addGallery, deleteGallery } = useSiteContent();
  const ref = useRef<HTMLInputElement | null>(null);

  function upload(files: FileList | null) {
    if (!files) return;
    let count = 0;
    Array.from(files).forEach((f) => {
      if (!f.type.startsWith("image/")) return;
      if (f.size > 5 * 1024 * 1024) { toast.error(`${f.name} is over 5MB`); return; }
      const r = new FileReader();
      r.onload = () => {
        if (typeof r.result === "string") {
          addGallery({ id: `g${Date.now()}-${Math.random().toString(36).slice(2, 6)}`, url: r.result });
          count++;
        }
      };
      r.readAsDataURL(f);
    });
    setTimeout(() => count && toast.success(`Added ${count} image${count > 1 ? "s" : ""}`), 200);
  }

  return (
    <div className="space-y-6">
      <input ref={ref} type="file" accept="image/*" multiple className="hidden" onChange={(e) => { upload(e.target.files); e.currentTarget.value = ""; }} />
      <PageHeader title="Gallery" subtitle="Upload and manage photos shown on the public Gallery page."
        actions={<PrimaryBtn onClick={() => ref.current?.click()}><Upload className="h-4 w-4" />Upload images</PrimaryBtn>} />

      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => { e.preventDefault(); upload(e.dataTransfer.files); }}
        className="rounded-2xl border-2 border-dashed border-border bg-muted/30 hover:border-brand transition-colors p-10 text-center cursor-pointer"
        onClick={() => ref.current?.click()}
      >
        <div className="mx-auto h-12 w-12 rounded-full bg-brand/10 text-brand grid place-items-center mb-3"><Upload className="h-5 w-5" /></div>
        <div className="font-medium">Drop images here or click to browse</div>
        <div className="text-xs text-muted-foreground mt-1">PNG or JPG, up to 5MB each</div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {gallery.map((g) => (
          <Card key={g.id} className="overflow-hidden group relative">
            <div className="aspect-square bg-muted">
              <img src={g.url} alt="" className="w-full h-full object-cover" />
            </div>
            <button onClick={() => { deleteGallery(g.id); toast.success("Deleted"); }} className="absolute top-2 right-2 h-8 w-8 grid place-items-center rounded-full bg-background/90 text-destructive opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive hover:text-destructive-foreground" aria-label="Delete">
              <Trash2 className="h-4 w-4" />
            </button>
          </Card>
        ))}
        {gallery.length === 0 && <div className="col-span-full text-center text-muted-foreground py-10">No images yet.</div>}
      </div>
    </div>
  );
}
