"use client";

import { useMemo, useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import type { Contractor as ContractorModel } from "@/generated/prisma/client";

interface ContractorManagerProps {
  contractors: ContractorModel[];
}

export default function ContractorManager({ contractors }: ContractorManagerProps) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string[]>([]);

  const visibleContractors = useMemo(
    () =>
      contractors.filter((contractor) =>
        [contractor.companyName, contractor.contactName, contractor.phone, contractor.email, contractor.status]
          .join(" ")
          .toLowerCase()
          .includes(query.toLowerCase())
      ),
    [contractors, query]
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-950 dark:text-white">Contractors</h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Manage contractor profiles, service areas, lead pricing, and status from one polished dashboard.
          </p>
        </div>
        <Button variant="primary">New contractor</Button>
      </div>

      <Card className="space-y-4 p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full max-w-sm">
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search contractors..."
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            />
          </div>
          <Button variant="secondary">Export list</Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {visibleContractors.map((contractor) => (
            <div key={contractor.id} className="rounded-[28px] border border-slate-200 bg-slate-50 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-lg font-semibold text-slate-950 dark:text-white">{contractor.companyName}</p>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{contractor.contactName}</p>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase text-slate-600 dark:bg-slate-800 dark:text-slate-200">
                  {contractor.status}
                </span>
              </div>
              <div className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                <p>{contractor.phone}</p>
                <p>{contractor.email}</p>
                <p>{contractor.website ?? "No website"}</p>
              </div>
              <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-500 dark:text-slate-400">
                <span className="rounded-full bg-white px-3 py-1 shadow-sm dark:bg-slate-950">{contractor.cities}</span>
                <span className="rounded-full bg-white px-3 py-1 shadow-sm dark:bg-slate-950">{contractor.services}</span>
                <span className="rounded-full bg-white px-3 py-1 shadow-sm dark:bg-slate-950">Lead ${contractor.leadPrice}</span>
              </div>
              <div className="mt-5 flex items-center justify-between gap-3">
                <Button variant="ghost" size="sm">Edit</Button>
                <Button variant="secondary" size="sm">Archive</Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
