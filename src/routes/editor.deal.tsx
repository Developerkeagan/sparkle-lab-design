import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { PageHeader } from "@/components/dashboard/DashboardShell";
import { Card, Field, inputCls, textareaCls, PrimaryBtn } from "@/components/dashboard/widgets";
import { useSiteContent } from "@/lib/site-content";
import { PRODUCTS, fmt, getProduct } from "@/lib/products";
import { toast } from "sonner";

export const Route = createFileRoute("/editor/deal")({ component: DealAdmin });

function DealAdmin() {
  const { deal, updateDeal } = useSiteContent();
  const [form, setForm] = useState(deal);
  useEffect(() => setForm(deal), [deal]);

  function save() {
    if (!getProduct(form.productId)) return toast.error("Pick a valid product");
    updateDeal({ ...form, price: Number(form.price), oldPrice: Number(form.oldPrice) });
    toast.success("Deal of the week updated");
  }

  const product = getProduct(form.productId);

  return (
    <div className="space-y-6">
      <PageHeader title="Deal of the week" subtitle="Featured deal shown on the Shop home page." actions={<PrimaryBtn onClick={save}>Save</PrimaryBtn>} />
      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="p-6 space-y-4 lg:col-span-2">
          <Field label="Product">
            <select className={inputCls} value={form.productId} onChange={(e) => setForm((s) => ({ ...s, productId: e.target.value }))}>
              {PRODUCTS.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </Field>
          <Field label="Eyebrow"><input className={inputCls} value={form.eyebrow} onChange={(e) => setForm((s) => ({ ...s, eyebrow: e.target.value }))} /></Field>
          <Field label="Headline"><input className={inputCls} value={form.headline} onChange={(e) => setForm((s) => ({ ...s, headline: e.target.value }))} /></Field>
          <Field label="Blurb"><textarea rows={3} className={textareaCls} value={form.blurb} onChange={(e) => setForm((s) => ({ ...s, blurb: e.target.value }))} /></Field>
          <div className="grid grid-cols-3 gap-3">
            <Field label="Sale price"><input type="number" className={inputCls} value={form.price} onChange={(e) => setForm((s) => ({ ...s, price: Number(e.target.value) }))} /></Field>
            <Field label="Old price"><input type="number" className={inputCls} value={form.oldPrice} onChange={(e) => setForm((s) => ({ ...s, oldPrice: Number(e.target.value) }))} /></Field>
            <Field label="Discount label"><input className={inputCls} value={form.discountLabel} onChange={(e) => setForm((s) => ({ ...s, discountLabel: e.target.value }))} /></Field>
          </div>
        </Card>
        <Card className="p-6">
          <h3 className="font-display font-bold mb-3">Preview</h3>
          {product && (
            <div className="rounded-2xl bg-foreground text-background p-6 relative overflow-hidden">
              <div className="text-xs uppercase tracking-[0.2em] text-accent-cyan font-bold">{form.eyebrow}</div>
              <h4 className="mt-2 font-display text-xl font-extrabold leading-tight">{form.headline}</h4>
              <p className="mt-2 text-background/70 text-sm">{form.blurb}</p>
              <div className="mt-4 flex items-center gap-3">
                <div className="font-display text-xl font-bold text-accent-cyan">{fmt(form.price)}</div>
                <div className="text-background/50 line-through text-sm">{fmt(form.oldPrice)}</div>
                <span className="px-2 py-0.5 rounded-full bg-accent-cyan text-foreground text-xs font-bold">{form.discountLabel}</span>
              </div>
              <img src={product.img} alt="" className="mt-4 rounded-xl w-full aspect-video object-cover" />
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
