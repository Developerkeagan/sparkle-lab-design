import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/dashboard/DashboardShell";
import { Card, Toolbar, RowMenu } from "@/components/dashboard/widgets";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/users")({ component: () => {
  const [q, setQ] = useState("");
  const [users, setUsers] = useState([
    { id: "u1", name: "Dr. Ada Okafor", email: "admin@gmail.com", role: "Admin", status: "Active", joined: "Jan 2024" },
    { id: "u2", name: "Tunde Bello", email: "editor@gmail.com", role: "Editor", status: "Active", joined: "Mar 2024" },
    { id: "u3", name: "Grace Ekene", email: "grace@bio.org", role: "Editor", status: "Invited", joined: "Apr 2024" },
    { id: "u4", name: "Salim Ojo", email: "salim@uniben.edu", role: "Customer", status: "Active", joined: "Feb 2025" },
    { id: "u5", name: "Aisha Kano", email: "aisha@bio.org", role: "Customer", status: "Suspended", joined: "Dec 2024" },
  ]);
  return <div className="space-y-6">
    <PageHeader title="Users & Roles" subtitle="Manage team members and customer accounts." />
    <Toolbar onSearch={setQ} addLabel="Invite user" onAdd={() => toast.success("Invite sent")} />
    <Card className="overflow-hidden">
      <div className="overflow-x-auto"><table className="w-full text-sm">
        <thead className="bg-muted/50 text-left text-muted-foreground text-xs uppercase"><tr><th className="px-4 py-3">User</th><th>Role</th><th>Status</th><th>Joined</th><th></th></tr></thead>
        <tbody className="divide-y divide-border">{users.filter((u) => (u.name + u.email).toLowerCase().includes(q.toLowerCase())).map((u) => (
          <tr key={u.id} className="hover:bg-muted/40">
            <td className="px-4 py-3 flex items-center gap-3">
              <span className="h-9 w-9 rounded-full gradient-brand grid place-items-center text-brand-foreground text-xs font-bold">{u.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}</span>
              <div><div className="font-medium">{u.name}</div><div className="text-xs text-muted-foreground">{u.email}</div></div>
            </td>
            <td><span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary">{u.role}</span></td>
            <td><span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${u.status === "Active" ? "bg-emerald-500/10 text-emerald-600" : u.status === "Invited" ? "bg-amber-500/10 text-amber-600" : "bg-red-500/10 text-red-500"}`}>{u.status}</span></td>
            <td className="text-muted-foreground">{u.joined}</td>
            <td className="pr-4"><RowMenu actions={[{ label: "Edit role", onClick: () => toast.success("Role updated") }, { label: "Reset password", onClick: () => toast.success("Reset link sent") }, { label: "Suspend", danger: true, onClick: () => setUsers((p) => p.map((x) => x.id === u.id ? { ...x, status: "Suspended" } : x)) }]} /></td>
          </tr>
        ))}</tbody>
      </table></div>
    </Card>
  </div>;
} });