"use client";

import { motion } from "framer-motion";
import { FolderGit2, ExternalLink } from "lucide-react";
import { formatDate, truncateText } from "@/lib/utils";

const mockProjects = [
  {
    id: "1",
    title: "E-commerce Platform",
    description: "Full-stack e-commerce with Next.js and Stripe",
    technologies: ["React", "Next.js", "TypeScript"],
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    title: "Client portal redesign",
    description: "A clear, responsive workspace for a growing services team",
    technologies: ["Next.js", "TypeScript", "PostgreSQL"],
    createdAt: "2024-01-10",
  },
  {
    id: "3",
    title: "Portfolio Website",
    description: "Modern portfolio with glass-morphism design",
    technologies: ["Next.js", "TailwindCSS", "Framer"],
    createdAt: "2024-01-05",
  },
];

// GitHub SVG Icon component
const GithubIcon = ({ className = "h-4 w-4" }) => (
  <svg 
    className={className} 
    fill="currentColor" 
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.15 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.62.24 2.85.12 3.15.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

export default function RecentProjects() {
  return (
    <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white">Recent Projects</h3>
          <p className="text-sm text-gray-400">Your latest work</p>
        </div>
        <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
          View All
        </button>
      </div>
      <div className="space-y-4">
        {mockProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group p-4 rounded-xl bg-gray-700/20 hover:bg-gray-700/40 transition-all duration-300 border border-transparent hover:border-gray-600/50"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <FolderGit2 className="h-4 w-4 text-blue-400" />
                  <h4 className="font-medium text-white group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h4>
                </div>
                <p className="text-sm text-gray-400 mt-1">
                  {truncateText(project.description, 60)}
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 text-xs rounded-full bg-gray-700/50 text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-1 ml-4">
                <button className="p-1.5 rounded-lg hover:bg-gray-600/50 transition-colors text-gray-400 hover:text-white">
                  <GithubIcon className="h-4 w-4" />
                </button>
                <button className="p-1.5 rounded-lg hover:bg-gray-600/50 transition-colors text-gray-400 hover:text-white">
                  <ExternalLink className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="mt-2 text-xs text-gray-500">
              {formatDate(project.createdAt)}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
