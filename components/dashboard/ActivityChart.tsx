"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ActivityData } from "@/types";

interface ActivityChartProps {
  data: ActivityData[];
}

export default function ActivityChart({ data }: ActivityChartProps) {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="name" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
            }}
            labelStyle={{ color: "#64748b" }}
          />
          <Area
            type="monotone"
            dataKey="views"
            stroke="#3B82F6"
            strokeWidth={2}
            fill="#3B82F6" fillOpacity={0.1}
          />
          <Area
            type="monotone"
            dataKey="visitors"
            stroke="#8B5CF6"
            strokeWidth={2}
            fill="#8B5CF6" fillOpacity={0.1}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
