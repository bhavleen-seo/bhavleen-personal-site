/*
 * ContactForm — submits via Formspree (free, no backend needed)
 * Connected to Formspree: https://formspree.io/f/mnjgygrb
 * Styled for Editorial Minimalism dark contact section
 */

import { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

const ENQUIRY_TYPES = [
  "SEO Audit",
  "Monthly SEO Retainer",
  "Local SEO",
  "Technical SEO",
  "Content Strategy",
  "SEO Consulting",
  "Recruitment / Opportunity",
  "Other",
];

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    website: "",
    enquiryType: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("https://formspree.io/f/mnjgygrb", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", website: "", enquiryType: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputBase: React.CSSProperties = {
    width: "100%",
    background: "rgba(248,245,240,0.05)",
    border: "1px solid rgba(201,135,58,0.25)",
    borderRadius: "1px",
    padding: "0.75rem 1rem",
    color: "#F8F5F0",
    fontFamily: "'Source Serif 4', serif",
    fontSize: "0.95rem",
    outline: "none",
    transition: "border-color 0.2s",
  };

  const labelBase = "block font-['DM_Mono'] text-xs uppercase tracking-widest mb-1.5";

  if (status === "success") {
    return (
      <div
        className="p-10 flex flex-col items-center justify-center text-center min-h-[420px]"
        style={{ background: "rgba(248,245,240,0.04)", border: "1px solid rgba(201,135,58,0.2)" }}
      >
        <CheckCircle2 size={40} style={{ color: "#C9873A" }} className="mb-5" />
        <h3 className="font-['Playfair_Display'] text-2xl font-bold mb-3" style={{ color: "#F8F5F0" }}>
          Message received.
        </h3>
        <p className="font-['Source_Serif_4'] text-sm leading-relaxed mb-6 max-w-xs" style={{ color: "rgba(248,245,240,0.6)" }}>
          Thanks for reaching out. I'll get back to you within 1–2 business days.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="font-['DM_Mono'] text-xs uppercase tracking-widest underline underline-offset-2"
          style={{ color: "#C9873A" }}
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <div
      className="p-8 lg:p-10"
      style={{ background: "rgba(248,245,240,0.04)", border: "1px solid rgba(201,135,58,0.15)" }}
    >
      <h3 className="font-['Playfair_Display'] text-2xl font-bold mb-1" style={{ color: "#F8F5F0" }}>
        Send a Message
      </h3>
      <p className="font-['Source_Serif_4'] text-sm mb-8" style={{ color: "rgba(248,245,240,0.45)" }}>
        I typically respond within 1–2 business days.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className={labelBase} style={{ color: "rgba(248,245,240,0.45)" }}>
              Your Name <span style={{ color: "#C9873A" }}>*</span>
            </label>
            <input
              type="text" name="name" required placeholder="Jane Smith"
              value={form.name} onChange={handleChange}
              style={inputBase}
              onFocus={(e) => (e.target.style.borderColor = "#C9873A")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(201,135,58,0.25)")}
            />
          </div>
          <div>
            <label className={labelBase} style={{ color: "rgba(248,245,240,0.45)" }}>
              Email Address <span style={{ color: "#C9873A" }}>*</span>
            </label>
            <input
              type="email" name="email" required placeholder="jane@company.com"
              value={form.email} onChange={handleChange}
              style={inputBase}
              onFocus={(e) => (e.target.style.borderColor = "#C9873A")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(201,135,58,0.25)")}
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className={labelBase} style={{ color: "rgba(248,245,240,0.45)" }}>
              Website URL
            </label>
            <input
              type="url" name="website" placeholder="https://yoursite.com.au"
              value={form.website} onChange={handleChange}
              style={inputBase}
              onFocus={(e) => (e.target.style.borderColor = "#C9873A")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(201,135,58,0.25)")}
            />
          </div>
          <div>
            <label className={labelBase} style={{ color: "rgba(248,245,240,0.45)" }}>
              Enquiry Type
            </label>
            <select
              name="enquiryType" value={form.enquiryType} onChange={handleChange}
              style={{ ...inputBase, appearance: "none" as const }}
              onFocus={(e) => (e.target.style.borderColor = "#C9873A")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(201,135,58,0.25)")}
            >
              <option value="" style={{ background: "#1A1A1A" }}>Select…</option>
              {ENQUIRY_TYPES.map((t) => (
                <option key={t} value={t} style={{ background: "#1A1A1A" }}>{t}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className={labelBase} style={{ color: "rgba(248,245,240,0.45)" }}>
            Message <span style={{ color: "#C9873A" }}>*</span>
          </label>
          <textarea
            name="message" required rows={5}
            placeholder="Tell me a bit about your business and what you're looking to achieve with SEO…"
            value={form.message} onChange={handleChange}
            style={{ ...inputBase, resize: "vertical" }}
            onFocus={(e) => (e.target.style.borderColor = "#C9873A")}
            onBlur={(e) => (e.target.style.borderColor = "rgba(201,135,58,0.25)")}
          />
        </div>

        {status === "error" && (
          <div className="flex items-center gap-2 text-sm font-['DM_Mono']" style={{ color: "#f87171" }}>
            <AlertCircle size={14} />
            Something went wrong. Please try emailing directly.
          </div>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full flex items-center justify-center gap-2 font-['DM_Mono'] text-xs uppercase tracking-widest"
          style={{
            background: status === "loading" ? "#9a6428" : "#C9873A",
            color: "#F8F5F0",
            padding: "0.9rem 2rem",
            border: "none",
            cursor: status === "loading" ? "not-allowed" : "pointer",
            transition: "background 0.2s",
          }}
        >
          {status === "loading" ? (
            <><Loader2 size={14} className="animate-spin" /> Sending…</>
          ) : (
            <><Send size={13} /> Send Message</>
          )}
        </button>

        <p className="font-['DM_Mono'] text-xs text-center" style={{ color: "rgba(248,245,240,0.25)" }}>
          No spam. No pressure. Just a conversation.
        </p>
      </form>
    </div>
  );
}
