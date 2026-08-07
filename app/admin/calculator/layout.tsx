import Link from "next/link";
import { Card } from "@/components/ui/Card";

export const metadata = {
  title: "Calculator Management",
};

export default function CalculatorLayout({ children }: { children: React.ReactNode }) {
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
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="p-4">
          <nav className="space-y-2">
            {sections.map((s) => (
              <Link key={s.href} href={s.href} className="block rounded-2xl px-3 py-2 hover:bg-slate-100">
                {s.label}
              </Link>
            ))}
          </nav>
        </Card>

        <div className="md:col-span-3">
          {children}
        </div>
      </div>
    </div>
  );
}
