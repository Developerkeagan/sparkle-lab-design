import { createFileRoute, Outlet, Navigate } from "@tanstack/react-router";
import { DashboardShell, type NavGroup } from "@/components/dashboard/DashboardShell";
import { useAuth } from "@/lib/auth";
import { LayoutDashboard, GraduationCap, ShoppingBag, Layers, User, Image, FileText, Globe, Newspaper, Phone, Tag } from "lucide-react";

export const Route = createFileRoute("/editor")({
  component: EditorLayout,
  head: () => ({ meta: [{ title: "Editor Dashboard — Applied Biotech" }] }),
});

const groups: NavGroup[] = [
  { label: "Workspace", items: [{ label: "Overview", to: "/editor", icon: LayoutDashboard }] },
  { label: "Content", items: [
    { label: "Academy", to: "/editor/academy", icon: GraduationCap },
    { label: "Shop Items", to: "/editor/shop", icon: ShoppingBag },
    { label: "Collections", to: "/editor/collections", icon: Layers },
    { label: "Deal of the Week", to: "/editor/deal", icon: Tag },
    { label: "News", to: "/editor/news", icon: Newspaper },
    { label: "Gallery", to: "/editor/gallery", icon: Image },
    { label: "Contact Info", to: "/editor/contact", icon: Phone },
    { label: "Page Layouts", to: "/editor/layouts", icon: Globe },
    { label: "Drafts", to: "/editor/drafts", icon: FileText, badge: "4" },
    { label: "Media Library", to: "/editor/media", icon: Image },
  ] },
  { label: "Account", items: [{ label: "My Profile", to: "/editor/profile", icon: User }] },
];

function EditorLayout() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (user.role !== "editor" && user.role !== "admin") return <Navigate to="/login" />;
  return <DashboardShell groups={groups} brandLabel="Editor Studio"><Outlet /></DashboardShell>;
}