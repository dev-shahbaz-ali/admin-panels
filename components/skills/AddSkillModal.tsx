"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Upload, XCircle, Hash, Tag, Layers, TrendingUp } from "lucide-react";

interface AddSkillModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (skill: any) => void;
  editingSkill?: any;
  onUpdate?: (skill: any) => void;
}

export default function AddSkillModal({
  isOpen,
  onClose,
  onAdd,
  editingSkill,
  onUpdate,
}: AddSkillModalProps) {
  const [formData, setFormData] = useState({
    name: editingSkill?.name || "",
    category: editingSkill?.category || "Frontend",
    level: editingSkill?.level || 50,
    icon: editingSkill?.icon || "",
    description: editingSkill?.description || "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEditing = !!editingSkill;

  const categories = [
    "Frontend",
    "Backend",
    "Language",
    "Database",
    "DevOps",
    "Design",
    "Testing",
    "Other",
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? parseInt(value) || 0 : value,
    }));
  };

  const handleLevelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    setFormData((prev) => ({ ...prev, level: Math.min(100, Math.max(0, value)) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    const skillData = {
      id: isEditing ? editingSkill.id : Date.now().toString(),
      ...formData,
      level: formData.level,
    };

    if (isEditing && onUpdate) {
      onUpdate(skillData);
    } else {
      onAdd(skillData);
    }

    setIsSubmitting(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: "",
      category: "Frontend",
      level: 50,
      icon: "",
      description: "",
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-gray-800 rounded-2xl border border-gray-700 shadow-2xl"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between p-6 bg-gray-800 border-b border-gray-700">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-600 rounded-lg">
                  {isEditing ? (
                    <TrendingUp className="h-5 w-5 text-white" />
                  ) : (
                    <Plus className="h-5 w-5 text-white" />
                  )}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    {isEditing ? "Edit Skill" : "Add New Skill"}
                  </h2>
                  <p className="text-sm text-gray-400 mt-1">
                    {isEditing ? "Update your skill details" : "Add a new skill to your portfolio"}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-gray-700 transition-colors text-gray-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Skill Name */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                  <Hash className="h-4 w-4" />
                  Skill Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., React, TypeScript, Node.js"
                  required
                  className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all"
                />
              </div>

              {/* Category */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                  <Layers className="h-4 w-4" />
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-all"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Level */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                  <TrendingUp className="h-4 w-4" />
                  Proficiency Level: {formData.level}%
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    name="level"
                    value={formData.level}
                    onChange={handleLevelChange}
                    min="0"
                    max="100"
                    className="flex-1 h-2 bg-gray-600 rounded-full appearance-none cursor-pointer accent-blue-600"
                    style={{
                      background: `linear-gradient(to right, #2563EB 0%, #2563EB ${formData.level}%, #4B5563 ${formData.level}%, #4B5563 100%)`,
                    }}
                  />
                  <span className="text-sm font-medium text-white min-w-[40px] text-center">
                    {formData.level}%
                  </span>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Beginner</span>
                  <span>Intermediate</span>
                  <span>Expert</span>
                </div>
              </div>

              {/* Icon/Emoji */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                  <Tag className="h-4 w-4" />
                  Icon or Emoji
                </label>
                <input
                  type="text"
                  name="icon"
                  value={formData.icon}
                  onChange={handleInputChange}
                  placeholder="e.g., ⚛️, 📱, 🎨"
                  className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all"
                />
                <p className="text-xs text-gray-500 mt-1">Add an emoji or icon to represent your skill</p>
              </div>

              {/* Description */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                  <Tag className="h-4 w-4" />
                  Description (Optional)
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Brief description of your experience with this skill..."
                  className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all resize-none"
                />
              </div>

              {/* Form Actions */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-700">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-2.5 bg-gray-700 hover:bg-gray-600 rounded-xl text-white font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      {isEditing ? "Updating..." : "Adding..."}
                    </>
                  ) : (
                    <>
                      <Plus className="h-5 w-5" />
                      {isEditing ? "Update Skill" : "Add Skill"}
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}