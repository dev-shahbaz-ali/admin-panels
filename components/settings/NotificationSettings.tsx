"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Bell, Mail, MessageSquare, Users, Zap, Save } from "lucide-react";

interface NotificationSettingsProps {
  notifications: any;
  onUpdate: (data: any) => void;
}

export default function NotificationSettings({ notifications, onUpdate }: NotificationSettingsProps) {
  const [settings, setSettings] = useState(notifications);
  const [isSaving, setIsSaving] = useState(false);

  const handleToggle = (key: string) => {
    setSettings((prev: any) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    onUpdate(settings);
    setIsSaving(false);
  };

  const notificationOptions = [
    { key: "emailNotifications", icon: Mail, label: "Email Notifications", description: "Receive notifications via email" },
    { key: "pushNotifications", icon: Bell, label: "Push Notifications", description: "Receive push notifications in browser" },
    { key: "messageAlerts", icon: MessageSquare, label: "Message Alerts", description: "Get notified when you receive new messages" },
    { key: "projectUpdates", icon: Users, label: "Project Updates", description: "Receive updates about your projects" },
    { key: "systemUpdates", icon: Zap, label: "System Updates", description: "Get notified about system updates" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800 border border-gray-700 rounded-2xl p-6"
    >
      <h2 className="text-xl font-semibold text-white mb-6">Notification Settings</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {notificationOptions.map((option) => {
          const Icon = option.icon;
          const isEnabled = settings[option.key] || false;
          
          return (
            <div
              key={option.key}
              className="flex items-center justify-between p-4 bg-gray-700 rounded-xl hover:bg-gray-600 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${
                  isEnabled ? "bg-blue-600 text-white" : "bg-gray-600 text-gray-400"
                }`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{option.label}</p>
                  <p className="text-xs text-gray-400">{option.description}</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={isEnabled}
                  onChange={() => handleToggle(option.key)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:bg-blue-600 transition-colors">
                  <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                    isEnabled ? "translate-x-5" : ""
                  }`} />
                </div>
              </label>
            </div>
          );
        })}

        {/* Save Button */}
        <div className="pt-4 border-t border-gray-700 flex justify-end">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 rounded-xl text-white font-medium hover:bg-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Save Changes
              </>
            )}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
}