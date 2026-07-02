"use client";

import { motion } from "framer-motion";
import { User, Calendar, Mail } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface MessageListItemProps {
  message: any;
  isSelected: boolean;
  onClick: () => void;
}

export default function MessageListItem({ message, isSelected, onClick }: MessageListItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
      className={`p-4 rounded-xl cursor-pointer transition-all duration-300 border ${
        isSelected
          ? "bg-blue-500/10 border-blue-500/20"
          : !message.read
          ? "bg-gray-800/30 border-gray-700/50 hover:border-gray-600"
          : "bg-gray-800/20 border-gray-700/30 hover:border-gray-600/50"
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
            <User className="h-5 w-5 text-white" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h4 className="font-medium text-white truncate">
              {message.name}
            </h4>
            {!message.read && (
              <span className="flex-shrink-0 h-2 w-2 rounded-full bg-blue-400 animate-pulse"></span>
            )}
          </div>
          <p className="text-sm text-gray-400 truncate">{message.subject}</p>
          <p className="text-sm text-gray-500 mt-1 line-clamp-1">
            {message.message}
          </p>
          <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <Mail className="h-3 w-3" />
              {message.email}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {formatDate(message.createdAt)}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}