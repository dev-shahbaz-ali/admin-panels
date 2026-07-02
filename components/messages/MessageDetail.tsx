"use client";

import { motion } from "framer-motion";
import { User, Mail, Calendar, Reply, Trash2, Check, X, ArrowLeft } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface MessageDetailProps {
  message: any;
  onBack: () => void;
  onReply: (message: any) => void;
  onDelete: (id: string) => void;
  onToggleRead: (id: string) => void;
}

export default function MessageDetail({
  message,
  onBack,
  onReply,
  onDelete,
  onToggleRead,
}: MessageDetailProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="text-sm">Back to messages</span>
        </button>
        <div className="flex gap-2">
          <button
            onClick={() => onToggleRead(message.id)}
            className={`p-2 rounded-lg transition-colors ${
              message.read
                ? "bg-gray-700/30 text-gray-400 hover:bg-gray-700/50"
                : "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30"
            }`}
            title={message.read ? "Mark as unread" : "Mark as read"}
          >
            {message.read ? <X className="h-5 w-5" /> : <Check className="h-5 w-5" />}
          </button>
          <button
            onClick={() => onReply(message)}
            className="p-2 rounded-lg bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 transition-colors"
            title="Reply to message"
          >
            <Reply className="h-5 w-5" />
          </button>
          <button
            onClick={() => onDelete(message.id)}
            className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
            title="Delete message"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Message Content */}
      <div className="space-y-6">
        {/* Sender Info */}
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
              <User className="h-6 w-6 text-white" />
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 flex-wrap">
              <h3 className="text-xl font-semibold text-white">{message.name}</h3>
              {!message.read && (
                <span className="px-2 py-0.5 text-xs rounded-full bg-blue-500/20 text-blue-400">
                  New
                </span>
              )}
            </div>
            <div className="flex items-center gap-4 mt-1 text-sm text-gray-400">
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

        {/* Subject */}
        <div>
          <h4 className="text-lg font-medium text-white">Subject: {message.subject}</h4>
        </div>

        {/* Message Body */}
        <div className="bg-gray-900/30 rounded-xl p-4">
          <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
            {message.message}
          </p>
        </div>

        {/* Quick Reply */}
        <div className="pt-4 border-t border-gray-700/50">
          <h5 className="text-sm font-medium text-gray-300 mb-3">Quick Reply</h5>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Type a quick reply..."
              className="flex-1 px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-colors"
            />
            <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-white font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all">
              Send
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}