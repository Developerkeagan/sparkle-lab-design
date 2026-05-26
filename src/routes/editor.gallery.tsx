import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState, useEffect, useCallback } from "react";
import { PageHeader } from "@/components/dashboard/DashboardShell";
import { Card, PrimaryBtn } from "@/components/dashboard/widgets";
import { Upload, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import useFetch from "@/hooks/useFetch";

export const Route = createFileRoute("/editor/gallery")({ component: GalleryAdmin });

function GalleryAdmin() {
  const [items, setItems] = useState<any[]>([]);
  const { loading, fetchData } = useFetch();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadGallery = useCallback(async () => {
    try {
      const res = await fetchData("/api/v1/gallery");
      if (res) setItems(res);
    } catch (err) {}
  }, [fetchData]);

  useEffect(() => { loadGallery(); }, [loadGallery]);

  function upload(files: FileList | null) {
    if (!files) return;
    const uploads = Array.from(files).map(async (f) => {
      if (!f.type.startsWith("image/")) return;
      if (f.size > 5 * 1024 * 1024) { toast.error(`${f.name} is over 5MB`); return; }
      
      const formData = new FormData();
      formData.append("file", f);
      return fetchData("/api/v1/gallery/upload", { method: "POST", body: formData });
    });

    Promise.all(uploads).then(() => {
      toast.success("Upload successful");
      loadGallery();
    });
  }

  async function handleDelete(id: string) {
    try {
      await fetchData(`/api/v1/gallery/${id}`, { method: "DELETE" });
      toast.success("Deleted");
      loadGallery();
    } catch (err) {}
  }

  return (
    <div className="space-y-6">
      <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => { upload(e.target.files); e.currentTarget.value = ""; }} />
      <PageHeader title="Gallery" subtitle="Upload and manage photos shown on the public Gallery page."
        actions={<PrimaryBtn onClick={() => fileInputRef.current?.click()}><Upload className="h-4 w-4" />Upload images</PrimaryBtn>} />

      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => { e.preventDefault(); upload(e.dataTransfer.files); }}
        className="rounded-2xl border-2 border-dashed border-border bg-muted/30 hover:border-brand transition-colors p-10 text-center cursor-pointer"
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="mx-auto h-12 w-12 rounded-full bg-brand/10 text-brand grid place-items-center mb-3"><Upload className="h-5 w-5" /></div>
        <div className="font-medium">Drop images here or click to browse</div>
        <div className="text-xs text-muted-foreground mt-1">PNG or JPG, up to 5MB each</div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {loading && items.length === 0 && <div className="col-span-full py-20 flex justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>}
        {items.map((g) => (
          <Card key={g._id} className="overflow-hidden group relative">
            <div className="aspect-square bg-muted">
              <img src={g.url} alt="" className="w-full h-full object-cover" />
            </div>
            <button onClick={() => handleDelete(g._id)} className="absolute top-2 right-2 h-8 w-8 grid place-items-center rounded-full bg-background/90 text-destructive opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive hover:text-white" aria-label="Delete">
              <Trash2 className="h-4 w-4" />
            </button>
          </Card>
        ))}
        {!loading && items.length === 0 && <div className="col-span-full text-center text-muted-foreground py-10">No images yet.</div>}
      </div>
    </div>
  );
}
