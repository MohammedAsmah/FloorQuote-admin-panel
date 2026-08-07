import { getContractors } from "@/lib/admin-data";
import ContractorManager from "@/components/admin/ContractorManager";
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function ContractorsPage() {
  // Check authentication
  const cookieStore = await cookies();
  const adminSession = cookieStore.get('admin_session');
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminSession || !adminPassword || adminSession.value !== adminPassword) {
    redirect('/admin/login');
  }

  try {
    const contractors = await getContractors();

    return <ContractorManager contractors={contractors} />;
  } catch (error) {
    console.error("Contractors page error:", error);
    return (
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-4">Contractors</h1>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">Unable to load contractors. Please check your database connection.</p>
          <p className="text-sm text-red-600 mt-2">Error: {error instanceof Error ? error.message : 'Unknown error'}</p>
        </div>
      </div>
    );
  }
}
