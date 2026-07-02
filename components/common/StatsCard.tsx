"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  icon: LucideIcon;
  title: string;
  value: number | string;
  change?: string;
  trend?: "up" | "down";
  color?: string;
}

export default function StatsCard({
  icon: Icon,
  title,
  value,
  change,
  trend,
  color = "blue",
}: StatsCardProps) {
  const getIconBgColor = (color: string) => {
    switch(color) {
      case 'blue': return 'bg-blue-600';
      case 'purple': return 'bg-purple-600';
      case 'green': return 'bg-green-600';
      case 'orange': return 'bg-orange-600';
      case 'red': return 'bg-red-600';
      default: return 'bg-blue-600';
    }
  };

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ type: "spring", damping: 20 }}
      className="relative overflow-hidden rounded-2xl border border-gray-700 p-6 bg-gray-800"
    >
      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-400">{title}</p>
          <p className="mt-2 text-3xl font-bold text-white">{value}</p>
          {change && (
            <div className="mt-2 flex items-center gap-1">
              <span className={cn(
                "text-xs font-medium",
                trend === "up" ? "text-green-400" : "text-red-400"
              )}>
                {trend === "up" ? "↑" : "↓"} {change}
              </span>
              <span className="text-xs text-gray-500">vs last month</span>
            </div>
          )}
        </div>
        <div className={cn(
          "rounded-xl p-3",
          getIconBgColor(color)
        )}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </motion.div>
  );
}