import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/dashboard/DashboardShell";
import { Card } from "@/components/dashboard/widgets";
import { Mail, MailOpen } from "lucide-react";

export const Route = createFileRoute("/admin/messages")({ component: () => {
  const [sel, setSel] = useState(0);
  const msgs = [
    { from: "Nneka Adamu", subj: "Bulk order inquiry", body: "Hi, I'd like to request a quote for 50 PCR kits for our research center.", t: "10 min ago", unread: true },
    { from: "Salim Ojo", subj: "Course refund", body: "I enrolled in the wrong course, could you process a refund?", t: "1 hr ago", unread: true },
    { from: "Grace Ekene", subj: "Partnership", body: "We'd love to discuss a partnership for our biotech faculty.", t: "yesterday", unread: true },
    { from: "Mark T.", subj: "Lab visit", body: "Is your lab open for tours next week?", t: "2 days ago", unread: false },
  ];
  return <div className="space-y-6">
    <PageHeader title="Messages" subtitle="Customer messages from contact forms and inquiries." />
    <Card className="overflow-hidden grid lg:grid-cols-3 min-h-[500px]">
      <div className="border-r border-border divide-y divide-border lg:max-h-[600px] overflow-y-auto">
        {msgs.map((m, i) => (
          <button key={i} onClick={() => setSel(i)} className={`w-full text-left p-4 hover:bg-muted/40 ${sel === i ? "bg-muted/60" : ""}`}>
            <div className="flex items-center gap-2"><span className={`h-2 w-2 rounded-full ${m.unread ? "bg-primary" : "bg-transparent"}`} /><div className="font-semibold text-sm flex-1">{m.from}</div><div className="text-xs text-muted-foreground">{m.t}</div></div>
            <div className="text-sm mt-1 truncate">{m.subj}</div>
            <div className="text-xs text-muted-foreground truncate mt-0.5">{m.body}</div>
          </button>
        ))}
      </div>
      <div className="lg:col-span-2 p-6">
        <div className="flex items-center gap-2 mb-2"><MailOpen className="h-4 w-4 text-primary" /><span className="text-xs uppercase font-semibold text-muted-foreground">Inbox</span></div>
        <h2 className="font-display text-xl font-bold">{msgs[sel].subj}</h2>
        <div className="text-sm text-muted-foreground mt-1">From <span className="text-foreground font-medium">{msgs[sel].from}</span> · {msgs[sel].t}</div>
        <p className="mt-4 text-sm leading-relaxed">{msgs[sel].body}</p>
        <textarea className="mt-6 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm" rows={4} placeholder="Reply..." />
        <button className="mt-3 h-10 px-4 rounded-xl gradient-brand text-brand-foreground text-sm font-semibold inline-flex items-center gap-2"><Mail className="h-4 w-4" /> Send reply</button>
      </div>
    </Card>
  </div>;
} });