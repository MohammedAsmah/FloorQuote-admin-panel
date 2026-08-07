import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/Card";
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function CitiesPage() {
  // Check authentication
  const cookieStore = await cookies();
  const adminSession = cookieStore.get('admin_session');
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminSession || !adminPassword || adminSession.value !== adminPassword) {
    redirect('/admin/login');
  }

  try {
    const [cityCount, serviceAvailabilityCount, nearbyCount] = await Promise.all([
      prisma.supportedCity.count(),
      prisma.cityServiceAvailability.count(),
      prisma.cityNearby.count(),
    ]);

    return (
      <section className="space-y-6">
        <h1 className="text-2xl font-semibold">Cities & Service Areas</h1>
        <Card className="p-6">
          <p className="text-sm text-slate-600">Configure supported cities, service availability, and nearby coverage details for your local SEO and lead routing.</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Supported cities</p>
              <p className="mt-3 text-3xl font-semibold">{cityCount}</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Service coverage rules</p>
              <p className="mt-3 text-3xl font-semibold">{serviceAvailabilityCount}</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Nearby relationships</p>
              <p className="mt-3 text-3xl font-semibold">{nearbyCount}</p>
            </div>
          </div>
        </Card>
      </section>
    );
  } catch (error) {
    console.error("Cities page error:", error);
    return (
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-4">Cities & Service Areas</h1>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">Unable to load cities data. Please check your database connection.</p>
          <p className="text-sm text-red-600 mt-2">Error: {error instanceof Error ? error.message : 'Unknown error'}</p>
        </div>
      </div>
    );
  }
}
