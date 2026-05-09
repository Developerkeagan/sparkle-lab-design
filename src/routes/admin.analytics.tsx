import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard/DashboardShell";
import { Card } from "@/components/dashboard/widgets";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar, Legend } from "recharts";

export const Route = createFileRoute("/admin/analytics")({ component: AnalyticsPage });

const trafficData = Array.from({ length: 30 }, (_, i) => ({ d: `D${i + 1}`, visits: 800 + Math.round(Math.random() * 1200), signups: 20 + Math.round(Math.random() * 50) }));
const channels = [
  { ch: "Organic", visits: 8240, conv: 412 },
  { ch: "Paid", visits: 4120, conv: 308 },
  { ch: "Social", visits: 3680, conv: 196 },
  { ch: "Email", visits: 2160, conv: 244 },
  { ch: "Direct", visits: 5320, conv: 320 },
];

function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Analytics" subtitle="Deep insights into traffic, conversions and funnel performance." />
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="font-display font-bold text-lg mb-4">Visits & sign-ups (30d)</h3>
          <div className="h-72">
            <ResponsiveContainer>
              <LineChart data={trafficData}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.929 0.013 255.508)" />
                <XAxis dataKey="d" fontSize={11} />
                <YAxis fontSize={11} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="visits" stroke="oklch(0.42 0.18 255)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="signups" stroke="oklch(0.78 0.15 200)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card className="p-6">
          <h3 className="font-display font-bold text-lg mb-4">Channels performance</h3>
          <div className="h-72">
            <ResponsiveContainer>
              <BarChart data={channels}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.929 0.013 255.508)" />
                <XAxis dataKey="ch" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Legend />
                <Bar dataKey="visits" fill="oklch(0.42 0.18 255)" radius={[6, 6, 0, 0]} />
                <Bar dataKey="conv" fill="oklch(0.78 0.15 200)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="font-display font-bold text-lg mb-4">Top pages</h3>
        <table className="w-full text-sm">
          <thead className="text-left text-muted-foreground text-xs uppercase">
            <tr><th className="py-2">Page</th><th>Views</th><th>Avg. time</th><th>Bounce</th></tr>
          </thead>
          <tbody className="divide-y divide-border">
            {[
              ["/", "48,210", "2m 14s", "32%"],
              ["/shop", "32,140", "3m 02s", "28%"],
              ["/academy", "21,850", "4m 18s", "21%"],
              ["/services/molecular-lab", "12,420", "2m 47s", "35%"],
              ["/collections", "9,820", "1m 58s", "41%"],
            ].map((r) => (
              <tr key={r[0]} className="hover:bg-muted/40"><td className="py-3 font-mono text-xs">{r[0]}</td><td>{r[1]}</td><td>{r[2]}</td><td>{r[3]}</td></tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}