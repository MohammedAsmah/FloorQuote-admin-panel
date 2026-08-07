import { KpiCard } from "@/components/admin/KpiCard";
import { Card } from "@/components/ui/Card";
import { RecentActivityRow } from "@/types/admin";

interface MetricsPayload {
  todaysLeads: number;
  thisWeek: number;
  thisMonth: number;
  pendingLeads: number;
  soldLeads: number;
  revenue: number;
  averageLeadValue: number;
  conversionRate: number;
}

interface DashboardHomeProps {
  metrics: MetricsPayload;
  recentActivity: Array<RecentActivityRow>;
}

export default function DashboardHome({ metrics, recentActivity }: DashboardHomeProps) {
  const cards = [
    { label: "Today's Leads", value: metrics.todaysLeads, accent: "blue" as const },
    { label: "This Week", value: metrics.thisWeek, accent: "teal" as const },
    { label: "This Month", value: metrics.thisMonth, accent: "purple" as const },
    { label: "Pending Leads", value: metrics.pendingLeads, accent: "amber" as const },
    { label: "Sold Leads", value: metrics.soldLeads, accent: "blue" as const },
    { label: "Revenue", value: `$${metrics.revenue.toLocaleString()}`, accent: "teal" as const },
    { label: "Avg. Lead Value", value: `$${metrics.averageLeadValue.toFixed(0)}`, accent: "purple" as const },
    { label: "Conversion Rate", value: `${metrics.conversionRate}%`, accent: "blue" as const },
  ];

  return (
    <section className="space-y-8">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-950">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
              Overview
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">
              Business performance
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-400">
              Monitor lead flow, conversion metrics, and recent project activity from one premium operations console.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-4">
        {cards.map((card) => (
          <KpiCard key={card.label} label={card.label} value={card.value} accent={card.accent} />
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
        <Card className="space-y-6 p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">Revenue trend</p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Weekly sales momentum and active opportunities.</p>
            </div>
          </div>
          <div className="h-[320px] rounded-[32px] bg-slate-100 p-6 text-center text-slate-500 dark:bg-slate-900 dark:text-slate-400">
            <p className="text-sm font-semibold">Interactive revenue chart coming soon</p>
            <p className="mt-4 text-sm leading-7">A premium chart area will visualize monthly revenue, trend lines, and forecasted top cities.</p>
          </div>
        </Card>

        <Card className="space-y-4 p-6">
          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-white">Recent activity</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">Latest lead captures and status updates.</p>
          </div>

          <div className="space-y-4">
            {recentActivity.map((lead) => (
              <div key={lead.id} className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{lead.referenceNumber}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{lead.name} · {lead.city}</p>
                  </div>
                  <span className="rounded-2xl bg-slate-100 px-3 py-1 text-xs font-semibold uppercase text-slate-600 dark:bg-slate-800 dark:text-slate-200">
                    {lead.status}
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-between gap-3 text-sm text-slate-500 dark:text-slate-400">
                  <p>{lead.phone}</p>
                  <p>{new Date(lead.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
}
