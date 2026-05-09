import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/dashboard/DashboardShell";
import { Card, Field, inputCls, textareaCls, PrimaryBtn } from "@/components/dashboard/widgets";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";

export const Route = createFileRoute("/editor/profile")({ component: () => {
  const { user, updateProfile } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [bio, setBio] = useState(user?.bio || "");
  return <div className="space-y-6">
    <PageHeader title="My Profile" subtitle="Update your editor profile and credentials." />
    <div className="grid lg:grid-cols-3 gap-6">
      <Card className="p-6 text-center">
        <div className="h-28 w-28 rounded-full gradient-brand grid place-items-center text-brand-foreground text-3xl font-bold mx-auto">{user?.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}</div>
        <div className="mt-4 font-display font-bold text-lg">{user?.name}</div>
        <div className="text-sm text-muted-foreground">{user?.email}</div>
        <div className="mt-2 inline-flex text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-semibold uppercase">{user?.role}</div>
      </Card>
      <Card className="lg:col-span-2 p-6 space-y-4">
        <h3 className="font-display font-bold">Personal info</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Full name"><input className={inputCls} value={name} onChange={(e) => setName(e.target.value)} /></Field>
          <Field label="Email"><input className={inputCls} value={email} onChange={(e) => setEmail(e.target.value)} /></Field>
        </div>
        <Field label="Bio"><textarea rows={3} className={textareaCls} value={bio} onChange={(e) => setBio(e.target.value)} /></Field>
        <PrimaryBtn onClick={() => { updateProfile({ name, email, bio }); toast.success("Profile updated"); }}>Save changes</PrimaryBtn>
      </Card>
      <Card className="lg:col-span-3 p-6 space-y-4">
        <h3 className="font-display font-bold">Change password</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          <Field label="Current"><input type="password" className={inputCls} /></Field>
          <Field label="New"><input type="password" className={inputCls} /></Field>
          <Field label="Confirm"><input type="password" className={inputCls} /></Field>
        </div>
        <PrimaryBtn onClick={() => toast.success("Password updated")}>Update password</PrimaryBtn>
      </Card>
    </div>
  </div>;
} });