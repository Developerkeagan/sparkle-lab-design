import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { PageHeader } from "@/components/dashboard/DashboardShell";
import { Card, PrimaryBtn } from "@/components/dashboard/widgets";
import { Upload, Trash2, Image as ImageIcon, Search, Copy } from "lucide-react";
import { toast } from "sonner";
import pAgarose from "@/assets/prod-agarose.jpg";
import pFalcon from "@/assets/prod-falcon.jpg";
import pKit from "@/assets/prod-kit.jpg";
import pPip from "@/assets/prod-pipette.jpg";
import pGel from "@/assets/prod-gel.jpg";
import pMicro from "@/assets/prod-microfuge.jpg";
import pLab from "@/assets/prod-labcoat.jpg";
import pPbs from "@/assets/prod-pbs.jpg";

export const Route = createFileRoute("/editor/media")({ component: Media });

interface Asset { id: string; name: string; url: string; size: string; }

const seed: Asset[] = [
  { id: "m1", name: "agarose-powder.jpg", url: pAgarose, size: "248 KB" },
  { id: "m2", name: "falcon-tubes.jpg", url: pFalcon, size: "190 KB" },
  { id: "m3", name: "extraction-kit.jpg", url: pKit, size: "312 KB" },
  { id: "m4", name: "pipette.jpg", url: pPip, size: "201 KB" },
  { id: "m5", name: "gel.jpg", url: pGel, size: "267 KB" },
  { id: "m6", name: "microfuge.jpg", url: pMicro, size: "176 KB" },
  { id: "m7", name: "lab-coat.jpg", url: pLab, size: "214 KB" },
  { id: "m8", name: "pbs.jpg", url: pPbs, size: "188 KB" },
];

function Media() {
  const [items, setItems] = useState<Asset[]>(seed);
  const [q, setQ] = useState("");
  const ref = useRef<HTMLInputElement | null>(null);

  function upload(files: FileList | null) {
    if (!files) return;
    Array.from(files).forEach((f) => {
      if (!f.type.startsWith("image/")) return;
      const r = new FileReader();
      r.onload = () => {
        if (typeof r.result === "string") {
          setItems((p) => [{ id: `m${Date.now()}-${Math.random()}`, name: f.name, url: r.result as string, size: `${Math.round(f.size / 1024)} KB` }, ...p]);
        }
      };
      r.readAsDataURL(f);
    });
    toast.success("Upload started");
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Media library" subtitle="Reusable images and assets used across the site.">
        <input ref={ref} type="file" accept="image/*" multiple className="hidden" onChange={(e) => { upload(e.target.files); e.currentTarget.value = ""; }} />
        <PrimaryBtn onClick={() => ref.current?.click()}><Upload className="h-4 w-4" />Upload</PrimaryBtn>
      </PageHeader>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input onChange={(e) => setQ(e.target.value)} placeholder="Search assets..." className="w-full h-10 pl-9 pr-3 rounded-xl bg-card border border-border text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {items.filter((i) => i.name.toLowerCase().includes(q.toLowerCase())).map((a) => (
          <Card key={a.id} className="overflow-hidden group">
            <div className="aspect-square bg-muted relative">
              <img src={a.url} alt={a.name} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors grid place-items-center">
                <div className="opacity-0 group-hover:opacity-100 flex gap-1 transition-opacity">
                  <button onClick={() => { navigator.clipboard?.writeText(a.url); toast.success("URL copied"); }} className="h-9 w-9 grid place-items-center rounded-full bg-white/95 text-foreground hover:bg-brand hover:text-brand-foreground"><Copy className="h-4 w-4" /></button>
                  <button onClick={() => { setItems((p) => p.filter((x) => x.id !== a.id)); toast.success("Deleted"); }} className="h-9 w-9 grid place-items-center rounded-full bg-white/95 text-destructive hover:bg-destructive hover:text-destructive-foreground"><Trash2 className="h-4 w-4" /></button>
                </div>
              </div>
            </div>
            <div className="p-3">
              <div className="text-xs font-medium truncate flex items-center gap-1.5"><ImageIcon className="h-3 w-3 text-muted-foreground shrink-0" />{a.name}</div>
              <div className="text-[10px] text-muted-foreground mt-0.5">{a.size}</div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
