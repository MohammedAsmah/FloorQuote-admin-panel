import type { Metadata } from "next";
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import AdminShell from "@/components/admin/AdminShell";

export const metadata: Metadata = {
  title: "FloorQuote Admin Dashboard",
  description: "Premium internal admin dashboard for managing leads, contractors, assignments, and revenue.",
};

export default async function AdminLayout({ children }: LayoutProps<"/admin">) {
  const cookieStore = await cookies();
  const adminSession = cookieStore.get('admin_session');
  const adminPassword = process.env.ADMIN_PASSWORD;

  // Check if user is authenticated for all admin routes except login
  // We'll check authentication in individual pages instead of layout
  // to avoid issues with pathname detection

  return <AdminShell>{children}</AdminShell>;
}