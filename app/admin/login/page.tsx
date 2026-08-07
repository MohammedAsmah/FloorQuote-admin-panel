import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import AdminLoginForm from './AdminLoginForm';

export default async function AdminLoginPage() {
  const cookieStore = await cookies();
  const adminSession = cookieStore.get('admin_session');
  const adminPassword = process.env.ADMIN_PASSWORD;

  // If already authenticated, redirect to admin
  if (adminSession && adminPassword && adminSession.value === adminPassword) {
    redirect('/admin');
  }

  return <AdminLoginForm />;
}