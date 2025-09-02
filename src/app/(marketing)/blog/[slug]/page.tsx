"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  HiArrowLeft,
  HiClock,
  HiUser,
  HiTag,
  HiCalendar,
} from "react-icons/hi2";
import { useBlog } from "@/hooks/useApi";
import Container from "@/components/ui/Container";
import MarkdownRenderer from "@/sections/blog/MarkdownRenderer";

interface BlogPostPageProps {
  params: Promise<{ id?: string; slug?: string }>;
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug, id } = use(params);
  console.log("id: ", id);
  const { data, isLoading, error } = useBlog((slug || id) ?? "");

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        <Container>
          <div className="py-24">
            <div className="max-w-4xl mx-auto">
              <div className="h-64 bg-gray-200 animate-pulse rounded-3xl mb-8" />
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 animate-pulse rounded w-3/4" />
                <div className="h-4 bg-gray-200 animate-pulse rounded w-1/2" />
                <div className="h-4 bg-gray-200 animate-pulse rounded w-full" />
                <div className="h-4 bg-gray-200 animate-pulse rounded w-4/5" />
              </div>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  if (error || !data?.data) {
    notFound();
  }

  const blog = data.data;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Container>
        <div className="py-24">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-primary hover:text-secondary transition-colors duration-200"
              >
                <HiArrowLeft className="w-4 h-4" />
                Back to Blog
              </Link>
            </motion.div>

            {/* Featured Image */}
            {blog.icon && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-8"
              >
                <div className="relative h-80 rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src={blog.icon}
                    alt={blog.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 1024px"
                    className="object-cover"
                    priority
                    unoptimized
                  />
                </div>
              </motion.div>
            )}

            {/* Article Header */}
            <motion.header
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-12"
            >
              {/* Category */}
              <div className="flex items-center gap-4 mb-6">
                <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                  {blog.category_name}
                </span>
                {blog.featured === 1 && (
                  <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                    Featured
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                {blog.title}
              </h1>

              {/* Excerpt */}
              {blog.excerpt && (
                <p className="text-xl text-foreground/70 leading-relaxed mb-8">
                  {blog.excerpt}
                </p>
              )}

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-foreground/60">
                {blog.author && (
                  <div className="flex items-center gap-2">
                    <HiUser className="w-4 h-4" />
                    <span className="font-medium">{blog.author}</span>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <HiCalendar className="w-4 h-4" />
                  <span>{formatDate(blog.publish_date)}</span>
                </div>

                {blog.read_time && (
                  <div className="flex items-center gap-2">
                    <HiClock className="w-4 h-4" />
                    <span>{blog.read_time}</span>
                  </div>
                )}
              </div>

              {/* Tags */}
              {blog.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-6">
                  {blog.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 bg-accent/10 text-accent px-3 py-1 rounded-full text-sm"
                    >
                      <HiTag className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </motion.header>

            {/* Article Content */}
            <motion.article
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white/80 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-lg border border-primary/10"
            >
              {blog.content ? (
                <MarkdownRenderer content={blog.content} />
              ) : (
                <div className="text-center py-12">
                  <p className="text-foreground/60">Content coming soon...</p>
                </div>
              )}
            </motion.article>

            {/* Back to Blog Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-center mt-12"
            >
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <HiArrowLeft className="w-5 h-5" />
                Back to All Articles
              </Link>
            </motion.div>
          </div>
        </div>
      </Container>
    </div>
  );
}
