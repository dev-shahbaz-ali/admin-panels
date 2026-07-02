"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  Filter, 
  Mail, 
  Inbox, 
  Check, 
  Trash2, 
  RefreshCw,
  AlertCircle
} from "lucide-react";
import MessageListItem from "@/components/messages/MessageListItem";
import MessageDetail from "@/components/messages/MessageDetail";
import ReplyModal from "@/components/messages/ReplyModal";

// Mock initial messages
const initialMessages = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    subject: "Project Collaboration",
    message: "I'm interested in collaborating on a new project. I have experience with React and Next.js and would love to work together. I've been following your work for a while and I'm really impressed with your portfolio.",
    read: false,
    createdAt: "2024-01-16T10:30:00",
  },
  {
    id: "2",
    name: "Mike Chen",
    email: "mike@example.com",
    subject: "Portfolio Feedback",
    message: "Great portfolio! I love the design and animations. The projects section is particularly impressive. I especially like the e-commerce platform you built. Would you be open to a quick call to discuss potential collaboration?",
    read: false,
    createdAt: "2024-01-15T14:20:00",
  },
  {
    id: "3",
    name: "Emily Davis",
    email: "emily@example.com",
    subject: "Job Opportunity",
    message: "We're looking for a senior developer for our team at TechCorp. Your portfolio caught our attention and we'd love to discuss an opportunity. We're working on exciting projects and we think you'd be a great fit.",
    read: true,
    createdAt: "2024-01-14T09:15:00",
  },
  {
    id: "4",
    name: "James Wilson",
    email: "james@example.com",
    subject: "Speaking Engagement",
    message: "We're organizing a tech conference and would love to have you as a speaker. Your work with Next.js and modern web development is inspiring. Let me know if you're interested.",
    read: true,
    createdAt: "2024-01-12T16:45:00",
  },
  {
    id: "5",
    name: "Lisa Anderson",
    email: "lisa@example.com",
    subject: "Design Collaboration",
    message: "I'm a UI/UX designer looking for a developer to collaborate with on a new project. I love your style and think we could create something amazing together. Let's chat!",
    read: false,
    createdAt: "2024-01-10T11:30:00",
  },
];

export default function MessagesPage() {
  const [messages, setMessages] = useState(initialMessages);
  const [filteredMessages, setFilteredMessages] = useState(initialMessages);
  const [selectedMessage, setSelectedMessage] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<"all" | "read" | "unread">("all");
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [replyTo, setReplyTo] = useState<any>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Filter messages
  useEffect(() => {
    let filtered = messages;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter((msg) =>
        msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.message.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply read/unread filter
    if (filter === "read") {
      filtered = filtered.filter((msg) => msg.read);
    } else if (filter === "unread") {
      filtered = filtered.filter((msg) => !msg.read);
    }

    setFilteredMessages(filtered);
  }, [messages, searchTerm, filter]);

  const handleSelectMessage = (message: any) => {
    setSelectedMessage(message);
    // Mark as read when selected
    if (!message.read) {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === message.id ? { ...msg, read: true } : msg
        )
      );
    }
  };

  const handleToggleRead = (id: string) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === id ? { ...msg, read: !msg.read } : msg
      )
    );
    // Update selected message if it's the same
    if (selectedMessage?.id === id) {
      setSelectedMessage((prev: any) => ({ ...prev, read: !prev.read }));
    }
  };

  const handleDeleteMessage = (id: string) => {
    if (confirm("Are you sure you want to delete this message?")) {
      setMessages((prev) => prev.filter((msg) => msg.id !== id));
      if (selectedMessage?.id === id) {
        setSelectedMessage(null);
      }
    }
  };

  const handleDeleteSelected = () => {
    if (!selectedMessage) return;
    handleDeleteMessage(selectedMessage.id);
  };

  const handleReply = (message: any) => {
    setReplyTo(message);
    setShowReplyModal(true);
  };

  const handleSendReply = (reply: string) => {
    console.log(`Reply sent to ${replyTo.name} (${replyTo.email}):`, reply);
    // In a real app, you would send this to your backend
    alert(`Reply sent to ${replyTo.name} successfully!`);
    setShowReplyModal(false);
    setReplyTo(null);
  };

  const handleMarkAllRead = () => {
    setMessages((prev) =>
      prev.map((msg) => ({ ...msg, read: true }))
    );
    if (selectedMessage) {
      setSelectedMessage((prev: any) => ({ ...prev, read: true }));
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsRefreshing(false);
    // In a real app, you would fetch new messages here
  };

  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Messages</h1>
          <p className="text-gray-400 mt-1">Manage your incoming messages</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium">
            {unreadCount} Unread
          </span>
          <button
            onClick={handleMarkAllRead}
            className="px-3 py-1 bg-gray-700/50 hover:bg-gray-700/70 rounded-lg text-sm text-white transition-colors"
          >
            Mark All Read
          </button>
          <button
            onClick={handleRefresh}
            className={`p-2 rounded-lg hover:bg-gray-700/30 transition-colors text-gray-400 hover:text-white ${
              isRefreshing ? "animate-spin" : ""
            }`}
          >
            <RefreshCw className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search messages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-colors"
          />
        </div>
        <div className="flex items-center gap-2">
          {/* Filter Dropdown */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-sm text-white focus:outline-none focus:border-blue-500/50 transition-colors"
          >
            <option value="all">All Messages</option>
            <option value="unread">Unread</option>
            <option value="read">Read</option>
          </select>

          {/* Delete Selected Button */}
          {selectedMessage && (
            <button
              onClick={handleDeleteSelected}
              className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 transition-colors"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      {/* Messages Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Message List */}
        <div className="lg:col-span-1">
          <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
            {filteredMessages.length === 0 ? (
              <div className="text-center py-8">
                <Inbox className="h-12 w-12 text-gray-600 mx-auto mb-3" />
                <p className="text-gray-400">No messages found</p>
                <p className="text-sm text-gray-500 mt-1">
                  {searchTerm || filter !== "all" 
                    ? "Try adjusting your filters" 
                    : "Your inbox is empty"}
                </p>
              </div>
            ) : (
              filteredMessages.map((message) => (
                <MessageListItem
                  key={message.id}
                  message={message}
                  isSelected={selectedMessage?.id === message.id}
                  onClick={() => handleSelectMessage(message)}
                />
              ))
            )}
          </div>
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {selectedMessage ? (
              <MessageDetail
                key={selectedMessage.id}
                message={selectedMessage}
                onBack={() => setSelectedMessage(null)}
                onReply={handleReply}
                onDelete={handleDeleteMessage}
                onToggleRead={handleToggleRead}
              />
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-12 text-center"
              >
                <Mail className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-400">Select a message</h3>
                <p className="text-gray-500 mt-2">Choose a message from the list to view it</p>
                <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-blue-400"></span>
                    Unread
                  </span>
                  <span className="mx-2">•</span>
                  <span className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-gray-500"></span>
                    Read
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">Total</span>
            <span className="text-lg font-bold text-white">{messages.length}</span>
          </div>
        </div>
        <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">Unread</span>
            <span className="text-lg font-bold text-blue-400">{unreadCount}</span>
          </div>
        </div>
        <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">Read</span>
            <span className="text-lg font-bold text-green-400">{messages.length - unreadCount}</span>
          </div>
        </div>
        <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">Filtered</span>
            <span className="text-lg font-bold text-purple-400">{filteredMessages.length}</span>
          </div>
        </div>
      </div>

      {/* Reply Modal */}
      {replyTo && (
        <ReplyModal
          isOpen={showReplyModal}
          onClose={() => {
            setShowReplyModal(false);
            setReplyTo(null);
          }}
          onSend={handleSendReply}
          recipientName={replyTo.name}
          recipientEmail={replyTo.email}
        />
      )}
    </div>
  );
}