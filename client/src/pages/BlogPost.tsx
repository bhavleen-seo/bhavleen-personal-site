/*
 * DESIGN PHILOSOPHY: Refined Brutalism meets Professional Warmth
 * Individual blog post page — editorial long-form reading experience
 */

import { useEffect, useState } from "react";
import { Link, useParams } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, Tag, Menu, X } from "lucide-react";
import { getPostBySlug, BLOG_POSTS } from "@/lib/blogData";

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  content: string;
};

function ArticleSchema({ post }: { post: Post }) {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `https://www.bhavleensingh.com/blog/${post.slug}#article`,
        "headline": post.title,
        "description": post.excerpt,
        "datePublished": post.date,
        "dateModified": post.date,
        "author": {
          "@type": "Person",
          "@id": "https://www.bhavleensingh.com/#person",
          "name": "Bhavleen Singh",
          "url": "https://www.bhavleensingh.com/"
        },
        "publisher": {
          "@type": "Person",
          "@id": "https://www.bhavleensingh.com/#person",
          "name": "Bhavleen Singh"
        },
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `https://www.bhavleensingh.com/blog/${post.slug}`
        },
        "isPartOf": {
          "@id": "https://www.bhavleensingh.com/#website"
        },
        "about": {
          "@type": "Thing",
          "name": post.category
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.bhavleensingh.com/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Blog",
            "item": "https://www.bhavleensingh.com/blog"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": post.title,
            "item": `https://www.bhavleensingh.com/blog/${post.slug}`
          }
        ]
      }
    ]
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

const NAV_LINKS = [
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Experience", href: "/#experience" },
  { label: "Results", href: "/#results" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/#contact" },
];

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/** Very lightweight markdown-to-JSX renderer for headings, bold, paragraphs */
function renderContent(content: string) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith("## ")) {
      elements.push(
        <h2
          key={i}
          className="font-['Fraunces'] text-2xl lg:text-3xl font-bold mt-10 mb-4"
          style={{ color: "#1B3A2D", borderLeft: "3px solid #B8924A", paddingLeft: "1rem" }}
        >
          {line.slice(3)}
        </h2>
      );
    } else if (line.startsWith("### ")) {
      elements.push(
        <h3
          key={i}
          className="font-['Fraunces'] text-xl font-bold mt-8 mb-3"
          style={{ color: "#1B3A2D" }}
        >
          {line.slice(4)}
        </h3>
      );
    } else if (line.startsWith("- ")) {
      // Collect consecutive list items
      const items: string[] = [];
      while (i < lines.length && lines[i].startsWith("- ")) {
        items.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <ul key={`ul-${i}`} className="my-4 space-y-2 pl-4">
          {items.map((item, j) => (
            <li key={j} className="flex items-start gap-2 text-base leading-relaxed" style={{ color: "#444", fontFamily: "'Lato', sans-serif" }}>
              <span className="mt-2 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "#B8924A" }} />
              <span dangerouslySetInnerHTML={{ __html: boldify(item) }} />
            </li>
          ))}
        </ul>
      );
      continue;
    } else if (line.trim() === "") {
      // skip blank lines
    } else {
      elements.push(
        <p
          key={i}
          className="text-base lg:text-lg leading-relaxed mb-5"
          style={{ color: "#444", fontFamily: "'Lato', sans-serif" }}
          dangerouslySetInnerHTML={{ __html: boldify(line) }}
        />
      );
    }
    i++;
  }

  return elements;
}

function boldify(text: string): string {
  return text.replace(/\*\*(.+?)\*\*/g, '<strong style="color:#1B3A2D">$1</strong>');
}

export default function BlogPostPage() {
  const params = useParams<{ slug: string }>();
  const post = getPostBySlug(params.slug ?? "");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [params.slug]);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#FAF7F2" }}>
        <div className="text-center">
          <h1 className="font-['Fraunces'] text-4xl font-bold mb-4" style={{ color: "#1B3A2D" }}>Post not found</h1>
          <Link href="/blog" className="font-['DM_Sans'] text-sm underline" style={{ color: "#B8924A" }}>
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const otherPosts = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <div className="min-h-screen" style={{ background: "#FAF7F2", color: "#2C2C2C" }}>
      <ArticleSchema post={post} />

      {/* ── NAV ── */}
      <header
        className="sticky top-0 z-50"
        style={{
          background: "rgba(27,58,45,0.97)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(184,146,74,0.2)",
        }}
      >
        <div className="container flex items-center justify-between py-4">
          <Link href="/" className="font-['Fraunces'] text-lg font-semibold text-white tracking-tight">
            Bhavleen Singh
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <a key={l.label} href={l.href} className="nav-link">{l.label}</a>
            ))}
            <a
              href="/#contact"
              className="text-sm px-5 py-2.5 rounded-sm"
              style={{ background: "#B8924A", color: "#FAF7F2", fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}
            >
              Let's Talk
            </a>
          </nav>
          <button className="md:hidden text-white p-2" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden px-6 pb-6 pt-2 flex flex-col gap-4"
            style={{ background: "rgba(27,58,45,0.98)" }}
          >
            {NAV_LINKS.map((l) => (
              <a key={l.label} href={l.href} className="nav-link text-base py-1" onClick={() => setMenuOpen(false)}>{l.label}</a>
            ))}
          </motion.div>
        )}
      </header>

      {/* ── ARTICLE HEADER ── */}
      <section className="py-16 lg:py-24" style={{ background: "#1B3A2D" }}>
        <div className="container max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 font-['DM_Sans'] text-sm mb-8 hover:gap-3 transition-all duration-200"
              style={{ color: "rgba(250,247,242,0.6)" }}
            >
              <ArrowLeft size={14} /> Back to Blog
            </Link>

            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span
                className="flex items-center gap-1.5 text-xs font-['DM_Sans'] font-semibold uppercase tracking-wider px-3 py-1 rounded-sm"
                style={{ background: "rgba(184,146,74,0.2)", color: "#D4AD6B", border: "1px solid rgba(184,146,74,0.3)" }}
              >
                <Tag size={11} /> {post.category}
              </span>
              <span className="flex items-center gap-1.5 text-xs font-['DM_Sans']" style={{ color: "rgba(250,247,242,0.5)" }}>
                <Calendar size={11} /> {formatDate(post.date)}
              </span>
              <span className="flex items-center gap-1.5 text-xs font-['DM_Sans']" style={{ color: "rgba(250,247,242,0.5)" }}>
                <Clock size={11} /> {post.readTime}
              </span>
            </div>

            <h1 className="font-['Fraunces'] text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6" style={{ color: "#FAF7F2" }}>
              {post.title}
            </h1>

            <p className="text-lg leading-relaxed" style={{ color: "rgba(250,247,242,0.72)", fontFamily: "'Lato', sans-serif" }}>
              {post.excerpt}
            </p>

            {/* Author row */}
            <div className="flex items-center gap-3 mt-8 pt-8 border-t" style={{ borderColor: "rgba(184,146,74,0.2)" }}>
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center font-['Fraunces'] font-bold text-sm"
                style={{ background: "#B8924A", color: "#FAF7F2" }}
              >
                BS
              </div>
              <div>
                <p className="font-['DM_Sans'] text-sm font-semibold" style={{ color: "#FAF7F2" }}>Bhavleen Singh</p>
                <p className="font-['DM_Sans'] text-xs" style={{ color: "rgba(250,247,242,0.5)" }}>SEO Specialist · Founder, Khalis Marketing</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── ARTICLE BODY ── */}
      <section className="py-14 lg:py-20">
        <div className="container max-w-3xl">
          <motion.article
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            {renderContent(post.content)}
          </motion.article>

          {/* Author card */}
          <div
            className="mt-16 p-8 rounded-sm flex flex-col sm:flex-row gap-5 items-start"
            style={{ background: "#E8EDE6", borderLeft: "3px solid #B8924A" }}
          >
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center font-['Fraunces'] font-bold text-lg shrink-0"
              style={{ background: "#1B3A2D", color: "#FAF7F2" }}
            >
              BS
            </div>
            <div>
              <p className="font-['DM_Sans'] text-xs uppercase tracking-widest mb-1" style={{ color: "#B8924A" }}>Written by</p>
              <p className="font-['Fraunces'] text-xl font-bold mb-1" style={{ color: "#1B3A2D" }}>Bhavleen Singh</p>
              <p className="text-sm leading-relaxed" style={{ color: "#555", fontFamily: "'Lato', sans-serif" }}>
                SEO Specialist with 10 years of experience and Founder of Khalis Marketing — a boutique SEO consultancy in Melbourne, Australia.
              </p>
              <a href="/#contact" className="inline-block mt-3 font-['DM_Sans'] text-sm font-semibold underline underline-offset-2" style={{ color: "#1B3A2D" }}>
                Work with Bhavleen →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── MORE POSTS ── */}
      {otherPosts.length > 0 && (
        <section className="py-16 border-t" style={{ background: "#FAF7F2", borderColor: "#E8EDE6" }}>
          <div className="container">
            <div className="section-label mb-8">More Articles</div>
            <div className="grid md:grid-cols-2 gap-6">
              {otherPosts.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className="block group">
                  <div
                    className="p-6 rounded-sm transition-all duration-200 group-hover:-translate-y-1"
                    style={{ background: "#fff", border: "1px solid #E8EDE6", boxShadow: "0 2px 8px rgba(27,58,45,0.05)" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(27,58,45,0.1)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 8px rgba(27,58,45,0.05)"; }}
                  >
                    <span className="text-xs font-['DM_Sans'] font-semibold uppercase tracking-wider" style={{ color: "#B8924A" }}>{p.category}</span>
                    <h3 className="font-['Fraunces'] text-lg font-bold mt-2 mb-2 leading-snug group-hover:text-[#B8924A] transition-colors" style={{ color: "#1B3A2D" }}>
                      {p.title}
                    </h3>
                    <p className="text-sm leading-relaxed line-clamp-2" style={{ color: "#666", fontFamily: "'Lato', sans-serif" }}>{p.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-8">
              <Link href="/blog" className="inline-flex items-center gap-2 font-['DM_Sans'] text-sm font-semibold" style={{ color: "#1B3A2D" }}>
                <ArrowLeft size={14} /> View all posts
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── FOOTER ── */}
      <footer className="py-8 border-t" style={{ background: "#0F2419", borderColor: "rgba(184,146,74,0.15)" }}>
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-['Fraunces'] text-base font-semibold" style={{ color: "#FAF7F2" }}>Bhavleen Singh</p>
          <p className="font-['DM_Sans'] text-xs" style={{ color: "rgba(250,247,242,0.35)" }}>
            © {new Date().getFullYear()} Bhavleen Singh · Melbourne, Australia
          </p>
        </div>
      </footer>
    </div>
  );
}
