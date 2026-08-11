"use client";

import { useMemo, useState } from "react";
import { Search, ChevronDown, X, User, Phone, Mail, MapPin, Calendar, DollarSign, ClipboardList, Wrench, Tag } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Card } from "@/components/ui/Card";
import { LeadTableRow } from "@/types/admin";

interface LeadTableProps {
  leads: Array<LeadTableRow>;
}

// ---------------------------------------------------------------------------
// Status badge config
// ---------------------------------------------------------------------------
const statusStyles: Record<string, string> = {
  NEW: "bg-slate-100 text-slate-700",
  CONTACTED: "bg-blue-100 text-blue-700",
  IN_PROGRESS: "bg-amber-100 text-amber-700",
  COMPLETED: "bg-emerald-100 text-emerald-700",
  CANCELLED: "bg-red-100 text-red-700",
};

const sourceStyles: Record<string, string> = {
  CALCULATOR: "bg-violet-100 text-violet-700",
  DIRECT: "bg-sky-100 text-sky-700",
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function fmt(value: string | null | undefined): string {
  if (value == null || value === "") return "—";
  return value
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function fmtBool(value: boolean | null | undefined): string {
  if (value == null) return "—";
  return value ? "Yes" : "No";
}

function fmtMoney(value: number | null | undefined): string {
  if (value == null) return "—";
  return `$${value.toLocaleString("en-CA", { minimumFractionDigits: 0 })}`;
}

function fmtDate(value: string | null | undefined): string {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// ---------------------------------------------------------------------------
// Detail row component used inside the drawer
// ---------------------------------------------------------------------------
function DetailRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 py-2.5 border-b border-slate-100 dark:border-slate-800 last:border-0">
      <span className="w-44 shrink-0 text-xs font-medium text-slate-500 dark:text-slate-400 pt-0.5">{label}</span>
      <span className="text-sm text-slate-900 dark:text-slate-100 break-words">{value ?? "—"}</span>
    </div>
  );
}

function SectionHeading({ icon: Icon, title }: { icon: React.ElementType; title: string }) {
  return (
    <div className="flex items-center gap-2 mt-6 mb-1">
      <Icon className="h-4 w-4 text-slate-400" />
      <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">{title}</h3>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Details drawer
// ---------------------------------------------------------------------------
function LeadDrawer({ lead, onClose }: { lead: LeadTableRow; onClose: () => void }) {
  const isCalculator = lead.source === "CALCULATOR";

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <aside
        role="dialog"
        aria-label={`Lead details for ${lead.name}`}
        className="fixed inset-y-0 right-0 z-50 flex w-full max-w-xl flex-col bg-white shadow-2xl dark:bg-slate-950 overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 dark:border-slate-800">
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">{lead.referenceNumber}</p>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{lead.name}</h2>
          </div>
          <div className="flex items-center gap-3">
            <span className={cn("inline-flex rounded-full px-2.5 py-1 text-xs font-semibold uppercase", statusStyles[lead.status] ?? "bg-slate-100 text-slate-700")}>
              {lead.status}
            </span>
            <span className={cn("inline-flex rounded-full px-2.5 py-1 text-xs font-semibold uppercase", sourceStyles[lead.source] ?? "bg-slate-100 text-slate-700")}>
              {lead.source}
            </span>
            <button
              onClick={onClose}
              className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-6 py-4">

          {/* ── Contact Information ── */}
          <SectionHeading icon={User} title="Contact Information" />
          <DetailRow label="Full Name" value={lead.name} />
          <DetailRow label="Email" value={<a href={`mailto:${lead.email}`} className="text-blue-600 hover:underline dark:text-blue-400">{lead.email}</a>} />
          <DetailRow label="Phone" value={<a href={`tel:${lead.phone}`} className="text-blue-600 hover:underline dark:text-blue-400">{lead.phone}</a>} />
          <DetailRow label="Preferred Contact" value={fmt(lead.preferredContactMethod)} />
          <DetailRow label="Best Time to Call" value={fmt(lead.preferredContactTime)} />

          {/* ── Location ── */}
          <SectionHeading icon={MapPin} title="Location" />
          <DetailRow label="City" value={lead.city} />
          <DetailRow label="Postal Code" value={lead.postalCode} />

          {/* ── Project Details ── */}
          <SectionHeading icon={Wrench} title="Project Details" />
          {isCalculator && lead.calculation ? (
            <>
              <DetailRow label="Project Type" value="Garage Floor (Calculator)" />
              <DetailRow label="Garage Size" value={fmt(lead.calculation.garageSize)} />
              <DetailRow label="Square Feet" value={`${lead.calculation.squareFeet} sq ft`} />
              <DetailRow label="Coating Type" value={fmt(lead.calculation.coatingType)} />
              <DetailRow label="Floor Condition" value={fmt(lead.calculation.floorCondition)} />
              <DetailRow label="Crack Level" value={fmt(lead.calculation.crackLevel)} />
              <DetailRow label="Existing Coating" value={fmt(lead.calculation.existingCoating)} />
              <DetailRow label="Decorative Finish" value={fmt(lead.calculation.decorativeFinish)} />
              <DetailRow label="Stem Walls" value={fmtBool(lead.calculation.stemWalls)} />
              <DetailRow label="Steps Count" value={String(lead.calculation.stepsCount)} />
              <DetailRow label="Moisture Issues" value={fmtBool(lead.calculation.moistureIssues)} />
              <DetailRow label="Timeline" value={fmt(lead.calculation.timeline)} />
              <DetailRow label="Recommended System" value={lead.calculation.recommendedSystem} />
              <DetailRow label="Property Type" value={fmt(lead.propertyType)} />
              <DetailRow label="Garage Empty" value={fmtBool(lead.garageEmpty)} />
            </>
          ) : (
            <>
              <DetailRow label="Project Type" value={lead.projectTypeOther ? `${fmt(lead.projectType)} — ${lead.projectTypeOther}` : fmt(lead.projectType)} />
              <DetailRow label="Garage Size" value={fmt(lead.garageSizeDirect)} />
              <DetailRow label="Square Feet" value={lead.squareFeetDirect != null ? `${lead.squareFeetDirect} sq ft` : "—"} />
              <DetailRow label="Coating Type" value={fmt(lead.coatingTypeDirect)} />
              <DetailRow label="Floor Condition" value={fmt(lead.floorConditionDirect)} />
              <DetailRow label="Existing Coating" value={lead.existingCoatingOther ? `${fmt(lead.existingCoatingDirect)} — ${lead.existingCoatingOther}` : fmt(lead.existingCoatingDirect)} />
              <DetailRow label="Moisture Issues" value={fmt(lead.moistureIssueDirect)} />
              <DetailRow label="Timeline" value={fmt(lead.timelineDirect)} />
              <DetailRow label="Garage Availability" value={fmt(lead.garageAvailability)} />
            </>
          )}

          {/* ── Estimate & Financials ── */}
          <SectionHeading icon={DollarSign} title="Estimate & Financials" />
          {isCalculator && lead.calculation ? (
            <>
              <DetailRow label="Estimated Low" value={fmtMoney(lead.calculation.estimatedLow)} />
              <DetailRow label="Estimated High" value={fmtMoney(lead.calculation.estimatedHigh)} />
            </>
          ) : (
            <DetailRow label="Estimate" value="—" />
          )}
          <DetailRow label="Sale Value" value={fmtMoney(lead.saleValue)} />
          <DetailRow label="Sold At" value={fmtDate(lead.soldAt)} />

          {/* ── Notes ── */}
          <SectionHeading icon={ClipboardList} title="Notes" />
          <DetailRow label="Customer Notes" value={lead.additionalNotes || "—"} />
          <DetailRow label="Internal Notes" value={lead.internalNotes || "—"} />

          {/* ── Metadata ── */}
          <SectionHeading icon={Tag} title="Record" />
          <DetailRow label="Lead ID" value={<span className="font-mono text-xs">{lead.id}</span>} />
          <DetailRow label="Source" value={fmt(lead.source)} />
          <DetailRow label="Created" value={fmtDate(lead.createdAt)} />
          <DetailRow label="Last Updated" value={fmtDate(lead.updatedAt)} />
        </div>
      </aside>
    </>
  );
}

// ---------------------------------------------------------------------------
// Main LeadTable component
// ---------------------------------------------------------------------------
export default function LeadTable({ leads }: LeadTableProps) {
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<keyof LeadTableRow>("createdAt");
  const [isAsc, setIsAsc] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [activeLead, setActiveLead] = useState<LeadTableRow | null>(null);

  const filteredLeads = useMemo(() => {
    return leads
      .filter((lead) =>
        [lead.referenceNumber, lead.name, lead.email, lead.phone, lead.city, lead.status, lead.source]
          .join(" ")
          .toLowerCase()
          .includes(query.toLowerCase())
      )
      .sort((a, b) => {
        if (sortKey === "createdAt" || sortKey === "updatedAt") {
          return isAsc
            ? new Date(a[sortKey] as string).getTime() - new Date(b[sortKey] as string).getTime()
            : new Date(b[sortKey] as string).getTime() - new Date(a[sortKey] as string).getTime();
        }
        const left = String(a[sortKey] ?? "").toLowerCase();
        const right = String(b[sortKey] ?? "").toLowerCase();
        return isAsc ? left.localeCompare(right) : right.localeCompare(left);
      });
  }, [leads, query, sortKey, isAsc]);

  const toggleSelect = (id: string) => {
    setSelectedIds((current) =>
      current.includes(id) ? current.filter((v) => v !== id) : [...current, id]
    );
  };

  const handleSort = (key: string) => {
    const typedKey = key as keyof LeadTableRow;
    if (sortKey === typedKey) {
      setIsAsc((prev) => !prev);
    } else {
      setSortKey(typedKey);
      setIsAsc(false);
    }
  };

  const columns: { label: string; key: string }[] = [
    { label: "Reference", key: "referenceNumber" },
    { label: "Customer", key: "name" },
    { label: "Email", key: "email" },
    { label: "Phone", key: "phone" },
    { label: "City", key: "city" },
    { label: "Source", key: "source" },
    { label: "Estimate", key: "estimate" },
    { label: "Status", key: "status" },
    { label: "Created", key: "createdAt" },
  ];

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <h1 className="text-2xl font-semibold text-slate-950 dark:text-white">Leads</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {leads.length} total lead{leads.length !== 1 ? "s" : ""} — click Details to inspect any entry.
            </p>
          </div>

          <div className="relative w-full max-w-sm">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, email, city, status…"
              className="w-full rounded-2xl border border-slate-200 bg-white px-12 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            />
          </div>
        </div>

        {/* Table */}
        <Card className="overflow-hidden p-0">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-left text-sm dark:divide-slate-800">
              <thead className="bg-slate-50 text-slate-500 dark:bg-slate-950 dark:text-slate-400">
                <tr>
                  <th className="px-5 py-4">
                    <input
                      type="checkbox"
                      checked={selectedIds.length === leads.length && leads.length > 0}
                      onChange={() =>
                        setSelectedIds((c) =>
                          c.length === leads.length ? [] : leads.map((l) => l.id)
                        )
                      }
                      className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                  </th>
                  {columns.map(({ label, key }) => (
                    <th key={key} className="px-5 py-4 font-semibold text-slate-600 dark:text-slate-300">
                      <button
                        type="button"
                        className="inline-flex items-center gap-1.5 text-left"
                        onClick={() => handleSort(key)}
                      >
                        {label}
                        <ChevronDown
                          className={cn(
                            "h-3.5 w-3.5 text-slate-400 transition-transform",
                            sortKey === key && isAsc && "rotate-180"
                          )}
                        />
                      </button>
                    </th>
                  ))}
                  <th className="px-5 py-4 text-right text-slate-600 dark:text-slate-300">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white dark:divide-slate-800 dark:bg-slate-950">
                {filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={columns.length + 2} className="px-5 py-12 text-center text-sm text-slate-400">
                      {query ? "No leads match your search." : "No leads yet."}
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => (
                    <tr key={lead.id} className="group hover:bg-slate-50 dark:hover:bg-slate-900">
                      <td className="px-5 py-4 align-middle">
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(lead.id)}
                          onChange={() => toggleSelect(lead.id)}
                          className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-5 py-4 font-mono text-xs font-medium text-slate-900 dark:text-white">
                        {lead.referenceNumber}
                      </td>
                      <td className="px-5 py-4">
                        <div className="font-medium text-slate-900 dark:text-white">{lead.name}</div>
                      </td>
                      <td className="px-5 py-4 text-slate-500 dark:text-slate-400">{lead.email}</td>
                      <td className="px-5 py-4 text-slate-600 dark:text-slate-300">{lead.phone}</td>
                      <td className="px-5 py-4 text-slate-600 dark:text-slate-300">{lead.city}</td>
                      <td className="px-5 py-4">
                        <span className={cn("inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase", sourceStyles[lead.source] ?? "bg-slate-100 text-slate-700")}>
                          {lead.source}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-slate-600 dark:text-slate-300">
                        {lead.estimate != null ? fmtMoney(lead.estimate) : "—"}
                      </td>
                      <td className="px-5 py-4">
                        <span className={cn("inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase", statusStyles[lead.status] ?? "bg-slate-100 text-slate-700")}>
                          {lead.status}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-slate-500 dark:text-slate-400">
                        {fmtDate(lead.createdAt)}
                      </td>
                      <td className="px-5 py-4 text-right">
                        <button
                          onClick={() => setActiveLead(lead)}
                          className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
                        >
                          Details
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Footer count */}
          {filteredLeads.length > 0 && (
            <div className="border-t border-slate-200 px-5 py-3 text-xs text-slate-400 dark:border-slate-800">
              Showing {filteredLeads.length} of {leads.length} leads
            </div>
          )}
        </Card>
      </div>

      {/* Details drawer */}
      {activeLead && (
        <LeadDrawer lead={activeLead} onClose={() => setActiveLead(null)} />
      )}
    </>
  );
}
