import Link from "next/link";
import { Card } from "@/components/ui/Card";

export default function CalculatorIndexPage() {
  const sections = [
    { label: "Pricing", href: "/admin/calculator/pricing" },
    { label: "Adjustment Rules", href: "/admin/calculator/adjustment-rules" },
    { label: "Garage Presets", href: "/admin/calculator/garage-presets" },
    { label: "Cities", href: "/admin/calculator/cities" },
    { label: "Recommendation Rules", href: "/admin/calculator/recommendation-rules" },
    { label: "Sandbox", href: "/admin/calculator/sandbox" },
    { label: "Version History", href: "/admin/calculator/versions" },
    { label: "Analytics", href: "/admin/calculator/analytics" },
  ];

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold">Calculator Management</h1>

      <Card className="p-6">
        <p className="text-sm text-slate-600">Manage pricing, adjustment rules, city multipliers, garage presets, recommendations and analytics for the public calculator.</p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map((s) => (
            <Link key={s.href} href={s.href} className="rounded-2xl border p-4 hover:shadow hover:bg-slate-50">
              <p className="font-medium">{s.label}</p>
              <p className="text-sm text-slate-500">Manage {s.label.toLowerCase()}.</p>
            </Link>
          ))}
        </div>
      </Card>
    </section>
  );
}
