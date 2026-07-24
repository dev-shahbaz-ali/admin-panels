"use client";

import { motion } from "framer-motion";
import { Calendar, Tag, Edit, Trash2, Eye, EyeOff, FileText } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface BlogCardProps {
  blog: any;
  onEdit: (blog: any) => void;
  onDelete: (id: string) => void;
  onTogglePublish: (id: string) => void;
}

export default function BlogCard({ blog, onEdit, onDelete, onTogglePublish }: BlogCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="group bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden hover:border-gray-600 transition-all duration-300"
    >
      {/* Image */}
      <div className="relative aspect-[16/9] bg-blue-500/10 overflow-hidden">
        {blog.image && blog.image !== "/placeholder-blog.jpg" ? (
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <FileText className="h-12 w-12 text-blue-500" aria-hidden="true" />
          </div>
        )}
        
        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          <span className={`px-3 py-1 text-xs font-medium rounded-full ${
            blog.published
              ? "bg-green-500/80 text-white"
              : "bg-yellow-500/80 text-white"
          }`}>
            {blog.published ? "Published" : "Draft"}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onTogglePublish(blog.id)}
            className="p-1.5 rounded-lg bg-gray-800/80 hover:bg-gray-700/80 text-gray-300 hover:text-white transition-colors"
            title={blog.published ? "Unpublish" : "Publish"}
          >
            {blog.published ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
          <button
            onClick={() => onEdit(blog)}
            className="p-1.5 rounded-lg bg-gray-800/80 hover:bg-blue-500/80 text-gray-300 hover:text-white transition-colors"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(blog.id)}
            className="p-1.5 rounded-lg bg-gray-800/80 hover:bg-red-500/80 text-gray-300 hover:text-white transition-colors"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-white group-hover:text-blue-400 transition-colors line-clamp-2">
          {blog.title}
        </h3>
        <p className="text-sm text-gray-400 mt-1 line-clamp-2">
          {blog.excerpt}
        </p>
        
        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {blog.tags.slice(0, 3).map((tag: string) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-xs rounded-full bg-gray-700/50 text-gray-300"
              >
                <Tag className="inline-block h-3 w-3 mr-1" />
                {tag}
              </span>
            ))}
            {blog.tags.length > 3 && (
              <span className="px-2 py-0.5 text-xs rounded-full bg-gray-700/50 text-gray-300">
                +{blog.tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Date */}
        <div className="flex items-center gap-2 mt-3 text-xs text-gray-500">
          <Calendar className="h-3 w-3" />
          {formatDate(blog.createdAt)}
        </div>
      </div>
    </motion.div>
  );
}
