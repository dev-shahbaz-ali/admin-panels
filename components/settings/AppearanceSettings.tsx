"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Palette, Monitor, Moon, Sun, Save, Check } from "lucide-react";

interface AppearanceSettingsProps {
  appearance: any;
  onUpdate: (data: any) => void;
}

export default function AppearanceSettings({ appearance, onUpdate }: AppearanceSettingsProps) {
  const [settings, setSettings] = useState(appearance);
  const [isSaving, setIsSaving] = useState(false);

  const handleThemeChange = (theme: string) => {
    setSettings((prev: any) => ({ ...prev, theme }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    onUpdate(settings);
    setIsSaving(false);
  };

  const themes = [
    { id: "dark", icon: Moon, label: "Dark" },
    { id: "light", icon: Sun, label: "Light" },
    { id: "system", icon: Monitor, label: "System" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6"
    >
      <h2 className="text-xl font-semibold text-white mb-6">Appearance Settings</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Theme Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-3">Theme</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {themes.map((theme) => {
              const Icon = theme.icon;
              const isActive = settings.theme === theme.id;
              
              return (
                <button
                  key={theme.id}
                  type="button"
                  onClick={() => handleThemeChange(theme.id)}
                  className={`relative p-4 rounded-xl border-2 transition-all ${
                    isActive
                      ? "border-blue-500 bg-blue-500/10"
                      : "border-gray-700 hover:border-gray-500"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      isActive ? "bg-blue-500/20 text-blue-400" : "bg-gray-700/30 text-gray-400"
                    }`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className={`text-sm font-medium ${
                      isActive ? "text-white" : "text-gray-400"
                    }`}>
                      {theme.label}
                    </span>
                  </div>
                  {isActive && (
                    <div className="absolute top-2 right-2">
                      <Check className="h-4 w-4 text-blue-400" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Accent Color */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-3">Accent Color</label>
          <div className="flex gap-3 flex-wrap">
            {["blue", "purple", "green", "red", "orange", "pink"].map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => setSettings((prev: any) => ({ ...prev, accentColor: color }))}
                className={`w-10 h-10 rounded-full border-2 transition-all ${
                  settings.accentColor === color
                    ? "border-white scale-110"
                    : "border-transparent hover:scale-105"
                }`}
                style={{ backgroundColor: `var(--color-${color}-500)` }}
              />
            ))}
          </div>
        </div>

        {/* Font Size */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-3">Font Size</label>
          <div className="flex gap-3">
            {["small", "medium", "large"].map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setSettings((prev: any) => ({ ...prev, fontSize: size }))}
                className={`px-4 py-2 rounded-xl transition-all ${
                  settings.fontSize === size
                    ? "bg-blue-500/20 border border-blue-500/50 text-white"
                    : "bg-gray-700/30 border border-transparent text-gray-400 hover:text-white"
                }`}
              >
                <span className="capitalize">{size}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <div className="pt-4 border-t border-gray-700/50 flex justify-end">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl text-white font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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