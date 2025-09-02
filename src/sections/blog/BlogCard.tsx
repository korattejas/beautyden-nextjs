"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { HiClock, HiUser, HiTag, HiStar } from "react-icons/hi2";
import { Blog } from "@/types/blog";

interface BlogCardProps {
  blog: Blog;
  index: number;
}

const BlogCard = ({ blog, index }: BlogCardProps) => {
  console.log("blog: ", blog);
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="group bg-white/80 backdrop-blur-md rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 border border-primary/10"
    >
      <Link href={`/blog/${blog.slug || blog.id}`} className="block">
        {/* Featured Badge */}
        {blog.featured === 1 && (
          <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
            <HiStar className="w-3 h-3" />
            Featured
          </div>
        )}

        {/* Blog Image - Fixed Structure */}
        {blog.icon && (
          <div className="relative h-56 overflow-hidden">
            <Image
              src={blog.icon}
              alt={blog.title}
              fill
              // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-110 transition-transform duration-700"
              unoptimized // Add this to bypass Next.js optimization temporarily
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        )}

        {/* Fallback for no image */}
        {!blog.icon && (
          <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
            <div className="text-4xl text-primary/30">📝</div>
          </div>
        )}

        {/* Blog Content */}
        <div className="p-6">
          {/* Category */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
              {blog.category_name}
            </span>
            <span className="text-xs text-foreground/60">
              {formatDate(blog.publish_date)}
            </span>
          </div>

          {/* Title */}
          <h2 className="font-heading text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2">
            {blog.title}
          </h2>

          {/* Excerpt */}
          {blog.excerpt && (
            <p className="text-foreground/70 text-sm leading-relaxed mb-4 line-clamp-3">
              {blog.excerpt}
            </p>
          )}

          {/* Meta Info */}
          <div className="flex items-center justify-between text-xs text-foreground/60">
            <div className="flex items-center gap-4">
              {blog.author && (
                <div className="flex items-center gap-1">
                  <HiUser className="w-3 h-3" />
                  {blog.author}
                </div>
              )}
              {blog.read_time && (
                <div className="flex items-center gap-1">
                  <HiClock className="w-3 h-3" />
                  {blog.read_time}
                </div>
              )}
            </div>
          </div>

          {/* Tags */}
          {blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {blog.tags.slice(0, 3).map((tag, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 text-xs bg-accent/10 text-accent px-2 py-1 rounded-full"
                >
                  <HiTag className="w-2 h-2" />
                  {tag}
                </span>
              ))}
              {blog.tags.length > 3 && (
                <span className="text-xs text-foreground/60">
                  +{blog.tags.length - 3} more
                </span>
              )}
            </div>
          )}
        </div>
      </Link>
    </motion.article>
  );
};

export default BlogCard;
