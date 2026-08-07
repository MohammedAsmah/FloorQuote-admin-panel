import { getDashboardMetrics, getRecentActivity } from "@/lib/admin-data";
import DashboardHome from "@/components/admin/DashboardHome";
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function AdminHomePage() {
  // Check authentication
  const cookieStore = await cookies();
  const adminSession = cookieStore.get('admin_session');
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminSession || !adminPassword || adminSession.value !== adminPassword) {
    redirect('/admin/login');
  }

  try {
    const metrics = await getDashboardMetrics();
    const recentActivity = await getRecentActivity();

    return <DashboardHome metrics={metrics} recentActivity={recentActivity} />;
  } catch (error) {
    console.error("Admin dashboard error:", error);
    return (
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-4">Admin Dashboard</h1>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">Unable to load dashboard data. Please check your database connection.</p>
          <p className="text-sm text-red-600 mt-2">Error: {error instanceof Error ? error.message : 'Unknown error'}</p>
        </div>
      </div>
    );
  }
}
