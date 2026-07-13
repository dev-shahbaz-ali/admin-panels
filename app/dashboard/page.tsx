"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FolderGit2,
  FileText,
  Code2,
  MessageSquare,
  TrendingUp,
  ArrowUpRight,
  RefreshCw,
  ChevronDown,
  Zap,
  Clock,
  Award,
  Users,
  Eye,
  Calendar,
  Sparkles,
} from "lucide-react";
import StatsCard from "@/components/common/StatsCard";
import ActivityChart from "@/components/dashboard/ActivityChart";
import RecentProjects from "@/components/dashboard/RecentProjects";
import RecentMessages from "@/components/dashboard/RecentMessages";

const mockStats = {
  totalProjects: 24,
  totalBlogs: 18,
  totalSkills: 32,
  totalMessages: 45,
  totalViews: 12456,
  totalVisitors: 8934,
};

const mockActivityData = [
  { name: "Mon", views: 4000, visitors: 2400 },
  { name: "Tue", views: 3000, visitors: 1398 },
  { name: "Wed", views: 2000, visitors: 9800 },
  { name: "Thu", views: 2780, visitors: 3908 },
  { name: "Fri", views: 1890, visitors: 4800 },
  { name: "Sat", views: 2390, visitors: 3800 },
  { name: "Sun", views: 3490, visitors: 4300 },
];

const recentActivities = [
  {
    id: 1,
    type: "project",
    title: "New project added: AI Chat Application",
    time: "10 minutes ago",
    icon: FolderGit2,
    color: "blue",
  },
  {
    id: 2,
    type: "blog",
    title: "Blog post published: Mastering Tailwind CSS",
    time: "1 hour ago",
    icon: FileText,
    color: "purple",
  },
  {
    id: 3,
    type: "message",
    title: "New message from Sarah Johnson",
    time: "2 hours ago",
    icon: MessageSquare,
    color: "green",
  },
  {
    id: 4,
    type: "skill",
    title: "Skill updated: React (90%)",
    time: "4 hours ago",
    icon: Code2,
    color: "orange",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export default function Dashboard() {
  const [stats, setStats] = useState(mockStats);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState("7d");
  const [showPeriodDropdown, setShowPeriodDropdown] = useState(false);
  const [greeting, setGreeting] = useState("");
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 17) setGreeting("Good afternoon");
    else setGreeting("Good evening");

    const updateTime = () => {
      setCurrentTime(new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const newStats = {
        ...stats,
        totalMessages: stats.totalMessages + Math.floor(Math.random() * 2),
        totalViews: stats.totalViews + Math.floor(Math.random() * 50),
        totalVisitors: stats.totalVisitors + Math.floor(Math.random() * 20),
      };
      setStats(newStats);
    }, 30000);

    return () => clearInterval(interval);
  }, [stats]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsRefreshing(false);
    setStats({
      ...stats,
      totalMessages: stats.totalMessages + Math.floor(Math.random() * 5),
      totalViews: stats.totalViews + Math.floor(Math.random() * 100),
    });
  };

  const periods = [
    { value: "7d", label: "Last 7 Days" },
    { value: "30d", label: "Last 30 Days" },
    { value: "90d", label: "Last 90 Days" },
    { value: "1y", label: "Last Year" },
  ];

  const quickActions = [
    { label: "Add New Project", icon: FolderGit2, color: "blue", href: "/dashboard/projects" },
    { label: "Write Blog Post", icon: FileText, color: "purple", href: "/dashboard/blog" },
    { label: "Update Skills", icon: Code2, color: "green", href: "/dashboard/skills" },
    { label: "View Messages", icon: MessageSquare, color: "orange", href: "/dashboard/messages" },
  ];

  const handleQuickAction = (href: string) => {
    window.location.href = href;
  };

  const getIconBgColor = (color: string) => {
    switch(color) {
      case 'blue': return 'bg-blue-600 text-white';
      case 'purple': return 'bg-purple-600 text-white';
      case 'green': return 'bg-green-600 text-white';
      case 'orange': return 'bg-orange-600 text-white';
      default: return 'bg-gray-600 text-white';
    }
  };

  const getActivityDotColor = (color: string) => {
    switch(color) {
      case 'blue': return 'bg-blue-600';
      case 'purple': return 'bg-purple-600';
      case 'green': return 'bg-green-600';
      case 'orange': return 'bg-orange-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Header with Greeting */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-white">
              Dashboard
            </h1>
            <span className="px-2 py-1 text-xs bg-blue-600 text-white rounded-full">
              Live
            </span>
          </div>
          <div className="flex items-center gap-3 mt-1">
            <p className="text-gray-400">
              {greeting}, John! 👋 Here's what's happening with your portfolio.
            </p>
            <span className="text-xs text-gray-500 flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {currentTime}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRefresh}
            className={`inline-flex items-center gap-2 px-4 py-2 bg-gray-700 border border-gray-600 rounded-xl text-white font-medium hover:bg-gray-600 transition-all duration-200 cursor-pointer ${
              isRefreshing ? "opacity-70" : ""
            }`}
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            {isRefreshing ? "Refreshing..." : "Refresh"}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-xl text-white font-medium hover:bg-blue-700 transition-all duration-200 cursor-pointer"
          >
            <TrendingUp className="h-4 w-4" />
            View Analytics
            <ArrowUpRight className="h-4 w-4" />
          </motion.button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div variants={itemVariants}>
          <StatsCard
            icon={FolderGit2}
            title="Total Projects"
            value={stats.totalProjects}
            change="12%"
            trend="up"
            color="blue"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatsCard
            icon={FileText}
            title="Blog Posts"
            value={stats.totalBlogs}
            change="8%"
            trend="up"
            color="purple"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatsCard
            icon={Code2}
            title="Skills"
            value={stats.totalSkills}
            change="4%"
            trend="up"
            color="green"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatsCard
            icon={MessageSquare}
            title="Messages"
            value={stats.totalMessages}
            change="2%"
            trend="down"
            color="orange"
          />
        </motion.div>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div
          variants={itemVariants}
          className="bg-gray-800 border border-gray-700 rounded-xl p-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm text-gray-400">Total Views</span>
              <div className="text-2xl font-bold text-white mt-1">
                {stats.totalViews.toLocaleString()}
              </div>
            </div>
            <div className="p-2 bg-blue-600 rounded-lg">
              <Eye className="h-6 w-6 text-white" />
            </div>
          </div>
        </motion.div>
        <motion.div
          variants={itemVariants}
          className="bg-gray-800 border border-gray-700 rounded-xl p-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm text-gray-400">Visitors</span>
              <div className="text-2xl font-bold text-white mt-1">
                {stats.totalVisitors.toLocaleString()}
              </div>
            </div>
            <div className="p-2 bg-purple-600 rounded-lg">
              <Users className="h-6 w-6 text-white" />
            </div>
          </div>
        </motion.div>
        <motion.div
          variants={itemVariants}
          className="bg-gray-800 border border-gray-700 rounded-xl p-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm text-gray-400">Avg. Views/Day</span>
              <div className="text-2xl font-bold text-white mt-1">
                {Math.round(stats.totalViews / 30).toLocaleString()}
              </div>
            </div>
            <div className="p-2 bg-green-600 rounded-lg">
              <Award className="h-6 w-6 text-white" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          variants={itemVariants}
          className="lg:col-span-2 bg-gray-800 border border-gray-700 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-white">Activity Overview</h3>
              <p className="text-sm text-gray-400">Website traffic and visitors</p>
            </div>
            <div className="relative">
              <button
                onClick={() => setShowPeriodDropdown(!showPeriodDropdown)}
                className="flex items-center gap-2 px-3 py-1.5 bg-gray-700 border border-gray-600 rounded-lg text-sm text-gray-300 hover:bg-gray-600 transition-colors"
              >
                {periods.find(p => p.value === selectedPeriod)?.label}
                <ChevronDown className={`h-4 w-4 transition-transform ${
                  showPeriodDropdown ? "rotate-180" : ""
                }`} />
              </button>
              <AnimatePresence>
                {showPeriodDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-xl overflow-hidden z-10"
                  >
                    {periods.map((period) => (
                      <button
                        key={period.value}
                        onClick={() => {
                          setSelectedPeriod(period.value);
                          setShowPeriodDropdown(false);
                        }}
                        className={`w-full px-4 py-2 text-sm text-left hover:bg-gray-700 transition-colors ${
                          selectedPeriod === period.value
                            ? "text-white bg-blue-600"
                            : "text-gray-300"
                        }`}
                      >
                        {period.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          <ActivityChart data={mockActivityData} />
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-gray-800 border border-gray-700 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Quick Actions</h3>
            <div className="p-2 bg-yellow-600 rounded-lg">
              <Zap className="h-5 w-5 text-white" />
            </div>
          </div>
          <div className="space-y-3">
            {quickActions.map((action, index) => (
              <motion.button
                key={index}
                whileHover={{ x: 4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleQuickAction(action.href)}
                className="w-full flex items-center gap-3 px-4 py-3 bg-gray-700 rounded-xl hover:bg-gray-600 transition-colors group cursor-pointer"
              >
                <div className={`p-2 rounded-lg ${getIconBgColor(action.color)}`}>
                  <action.icon className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                  {action.label}
                </span>
                <ArrowUpRight className="h-4 w-4 text-gray-500 group-hover:text-gray-300 ml-auto transition-colors" />
              </motion.button>
            ))}
          </div>

          {/* Recent Activity */}
          <div className="mt-6 pt-6 border-t border-gray-700">
            <h4 className="text-sm font-medium text-gray-400 mb-3">Recent Activity</h4>
            <div className="space-y-3">
              {recentActivities.map((activity) => {
                const Icon = activity.icon;
                return (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-start gap-3"
                  >
                    <div className={`p-1.5 rounded-lg ${getIconBgColor(activity.color)}`}>
                      <Icon className="h-3 w-3" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-300">{activity.title}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                    <div className={`w-1.5 h-1.5 rounded-full ${getActivityDotColor(activity.color)} mt-1`} />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recent Projects and Messages */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={itemVariants}>
          <RecentProjects />
        </motion.div>
        <motion.div variants={itemVariants}>
          <RecentMessages />
        </motion.div>
      </div>

      {/* Footer Stats */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-gray-800 rounded-xl border border-gray-700">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <div className="p-1 bg-blue-600 rounded">
              <Calendar className="h-4 w-4 text-white" />
            </div>
            Last updated: {new Date().toLocaleString()}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <div className="p-1 bg-yellow-600 rounded">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            All systems operational
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span>📊 Data updates in real-time</span>
          <span>•</span>
          <span>🔄 Auto-refresh every 30s</span>
        </div>
      </div>
    </motion.div>
  );
}