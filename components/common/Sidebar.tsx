"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
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
  Sparkles,
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

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed left-0 top-0 z-50 h-screen w-64 bg-gray-800 border-r border-gray-700"
          >
            <div className="flex flex-col h-full">
              {/* Logo */}
              <div className="flex items-center justify-between p-4 border-b border-gray-700">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-blue-600 rounded-lg">
                    <Sparkles className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-lg font-bold text-white">
                      Admin Panel
                    </h1>
                    <p className="text-xs text-gray-400">Portfolio Manager</p>
                  </div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="lg:hidden p-1 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <ChevronLeft className="h-5 w-5 text-gray-400" />
                </button>
              </div>

              {/* Navigation */}
              <nav className="flex-1 overflow-y-auto p-4">
                <div className="space-y-1">
                  {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link key={item.href} href={item.href}>
                        <motion.div
                          whileHover={{ x: 4 }}
                          whileTap={{ scale: 0.98 }}
                          className={cn(
                            "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200",
                            isActive
                              ? "bg-blue-600 text-white"
                              : "text-gray-400 hover:text-white hover:bg-gray-700"
                          )}
                        >
                          <item.icon className={cn(
                            "h-5 w-5",
                            isActive ? "text-white" : "text-gray-400"
                          )} />
                          <span className="text-sm font-medium">{item.label}</span>
                          {isActive && (
                            <motion.div
                              layoutId="active-pill"
                              className="ml-auto h-1.5 w-1.5 rounded-full bg-white"
                            />
                          )}
                        </motion.div>
                      </Link>
                    );
                  })}
                </div>
              </nav>

              {/* Footer */}
              <div className="p-4 border-t border-gray-700">
                <button className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-gray-700 transition-colors">
                  <LogOut className="h-5 w-5" />
                  <span className="text-sm font-medium">Logout</span>
                </button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Toggle button for small screens */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed left-4 top-4 z-50 lg:hidden p-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-400 hover:text-white transition-colors"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      )}
    </>
  );
}