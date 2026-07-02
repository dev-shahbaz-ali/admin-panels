"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Bell,
  User,
  Moon,
  Sun,
  Menu,
  ChevronDown,
  Settings,
  LogOut,
  HelpCircle,
  Users,
  Mail,
  MessageSquare,
  Calendar,
  Check,
  X,
  Sparkles,
  Command,
} from "lucide-react";

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

// Mock notifications data
const notifications = [
  {
    id: 1,
    type: "message",
    title: "New message from Sarah Johnson",
    description: "I'm interested in collaborating on a new project...",
    time: "2 minutes ago",
    read: false,
    icon: MessageSquare,
    color: "blue",
  },
  {
    id: 2,
    type: "project",
    title: "Project update: E-commerce Platform",
    description: "Your project has been viewed 50 times this week",
    time: "1 hour ago",
    read: false,
    icon: Calendar,
    color: "purple",
  },
  {
    id: 3,
    type: "system",
    title: "System maintenance scheduled",
    description: "The system will be down for 2 hours on Saturday",
    time: "3 hours ago",
    read: true,
    icon: Settings,
    color: "yellow",
  },
  {
    id: 4,
    type: "message",
    title: "New message from Mike Chen",
    description: "Great portfolio! I love the design and animations...",
    time: "5 hours ago",
    read: true,
    icon: MessageSquare,
    color: "blue",
  },
  {
    id: 5,
    type: "project",
    title: "New project added: AI Chat Application",
    description: "Your new project has been published successfully",
    time: "1 day ago",
    read: true,
    icon: Calendar,
    color: "green",
  },
];

export default function Header({ sidebarOpen, setSidebarOpen }: HeaderProps) {
  const [isDark, setIsDark] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  
  const notificationRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const [unreadCount, setUnreadCount] = useState(
    notifications.filter((n) => !n.read).length
  );

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+K or Cmd+K to focus search
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setShowSearch(true);
        setTimeout(() => searchRef.current?.focus(), 100);
      }
      // Escape to close search
      if (e.key === "Escape" && showSearch) {
        setShowSearch(false);
        setSearchQuery("");
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [showSearch]);

  const handleMarkAllRead = () => {
    setUnreadCount(0);
    // In a real app, you would update the notifications in the backend
  };

  const handleNotificationClick = (id: number) => {
    // Mark as read
    setUnreadCount((prev) => Math.max(0, prev - 1));
    // In a real app, you would navigate to the relevant page
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearching(true);
      // Simulate search
      setTimeout(() => {
        setIsSearching(false);
        setShowSearch(false);
        setSearchQuery("");
        // In a real app, you would navigate to search results
        console.log("Searching for:", searchQuery);
      }, 1000);
    }
  };

  const handleThemeToggle = () => {
    setIsDark(!isDark);
    // In a real app, you would apply the theme
    document.documentElement.classList.toggle("dark");
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-gray-900/80 border-b border-gray-700/50">
      <div className="flex items-center justify-between h-16 px-4 md:px-6">
        {/* Left side */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-700/30 transition-colors text-gray-400 hover:text-white relative group"
          >
            <Menu className="h-5 w-5" />
            <span className="absolute inset-0 rounded-lg bg-blue-500/0 group-hover:bg-blue-500/10 transition-colors" />
          </button>

          {/* Search Bar - Desktop */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search... (Ctrl+K)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setShowSearch(true)}
              className="w-72 pl-9 pr-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 px-1.5 py-0.5 text-[10px] font-mono text-gray-500 bg-gray-700/50 rounded border border-gray-600">
              ⌘K
            </kbd>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Search Toggle - Mobile */}
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-700/30 transition-colors text-gray-400 hover:text-white"
          >
            <Search className="h-5 w-5" />
          </button>

          {/* Theme toggle */}
          <button
            onClick={handleThemeToggle}
            className="p-2 rounded-lg hover:bg-gray-700/30 transition-colors text-gray-400 hover:text-white relative group"
          >
            {isDark ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
            <span className="absolute inset-0 rounded-lg bg-blue-500/0 group-hover:bg-blue-500/10 transition-colors" />
          </button>

          {/* Notifications */}
          <div className="relative" ref={notificationRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-lg hover:bg-gray-700/30 transition-colors text-gray-400 hover:text-white relative group"
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-0.5 -right-0.5 h-4 w-4 bg-red-500 rounded-full text-[10px] font-bold text-white flex items-center justify-center"
                >
                  {unreadCount}
                </motion.span>
              )}
              <span className="absolute inset-0 rounded-lg bg-blue-500/0 group-hover:bg-blue-500/10 transition-colors" />
            </button>

            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ type: "spring", damping: 20 }}
                  className="absolute right-0 mt-2 w-96 bg-gray-800/95 backdrop-blur-xl border border-gray-700 rounded-2xl shadow-2xl overflow-hidden"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between p-4 border-b border-gray-700/50">
                    <div>
                      <h3 className="text-sm font-semibold text-white">Notifications</h3>
                      <p className="text-xs text-gray-400">
                        You have {unreadCount} unread notifications
                      </p>
                    </div>
                    {unreadCount > 0 && (
                      <button
                        onClick={handleMarkAllRead}
                        className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        Mark all as read
                      </button>
                    )}
                  </div>

                  {/* Notifications List */}
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.map((notification) => {
                      const Icon = notification.icon;
                      const isUnread = !notification.read;
                      
                      return (
                        <motion.div
                          key={notification.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          onClick={() => handleNotificationClick(notification.id)}
                          className={`px-4 py-3 hover:bg-gray-700/30 transition-colors cursor-pointer group ${
                            isUnread ? "bg-blue-500/5" : ""
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`p-2 rounded-lg ${
                              isUnread 
                                ? `bg-${notification.color}-500/20 text-${notification.color}-400`
                                : "bg-gray-700/30 text-gray-500"
                            }`}>
                              <Icon className="h-4 w-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <p className={`text-sm ${isUnread ? "text-white font-medium" : "text-gray-300"}`}>
                                  {notification.title}
                                </p>
                                {isUnread && (
                                  <span className="flex-shrink-0 h-2 w-2 rounded-full bg-blue-400 mt-1" />
                                )}
                              </div>
                              <p className="text-xs text-gray-400 mt-0.5 line-clamp-2">
                                {notification.description}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Footer */}
                  <div className="p-3 border-t border-gray-700/50">
                    <button className="w-full text-center text-sm text-blue-400 hover:text-blue-300 transition-colors">
                      View all notifications
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* User profile */}
          <div className="relative" ref={userMenuRef}>
            <div
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 pl-2 border-l border-gray-700/50 cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center relative">
                <span className="text-sm font-semibold text-white">JD</span>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-gray-900" />
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors">
                  John Doe
                </p>
                <p className="text-xs text-gray-400">Administrator</p>
              </div>
              <ChevronDown className={`h-4 w-4 text-gray-400 group-hover:text-white transition-all duration-200 ${
                showUserMenu ? "rotate-180" : ""
              }`} />
            </div>

            <AnimatePresence>
              {showUserMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ type: "spring", damping: 20 }}
                  className="absolute right-0 mt-2 w-64 bg-gray-800/95 backdrop-blur-xl border border-gray-700 rounded-2xl shadow-2xl overflow-hidden"
                >
                  {/* User Info */}
                  <div className="p-4 border-b border-gray-700/50">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                        <span className="text-lg font-bold text-white">JD</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">John Doe</p>
                        <p className="text-xs text-gray-400">john.doe@example.com</p>
                        <span className="text-xs text-green-400 flex items-center gap-1 mt-0.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                          Online
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="p-2">
                    {[
                      { icon: User, label: "My Profile", href: "/dashboard/settings" },
                      { icon: Settings, label: "Settings", href: "/dashboard/settings" },
                      { icon: Users, label: "Team", href: "#" },
                      { icon: HelpCircle, label: "Help & Support", href: "#" },
                    ].map((item) => (
                      <button
                        key={item.label}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-700/30 transition-colors text-gray-300 hover:text-white"
                      >
                        <item.icon className="h-4 w-4" />
                        <span className="text-sm">{item.label}</span>
                      </button>
                    ))}
                  </div>

                  {/* Divider */}
                  <div className="border-t border-gray-700/50 p-2">
                    <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-500/10 transition-colors text-red-400 hover:text-red-300">
                      <LogOut className="h-4 w-4" />
                      <span className="text-sm">Logout</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Mobile Search Overlay */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-16 left-0 right-0 p-4 bg-gray-900/95 backdrop-blur-xl border-b border-gray-700/50"
          >
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <input
                ref={searchRef}
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-12 py-2.5 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-colors"
                autoFocus
              />
              {isSearching ? (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <div className="h-4 w-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                </div>
              ) : searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Keyboard shortcut indicator */}
      {showSearch && !searchQuery && (
        <div className="hidden md:block absolute top-full left-1/2 -translate-x-1/2 mt-1 px-3 py-1 text-xs text-gray-500 bg-gray-800/90 rounded-lg border border-gray-700">
          <kbd className="px-1 py-0.5 bg-gray-700 rounded text-[10px]">⌘K</kbd>
          <span className="mx-1">or</span>
          <kbd className="px-1 py-0.5 bg-gray-700 rounded text-[10px]">/</kbd>
          <span className="ml-1">to search</span>
        </div>
      )}
    </header>
  );
}