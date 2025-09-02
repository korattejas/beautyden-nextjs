"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";
import Image from "next/image";
import Link from "next/link";

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer = ({ content }: MarkdownRendererProps) => {
  const components = {
    // Custom heading components
    h1: ({ children, ...props }: any) => (
      <h1 className="text-4xl font-bold text-foreground mb-6 mt-8" {...props}>
        {children}
      </h1>
    ),
    h2: ({ children, ...props }: any) => (
      <h2 className="text-3xl font-bold text-foreground mb-5 mt-7" {...props}>
        {children}
      </h2>
    ),
    h3: ({ children, ...props }: any) => (
      <h3
        className="text-2xl font-semibold text-foreground mb-4 mt-6"
        {...props}
      >
        {children}
      </h3>
    ),
    h4: ({ children, ...props }: any) => (
      <h4
        className="text-xl font-semibold text-foreground mb-3 mt-5"
        {...props}
      >
        {children}
      </h4>
    ),

    // Custom paragraph
    p: ({ children, ...props }: any) => (
      <p className="text-foreground/80 leading-relaxed mb-4" {...props}>
        {children}
      </p>
    ),

    // Custom links
    a: ({ href, children, ...props }: any) => (
      <Link
        href={href || "#"}
        className="text-primary hover:text-secondary font-medium underline decoration-primary/30 hover:decoration-secondary transition-colors duration-200"
        {...props}
      >
        {children}
      </Link>
    ),

    // Custom images
    img: ({ src, alt, ...props }: any) => (
      <div className="my-8 rounded-2xl overflow-hidden shadow-lg">
        <Image
          src={src || "/placeholder.jpg"}
          alt={alt || "Blog image"}
          width={800}
          height={400}
          className="object-cover w-full"
          unoptimized
        />
      </div>
    ),

    // Custom lists
    ul: ({ children, ...props }: any) => (
      <ul
        className="list-disc list-inside text-foreground/80 mb-4 space-y-2"
        {...props}
      >
        {children}
      </ul>
    ),
    ol: ({ children, ...props }: any) => (
      <ol
        className="list-decimal list-inside text-foreground/80 mb-4 space-y-2"
        {...props}
      >
        {children}
      </ol>
    ),

    // Custom blockquotes
    blockquote: ({ children, ...props }: any) => (
      <blockquote
        className="border-l-4 border-primary bg-primary/5 pl-6 py-4 my-6 italic text-foreground/80"
        {...props}
      >
        {children}
      </blockquote>
    ),

    // Custom code blocks with syntax highlighting
    code: ({ inline, className, children, ...props }: any) => {
      const match = /language-(\w+)/.exec(className || "");

      if (!inline && match) {
        return (
          <div className="my-6 rounded-2xl overflow-hidden shadow-lg">
            <SyntaxHighlighter
              style={tomorrow}
              language={match[1]}
              PreTag="div"
              customStyle={{
                margin: 0,
                borderRadius: "1rem",
                fontSize: "0.875rem",
                padding: "1.5rem",
              }}
              {...props}
            >
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          </div>
        );
      }

      return (
        <code
          className="bg-gray-100 text-primary px-2 py-1 rounded text-sm font-mono"
          {...props}
        >
          {children}
        </code>
      );
    },

    // Custom tables
    table: ({ children, ...props }: any) => (
      <div className="my-6 overflow-x-auto">
        <table
          className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm"
          {...props}
        >
          {children}
        </table>
      </div>
    ),
    th: ({ children, ...props }: any) => (
      <th
        className="px-4 py-2 bg-gray-50 border-b font-semibold text-left text-foreground"
        {...props}
      >
        {children}
      </th>
    ),
    td: ({ children, ...props }: any) => (
      <td className="px-4 py-2 border-b text-foreground/80" {...props}>
        {children}
      </td>
    ),
  };

  return (
    <div className="prose prose-lg max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeSanitize]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
