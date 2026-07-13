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
  Layers,
  Award,
  ChevronDown,
  SortAsc,
  Hash,
  Star,
  Zap,
  Globe,
  Database,
  Server,
  Palette,
  Terminal,
  Cloud,
  Shield,
  Cpu,
  Smartphone,
  Layout,
  GitBranch,
  Feather,
  Box,
  Codelab,
  Braces,
  Rocket,
  Book,
  Sparkles,
} from "lucide-react";
import AddSkillModal from "@/components/skills/AddSkillModal";
import SkillCard from "@/components/skills/SkillCard";
import SkillListView from "@/components/skills/SkillListView";

// Mock initial skills with React icons
const initialSkills = [
  {
    id: "1",
    name: "React",
    category: "Frontend",
    level: 90,
    icon: "React",
    description: "Building modern web applications with React and hooks",
  },
  {
    id: "2",
    name: "Next.js",
    category: "Frontend",
    level: 85,
    icon: "Next.js",
    description: "Server-side rendering and static site generation",
  },
  {
    id: "3",
    name: "TypeScript",
    category: "Language",
    level: 80,
    icon: "TypeScript",
    description: "Type-safe JavaScript for large-scale applications",
  },
  {
    id: "4",
    name: "Node.js",
    category: "Backend",
    level: 75,
    icon: "Node.js",
    description: "Building scalable server-side applications",
  },
  {
    id: "5",
    name: "TailwindCSS",
    category: "Frontend",
    level: 88,
    icon: "TailwindCSS",
    description: "Utility-first CSS framework for rapid UI development",
  },
  {
    id: "6",
    name: "Python",
    category: "Language",
    level: 70,
    icon: "Python",
    description: "Data processing and backend development",
  },
  {
    id: "7",
    name: "PostgreSQL",
    category: "Database",
    level: 65,
    icon: "PostgreSQL",
    description: "Relational database management and optimization",
  },
  {
    id: "8",
    name: "Docker",
    category: "DevOps",
    level: 60,
    icon: "Docker",
    description: "Containerization and deployment automation",
  },
];

// Category icon mapping
const categoryIcons: Record<string, any> = {
  Frontend: Layout,
  Backend: Server,
  Language: Braces,
  Database: Database,
  DevOps: Cloud,
  Design: Palette,
  Testing: Shield,
  Other: Box,
};

// Skill icon mapping (for display purposes)
const skillIcons: Record<string, any> = {
  React: Code2,
  "Next.js": Rocket,
  TypeScript: Book,
  "Node.js": Server,
  TailwindCSS: Palette,
  Python: Terminal,
  PostgreSQL: Database,
  Docker: Box,
};

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

    if (searchTerm) {
      filtered = filtered.filter(
        (skill) =>
          skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          skill.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          skill.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter((skill) => skill.category === selectedCategory);
    }

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

  // Get icon for skill
  const getSkillIcon = (skillName: string) => {
    const Icon = skillIcons[skillName];
    return Icon || Code2;
  };

  // Get icon for category
  const getCategoryIcon = (category: string) => {
    const Icon = categoryIcons[category];
    return Icon || Box;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-600 rounded-xl">
            <Code2 className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Skills</h1>
            <p className="text-gray-400 mt-1">Manage your technical skills</p>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setEditingSkill(null);
            setShowAddModal(true);
          }}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 rounded-xl text-white font-medium hover:bg-blue-700 transition-all duration-200 shadow-lg shadow-blue-600/20"
        >
          <Plus className="h-4 w-4" />
          Add Skill
        </motion.button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-800 border border-gray-700 rounded-xl p-4 hover:border-blue-600 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm text-gray-400">Total Skills</span>
              <div className="text-2xl font-bold text-white mt-1">{totalSkills}</div>
            </div>
            <div className="p-2.5 bg-blue-600 rounded-xl">
              <Code2 className="h-5 w-5 text-white" />
            </div>
          </div>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800 border border-gray-700 rounded-xl p-4 hover:border-purple-600 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm text-gray-400">Avg Proficiency</span>
              <div className="text-2xl font-bold text-blue-400 mt-1">{averageLevel}%</div>
            </div>
            <div className="p-2.5 bg-purple-600 rounded-xl">
              <BarChart3 className="h-5 w-5 text-white" />
            </div>
          </div>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-800 border border-gray-700 rounded-xl p-4 hover:border-green-600 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm text-gray-400">Categories</span>
              <div className="text-2xl font-bold text-purple-400 mt-1">{categoryCount}</div>
            </div>
            <div className="p-2.5 bg-green-600 rounded-xl">
              <Layers className="h-5 w-5 text-white" />
            </div>
          </div>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-800 border border-gray-700 rounded-xl p-4 hover:border-yellow-600 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm text-gray-400">Top Skill</span>
              <div className="text-sm font-bold text-white mt-1 truncate flex items-center gap-1">
                <Award className="h-4 w-4 text-yellow-400" />
                {topSkill?.name || "N/A"}
              </div>
            </div>
            <div className="p-2.5 bg-yellow-600 rounded-xl">
              <Star className="h-5 w-5 text-white" />
            </div>
          </div>
        </motion.div>
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
            className="w-full pl-9 pr-4 py-2.5 bg-gray-700 border border-gray-600 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {/* Category Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="pl-9 pr-8 py-2.5 bg-gray-700 border border-gray-600 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all appearance-none min-w-[140px]"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === "all" ? "All Categories" : cat}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          </div>

          {/* Sort By */}
          <div className="relative">
            {sortBy === "level" ? (
              <TrendingUp className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            ) : (
              <SortAsc className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            )}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "name" | "level")}
              className="pl-9 pr-8 py-2.5 bg-gray-700 border border-gray-600 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all appearance-none min-w-[140px]"
            >
              <option value="level">Sort by Level</option>
              <option value="name">Sort by Name</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          </div>

          {/* View Toggle */}
          <div className="flex rounded-xl overflow-hidden border border-gray-600">
            <button
              onClick={() => setView("grid")}
              className={`p-2.5 transition-all ${
                view === "grid"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 text-gray-400 hover:text-white hover:bg-gray-600"
              }`}
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setView("list")}
              className={`p-2.5 transition-all ${
                view === "list"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 text-gray-400 hover:text-white hover:bg-gray-600"
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
            className="text-center py-16 bg-gray-800 border border-gray-700 rounded-2xl"
          >
            <div className="flex flex-col items-center">
              <div className="p-4 bg-gray-700 rounded-full mb-4">
                <Code2 className="h-12 w-12 text-gray-500" />
              </div>
              <div className="text-gray-400">
                {searchTerm || selectedCategory !== "all"
                  ? "No skills match your filters"
                  : "No skills added yet. Add your first skill!"}
              </div>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="mt-3 text-sm text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Clear search
                </button>
              )}
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
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>Showing {filteredSkills.length} of {skills.length} skills</span>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5">
            <Star className="h-3.5 w-3.5 text-yellow-400" />
            <span>Top: {topSkill?.name || "N/A"} ({topSkill?.level || 0}%)</span>
          </span>
          <span className="text-gray-600">|</span>
          <span className="flex items-center gap-1.5">
            <Layers className="h-3.5 w-3.5 text-purple-400" />
            <span>{categoryCount} categories</span>
          </span>
        </div>
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