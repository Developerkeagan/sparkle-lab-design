import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { PageHeader } from "@/components/dashboard/DashboardShell";
import { Card, Field, inputCls, PrimaryBtn } from "@/components/dashboard/widgets";
import { useSiteContent } from "@/lib/site-content";
import { toast } from "sonner";

export const Route = createFileRoute("/editor/contact")({ component: ContactAdmin });

function ContactAdmin() {
  const { contact, updateContact } = useSiteContent();
  const [form, setForm] = useState(contact);
  useEffect(() => setForm(contact), [contact]);

  function save() { updateContact(form); toast.success("Contact info updated"); }
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => setForm((s) => ({ ...s, [k]: e.target.value }));

  return (
    <div className="space-y-6">
      <PageHeader title="Contact information" subtitle="Shown on the Contact page and in the site footer." actions={<PrimaryBtn onClick={save}>Save changes</PrimaryBtn>} />
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-6 space-y-4">
          <h3 className="font-display font-bold">Primary</h3>
          <Field label="Address"><input className={inputCls} value={form.address} onChange={set("address")} /></Field>
          <Field label="Phone"><input className={inputCls} value={form.phone} onChange={set("phone")} /></Field>
          <Field label="Email"><input className={inputCls} value={form.email} onChange={set("email")} /></Field>
          <Field label="Working hours"><input className={inputCls} value={form.hours} onChange={set("hours")} /></Field>
          <Field label="Map URL (optional)"><input className={inputCls} value={form.mapUrl ?? ""} onChange={set("mapUrl")} /></Field>
        </Card>
        <Card className="p-6 space-y-4">
          <h3 className="font-display font-bold">Social profiles</h3>
          <Field label="Facebook URL"><input className={inputCls} value={form.facebook} onChange={set("facebook")} /></Field>
          <Field label="Twitter / X URL"><input className={inputCls} value={form.twitter} onChange={set("twitter")} /></Field>
          <Field label="LinkedIn URL"><input className={inputCls} value={form.linkedin} onChange={set("linkedin")} /></Field>
          <Field label="Instagram URL"><input className={inputCls} value={form.instagram} onChange={set("instagram")} /></Field>
        </Card>
      </div>
    </div>
  );
}
