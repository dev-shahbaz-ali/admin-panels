"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Bell,
  Palette,
  Lock,
  Globe,
  Check,
  Shield,
} from "lucide-react";
import ProfileSettings from "@/components/settings/ProfileSettings";
import NotificationSettings from "@/components/settings/NotificationSettings";
import AppearanceSettings from "@/components/settings/AppearanceSettings";
import SecuritySettings from "@/components/settings/SecuritySettings";

const initialProfile = {
  name: "John Doe",
  email: "john.doe@example.com",
  username: "johndoe",
  role: "Administrator",
  bio: "Full-stack developer passionate about creating beautiful and functional web applications.",
  avatar: null,
  joined: "2024-01-01",
};

const initialNotifications = {
  emailNotifications: true,
  pushNotifications: false,
  messageAlerts: true,
  projectUpdates: true,
  systemUpdates: false,
};

const initialAppearance = {
  theme: "light",
  accentColor: "blue",
  fontSize: "medium",
};

const initialSecurity = {
  twoFactorAuth: false,
  lastPasswordChange: "2024-01-15",
  loginHistory: [
    { date: "2024-01-20 10:30", device: "Chrome on Windows", ip: "192.168.1.1" },
    { date: "2024-01-19 15:45", device: "Firefox on Mac", ip: "192.168.1.2" },
    { date: "2024-01-18 09:20", device: "Safari on iPhone", ip: "192.168.1.3" },
  ],
};

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [profile, setProfile] = useState(initialProfile);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [appearance, setAppearance] = useState(initialAppearance);
  const [security, setSecurity] = useState(initialSecurity);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "security", label: "Security", icon: Lock },
  ];

  const handleProfileUpdate = (data: any) => {
    setProfile(data);
    showSaveSuccess("Profile settings updated successfully!");
  };

  const handleNotificationsUpdate = (data: any) => {
    setNotifications(data);
    showSaveSuccess("Notification settings updated successfully!");
  };

  const handleAppearanceUpdate = (data: any) => {
    setAppearance(data);
    showSaveSuccess("Appearance settings updated successfully!");
  };

  const handleSecurityUpdate = (data: any) => {
    setSecurity((prev: any) => ({ ...prev, ...data }));
    showSaveSuccess("Security settings updated successfully!");
  };

  const showSaveSuccess = (message: string) => {
    setSaveMessage(message);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      setSaveMessage("");
    }, 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2.5 bg-blue-600 rounded-xl">
          <Shield className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white">Settings</h1>
          <p className="text-gray-400 mt-1">Manage your account and preferences</p>
        </div>
      </div>

      {/* Success Message */}
      <AnimatePresence>
        {saveSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex items-center gap-3 p-4 bg-green-600/10 border border-green-600/20 rounded-xl"
          >
            <Check className="h-5 w-5 text-green-400" />
            <span className="text-green-400">{saveMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Settings Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-20 bg-gray-800 border border-gray-700 rounded-2xl p-4">
            <nav className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                      isActive
                        ? "bg-blue-600 text-white"
                        : "text-gray-400 hover:text-white hover:bg-gray-700"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="text-sm font-medium">{tab.label}</span>
                    {isActive && (
                      <div className="ml-auto h-1.5 w-1.5 rounded-full bg-white" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Account Info */}
            <div className="mt-6 pt-6 border-t border-gray-700">
              <div className="flex items-center gap-3 px-3">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                  <span className="text-sm font-bold text-white">
                    {profile.name?.charAt(0) || "U"}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    {profile.name}
                  </p>
                  <p className="text-xs text-gray-400 truncate">
                    {profile.role}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <AnimatePresence mode="wait">
            {activeTab === "profile" && (
              <ProfileSettings
                key="profile"
                profile={profile}
                onUpdate={handleProfileUpdate}
              />
            )}
            {activeTab === "notifications" && (
              <NotificationSettings
                key="notifications"
                notifications={notifications}
                onUpdate={handleNotificationsUpdate}
              />
            )}
            {activeTab === "appearance" && (
              <AppearanceSettings
                key="appearance"
                appearance={appearance}
                onUpdate={handleAppearanceUpdate}
              />
            )}
            {activeTab === "security" && (
              <SecuritySettings
                key="security"
                security={security}
                onUpdate={handleSecurityUpdate}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
