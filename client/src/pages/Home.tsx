/*
 * DESIGN PHILOSOPHY: Editorial Minimalism
 * Palette: Off-white (#F8F5F0) base, Near-black (#1A1A1A) primary, Warm amber (#C9873A) sole accent
 * Typography: Playfair Display (display) + Source Serif 4 (body) + DM Mono (labels/nav)
 * Layout: Asymmetric editorial grid, horizontal rules, section numbers as background texture
 */

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import {
  Search,
  Code2,
  FileText,
  Link2,
  MapPin,
  BarChart3,
  Mail,
  Linkedin,
  Globe,
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import ContactForm from "@/components/ContactForm";

// ─── Animation helpers ────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const, delay: i * 0.08 },
  }),
};

function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"} variants={fadeUp} className={className}>
      {children}
    </motion.div>
  );
}

function AnimatedItem({ children, i = 0, className = "" }: { children: React.ReactNode; i?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} custom={i} initial="hidden" animate={inView ? "visible" : "hidden"} variants={fadeUp} className={className}>
      {children}
    </motion.div>
  );
}

// ─── Animated counter ─────────────────────────────────────────────────────────
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 60, damping: 20 });
  const [display, setDisplay] = useState(0);

  useEffect(() => { if (inView) motionVal.set(to); }, [inView, to, motionVal]);
  useEffect(() => spring.on("change", (v) => setDisplay(Math.round(v))), [spring]);

  return <span ref={ref}>{display}{suffix}</span>;
}

// ─── Oversized background section number ────────────────────────────────────
function SectionNum({ num }: { num: string }) {
  return (
    <span
      className="absolute top-0 right-0 font-['Playfair_Display'] font-bold leading-none select-none pointer-events-none"
      aria-hidden="true"
      style={{ fontSize: "clamp(7rem, 18vw, 15rem)", opacity: 0.04, color: "#1A1A1A", lineHeight: 0.85 }}
    >
      {num}
    </span>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const CREDENTIALS = [
  "Master of Marketing · Victoria University",
  "Moz Technical SEO Certification",
  "10+ Years in Digital Marketing",
  "Melbourne, Australia",
  "US & Australian Market Experience",
  "Founder · Khalis Marketing",
  "E-E-A-T Specialist",
  "Google Algorithm Expert",
];

const SERVICES = [
  {
    icon: Code2,
    title: "Technical SEO",
    desc: "I dig into the infrastructure of your website: crawl issues, indexation gaps, Core Web Vitals, structured data, and site architecture. Most ranking problems start here.",
  },
  {
    icon: FileText,
    title: "On-Page Optimisation",
    desc: "From keyword mapping to content structure and internal linking, I ensure every page sends the right signals to search engines without sacrificing readability.",
  },
  {
    icon: Search,
    title: "Content Strategy",
    desc: "I build content frameworks that establish genuine topical authority. Not just blog posts for the sake of it, but strategic coverage that compounds over time.",
  },
  {
    icon: Link2,
    title: "Link Building",
    desc: "I focus on relevance and editorial quality over volume. Every link I pursue is one I'd be comfortable explaining to a Google Quality Rater.",
  },
  {
    icon: MapPin,
    title: "Local SEO",
    desc: "For businesses that serve a specific geography, I build the local signals — GBP, citations, proximity relevance — that translate into map pack visibility and foot traffic.",
  },
  {
    icon: BarChart3,
    title: "SEO Consulting & Strategy",
    desc: "Sometimes you need a second opinion or a clear roadmap more than execution. I offer strategic consulting for in-house teams and business owners who want to understand their options.",
  },
];

const INDUSTRIES = [
  "Retail & eCommerce",
  "Hospitality & Tourism",
  "Medical & Allied Health",
  "Finance & Professional Services",
  "Trade Services & Home Improvement",
  "Small Business & Local SEO",
];

const WHY = [
  { num: "01", title: "A decade of hands-on experience.", desc: "I've worked across competitive US and Australian markets since 2015. Not as a generalist, but as someone who has specialised in search from the start." },
  { num: "02", title: "Academic grounding, practical output.", desc: "A Master of Marketing from Victoria University gives me a framework for thinking about search that goes beyond checklists and tactics." },
  { num: "03", title: "I understand both sides of the algorithm.", desc: "Having worked in-house, agency-side, and independently, I've seen how search strategy looks from every angle. That perspective shapes how I approach every engagement." },
  { num: "04", title: "I communicate clearly.", desc: "I don't hide behind jargon. I explain what I'm doing, why it matters, and what you should realistically expect. Before we start, not after." },
  { num: "05", title: "I'm selective about who I work with.", desc: "I'd rather turn down a client than overpromise. If I take on your project, it's because I've looked at the opportunity and I'm confident I can deliver." },
];

const RESULTS = [
  { stat: 100, suffix: "%+", label: "Organic Traffic Growth", desc: "Delivered more than double the organic traffic for multiple clients through technical, on-page, and off-page SEO work." },
  { stat: 10, suffix: " yrs", label: "Industry Experience", desc: "A decade of getting results in competitive markets — across industries where SEO actually matters." },
  { stat: 2, suffix: "", label: "Markets", desc: "US & Australia. Ran campaigns in both, adapting to different competitive landscapes and search behaviours." },
];

const EXPERIENCE = [
  {
    period: "2023 — Present",
    role: "Founder & Lead SEO Consultant",
    org: "Khalis Marketing",
    location: "Melbourne, Australia",
    desc: "Running a boutique SEO consultancy serving Australian businesses. Every engagement is handled directly by me — from strategy and implementation through to reporting and optimisation. No outsourcing. No junior handoffs.",
  },
  {
    period: "2020 — Present",
    role: "SEO Specialist",
    org: "US-Based Digital Marketing Agency",
    location: "United States",
    desc: "Developing and executing SEO strategies for clients across competitive industries including retail, hospitality, medical, finance, and trade services. Took multiple websites from minimal visibility to page one rankings on Google. Delivered organic traffic growth of 100% or more across multiple accounts.",
  },
  {
    period: "Prior to 2020",
    role: "Freelance Content Writer & Digital Marketing Consultant",
    org: "Independent",
    location: "",
    desc: "Worked across content strategy, SEO copywriting, and digital marketing consulting before pivoting to specialise in technical and strategic SEO.",
  },
];

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Experience", href: "#experience" },
  { label: "Results", href: "#results" },
  { label: "Contact", href: "#contact" },
];

const PHOTO_URL =
  "https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663403813396/qbRvKhkRPlGsZbGM.png?Expires=1804207158&Signature=cnBhCNR4pc3GHdDNU9J9MQKX2bmbllTXb~IEHNQv3Q0AvujxoPk1rsFw2wHF5s6Tc3-o69d6qeW0jmK9dm61suC9cxNWnazYCA8sMMmSeXBLVbD9LpQjIqs2X7fCjGiQdmU-v9zNE7UFPhdBAHNKHZkBH6Xbrv4xUqLnfKuXA51xj0QnlKjztHJq1tZ-lsXn7l9b-7gMFfqEE1eWwa-iuRFFujJEfVywbvbYzun2iyytmRXOhBq8qny1Byqa315kPThah7NiXCdRAqGFYBy~Lm0rdVrQOL3RQFlqyd0vuHmFK09PJKcn-Sa3zMA6xbezcw4rLlb0x45YtzbRlnDkuw__&Key-Pair-Id=K2HSFNDJXOU9YS";

// ─── Component ────────────────────────────────────────────────────────────────
export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "#F8F5F0", color: "#1A1A1A" }}>

      {/* ── NAV ── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(248,245,240,0.97)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid #D9D4CC" : "none",
        }}
      >
        <div className="container flex items-center justify-between py-5">
          <a href="#" className="font-['Playfair_Display'] text-lg font-bold tracking-tight" style={{ color: "#1A1A1A" }}>
            Bhavleen Singh
          </a>
          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <a key={l.label} href={l.href} className="nav-link">{l.label}</a>
            ))}
            <a href="#contact" className="btn-primary text-xs px-5 py-2.5">
              Let's Talk
            </a>
          </nav>
          {/* Mobile hamburger */}
          <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" style={{ color: "#1A1A1A" }}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        {/* Mobile menu */}
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden px-6 pb-6 pt-2 flex flex-col gap-5"
            style={{ background: "#F8F5F0", borderBottom: "1px solid #D9D4CC" }}
          >
            {NAV_LINKS.map((l) => (
              <a key={l.label} href={l.href} className="nav-link text-sm py-1" onClick={() => setMenuOpen(false)}>{l.label}</a>
            ))}
            <a href="#contact" onClick={() => setMenuOpen(false)} className="btn-primary text-xs px-5 py-3 text-center mt-1">
              Let's Talk
            </a>
          </motion.div>
        )}
      </header>

      {/* ── HERO ── */}
      <section id="hero" className="min-h-screen flex items-center" style={{ background: "#F8F5F0" }}>
        <div className="container pt-28 pb-20">
          <div className="grid lg:grid-cols-[3fr_2fr] gap-16 xl:gap-24 items-center">

            {/* Left: typography */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="section-label">SEO Specialist · Melbourne, Australia</div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.2, ease: "easeOut" }}
                className="font-['Playfair_Display'] font-bold leading-[0.92] mt-4 mb-0"
                style={{ fontSize: "clamp(4rem, 9vw, 8.5rem)", color: "#1A1A1A" }}
              >
                Bhavleen
                <br />
                <em className="italic" style={{ color: "#C9873A" }}>Singh.</em>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
                style={{ transformOrigin: "left" }}
              >
                <span className="amber-rule" />
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.55 }}
                className="font-['Source_Serif_4'] text-lg md:text-xl leading-relaxed max-w-lg"
                style={{ color: "#6B6B6B" }}
              >
                Melbourne-based SEO professional with 10 years of hands-on experience helping businesses rank on Google, grow organic traffic, and turn search visibility into real revenue.
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="flex flex-wrap gap-6 mt-6 mb-10 font-['DM_Mono'] text-xs uppercase tracking-widest"
                style={{ color: "#6B6B6B" }}
              >
                {["Master of Marketing", "Moz Certified", "10+ Years"].map((c, i) => (
                  <span key={c} className="flex items-center gap-2">
                    {i > 0 && <span style={{ color: "#C9873A" }}>·</span>}
                    {c}
                  </span>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.82 }}
                className="flex flex-wrap gap-4"
              >
                <a href="#contact" className="btn-primary">Let's Talk SEO</a>
                <a href="#services" className="btn-outline">View Services</a>
              </motion.div>
            </div>

            {/* Right: photo */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
              className="hidden lg:block"
            >
              <div className="relative">
                {/* Amber vertical accent line */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-0.5"
                  style={{ background: "#C9873A", transform: "translateX(-1.5rem)" }}
                />
                <img
                  src={PHOTO_URL}
                  alt="Bhavleen Singh — SEO Specialist, Melbourne"
                  className="w-full object-cover object-top"
                  style={{ height: "68vh", maxHeight: 580, filter: "grayscale(8%)" }}
                />
                {/* Khalis tag */}
                <div
                  className="absolute bottom-0 right-0 px-5 py-3"
                  style={{ background: "#1A1A1A" }}
                >
                  <p className="font-['DM_Mono'] text-xs uppercase tracking-widest mb-0.5" style={{ color: "rgba(248,245,240,0.5)" }}>Founder</p>
                  <p className="font-['Playfair_Display'] text-base font-bold" style={{ color: "#F8F5F0" }}>Khalis Marketing</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Scroll cue */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
          >
            <span className="font-['DM_Mono'] text-xs uppercase tracking-widest" style={{ color: "#D9D4CC" }}>Scroll</span>
            <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.4 }}>
              <ChevronDown size={16} style={{ color: "#C9873A" }} />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── CREDENTIALS MARQUEE ── */}
      <div style={{ borderTop: "1px solid #D9D4CC", borderBottom: "1px solid #D9D4CC", background: "#F0EDE8" }} className="py-3.5 overflow-hidden">
        <div className="flex whitespace-nowrap" style={{ maskImage: "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)" }}>
          {[0, 1].map((track) => (
            <div
              key={track}
              className="flex shrink-0 gap-10 pr-10"
              style={{ animation: "marquee 40s linear infinite", willChange: "transform" }}
            >
              {CREDENTIALS.map((c, i) => (
                <span key={i} className="font-['DM_Mono'] text-xs uppercase tracking-widest flex items-center gap-3" style={{ color: "#6B6B6B" }}>
                  <span className="w-1 h-1 rounded-full shrink-0 inline-block" style={{ background: "#C9873A" }} />
                  {c}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── ABOUT (01) ── */}
      <section id="about" className="py-24 lg:py-36 relative overflow-hidden" style={{ background: "#F8F5F0" }}>
        <SectionNum num="01" />
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-start">

            {/* Left: text */}
            <div>
              <AnimatedItem i={0}><div className="section-label">About</div></AnimatedItem>
              <AnimatedItem i={1}>
                <h2 className="font-['Playfair_Display'] text-4xl lg:text-5xl font-bold mb-2 leading-tight" style={{ color: "#1A1A1A" }}>
                  Who I Am
                </h2>
                <span className="amber-rule" />
              </AnimatedItem>
              <AnimatedItem i={2}>
                <p className="font-['Source_Serif_4'] text-lg leading-relaxed mb-5" style={{ color: "#3A3A3A" }}>
                  I'm Bhavleen Singh, an SEO specialist, digital marketing professional, and founder of{" "}
                  <a href="https://khalismarketing.com.au" target="_blank" rel="noopener noreferrer" className="font-semibold underline underline-offset-2" style={{ color: "#C9873A", textDecorationColor: "#C9873A" }}>
                    Khalis Marketing
                  </a>
                  , a boutique SEO consultancy based in Melbourne, Australia.
                </p>
              </AnimatedItem>
              <AnimatedItem i={3}>
                <p className="font-['Source_Serif_4'] text-lg leading-relaxed mb-5" style={{ color: "#3A3A3A" }}>
                  My career in digital marketing spans over a decade, starting as a freelance content writer before transitioning fully into SEO in 2020. Since then, I've built and executed search strategies for businesses across the US and Australia, working in some of the most competitive niches in digital marketing.
                </p>
              </AnimatedItem>
              <AnimatedItem i={4}>
                <p className="font-['Source_Serif_4'] text-lg leading-relaxed mb-10" style={{ color: "#3A3A3A" }}>
                  I started Khalis Marketing because I believe clients deserve better than what most agencies offer: transparency, modern strategies, and someone who actually does the work they're paid for.
                </p>
              </AnimatedItem>

              {/* Credentials */}
              <AnimatedItem i={5}>
                <div className="space-y-0" style={{ borderTop: "1px solid #D9D4CC" }}>
                  {[
                    { title: "Master of Marketing", sub: "Victoria University, Melbourne · 2023" },
                    { title: "Technical SEO Certification", sub: "Moz — Industry-recognised accreditation" },
                    { title: "10+ Years in Digital Marketing", sub: "US & Australian market experience" },
                  ].map((c) => (
                    <div key={c.title} className="flex items-start gap-4 py-4" style={{ borderBottom: "1px solid #D9D4CC" }}>
                      <div className="w-1.5 h-1.5 rounded-full mt-2.5 shrink-0" style={{ background: "#C9873A" }} />
                      <div>
                        <p className="font-['DM_Mono'] text-sm font-medium" style={{ color: "#1A1A1A" }}>{c.title}</p>
                        <p className="font-['Source_Serif_4'] text-sm mt-0.5" style={{ color: "#6B6B6B" }}>{c.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </AnimatedItem>
            </div>

            {/* Right: photo + stats */}
            <AnimatedSection>
              <div className="relative lg:sticky lg:top-28">
                <img
                  src={PHOTO_URL}
                  alt="Bhavleen Singh"
                  className="w-full object-cover object-top"
                  style={{ maxWidth: 440, height: 520, filter: "grayscale(8%)" }}
                />
                {/* Stats row below photo */}
                <div className="grid grid-cols-4 mt-0" style={{ borderTop: "2px solid #C9873A" }}>
                  {[
                    { n: 10, s: "+", l: "Years" },
                    { n: 100, s: "%+", l: "Traffic" },
                    { n: 2, s: "", l: "Markets" },
                    { n: 6, s: "+", l: "Industries" },
                  ].map((s, i) => (
                    <div
                      key={s.l}
                      className="px-4 py-4"
                      style={{
                        background: "#1A1A1A",
                        borderRight: i < 3 ? "1px solid rgba(248,245,240,0.08)" : "none",
                      }}
                    >
                      <p className="font-['Playfair_Display'] text-xl font-bold" style={{ color: "#C9873A" }}>
                        <Counter to={s.n} suffix={s.s} />
                      </p>
                      <p className="font-['DM_Mono'] text-xs uppercase tracking-widest mt-0.5" style={{ color: "rgba(248,245,240,0.45)" }}>
                        {s.l}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <hr className="section-rule" />

      {/* ── SERVICES (02) ── */}
      <section id="services" className="py-24 lg:py-36 relative overflow-hidden" style={{ background: "#F0EDE8" }}>
        <SectionNum num="02" />
        <div className="container">
          <AnimatedItem i={0}><div className="section-label">Services</div></AnimatedItem>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
            <AnimatedItem i={1}>
              <h2 className="font-['Playfair_Display'] text-4xl lg:text-5xl font-bold leading-tight" style={{ color: "#1A1A1A" }}>
                Core SEO Services
              </h2>
              <span className="amber-rule" />
            </AnimatedItem>
            <AnimatedItem i={2}>
              <p className="font-['Source_Serif_4'] max-w-sm text-base leading-relaxed" style={{ color: "#6B6B6B" }}>
                Every engagement is handled directly by me — from strategy through to implementation and reporting.
              </p>
            </AnimatedItem>
          </div>

          {/* Service list — editorial style with rules */}
          <div className="grid md:grid-cols-2 gap-0" style={{ borderTop: "1px solid #D9D4CC" }}>
            {SERVICES.map((s, i) => (
              <AnimatedItem key={s.title} i={i * 0.15}>
                <div
                  className="flex gap-5 py-8 px-1"
                  style={{
                    borderBottom: "1px solid #D9D4CC",
                    borderRight: i % 2 === 0 ? "1px solid #D9D4CC" : "none",
                  }}
                >
                  <div className="shrink-0 mt-1">
                    <s.icon size={18} style={{ color: "#C9873A" }} />
                  </div>
                  <div>
                    <h3 className="font-['Playfair_Display'] text-xl font-semibold mb-2" style={{ color: "#1A1A1A" }}>
                      {s.title}
                    </h3>
                    <p className="font-['Source_Serif_4'] text-base leading-relaxed" style={{ color: "#6B6B6B" }}>
                      {s.desc}
                    </p>
                  </div>
                </div>
              </AnimatedItem>
            ))}
          </div>

          {/* Industries */}
          <AnimatedItem i={4} className="mt-14">
            <div className="section-label mb-5">Industries Served</div>
            <div className="flex flex-wrap gap-3">
              {INDUSTRIES.map((ind) => (
                <span
                  key={ind}
                  className="px-4 py-2 font-['DM_Mono'] text-xs uppercase tracking-wider"
                  style={{
                    background: "transparent",
                    border: "1px solid #D9D4CC",
                    color: "#6B6B6B",
                  }}
                >
                  {ind}
                </span>
              ))}
            </div>
          </AnimatedItem>
        </div>
      </section>

      <hr className="section-rule" />

      {/* ── EXPERIENCE (03) ── */}
      <section id="experience" className="py-24 lg:py-36 relative overflow-hidden" style={{ background: "#F8F5F0" }}>
        <SectionNum num="03" />
        <div className="container">
          <AnimatedItem i={0}><div className="section-label">Experience & Credentials</div></AnimatedItem>
          <AnimatedItem i={1}>
            <h2 className="font-['Playfair_Display'] text-4xl lg:text-5xl font-bold leading-tight" style={{ color: "#1A1A1A" }}>
              A Decade of{" "}
              <em className="italic" style={{ color: "#C9873A" }}>Real-World Results</em>
            </h2>
            <span className="amber-rule" />
          </AnimatedItem>

          {/* Timeline */}
          <div className="space-y-0 mt-10" style={{ borderTop: "1px solid #D9D4CC" }}>
            {EXPERIENCE.map((e, i) => (
              <AnimatedItem key={e.role} i={i * 0.2}>
                <div className="grid md:grid-cols-[200px_1fr] gap-6 lg:gap-12 py-10" style={{ borderBottom: "1px solid #D9D4CC" }}>
                  {/* Left: period */}
                  <div className="md:pt-1">
                    <p className="font-['DM_Mono'] text-xs uppercase tracking-widest" style={{ color: "#C9873A" }}>{e.period}</p>
                    {e.location && (
                      <p className="font-['DM_Mono'] text-xs mt-2" style={{ color: "#6B6B6B" }}>{e.location}</p>
                    )}
                  </div>
                  {/* Right: content */}
                  <div>
                    <h3 className="font-['Playfair_Display'] text-xl font-bold mb-1" style={{ color: "#1A1A1A" }}>{e.role}</h3>
                    <p className="font-['DM_Mono'] text-xs uppercase tracking-wider mb-4" style={{ color: "#6B6B6B" }}>{e.org}</p>
                    <p className="font-['Source_Serif_4'] text-base leading-relaxed" style={{ color: "#3A3A3A" }}>{e.desc}</p>
                  </div>
                </div>
              </AnimatedItem>
            ))}
          </div>

          {/* Education */}
          <AnimatedItem i={4} className="mt-12">
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { title: "Master of Marketing", sub: "Victoria University, Melbourne · 2023", detail: "Consumer behaviour, digital strategy, marketing analytics" },
                { title: "Technical SEO Certification", sub: "Moz · Industry-recognised accreditation", detail: "One of the most respected authorities in the SEO industry" },
              ].map((ed) => (
                <div key={ed.title} className="p-7" style={{ background: "#1A1A1A" }}>
                  <div className="section-label mb-4" style={{ color: "#C9873A", borderColor: "#C9873A" }}>Education</div>
                  <h3 className="font-['Playfair_Display'] text-xl font-bold mb-1" style={{ color: "#F8F5F0" }}>{ed.title}</h3>
                  <p className="font-['DM_Mono'] text-xs uppercase tracking-wider mb-3" style={{ color: "#C9873A" }}>{ed.sub}</p>
                  <p className="font-['Source_Serif_4'] text-sm" style={{ color: "rgba(248,245,240,0.6)" }}>{ed.detail}</p>
                </div>
              ))}
            </div>
          </AnimatedItem>
        </div>
      </section>

      <hr className="section-rule" />

      {/* ── RESULTS (04) ── */}
      <section id="results" className="py-24 lg:py-36 relative overflow-hidden" style={{ background: "#F0EDE8" }}>
        <SectionNum num="04" />
        <div className="container">
          <AnimatedItem i={0}><div className="section-label">Results</div></AnimatedItem>
          <AnimatedItem i={1}>
            <h2 className="font-['Playfair_Display'] text-4xl lg:text-5xl font-bold leading-tight" style={{ color: "#1A1A1A" }}>
              Results That Matter
            </h2>
            <span className="amber-rule" />
          </AnimatedItem>
          <AnimatedItem i={2}>
            <p className="font-['Source_Serif_4'] text-base mb-14 max-w-xl" style={{ color: "#6B6B6B" }}>
              Specific client details withheld for confidentiality. Results available for discussion.
            </p>
          </AnimatedItem>

          {/* Stats — horizontal band */}
          <div className="grid md:grid-cols-3 gap-0 mb-20" style={{ borderTop: "2px solid #C9873A" }}>
            {RESULTS.map((r, i) => (
              <AnimatedItem key={r.label} i={i * 0.2}>
                <div
                  className="py-10 px-8"
                  style={{ borderRight: i < 2 ? "1px solid #D9D4CC" : "none" }}
                >
                  <p className="font-['Playfair_Display'] font-bold mb-1" style={{ fontSize: "clamp(3rem, 6vw, 5rem)", color: "#C9873A", lineHeight: 1 }}>
                    <Counter to={r.stat} suffix={r.suffix} />
                  </p>
                  <p className="font-['DM_Mono'] text-xs uppercase tracking-widest mb-4" style={{ color: "#1A1A1A" }}>{r.label}</p>
                  <p className="font-['Source_Serif_4'] text-sm leading-relaxed" style={{ color: "#6B6B6B" }}>{r.desc}</p>
                </div>
              </AnimatedItem>
            ))}
          </div>

          {/* Why work with me */}
          <AnimatedItem i={3}>
            <div className="section-label mb-2">Why Work With Me</div>
          </AnimatedItem>
          <div className="space-y-0 mt-6" style={{ borderTop: "1px solid #D9D4CC" }}>
            {WHY.map((w, i) => (
              <AnimatedItem key={w.num} i={i * 0.1}>
                <div className="grid md:grid-cols-[80px_1fr] gap-6 py-7" style={{ borderBottom: "1px solid #D9D4CC" }}>
                  <p
                    className="font-['Playfair_Display'] font-bold"
                    style={{ fontSize: "2.25rem", color: "#1A1A1A", opacity: 0.1, lineHeight: 1 }}
                  >
                    {w.num}
                  </p>
                  <div>
                    <h3 className="font-['Playfair_Display'] text-lg font-semibold mb-1" style={{ color: "#1A1A1A" }}>{w.title}</h3>
                    <p className="font-['Source_Serif_4'] text-base leading-relaxed" style={{ color: "#6B6B6B" }}>{w.desc}</p>
                  </div>
                </div>
              </AnimatedItem>
            ))}
          </div>
        </div>
      </section>

      <hr className="section-rule" />

      {/* ── KHALIS MARKETING (05) ── */}
      <section className="py-24 lg:py-36 relative overflow-hidden" style={{ background: "#F8F5F0" }}>
        <SectionNum num="05" />
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-start">
            <AnimatedSection>
              <div className="section-label">My Agency</div>
              <h2 className="font-['Playfair_Display'] text-4xl lg:text-5xl font-bold mt-2 leading-tight" style={{ color: "#1A1A1A" }}>
                Khalis Marketing
              </h2>
              <h3 className="font-['Playfair_Display'] text-2xl italic mt-1 mb-0" style={{ color: "#C9873A" }}>
                Built From Experience.
              </h3>
              <span className="amber-rule" />
              <p className="font-['Source_Serif_4'] text-lg leading-relaxed mb-5" style={{ color: "#3A3A3A" }}>
                In 2023, I took everything I'd learned across a decade of agency work and independent consulting and built something of my own. Khalis Marketing is the result: a boutique SEO practice structured around the way I believe SEO should actually be delivered.
              </p>
              <p className="font-['Source_Serif_4'] text-lg leading-relaxed mb-8" style={{ color: "#3A3A3A" }}>
                The name <strong>Khalis</strong> comes from Arabic, meaning "pure" — a word I chose deliberately. It reflects the standard I hold myself to: clear communication, evidence-based strategy, and outcomes you can verify in your own analytics.
              </p>
              <a
                href="https://khalismarketing.com.au"
                target="_blank"
                rel="noopener noreferrer"
                className="link-amber"
              >
                Visit Khalis Marketing <ExternalLink size={13} />
              </a>
            </AnimatedSection>

            <AnimatedSection>
              {/* Pull quote block */}
              <div className="p-10" style={{ background: "#1A1A1A" }}>
                <p className="font-['Playfair_Display'] italic font-bold mb-6" style={{ fontSize: "4.5rem", color: "#C9873A", lineHeight: 0.8 }}>"</p>
                <p className="font-['Playfair_Display'] text-2xl font-semibold italic leading-snug mb-8" style={{ color: "#F8F5F0" }}>
                  Why I built it
                </p>
                <div className="space-y-5">
                  {[
                    "I wanted to own the quality of my work end-to-end",
                    "Clients deserved someone who understood their business, not just their keywords",
                    "SEO done right takes time — I wanted to work with clients who understood that",
                    "I'd rather build something I'm proud of than scale something mediocre",
                  ].map((p) => (
                    <div key={p} className="flex items-start gap-4">
                      <div className="w-1 h-1 rounded-full mt-2.5 shrink-0" style={{ background: "#C9873A" }} />
                      <p className="font-['Source_Serif_4'] text-base" style={{ color: "rgba(248,245,240,0.75)" }}>{p}</p>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <hr className="section-rule" />

      {/* ── PERSONAL (06) ── */}
      <section className="py-24 lg:py-32 relative overflow-hidden" style={{ background: "#F0EDE8" }}>
        <SectionNum num="06" />
        <div className="container">
          <div className="max-w-3xl">
            <AnimatedItem i={0}><div className="section-label">A Bit About Me</div></AnimatedItem>
            <AnimatedItem i={1}>
              <span className="amber-rule" />
              <p className="font-['Source_Serif_4'] text-xl leading-relaxed mb-6" style={{ color: "#3A3A3A" }}>
                I grew up curious about how things work, and the internet turned out to be the most interesting puzzle I've found. SEO sits at the intersection of technology, psychology, and communication — which is probably why it's held my attention for over a decade.
              </p>
            </AnimatedItem>
            <AnimatedItem i={2}>
              <p className="font-['Source_Serif_4'] text-xl leading-relaxed mb-6" style={{ color: "#3A3A3A" }}>
                I'm a first-generation immigrant who built a career in a competitive field through persistence and a genuine love for the craft. That background shapes how I approach problems: methodically, without shortcuts, and with a lot of patience for the long game.
              </p>
            </AnimatedItem>
            <AnimatedItem i={3}>
              <p className="font-['Source_Serif_4'] text-xl leading-relaxed" style={{ color: "#3A3A3A" }}>
                Away from the screen, I'm into gaming, following cricket, and exploring regional Victoria whenever I get the chance.{" "}
                <strong style={{ color: "#1A1A1A" }}>Bright, Victoria</strong> is a standing recommendation. If you haven't been, it's worth the drive.
              </p>
            </AnimatedItem>
          </div>
        </div>
      </section>

      {/* ── CONTACT (07) ── */}
      <section id="contact" className="py-24 lg:py-36" style={{ background: "#1A1A1A" }}>
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-start">

            {/* Left: info */}
            <AnimatedSection>
              <div className="section-label" style={{ color: "#C9873A", borderColor: "#C9873A" }}>Contact</div>
              <h2 className="font-['Playfair_Display'] text-4xl lg:text-5xl font-bold mt-2 mb-0 leading-tight" style={{ color: "#F8F5F0" }}>
                Let's Talk About What SEO Can Do
              </h2>
              <h3 className="font-['Playfair_Display'] text-2xl italic mb-0" style={{ color: "#C9873A" }}>
                for Your Business.
              </h3>
              <span className="amber-rule" style={{ background: "#C9873A" }} />
              <p className="font-['Source_Serif_4'] text-lg leading-relaxed mb-10" style={{ color: "rgba(248,245,240,0.65)" }}>
                Whether you're a business looking for SEO help or a recruiter exploring whether my background fits an opportunity, I'm always open to a straightforward conversation. No jargon. No pressure.
              </p>

              {/* Contact links */}
              <div className="space-y-0 mb-12" style={{ borderTop: "1px solid rgba(248,245,240,0.1)" }}>
                {[
                  { icon: Mail, label: "Email", value: "contact@bhavleensingh.com", href: "mailto:contact@bhavleensingh.com" },
                  { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/bhavleensingh", href: "https://linkedin.com/in/bhavleensingh" },
                  { icon: Globe, label: "Agency", value: "khalismarketing.com.au", href: "https://khalismarketing.com.au" },
                ].map((c) => (
                  <a
                    key={c.label}
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-5 py-5 group"
                    style={{ borderBottom: "1px solid rgba(248,245,240,0.1)" }}
                  >
                    <c.icon size={16} style={{ color: "#C9873A", flexShrink: 0 }} />
                    <div>
                      <p className="font-['DM_Mono'] text-xs uppercase tracking-widest mb-0.5" style={{ color: "rgba(248,245,240,0.35)" }}>{c.label}</p>
                      <p className="font-['DM_Mono'] text-sm group-hover:text-amber-400 transition-colors" style={{ color: "#F8F5F0" }}>{c.value}</p>
                    </div>
                    <ArrowRight size={14} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "#C9873A" }} />
                  </a>
                ))}
              </div>

              {/* Pull quote */}
              <div className="p-7" style={{ background: "rgba(248,245,240,0.04)", borderLeft: "2px solid #C9873A" }}>
                <p className="font-['Playfair_Display'] text-4xl leading-none mb-4" style={{ color: "#C9873A" }}>"</p>
                <p className="font-['Playfair_Display'] text-lg font-semibold italic leading-snug mb-5" style={{ color: "#F8F5F0" }}>
                  I only take on clients I'm confident I can help. If SEO isn't right for your business right now, I'll tell you.
                </p>
                <div className="flex items-center gap-3">
                  <img src={PHOTO_URL} alt="Bhavleen Singh" className="w-9 h-9 rounded-full object-cover object-top" />
                  <div>
                    <p className="font-['DM_Mono'] text-xs font-medium" style={{ color: "#F8F5F0" }}>Bhavleen Singh</p>
                    <p className="font-['DM_Mono'] text-xs mt-0.5" style={{ color: "rgba(248,245,240,0.4)" }}>SEO Specialist · Founder, Khalis Marketing</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Right: form */}
            <AnimatedSection>
              <ContactForm />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-7" style={{ background: "#0F0F0F", borderTop: "1px solid rgba(248,245,240,0.08)" }}>
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-['Playfair_Display'] text-base font-bold" style={{ color: "#F8F5F0" }}>Bhavleen Singh</p>
          <p className="font-['DM_Mono'] text-xs text-center" style={{ color: "rgba(248,245,240,0.3)" }}>
            © {new Date().getFullYear()} · Melbourne, Australia · Founder of{" "}
            <a href="https://khalismarketing.com.au" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" style={{ color: "rgba(248,245,240,0.45)" }}>
              Khalis Marketing
            </a>
          </p>
          <div className="flex gap-6">
            {NAV_LINKS.map((l) => (
              <a key={l.label} href={l.href} className="font-['DM_Mono'] text-xs hover:text-white transition-colors" style={{ color: "rgba(248,245,240,0.35)", letterSpacing: "0.08em" }}>
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
