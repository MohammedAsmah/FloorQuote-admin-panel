"use client";

import { useMemo, useState } from "react";
import { Search, ChevronDown, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Card } from "@/components/ui/Card";
import { LeadTableRow } from "@/types/admin";

interface LeadTableProps {
  leads: Array<LeadTableRow>;
}

const statusStyles: Record<string, string> = {
  NEW: "bg-slate-100 text-slate-700",
  CONTACTED: "bg-blue-100 text-blue-700",
  IN_PROGRESS: "bg-amber-100 text-amber-700",
  COMPLETED: "bg-emerald-100 text-emerald-700",
  CANCELLED: "bg-red-100 text-red-700",
};

export default function LeadTable({ leads }: LeadTableProps) {
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<keyof LeadTableRow>("createdAt");
  const [isAsc, setIsAsc] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const filteredLeads = useMemo(() => {
    return leads
      .filter((lead) =>
        [lead.referenceNumber, lead.name, lead.phone, lead.city, lead.status]
          .join(" ")
          .toLowerCase()
          .includes(query.toLowerCase())
      )
      .sort((a, b) => {
        if (sortKey === "createdAt") {
          return isAsc
            ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
        const left = String(a[sortKey]).toLowerCase();
        const right = String(b[sortKey]).toLowerCase();
        return isAsc ? left.localeCompare(right) : right.localeCompare(left);
      });
  }, [leads, query, sortKey, isAsc]);

  const toggleSelect = (id: string) => {
    setSelectedIds((current) =>
      current.includes(id) ? current.filter((value) => value !== id) : [...current, id]
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-slate-950 dark:text-white">Leads</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            View all incoming leads, search by customer, status, or estimate, and inspect details from the table.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative w-full max-w-sm">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search leads..."
              className="w-full rounded-2xl border border-slate-200 bg-white px-12 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            />
          </div>
          <button className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
            Bulk actions
          </button>
        </div>
      </div>

      <Card className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm dark:divide-slate-800">
            <thead className="bg-slate-50 text-slate-500 dark:bg-slate-950 dark:text-slate-400">
              <tr>
                <th className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedIds.length === leads.length}
                    onChange={() =>
                      setSelectedIds((current) =>
                        current.length === leads.length ? [] : leads.map((lead) => lead.id)
                      )
                    }
                    className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                {[
                  { label: "Reference", key: "referenceNumber" },
                  { label: "Customer", key: "name" },
                  { label: "Phone", key: "phone" },
                  { label: "City", key: "city" },
                  { label: "Estimate", key: "estimate" },
                  { label: "Status", key: "status" },
                  { label: "Created", key: "createdAt" },
                ].map(({ label, key }) => (
                  <th
                    key={key}
                    className="px-6 py-4 font-semibold text-slate-600 dark:text-slate-300"
                  >
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 text-left"
                      onClick={() => {
                        setSortKey(key as keyof LeadTableRow);
                        setIsAsc((current) => (sortKey === key ? !current : false));
                      }}
                    >
                      {label}
                      <ChevronDown className="h-4 w-4 text-slate-400" />
                    </button>
                  </th>
                ))}
                <th className="px-6 py-4 text-right text-slate-600 dark:text-slate-300">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white dark:divide-slate-800 dark:bg-slate-950">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="group hover:bg-slate-50 dark:hover:bg-slate-900">
                  <td className="px-6 py-4 align-middle">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(lead.id)}
                      onChange={() => toggleSelect(lead.id)}
                      className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{lead.referenceNumber}</td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{lead.name}</td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{lead.phone}</td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{lead.city}</td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-300">${lead.estimate.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={cn("inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase", statusStyles[lead.status] ?? "bg-slate-100 text-slate-700")}>{lead.status}</span>
                  </td>
                  <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{new Date(lead.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="inline-flex items-center gap-2 rounded-2xl bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-200 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800">
                      <MoreHorizontal className="h-4 w-4" />
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
