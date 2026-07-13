"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Search,
  Grid,
  List,
  Calendar,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Tag,
  FileText,
  BookOpen,
  CheckCircle,
  AlertCircle,
  PenTool,
  Hash,
  Image,
} from "lucide-react";
import AddBlogModal from "@/components/blog/AddBlogModal";

// Mock initial blog posts
const initialBlogs = [
  {
    id: "1",
    title: "Getting Started with Next.js 14",
    excerpt: "Learn how to build modern web applications with Next.js 14 and React Server Components.",
    content: "Next.js 14 introduces several exciting features including Server Actions, Partial Prerendering, and improved performance...",
    tags: ["Next.js", "React", "JavaScript"],
    image: "/placeholder-blog.jpg",
    published: true,
    createdAt: "2024-01-20T10:00:00",
  },
  {
    id: "2",
    title: "Mastering Tailwind CSS",
    excerpt: "Advanced techniques and best practices for styling with Tailwind CSS.",
    content: "Tailwind CSS has revolutionized how we style web applications...",
    tags: ["TailwindCSS", "CSS", "Styling"],
    image: "/placeholder-blog.jpg",
    published: true,
    createdAt: "2024-01-15T14:30:00",
  },
  {
    id: "3",
    title: "TypeScript Best Practices",
    excerpt: "Essential TypeScript patterns and practices for professional developers.",
    content: "TypeScript has become essential for modern JavaScript development...",
    tags: ["TypeScript", "JavaScript", "Programming"],
    image: "/placeholder-blog.jpg",
    published: false,
    createdAt: "2024-01-10T09:15:00",
  },
  {
    id: "4",
    title: "Building a Design System",
    excerpt: "Creating a scalable design system with React and Storybook.",
    content: "Design systems are crucial for maintaining consistency across applications...",
    tags: ["React", "Design Systems", "Storybook"],
    image: "/placeholder-blog.jpg",
    published: true,
    createdAt: "2024-01-05T16:45:00",
  },
  {
    id: "5",
    title: "Performance Optimization in React",
    excerpt: "Techniques to optimize React applications for better performance and user experience.",
    content: "React performance optimization is crucial for large applications...",
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

  // Helper function for status colors
  const getStatusColor = (published: boolean) => {
    return published ? "bg-green-600" : "bg-yellow-600";
  };

  const getStatusIcon = (published: boolean) => {
    return published ? <CheckCircle className="h-3 w-3" /> : <AlertCircle className="h-3 w-3" />;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-600 rounded-lg">
            <BookOpen className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Blog Posts</h1>
            <p className="text-gray-400 mt-1">Manage your blog content</p>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setEditingBlog(null);
            setShowAddModal(true);
          }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-xl text-white font-medium hover:bg-blue-700 transition-all duration-200 cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          New Post
        </motion.button>
      </div>

      {/* Simple Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm text-gray-400">Total Posts</span>
              <div className="text-2xl font-bold text-white mt-1">{blogs.length}</div>
            </div>
            <div className="p-2 bg-blue-600 rounded-lg">
              <FileText className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm text-gray-400">Published</span>
              <div className="text-2xl font-bold text-green-400 mt-1">{publishedCount}</div>
            </div>
            <div className="p-2 bg-green-600 rounded-lg">
              <CheckCircle className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm text-gray-400">Drafts</span>
              <div className="text-2xl font-bold text-yellow-400 mt-1">{draftCount}</div>
            </div>
            <div className="p-2 bg-yellow-600 rounded-lg">
              <PenTool className="h-5 w-5 text-white" />
            </div>
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
            className="w-full pl-9 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>
        <div className="flex items-center gap-2">
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
          >
            <option value="all">All Posts</option>
            <option value="published">Published</option>
            <option value="draft">Drafts</option>
          </select>

          {/* View Toggle */}
          <div className="flex rounded-lg overflow-hidden border border-gray-600">
            <button
              onClick={() => setView("grid")}
              className={`p-2 transition-colors ${
                view === "grid"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 text-gray-400 hover:text-white"
              }`}
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setView("list")}
              className={`p-2 transition-colors ${
                view === "list"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 text-gray-400 hover:text-white"
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
            className="text-center py-12 bg-gray-800 border border-gray-700 rounded-2xl"
          >
            <div className="flex flex-col items-center">
              <BookOpen className="h-16 w-16 text-gray-600 mb-4" />
              <div className="text-gray-400">
                {searchTerm || statusFilter !== "all" 
                  ? "No blog posts match your filters" 
                  : "No blog posts yet. Create your first post!"}
              </div>
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
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="group bg-gray-800 border border-gray-700 rounded-2xl overflow-hidden hover:border-gray-600 transition-all duration-300"
              >
                {/* Image */}
                <div className="relative aspect-[16/9] bg-gray-700 overflow-hidden">
                  {blog.image && blog.image !== "/placeholder-blog.jpg" ? (
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-700">
                      <Image className="h-12 w-12 text-gray-500" />
                    </div>
                  )}
                  
                  {/* Status Badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-1">
                    <span className={`flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full text-white ${getStatusColor(blog.published)}`}>
                      {getStatusIcon(blog.published)}
                      {blog.published ? "Published" : "Draft"}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleTogglePublish(blog.id)}
                      className="p-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors"
                      title={blog.published ? "Unpublish" : "Publish"}
                    >
                      {blog.published ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                    <button
                      onClick={() => handleEditBlog(blog)}
                      className="p-1.5 rounded-lg bg-gray-800 hover:bg-blue-600 text-gray-300 hover:text-white transition-colors"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteBlog(blog.id)}
                      className="p-1.5 rounded-lg bg-gray-800 hover:bg-red-600 text-gray-300 hover:text-white transition-colors"
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
                          className="flex items-center gap-1 px-2 py-0.5 text-xs rounded-full bg-gray-700 text-gray-300"
                        >
                          <Hash className="h-3 w-3" />
                          {tag}
                        </span>
                      ))}
                      {blog.tags.length > 3 && (
                        <span className="px-2 py-0.5 text-xs rounded-full bg-gray-700 text-gray-300">
                          +{blog.tags.length - 3}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Date */}
                  <div className="flex items-center gap-3 mt-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-gray-800 border border-gray-700 rounded-2xl overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        Title
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      <div className="flex items-center gap-2">
                        <Hash className="h-4 w-4" />
                        Tags
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4" />
                        Status
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Date
                      </div>
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                      <div className="flex items-center justify-end gap-2">
                        <PenTool className="h-4 w-4" />
                        Actions
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {filteredBlogs.map((blog) => (
                    <motion.tr
                      key={blog.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="hover:bg-gray-700 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-white line-clamp-1">
                            {blog.title}
                          </div>
                          <div className="text-sm text-gray-400 line-clamp-1">
                            {blog.excerpt}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {blog.tags && blog.tags.slice(0, 2).map((tag: string) => (
                            <span
                              key={tag}
                              className="flex items-center gap-1 px-2 py-0.5 text-xs rounded-full bg-gray-700 text-gray-300"
                            >
                              <Hash className="h-3 w-3" />
                              {tag}
                            </span>
                          ))}
                          {blog.tags && blog.tags.length > 2 && (
                            <span className="px-2 py-0.5 text-xs rounded-full bg-gray-700 text-gray-300">
                              +{blog.tags.length - 2}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`flex items-center gap-1 px-2 py-1 text-xs rounded-full text-white ${getStatusColor(blog.published)}`}>
                          {getStatusIcon(blog.published)}
                          {blog.published ? "Published" : "Draft"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(blog.createdAt).toLocaleDateString()}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleTogglePublish(blog.id)}
                            className="p-1 rounded hover:bg-gray-600 text-gray-400 hover:text-white transition-colors"
                            title={blog.published ? "Unpublish" : "Publish"}
                          >
                            {blog.published ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </button>
                          <button
                            onClick={() => handleEditBlog(blog)}
                            className="p-1 rounded hover:bg-blue-600 text-gray-400 hover:text-white transition-colors"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteBlog(blog.id)}
                            className="p-1 rounded hover:bg-red-600 text-gray-400 hover:text-white transition-colors"
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
          </motion.div>
        )}
      </AnimatePresence>

      {/* Blog count */}
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>Showing {filteredBlogs.length} of {blogs.length} blog posts</span>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1">
            <CheckCircle className="h-3 w-3 text-green-400" />
            {publishedCount} published
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <PenTool className="h-3 w-3 text-yellow-400" />
            {draftCount} drafts
          </span>
        </div>
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