"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  FolderGit2,
  FileText,
  Code2,
  MessageSquare,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  BriefcaseBusiness,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: FolderGit2, label: "Projects", href: "/dashboard/projects" },
  { icon: FileText, label: "Blog Posts", href: "/dashboard/blog" },
  { icon: Code2, label: "Skills", href: "/dashboard/skills" },
  { icon: MessageSquare, label: "Messages", href: "/dashboard/messages" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function Sidebar({ open, setOpen }: SidebarProps) {
  const pathname = usePathname();

  useEffect(() => {
    if (window.innerWidth < 1024) setOpen(false);
  }, [setOpen]);

  return (
    <>
      {open ? (
        <motion.aside
          initial={{ x: -280 }}
          animate={{ x: 0 }}
          transition={{ type: "spring", damping: 24, stiffness: 220 }}
          className="fixed left-0 top-0 z-50 flex h-screen w-64 bg-white border-r border-gray-200 shadow-xl shadow-slate-200/40 lg:shadow-none"
        >
          <div className="flex min-h-0 w-full flex-col">
            <div className="flex items-center justify-between border-b border-gray-200 p-4">
              <Link href="/dashboard" className="flex min-w-0 items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm shadow-blue-600/20">
                  <BriefcaseBusiness className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-bold text-gray-900">Portfolio Office</span>
                  <span className="block truncate text-xs text-gray-500">Portfolio Manager</span>
                </span>
              </Link>
              <button
                type="button"
                aria-label="Close navigation"
                onClick={() => setOpen(false)}
                className="rounded-lg p-2 text-gray-500 transition hover:bg-slate-100 hover:text-gray-900 lg:hidden"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
            </div>

            <nav className="min-h-0 flex-1 overflow-y-auto p-3">
              <p className="px-3 pb-2 pt-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-gray-500">Workspace</p>
              <div className="space-y-1">
                {menuItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link key={item.href} href={item.href} title={item.label}>
                      <motion.span
                        whileHover={{ x: 3 }}
                        whileTap={{ scale: 0.98 }}
                        className={cn(
                          "flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors",
                          isActive
                            ? "bg-blue-600 text-white shadow-sm shadow-blue-600/20"
                            : "text-gray-600 hover:bg-slate-100 hover:text-gray-900"
                        )}
                      >
                        <item.icon className="h-[18px] w-[18px] shrink-0" />
                        <span className="text-sm font-medium">{item.label}</span>
                        {isActive && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-white" />}
                      </motion.span>
                    </Link>
                  );
                })}
              </div>
            </nav>

            <div className="border-t border-gray-200 p-3">
              <button type="button" className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-gray-600 transition hover:bg-slate-100 hover:text-gray-900">
                <LogOut className="h-[18px] w-[18px]" />
                <span className="text-sm font-medium">Logout</span>
              </button>
            </div>
          </div>
        </motion.aside>
      ) : (
        <aside className="fixed left-0 top-0 z-40 hidden h-screen w-20 border-r border-gray-200 bg-white lg:flex lg:flex-col">
          <div className="flex items-center justify-center border-b border-gray-200 p-4">
            <button type="button" aria-label="Expand navigation" title="Expand navigation" onClick={() => setOpen(true)} className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm shadow-blue-600/20 transition hover:bg-blue-700">
              <BriefcaseBusiness className="h-5 w-5" />
            </button>
          </div>
          <nav className="flex-1 space-y-2 p-3">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link key={item.href} href={item.href} title={item.label} aria-label={item.label}>
                  <span className={cn("flex h-11 items-center justify-center rounded-xl transition-colors", isActive ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-slate-100 hover:text-gray-900")}>
                    <item.icon className="h-[18px] w-[18px]" />
                  </span>
                </Link>
              );
            })}
          </nav>
          <div className="border-t border-gray-200 p-3">
            <button type="button" title="Logout" aria-label="Logout" className="flex h-11 w-full items-center justify-center rounded-xl text-gray-600 transition hover:bg-slate-100 hover:text-gray-900">
              <LogOut className="h-[18px] w-[18px]" />
            </button>
          </div>
        </aside>
      )}

      {!open && (
        <button type="button" aria-label="Open navigation" title="Open navigation" onClick={() => setOpen(true)} className="fixed left-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-700 shadow-lg shadow-slate-300/30 transition hover:bg-slate-50 lg:hidden">
          <Menu className="h-5 w-5" />
        </button>
      )}
    </>
  );
}
