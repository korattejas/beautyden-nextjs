"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  HiArrowLeft,
  HiClock,
  HiUser,
  HiTag,
  HiCalendar,
  HiShare,
} from "react-icons/hi2";
import Container from "@/components/ui/Container";
import MarkdownRenderer from "./MarkdownRenderer";
import { useBlog } from "@/hooks/useApi";

interface BlogViewMainProps {
  identifier: string; // slug or id
}

export default function BlogViewMain({ identifier }: BlogViewMainProps) {
  const { data, isLoading, error } = useBlog(identifier);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        <Container>
          <div className="py-24">
            <div className="max-w-4xl mx-auto">
              {/* Loading Skeleton */}
              <div className="mb-8">
                <div className="w-32 h-6 bg-gray-200 animate-pulse rounded" />
              </div>
              <div className="h-80 bg-gray-200 animate-pulse rounded-3xl mb-8" />
              <div className="space-y-4 mb-8">
                <div className="h-12 bg-gray-200 animate-pulse rounded w-3/4" />
                <div className="h-6 bg-gray-200 animate-pulse rounded w-1/2" />
                <div className="h-4 bg-gray-200 animate-pulse rounded w-full" />
                <div className="h-4 bg-gray-200 animate-pulse rounded w-4/5" />
              </div>
              <div className="h-96 bg-gray-200 animate-pulse rounded-3xl" />
            </div>
          </div>
        </Container>
      </div>
    );
  }

  if (error || !data?.data) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex items-center justify-center">
        <Container>
          <div className="text-center py-24">
            <div className="text-6xl mb-6">📄</div>
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Blog Post Not Found
            </h1>
            <p className="text-foreground/60 mb-8">
              The blog post you&apos;re looking for doesn&apos;t exist or has
              been removed.
            </p>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <HiArrowLeft className="w-5 h-5" />
              Back to Blog
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  const blog = data.data;

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

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
                className="inline-flex items-center gap-2 text-primary hover:text-secondary transition-colors duration-200 font-medium"
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
                className="mb-12"
              >
                <div className="relative h-80 md:h-96 rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src={blog.icon}
                    alt={blog.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 1024px"
                    className="object-cover"
                    priority
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
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
              {/* Category & Featured Badge */}
              <div className="flex items-center gap-4 mb-6">
                <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold">
                  {blog.category_name}
                </span>
                {blog.featured === 1 && (
                  <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-1">
                    ⭐ Featured
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                {blog.title}
              </h1>

              {/* Excerpt */}
              {blog.excerpt && (
                <p className="text-xl md:text-2xl text-foreground/70 leading-relaxed mb-8 font-light">
                  {blog.excerpt}
                </p>
              )}

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-foreground/60 mb-6">
                {blog.author && (
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <HiUser className="w-4 h-4 text-primary" />
                    </div>
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
                    <span>{blog.read_time} read</span>
                  </div>
                )}

                {/* <button className="flex items-center gap-2 text-primary hover:text-secondary transition-colors">
                  <HiShare className="w-4 h-4" />
                  Share
                </button> */}
              </div>

              {/* Tags */}
              {blog.tags && blog.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 bg-primary/20 text-primary px-3 py-2 rounded-full text-sm font-medium hover:bg-accent/20 transition-colors cursor-pointer z-10"
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
              className="bg-white/80 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-xl border border-primary/10"
            >
              {blog.content ? (
                <MarkdownRenderer content={blog.content} />
              ) : (
                <div className="text-center py-16">
                  <div className="text-4xl mb-4">📝</div>
                  <p className="text-foreground/60 text-lg">
                    Content coming soon...
                  </p>
                  <p className="text-foreground/40 text-sm mt-2">
                    This article is being prepared and will be available
                    shortly.
                  </p>
                </div>
              )}
            </motion.article>

            {/* Back to Blog CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-center mt-16"
            >
              <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-3xl p-8 border border-primary/10">
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Enjoyed this article?
                </h3>
                <p className="text-foreground/70 mb-6">
                  Check out more beauty tips, tutorials, and insights on our
                  blog.
                </p>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  <HiArrowLeft className="w-5 h-5" />
                  Back to All Articles
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </div>
  );
}
