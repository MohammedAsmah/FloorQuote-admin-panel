import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/Card";
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function ContentPage() {
  // Check authentication
  const cookieStore = await cookies();
  const adminSession = cookieStore.get('admin_session');
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminSession || !adminPassword || adminSession.value !== adminPassword) {
    redirect('/admin/login');
  }

  try {
    const isServer = typeof window === "undefined";

    let contentPages = 0;
    let servicePages = 0;
    let reusableBlocks = 0;

    if (isServer) {
      [contentPages, servicePages, reusableBlocks] = await Promise.all([
        prisma.contentPage.count(),
        prisma.servicePage.count(),
        prisma.reusableBlock.count(),
      ]);
    }

    return (
      <section className="space-y-6">
        <h1 className="text-2xl font-semibold">Content Management</h1>
        <Card className="p-6">
          <p className="text-sm text-slate-600">Manage landing pages, location pages, service page copy and reusable content blocks for your website.</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Pages</p>
              <p className="mt-3 text-3xl font-semibold">{contentPages}</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Service pages</p>
              <p className="mt-3 text-3xl font-semibold">{servicePages}</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Reusable blocks</p>
              <p className="mt-3 text-3xl font-semibold">{reusableBlocks}</p>
            </div>
          </div>
        </Card>
      </section>
    );
  } catch (error) {
    console.error("Content page error:", error);
    return (
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-4">Content Management</h1>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">Unable to load content data. Please check your database connection.</p>
          <p className="text-sm text-red-600 mt-2">Error: {error instanceof Error ? error.message : 'Unknown error'}</p>
        </div>
      </div>
    );
  }
}
