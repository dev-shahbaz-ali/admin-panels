"use client";

import { motion } from "framer-motion";
import { MessageSquare, Mail, User, Clock } from "lucide-react";
import { formatDate, truncateText } from "@/lib/utils";

const mockMessages = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    subject: "Project Collaboration",
    message: "I'm interested in collaborating on a new project...",
    read: false,
    createdAt: "2024-01-16T10:30:00",
  },
  {
    id: "2",
    name: "Mike Chen",
    email: "mike@example.com",
    subject: "Portfolio Feedback",
    message: "Great portfolio! I love the design and animations...",
    read: false,
    createdAt: "2024-01-15T14:20:00",
  },
  {
    id: "3",
    name: "Emily Davis",
    email: "emily@example.com",
    subject: "Job Opportunity",
    message: "We're looking for a senior developer for our team...",
    read: true,
    createdAt: "2024-01-14T09:15:00",
  },
];

export default function RecentMessages() {
  return (
    <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white">Recent Messages</h3>
          <p className="text-sm text-gray-400">Unread messages from visitors</p>
        </div>
        <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
          View All
        </button>
      </div>
      <div className="space-y-4">
        {mockMessages.map((message, index) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-4 rounded-xl transition-all duration-300 border ${
              !message.read
                ? "bg-blue-500/10 border-blue-500/20"
                : "bg-gray-700/20 border-transparent hover:border-gray-600/50"
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-medium text-white truncate">
                    {message.name}
                  </h4>
                  {!message.read && (
                    <span className="flex-shrink-0 h-2 w-2 rounded-full bg-blue-400"></span>
                  )}
                </div>
                <p className="text-sm text-gray-400 truncate">
                  {message.subject}
                </p>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                  {truncateText(message.message, 80)}
                </p>
                <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Mail className="h-3 w-3" />
                    {message.email}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {formatDate(message.createdAt)}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}