import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/Card";
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function PricingPage() {
  // Check authentication
  const cookieStore = await cookies();
  const adminSession = cookieStore.get('admin_session');
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminSession || !adminPassword || adminSession.value !== adminPassword) {
    redirect('/admin/login');
  }

  try {
    // server: fetch pricing rules (initial scaffolding)
    let pricing: any[] = [];
    try {
      pricing = await prisma.pricingRule.findMany({ orderBy: { createdAt: "desc" } });
    } catch (e) {
      // If DB or table doesn't exist yet, show empty state
      console.warn("Pricing fetch failed (likely missing table)", e);
      pricing = [];
    }

    return (
      <section className="space-y-6">
        <h1 className="text-2xl font-semibold">Pricing</h1>
        <Card className="p-6">
          <div className="space-y-4">
            {pricing.length === 0 ? (
              <p className="text-sm text-slate-500">No pricing rules yet.</p>
            ) : (
              pricing.map((p) => (
                <div key={p.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{p.coatingType}</p>
                    <p className="text-sm text-slate-500">${p.lowPerSqFt.toFixed(2)} - ${p.highPerSqFt.toFixed(2)} / sqft</p>
                  </div>
                  <div className="text-sm text-slate-500">{p.active ? "Active" : "Inactive"}</div>
                </div>
              ))
            )}
          </div>
        </Card>
      </section>
    );
  } catch (error) {
    console.error("Pricing page error:", error);
    return (
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-4">Pricing</h1>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">Unable to load pricing data. Please check your database connection.</p>
          <p className="text-sm text-red-600 mt-2">Error: {error instanceof Error ? error.message : 'Unknown error'}</p>
        </div>
      </div>
    );
  }
}
