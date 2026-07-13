"use client";

import { motion } from "framer-motion";
import { Edit, Trash2, TrendingUp } from "lucide-react";

interface SkillListViewProps {
  skills: any[];
  onEdit: (skill: any) => void;
  onDelete: (id: string) => void;
}

export default function SkillListView({ skills, onEdit, onDelete }: SkillListViewProps) {
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
    <div className="bg-black/30 backdrop-blur-sm border border-gray-800/50 rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-black/50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Skill
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Proficiency
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Level
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/50">
            {skills.map((skill) => (
              <motion.tr
                key={skill.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="hover:bg-gray-900/40 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {skill.icon && (
                      <span className="text-xl">{skill.icon}</span>
                    )}
                    <div>
                      <div className="text-sm font-medium text-white">
                        {skill.name}
                      </div>
                      {skill.description && (
                        <div className="text-xs text-gray-400">
                          {skill.description}
                        </div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-0.5 text-xs rounded-full bg-gray-800/50 text-gray-300">
                    {skill.category}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 min-w-[100px]">
                      <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            skill.level >= 80
                              ? "bg-green-500"
                              : skill.level >= 60
                              ? "bg-blue-500"
                              : skill.level >= 40
                              ? "bg-yellow-500"
                              : "bg-red-500"
                          }`}
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`text-sm font-medium ${getLevelColor(skill.level)}`}>
                    {skill.level}% ({getLevelText(skill.level)})
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onEdit(skill)}
                      className="p-1 rounded hover:bg-gray-700/50 text-gray-400 hover:text-white transition-colors"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onDelete(skill.id)}
                      className="p-1 rounded hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}