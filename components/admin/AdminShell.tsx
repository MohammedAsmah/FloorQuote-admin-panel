"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  LayoutDashboard,
  Users,
  Layers,
  DollarSign,
  BarChart3,
  Settings,
  FolderPlus,
  Menu,
  X,
  Activity,
  Calculator,
  MapPin,
  FileText,
  Search,
  BookOpen,
  HelpCircle,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";
import { colors } from "@/lib/design-system";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Leads", href: "/admin/leads", icon: Users },
  { label: "Contractors", href: "/admin/contractors", icon: Layers },
  { label: "Assignments", href: "/admin/assignments", icon: FolderPlus },
  { label: "Calculator", href: "/admin/calculator", icon: Calculator },
  { label: "Cities", href: "/admin/cities", icon: MapPin },
  { label: "Content", href: "/admin/content", icon: FileText },
  { label: "SEO", href: "/admin/seo", icon: Search },
  { label: "Blog", href: "/admin/blog", icon: BookOpen },
  { label: "FAQs", href: "/admin/faqs", icon: HelpCircle },
  { label: "Testimonials", href: "/admin/testimonials", icon: Star },
  { label: "Revenue", href: "/admin/revenue", icon: DollarSign },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const activeItem = useMemo(
    () => navItems.find((item) => pathname?.startsWith(item.href)),
    [pathname]
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="flex h-full">
        <aside className="hidden w-80 flex-none flex-col border-r border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-950/95 lg:flex">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
                FloorQuote
              </p>
              <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
                Admin Hub
              </h1>
            </div>

            <div className="rounded-2xl bg-slate-100 p-3 text-slate-700 shadow-sm dark:bg-slate-900 dark:text-slate-200">
              <Activity className="h-5 w-5" />
            </div>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition",
                    isActive
                      ? "bg-slate-900 text-white shadow-sm dark:bg-slate-800"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-900/80 dark:hover:text-white"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
              Team health
            </p>
            <div className="mt-4 flex items-center justify-between gap-4">
              <div>
                <p className="text-lg font-semibold">24</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Active contractors</p>
              </div>
              <div className="rounded-2xl bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-900 dark:bg-slate-800 dark:text-slate-100">
                On track
              </div>
            </div>
          </div>
        </aside>

        <div className="flex flex-1 flex-col overflow-hidden">
          <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 py-4 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95">
            <div className="mx-auto flex max-w-[1700px] items-center justify-between gap-4 px-4 lg:px-6">
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  className="lg:hidden"
                  onClick={() => setMobileOpen(true)}
                >
                  <Menu className="h-5 w-5" />
                </Button>
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Admin Dashboard</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Manage leads, contractors, assignments and revenue in one premium workspace.
                  </p>
                </div>
              </div>

              <div className="flex flex-1 items-center justify-end gap-3">
                <Button variant="ghost" size="sm" className="rounded-2xl">
                  <Bell className="mr-2 h-4 w-4" />
                  Notifications
                </Button>

                <div className="relative">
                  <button
                    type="button"
                    className="inline-flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
                    onClick={() => setProfileOpen((current) => !current)}
                  >
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-100">
                      JD
                    </span>
                    <span className="text-left">
                      <span className="block text-sm font-semibold">Jesse Dalton</span>
                      <span className="block text-xs text-slate-500 dark:text-slate-400">Business owner</span>
                    </span>
                  </button>

                  <AnimatePresence>
                    {profileOpen ? (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 mt-2 w-60 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-950"
                      >
                        <div className="p-4 text-sm text-slate-700 dark:text-slate-200">
                          <p className="font-semibold">Jesse Dalton</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">Owner · FloorQuote</p>
                        </div>
                        <div className="border-t border-slate-100 px-4 py-2 dark:border-slate-800">
                          <Link href="/admin/settings" className="block rounded-2xl px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-900">
                            Account settings
                          </Link>
                          <button 
                            onClick={handleLogout}
                            className="mt-1 w-full rounded-2xl px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-900"
                          >
                            Sign out
                          </button>
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto bg-slate-50 px-4 py-6 dark:bg-slate-950 lg:px-6">
            <div className="mx-auto w-full max-w-[1700px]">{children}</div>
          </main>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            className="fixed inset-0 z-50 bg-slate-950/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              className="absolute left-0 top-0 bottom-0 w-80 bg-white p-6 shadow-2xl dark:bg-slate-950"
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500">FloorQuote</p>
                  <h2 className="mt-2 text-xl font-semibold text-slate-950 dark:text-white">Admin</h2>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setMobileOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <nav className="space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition",
                        isActive
                          ? "bg-slate-900 text-white"
                          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                      )}
                      onClick={() => setMobileOpen(false)}
                    >
                      <Icon className="h-5 w-5" />
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
