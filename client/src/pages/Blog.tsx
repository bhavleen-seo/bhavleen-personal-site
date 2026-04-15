/*
 * DESIGN PHILOSOPHY: Refined Brutalism meets Professional Warmth
 * Palette: Cream (#FAF7F2) base, Forest green (#1B3A2D) primary, Gold (#B8924A) accent
 * Typography: Fraunces (display) + Lato (body) + DM Sans (labels/nav)
 * Blog listing page — editorial card grid with category filter
 */

import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock, Tag, Menu, X } from "lucide-react";
import { BLOG_POSTS, CATEGORIES } from "@/lib/blogData";

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

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [menuOpen, setMenuOpen] = useState(false);

  const filtered =
    activeCategory === "All"
      ? BLOG_POSTS
      : BLOG_POSTS.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen" style={{ background: "#FAF7F2", color: "#2C2C2C" }}>

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
              <a key={l.label} href={l.href} className="nav-link">
                {l.label}
              </a>
            ))}
            <a
              href="/#contact"
              className="text-sm px-5 py-2.5 rounded-sm"
              style={{ background: "#B8924A", color: "#FAF7F2", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, letterSpacing: "0.04em" }}
            >
              Let's Talk
            </a>
          </nav>
          <button
            className="md:hidden text-white p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
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
              <a key={l.label} href={l.href} className="nav-link text-base py-1" onClick={() => setMenuOpen(false)}>
                {l.label}
              </a>
            ))}
          </motion.div>
        )}
      </header>

      {/* ── HERO BAND ── */}
      <section className="py-20 lg:py-28" style={{ background: "#1B3A2D" }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="section-label" style={{ color: "#B8924A", borderColor: "#B8924A" }}>
              Insights & Perspectives
            </div>
            <h1 className="font-['Fraunces'] text-5xl lg:text-6xl font-bold mt-4 mb-5 leading-tight" style={{ color: "#FAF7F2" }}>
              The SEO Blog
            </h1>
            <p className="text-lg max-w-xl leading-relaxed" style={{ color: "rgba(250,247,242,0.7)", fontFamily: "'Lato', sans-serif" }}>
              Practical SEO insights from a decade of working in competitive markets. No fluff — just what actually works.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── FILTER ── */}
      <div className="sticky top-[65px] z-40 py-4 border-b" style={{ background: "#FAF7F2", borderColor: "#E8EDE6" }}>
        <div className="container flex flex-wrap gap-2 items-center">
          <span className="font-['DM_Sans'] text-xs uppercase tracking-widest mr-2" style={{ color: "#999" }}>Filter:</span>
          {["All", ...CATEGORIES].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-4 py-1.5 rounded-sm text-sm font-['DM_Sans'] font-medium transition-all duration-200"
              style={
                activeCategory === cat
                  ? { background: "#1B3A2D", color: "#FAF7F2" }
                  : { background: "#E8EDE6", color: "#444", border: "1px solid transparent" }
              }
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ── POST GRID ── */}
      <section className="py-16 lg:py-20">
        <div className="container">
          {filtered.length === 0 ? (
            <p className="text-center py-20" style={{ color: "#999", fontFamily: "'Lato', sans-serif" }}>
              No posts in this category yet.
            </p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
              {filtered.map((post, i) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: i * 0.07, ease: "easeOut" }}
                >
                  <Link href={`/blog/${post.slug}`} className="block h-full group">
                    <article
                      className="h-full flex flex-col rounded-sm overflow-hidden transition-all duration-250 group-hover:-translate-y-1"
                      style={{
                        background: "#fff",
                        border: "1px solid #E8EDE6",
                        boxShadow: "0 2px 8px rgba(27,58,45,0.05)",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 32px rgba(27,58,45,0.12)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 8px rgba(27,58,45,0.05)";
                      }}
                    >
                      {/* Category bar */}
                      <div className="h-1" style={{ background: "#B8924A" }} />

                      <div className="p-7 flex flex-col flex-1">
                        {/* Category + date */}
                        <div className="flex items-center justify-between mb-4">
                          <span
                            className="flex items-center gap-1.5 text-xs font-['DM_Sans'] font-semibold uppercase tracking-wider px-3 py-1 rounded-sm"
                            style={{ background: "#E8EDE6", color: "#1B3A2D" }}
                          >
                            <Tag size={11} />
                            {post.category}
                          </span>
                          <span className="flex items-center gap-1.5 text-xs" style={{ color: "#999", fontFamily: "'DM Sans', sans-serif" }}>
                            <Clock size={11} />
                            {post.readTime}
                          </span>
                        </div>

                        {/* Title */}
                        <h2
                          className="font-['Fraunces'] text-xl font-bold mb-3 leading-snug group-hover:text-[#B8924A] transition-colors duration-200"
                          style={{ color: "#1B3A2D" }}
                        >
                          {post.title}
                        </h2>

                        {/* Excerpt */}
                        <p
                          className="text-sm leading-relaxed flex-1 mb-5"
                          style={{ color: "#666", fontFamily: "'Lato', sans-serif" }}
                        >
                          {post.excerpt}
                        </p>

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-4 mt-auto border-t" style={{ borderColor: "#E8EDE6" }}>
                          <span className="flex items-center gap-1.5 text-xs" style={{ color: "#999", fontFamily: "'DM Sans', sans-serif" }}>
                            <Calendar size={11} />
                            {formatDate(post.date)}
                          </span>
                          <span
                            className="flex items-center gap-1 text-xs font-['DM_Sans'] font-semibold group-hover:gap-2 transition-all duration-200"
                            style={{ color: "#B8924A" }}
                          >
                            Read more <ArrowRight size={13} />
                          </span>
                        </div>
                      </div>
                    </article>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20" style={{ background: "#1B3A2D" }}>
        <div className="container text-center">
          <h2 className="font-['Fraunces'] text-3xl lg:text-4xl font-bold mb-4" style={{ color: "#FAF7F2" }}>
            Want SEO advice tailored to your business?
          </h2>
          <p className="mb-8 text-base" style={{ color: "rgba(250,247,242,0.65)", fontFamily: "'Lato', sans-serif" }}>
            These posts cover the fundamentals — but every business is different. Let's talk about yours.
          </p>
          <a href="/#contact" className="btn-primary rounded-sm text-sm inline-block">
            Get in Touch
          </a>
        </div>
      </section>

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
