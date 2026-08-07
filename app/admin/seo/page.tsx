import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/Card";
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function SeoPage() {
  // Check authentication
  const cookieStore = await cookies();
  const adminSession = cookieStore.get('admin_session');
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminSession || !adminPassword || adminSession.value !== adminPassword) {
    redirect('/admin/login');
  }

  try {
    const isServer = typeof window === "undefined";

    let seoMetadataCount = 0;
    let redirectCount = 0;

    if (isServer) {
      [seoMetadataCount, redirectCount] = await Promise.all([
        prisma.seoMetadata.count(),
        prisma.redirectRule.count(),
      ]);
    }

    return (
      <section className="space-y-6">
        <h1 className="text-2xl font-semibold">SEO & Redirects</h1>
        <Card className="p-6">
          <p className="text-sm text-slate-600">Manage SEO metadata, schema, Open Graph content, and site redirects from one central admin view.</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">SEO records</p>
              <p className="mt-3 text-3xl font-semibold">{seoMetadataCount}</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Redirect rules</p>
              <p className="mt-3 text-3xl font-semibold">{redirectCount}</p>
            </div>
          </div>
        </Card>
      </section>
    );
  } catch (error) {
    console.error("SEO page error:", error);
    return (
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-4">SEO & Redirects</h1>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">Unable to load SEO data. Please check your database connection.</p>
          <p className="text-sm text-red-600 mt-2">Error: {error instanceof Error ? error.message : 'Unknown error'}</p>
        </div>
      </div>
    );
  }
}
