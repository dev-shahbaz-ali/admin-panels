"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search, Filter, Grid, List, Calendar } from "lucide-react";
import AddBlogModal from "@/components/blog/AddBlogModal";
import BlogCard from "@/components/blog/BlogCard";
import BlogListView from "@/components/blog/BlogListView";

// Mock initial blog posts
const initialBlogs = [
  {
    id: "1",
    title: "Getting Started with Next.js 14",
    excerpt: "Learn how to build modern web applications with Next.js 14 and React Server Components.",
    content: "Next.js 14 introduces several exciting features including Server Actions, Partial Prerendering, and improved performance. In this comprehensive guide, we'll explore how to leverage these features to build fast, scalable applications.",
    tags: ["Next.js", "React", "JavaScript"],
    image: "/placeholder-blog.jpg",
    published: true,
    createdAt: "2024-01-20T10:00:00",
  },
  {
    id: "2",
    title: "Mastering Tailwind CSS",
    excerpt: "Advanced techniques and best practices for styling with Tailwind CSS.",
    content: "Tailwind CSS has revolutionized how we style web applications. This guide covers advanced topics like custom configurations, plugins, and performance optimization techniques.",
    tags: ["TailwindCSS", "CSS", "Styling"],
    image: "/placeholder-blog.jpg",
    published: true,
    createdAt: "2024-01-15T14:30:00",
  },
  {
    id: "3",
    title: "TypeScript Best Practices",
    excerpt: "Essential TypeScript patterns and practices for professional developers.",
    content: "TypeScript has become essential for modern JavaScript development. Learn about advanced types, utility types, and best practices for maintaining type safety in large codebases.",
    tags: ["TypeScript", "JavaScript", "Programming"],
    image: "/placeholder-blog.jpg",
    published: false,
    createdAt: "2024-01-10T09:15:00",
  },
  {
    id: "4",
    title: "Building a Design System",
    excerpt: "Creating a scalable design system with React and Storybook.",
    content: "Design systems are crucial for maintaining consistency across applications. This tutorial covers creating reusable components, documenting with Storybook, and managing design tokens.",
    tags: ["React", "Design Systems", "Storybook"],
    image: "/placeholder-blog.jpg",
    published: true,
    createdAt: "2024-01-05T16:45:00",
  },
  {
    id: "5",
    title: "Performance Optimization in React",
    excerpt: "Techniques to optimize React applications for better performance and user experience.",
    content: "React performance optimization is crucial for large applications. Learn about memoization, code splitting, lazy loading, and using the React DevTools profiler effectively.",
    tags: ["React", "Performance", "Optimization"],
    image: "/placeholder-blog.jpg",
    published: false,
    createdAt: "2024-01-01T11:20:00",
  },
];

export default function BlogPage() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [blogs, setBlogs] = useState(initialBlogs);
  const [filteredBlogs, setFilteredBlogs] = useState(initialBlogs);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingBlog, setEditingBlog] = useState<any>(null);
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">("all");

  // Filter blogs based on search and status
  useEffect(() => {
    let filtered = blogs;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter((blog) =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.tags.some((tag: string) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((blog) =>
        statusFilter === "published" ? blog.published : !blog.published
      );
    }

    setFilteredBlogs(filtered);
  }, [blogs, searchTerm, statusFilter]);

  const handleAddBlog = (newBlog: any) => {
    setBlogs((prev) => [newBlog, ...prev]);
    setShowAddModal(false);
  };

  const handleEditBlog = (blog: any) => {
    setEditingBlog(blog);
    setShowAddModal(true);
  };

  const handleUpdateBlog = (updatedBlog: any) => {
    setBlogs((prev) =>
      prev.map((blog) =>
        blog.id === updatedBlog.id ? updatedBlog : blog
      )
    );
    setEditingBlog(null);
    setShowAddModal(false);
  };

  const handleDeleteBlog = (id: string) => {
    if (confirm("Are you sure you want to delete this blog post?")) {
      setBlogs((prev) => prev.filter((blog) => blog.id !== id));
    }
  };

  const handleTogglePublish = (id: string) => {
    setBlogs((prev) =>
      prev.map((blog) =>
        blog.id === id
          ? { ...blog, published: !blog.published }
          : blog
      )
    );
  };

  const publishedCount = blogs.filter((b) => b.published).length;
  const draftCount = blogs.filter((b) => !b.published).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Blog Posts</h1>
          <p className="text-gray-400 mt-1">Manage your blog content</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setEditingBlog(null);
            setShowAddModal(true);
          }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl text-white font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-200"
        >
          <Plus className="h-4 w-4" />
          New Post
        </motion.button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">Total Posts</span>
            <span className="text-2xl font-bold text-white">{blogs.length}</span>
          </div>
        </div>
        <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">Published</span>
            <span className="text-2xl font-bold text-green-400">{publishedCount}</span>
          </div>
        </div>
        <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">Drafts</span>
            <span className="text-2xl font-bold text-yellow-400">{draftCount}</span>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search blog posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-colors"
          />
        </div>
        <div className="flex items-center gap-2">
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-sm text-white focus:outline-none focus:border-blue-500/50 transition-colors"
          >
            <option value="all">All Posts</option>
            <option value="published">Published</option>
            <option value="draft">Drafts</option>
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

      {/* Blog Grid/List */}
      <AnimatePresence mode="wait">
        {filteredBlogs.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-gray-400">
              {searchTerm || statusFilter !== "all" 
                ? "No blog posts match your filters" 
                : "No blog posts yet. Create your first post!"}
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
            {filteredBlogs.map((blog) => (
              <BlogCard
                key={blog.id}
                blog={blog}
                onEdit={handleEditBlog}
                onDelete={handleDeleteBlog}
                onTogglePublish={handleTogglePublish}
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
            <BlogListView
              blogs={filteredBlogs}
              onEdit={handleEditBlog}
              onDelete={handleDeleteBlog}
              onTogglePublish={handleTogglePublish}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Blog count */}
      <div className="text-sm text-gray-500">
        Showing {filteredBlogs.length} of {blogs.length} blog posts
      </div>

      {/* Add/Edit Blog Modal */}
      <AddBlogModal
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          setEditingBlog(null);
        }}
        onAdd={handleAddBlog}
        editingBlog={editingBlog}
        onUpdate={handleUpdateBlog}
      />
    </div>
  );
}