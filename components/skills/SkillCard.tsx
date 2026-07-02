"use client";

import { motion } from "framer-motion";
import { Edit, Trash2, TrendingUp } from "lucide-react";

interface SkillCardProps {
  skill: any;
  onEdit: (skill: any) => void;
  onDelete: (id: string) => void;
}

export default function SkillCard({ skill, onEdit, onDelete }: SkillCardProps) {
  const getLevelColor = (level: number) => {
    if (level >= 80) return "text-green-400";
    if (level >= 60) return "text-blue-400";
    if (level >= 40) return "text-yellow-400";
    return "text-red-400";
  };

  const getLevelText = (level: number) => {
    if (level >= 80) return "Expert";
    if (level >= 60) return "Advanced";
    if (level >= 40) return "Intermediate";
    return "Beginner";
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -4 }}
      className="group bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-gray-600 transition-all duration-300"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            {skill.icon && (
              <span className="text-2xl">{skill.icon}</span>
            )}
            <h3 className="font-semibold text-white group-hover:text-blue-400 transition-colors">
              {skill.name}
            </h3>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <span className="px-2 py-0.5 text-xs rounded-full bg-gray-700/50 text-gray-300">
              {skill.category}
            </span>
            <span className={`text-xs font-medium ${getLevelColor(skill.level)}`}>
              {getLevelText(skill.level)}
            </span>
          </div>
          {skill.description && (
            <p className="text-sm text-gray-400 mt-2 line-clamp-2">
              {skill.description}
            </p>
          )}
        </div>
        <div className="flex gap-1 ml-4">
          <button
            onClick={() => onEdit(skill)}
            className="p-1.5 rounded-lg hover:bg-gray-600/50 transition-colors text-gray-400 hover:text-white"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(skill.id)}
            className="p-1.5 rounded-lg hover:bg-red-500/20 transition-colors text-gray-400 hover:text-red-400"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-4">
        <div className="flex items-center justify-between text-sm mb-1">
          <span className="text-gray-400">Proficiency</span>
          <span className="text-white font-medium">{skill.level}%</span>
        </div>
        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${skill.level}%` }}
            transition={{ duration: 1, delay: 0.2 }}
            className={`h-full rounded-full bg-gradient-to-r ${
              skill.level >= 80
                ? "from-green-500 to-emerald-500"
                : skill.level >= 60
                ? "from-blue-500 to-cyan-500"
                : skill.level >= 40
                ? "from-yellow-500 to-orange-500"
                : "from-red-500 to-pink-500"
            }`}
          />
        </div>
      </div>
    </motion.div>
  );
}