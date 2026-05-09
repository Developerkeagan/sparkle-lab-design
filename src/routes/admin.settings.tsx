import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard/DashboardShell";
import { Card, Field, inputCls, textareaCls, PrimaryBtn } from "@/components/dashboard/widgets";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/settings")({ component: () => (
  <div className="space-y-6">
    <PageHeader title="Website Settings" subtitle="Global configuration for the public site." actions={<PrimaryBtn onClick={() => toast.success("Settings saved")}>Save</PrimaryBtn>} />
    <div className="grid lg:grid-cols-2 gap-6">
      <Card className="p-6 space-y-4">
        <h3 className="font-display font-bold">General</h3>
        <Field label="Site name"><input className={inputCls} defaultValue="Applied Biotech" /></Field>
        <Field label="Tagline"><input className={inputCls} defaultValue="Research · Training · Equipment" /></Field>
        <Field label="Support email"><input className={inputCls} defaultValue="hello@appliedbiotech.com" /></Field>
        <Field label="Phone"><input className={inputCls} defaultValue="+234 800 000 0000" /></Field>
      </Card>
      <Card className="p-6 space-y-4">
        <h3 className="font-display font-bold">SEO & Social</h3>
        <Field label="Meta description"><textarea rows={3} className={textareaCls} defaultValue="Pioneering molecular diagnostics, lab equipment supply, biotech training and consulting." /></Field>
        <Field label="Twitter handle"><input className={inputCls} defaultValue="@appliedbiotech" /></Field>
        <Field label="Instagram"><input className={inputCls} defaultValue="@appliedbiotech" /></Field>
      </Card>
      <Card className="p-6 space-y-4">
        <h3 className="font-display font-bold">Commerce</h3>
        <Field label="Currency"><select className={inputCls}><option>USD ($)</option><option>NGN (₦)</option><option>EUR (€)</option></select></Field>
        <Field label="Tax rate (%)"><input type="number" className={inputCls} defaultValue={7.5} /></Field>
        <Field label="Free shipping over"><input type="number" className={inputCls} defaultValue={500} /></Field>
      </Card>
      <Card className="p-6 space-y-4">
        <h3 className="font-display font-bold">Maintenance</h3>
        <label className="flex items-center justify-between"><span className="text-sm">Maintenance mode</span><input type="checkbox" /></label>
        <label className="flex items-center justify-between"><span className="text-sm">Allow new signups</span><input type="checkbox" defaultChecked /></label>
        <label className="flex items-center justify-between"><span className="text-sm">Show announcement bar</span><input type="checkbox" defaultChecked /></label>
      </Card>
    </div>
  </div>
) });