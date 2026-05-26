import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useCallback, useRef } from "react";
import { PageHeader } from "@/components/dashboard/DashboardShell";
import { Card, PrimaryBtn } from "@/components/dashboard/widgets";
import { Upload, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import useFetch from "@/hooks/useFetch";

export const Route = createFileRoute("/admin/gallery")({ component: GalleryAdmin });

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

  async function handleUpload(files: FileList | null) {
    if (!files) return;
    
    const uploads = Array.from(files).map(async (file) => {
      if (!file.type.startsWith("image/")) return;
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`${file.name} is over 5MB`);
        return;
      }
      
      const formData = new FormData();
      formData.append("file", file);
      
      return fetchData("/api/v1/gallery/upload", {
        method: "POST",
        body: formData
      });
    });

    try {
      await Promise.all(uploads);
      toast.success("Gallery updated");
      loadGallery();
    } catch (err) {}
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
      <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => { handleUpload(e.target.files); e.target.value = ""; }} />
      <PageHeader title="Gallery" subtitle="Manage laboratory photos and event imagery." actions={<PrimaryBtn onClick={() => fileInputRef.current?.click()}><Upload className="h-4 w-4" /> Upload images</PrimaryBtn>} />

      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => { e.preventDefault(); handleUpload(e.dataTransfer.files); }}
        className="rounded-2xl border-2 border-dashed border-border bg-muted/30 hover:border-brand transition-colors p-10 text-center cursor-pointer"
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="mx-auto h-12 w-12 rounded-full bg-brand/10 text-brand grid place-items-center mb-3"><Upload className="h-5 w-5" /></div>
        <div className="font-medium text-sm">Drop images here or click to browse</div>
        <div className="text-[10px] text-muted-foreground mt-1 uppercase tracking-widest font-bold">PNG or JPG · Max 5MB</div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 relative">
        {loading && items.length === 0 && <div className="col-span-full py-20 flex justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>}
        {items.map((g) => (
          <Card key={g._id} className="overflow-hidden group relative">
            <div className="aspect-square bg-muted"><img src={g.url} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" /></div>
            <button onClick={() => handleDelete(g._id)} className="absolute top-2 right-2 h-8 w-8 grid place-items-center rounded-full bg-background/90 text-destructive opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive hover:text-white"><Trash2 className="h-4 w-4" /></button>
          </Card>
        ))}
        {!loading && items.length === 0 && <div className="col-span-full text-center py-20 text-muted-foreground text-sm">No images in gallery yet.</div>}
      </div>
    </div>
  );
}
