"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search, Filter, Grid, List, ExternalLink, X } from "lucide-react";
import AddProjectModal from "@/components/projects/AddProjectModal";

// Mock initial projects
const initialProjects = [
  {
    id: "1",
    title: "E-commerce Platform",
    description: "Full-stack e-commerce with Next.js and Stripe",
    technologies: ["React", "Next.js", "TypeScript"],
    image: "/placeholder-project.jpg",
    liveUrl: "#",
    githubUrl: "#",
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    title: "Client portal redesign",
    description: "A clear, responsive workspace for a growing services team",
    technologies: ["Next.js", "TypeScript", "PostgreSQL"],
    image: "/placeholder-project.jpg",
    liveUrl: "#",
    githubUrl: "#",
    createdAt: "2024-01-10",
  },
  {
    id: "3",
    title: "Portfolio Website",
    description: "Modern portfolio with glass-morphism design",
    technologies: ["Next.js", "TailwindCSS", "Framer"],
    image: "/placeholder-project.jpg",
    liveUrl: "#",
    githubUrl: "#",
    createdAt: "2024-01-05",
  },
  {
    id: "4",
    title: "Task Management App",
    description: "Collaborative task management with real-time updates",
    technologies: ["React", "Firebase", "TailwindCSS"],
    image: "/placeholder-project.jpg",
    liveUrl: "#",
    githubUrl: "#",
    createdAt: "2024-01-01",
  },
  {
    id: "5",
    title: "Weather Dashboard",
    description: "Real-time weather tracking with interactive maps",
    technologies: ["React", "Leaflet", "OpenWeather"],
    image: "/placeholder-project.jpg",
    liveUrl: "#",
    githubUrl: "#",
    createdAt: "2023-12-28",
  },
  {
    id: "6",
    title: "Social Media Analytics",
    description: "Analytics dashboard for social media metrics",
    technologies: ["Next.js", "Chart.js", "TailwindCSS"],
    image: "/placeholder-project.jpg",
    liveUrl: "#",
    githubUrl: "#",
    createdAt: "2023-12-20",
  },
];

export default function ProjectsPage() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [projects, setProjects] = useState(initialProjects);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProject, setSelectedProject] = useState<any>(null);

  const handleAddProject = (newProject: any) => {
    setProjects((prev) => [newProject, ...prev]);
    setShowAddModal(false);
  };

  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.technologies.some((tech) =>
      tech.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleDeleteProject = (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      setProjects((prev) => prev.filter((project) => project.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Projects</h1>
          <p className="text-gray-400 mt-1">Manage your portfolio projects</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-xl text-white font-medium hover:bg-blue-700 transition-all duration-200 cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          Add Project
        </motion.button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-colors"
          />
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-lg hover:bg-gray-700/30 transition-colors text-gray-400 hover:text-white">
            <Filter className="h-5 w-5" />
          </button>
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

      {/* Projects Grid/List */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400">No projects found</div>
        </div>
      ) : view === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden hover:border-gray-600 transition-all duration-300"
            >
              <div className="aspect-video bg-blue-500/10 relative">
                {/* Action buttons overlay */}
                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleDeleteProject(project.id)}
                    className="p-1.5 rounded-lg bg-red-500/80 hover:bg-red-500 text-white transition-colors"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
                <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50">
                  <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors">
                    <ExternalLink className="h-5 w-5" />
                  </button>
                  <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors">
                    {/* Replaced non-existent Lucide Github component with direct SVG */}
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.15 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.62.24 2.85.12 3.15.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-white group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-400 mt-1 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 text-xs rounded-full bg-gray-700/50 text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-0.5 text-xs rounded-full bg-gray-700/50 text-gray-300">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>
                <div className="mt-3 text-xs text-gray-500">
                  Added {new Date(project.createdAt).toLocaleDateString()}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-800/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Project
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Technologies
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Date Added
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700/50">
                {filteredProjects.map((project) => (
                  <tr key={project.id} className="hover:bg-gray-700/20 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-white">{project.title}</div>
                        <div className="text-sm text-gray-400">{project.description}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.slice(0, 2).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 text-xs rounded-full bg-gray-700/50 text-gray-300"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 2 && (
                          <span className="px-2 py-0.5 text-xs rounded-full bg-gray-700/50 text-gray-300">
                            +{project.technologies.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-400">
                      {new Date(project.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-1 rounded hover:bg-gray-600/50 text-gray-400 hover:text-white transition-colors">
                          <ExternalLink className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProject(project.id)}
                          className="p-1 rounded hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-colors"
                        >
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Project count */}
      <div className="text-sm text-gray-500">
        Showing {filteredProjects.length} of {projects.length} projects
      </div>

      {/* Add Project Modal */}
      <AddProjectModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddProject}
      />
    </div>
  );
}
