"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Search,
  Filter,
  Grid,
  List,
  Code2,
  TrendingUp,
  BarChart3,
} from "lucide-react";
import AddSkillModal from "@/components/skills/AddSkillModal";
import SkillCard from "@/components/skills/SkillCard";
import SkillListView from "@/components/skills/SkillListView";

// Mock initial skills
const initialSkills = [
  {
    id: "1",
    name: "React",
    category: "Frontend",
    level: 90,
    icon: "⚛️",
    description: "Building modern web applications with React and hooks",
  },
  {
    id: "2",
    name: "Next.js",
    category: "Frontend",
    level: 85,
    icon: "▲",
    description: "Server-side rendering and static site generation",
  },
  {
    id: "3",
    name: "TypeScript",
    category: "Language",
    level: 80,
    icon: "📘",
    description: "Type-safe JavaScript for large-scale applications",
  },
  {
    id: "4",
    name: "Node.js",
    category: "Backend",
    level: 75,
    icon: "🟢",
    description: "Building scalable server-side applications",
  },
  {
    id: "5",
    name: "TailwindCSS",
    category: "Frontend",
    level: 88,
    icon: "🎨",
    description: "Utility-first CSS framework for rapid UI development",
  },
  {
    id: "6",
    name: "Python",
    category: "Language",
    level: 70,
    icon: "🐍",
    description: "Data processing and backend development",
  },
  {
    id: "7",
    name: "PostgreSQL",
    category: "Database",
    level: 65,
    icon: "🐘",
    description: "Relational database management and optimization",
  },
  {
    id: "8",
    name: "Docker",
    category: "DevOps",
    level: 60,
    icon: "🐳",
    description: "Containerization and deployment automation",
  },
];

export default function SkillsPage() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [skills, setSkills] = useState(initialSkills);
  const [filteredSkills, setFilteredSkills] = useState(initialSkills);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingSkill, setEditingSkill] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"name" | "level">("level");

  // Get unique categories
  const categories = ["all", ...new Set(skills.map((s) => s.category))];

  // Filter and sort skills
  useEffect(() => {
    let filtered = skills;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (skill) =>
          skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          skill.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          skill.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter((skill) => skill.category === selectedCategory);
    }

    // Apply sorting
    filtered = [...filtered].sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      }
      return b.level - a.level;
    });

    setFilteredSkills(filtered);
  }, [skills, searchTerm, selectedCategory, sortBy]);

  const handleAddSkill = (newSkill: any) => {
    setSkills((prev) => [newSkill, ...prev]);
    setShowAddModal(false);
  };

  const handleEditSkill = (skill: any) => {
    setEditingSkill(skill);
    setShowAddModal(true);
  };

  const handleUpdateSkill = (updatedSkill: any) => {
    setSkills((prev) =>
      prev.map((skill) =>
        skill.id === updatedSkill.id ? updatedSkill : skill
      )
    );
    setEditingSkill(null);
    setShowAddModal(false);
  };

  const handleDeleteSkill = (id: string) => {
    if (confirm("Are you sure you want to delete this skill?")) {
      setSkills((prev) => prev.filter((skill) => skill.id !== id));
    }
  };

  // Calculate statistics
  const totalSkills = skills.length;
  const averageLevel = Math.round(
    skills.reduce((acc, skill) => acc + skill.level, 0) / totalSkills
  );
  const topSkill = skills.reduce((a, b) => (a.level > b.level ? a : b));
  const categoryCount = new Set(skills.map((s) => s.category)).size;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Skills</h1>
          <p className="text-gray-400 mt-1">Manage your technical skills</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setEditingSkill(null);
            setShowAddModal(true);
          }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl text-white font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-200"
        >
          <Plus className="h-4 w-4" />
          Add Skill
        </motion.button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm text-gray-400">Total Skills</span>
              <div className="text-2xl font-bold text-white mt-1">{totalSkills}</div>
            </div>
            <Code2 className="h-8 w-8 text-blue-400 opacity-50" />
          </div>
        </div>
        <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm text-gray-400">Avg Proficiency</span>
              <div className="text-2xl font-bold text-blue-400 mt-1">{averageLevel}%</div>
            </div>
            <BarChart3 className="h-8 w-8 text-purple-400 opacity-50" />
          </div>
        </div>
        <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm text-gray-400">Categories</span>
              <div className="text-2xl font-bold text-purple-400 mt-1">{categoryCount}</div>
            </div>
            <Filter className="h-8 w-8 text-green-400 opacity-50" />
          </div>
        </div>
        <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm text-gray-400">Top Skill</span>
              <div className="text-sm font-bold text-white mt-1 truncate">
                {topSkill?.name || "N/A"}
              </div>
            </div>
            <TrendingUp className="h-8 w-8 text-green-400 opacity-50" />
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-colors"
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-sm text-white focus:outline-none focus:border-blue-500/50 transition-colors"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === "all" ? "All Categories" : cat}
              </option>
            ))}
          </select>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "name" | "level")}
            className="px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-sm text-white focus:outline-none focus:border-blue-500/50 transition-colors"
          >
            <option value="level">Sort by Level</option>
            <option value="name">Sort by Name</option>
          </select>

          {/* View Toggle */}
          <div className="flex rounded-lg overflow-hidden border border-gray-700">
            <button
              onClick={() => setView("grid")}
              className={`p-2 transition-colors ${
                view === "grid"
                  ? "bg-blue-500/20 text-blue-400"
                  : "bg-transparent text-gray-400 hover:text-white"
              }`}
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setView("list")}
              className={`p-2 transition-colors ${
                view === "list"
                  ? "bg-blue-500/20 text-blue-400"
                  : "bg-transparent text-gray-400 hover:text-white"
              }`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Skills Grid/List */}
      <AnimatePresence mode="wait">
        {filteredSkills.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Code2 className="h-12 w-12 text-gray-600 mx-auto mb-3" />
            <div className="text-gray-400">
              {searchTerm || selectedCategory !== "all"
                ? "No skills match your filters"
                : "No skills added yet. Add your first skill!"}
            </div>
          </motion.div>
        ) : view === "grid" ? (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredSkills.map((skill) => (
              <SkillCard
                key={skill.id}
                skill={skill}
                onEdit={handleEditSkill}
                onDelete={handleDeleteSkill}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <SkillListView
              skills={filteredSkills}
              onEdit={handleEditSkill}
              onDelete={handleDeleteSkill}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Skill count */}
      <div className="text-sm text-gray-500">
        Showing {filteredSkills.length} of {skills.length} skills
      </div>

      {/* Add/Edit Skill Modal */}
      <AddSkillModal
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          setEditingSkill(null);
        }}
        onAdd={handleAddSkill}
        editingSkill={editingSkill}
        onUpdate={handleUpdateSkill}
      />
    </div>
  );
}