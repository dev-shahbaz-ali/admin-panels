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
  const colorClasses = {
    blue: "from-blue-500/20 to-blue-500/5 border-blue-500/20",
    purple: "from-purple-500/20 to-purple-500/5 border-purple-500/20",
    green: "from-green-500/20 to-green-500/5 border-green-500/20",
    orange: "from-orange-500/20 to-orange-500/5 border-orange-500/20",
    red: "from-red-500/20 to-red-500/5 border-red-500/20",
  };

  const iconColors = {
    blue: "text-blue-400 bg-blue-500/20",
    purple: "text-purple-400 bg-purple-500/20",
    green: "text-green-400 bg-green-500/20",
    orange: "text-orange-400 bg-orange-500/20",
    red: "text-red-400 bg-red-500/20",
  };

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ type: "spring", damping: 20 }}
      className={cn(
        "relative overflow-hidden rounded-2xl border bg-gradient-to-br p-6 backdrop-blur-sm",
        colorClasses[color as keyof typeof colorClasses]
      )}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-full -translate-y-1/2 translate-x-1/2" />
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
          iconColors[color as keyof typeof iconColors]
        )}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </motion.div>
  );
}