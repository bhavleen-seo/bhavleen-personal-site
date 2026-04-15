/*
 * Blog data store — add new posts here to publish them on the site.
 * Each post supports full markdown-style content via the `content` field.
 */

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  content: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "what-is-eeeat-and-why-it-matters",
    title: "What Is E-E-A-T and Why It Matters for Your SEO Strategy",
    excerpt:
      "Google's E-E-A-T framework — Experience, Expertise, Authoritativeness, and Trustworthiness — has become one of the most important concepts in modern SEO. Here's what it actually means for your site.",
    date: "2026-02-18",
    readTime: "6 min read",
    category: "SEO Strategy",
    content: `## What Is E-E-A-T?

E-E-A-T stands for **Experience, Expertise, Authoritativeness, and Trustworthiness**. It's a framework Google's quality raters use to evaluate the quality of web content — and it has significant implications for how your site ranks.

Google added the first "E" (Experience) in late 2022, signalling a shift toward valuing first-hand, real-world knowledge over generic, aggregated content.

## Why It Matters More Than Ever

With the rise of AI-generated content, Google has doubled down on signals that indicate genuine human expertise. A page written by someone who has actually done the thing they're writing about will consistently outperform one that hasn't — all else being equal.

This is especially true in YMYL (Your Money or Your Life) niches: medical, legal, financial, and health content.

## How to Improve Your E-E-A-T Signals

**Experience:** Demonstrate first-hand involvement. Case studies, personal anecdotes, and original data all signal experience.

**Expertise:** Author bios with credentials, certifications, and professional history matter. Google cross-references authorship signals across the web.

**Authoritativeness:** Backlinks from respected sources in your industry remain one of the strongest authority signals. Being cited, quoted, or referenced by others builds this over time.

**Trustworthiness:** Clear contact information, privacy policies, secure HTTPS, and transparent business information all contribute. Trust is the foundation the other three sit on.

## The Practical Takeaway

E-E-A-T isn't a ranking factor you can game with a checklist. It's the cumulative result of building a genuine online presence — publishing original insights, earning real links, and being transparent about who you are and what you do.

If you're building an SEO strategy in 2026, E-E-A-T should be baked into every content and link-building decision you make.`,
  },
  {
    slug: "technical-seo-audit-checklist-2026",
    title: "The Technical SEO Audit Checklist I Use for Every New Client",
    excerpt:
      "Before any content or link strategy, the technical foundation has to be right. Here's the exact audit process I run when I take on a new SEO client.",
    date: "2026-01-30",
    readTime: "8 min read",
    category: "Technical SEO",
    content: `## Why Technical SEO Comes First

You can produce the best content in your industry and earn high-quality backlinks — but if Google can't crawl and index your site efficiently, none of it matters. Technical SEO is the foundation that everything else depends on.

When I take on a new client, the first thing I do is a full technical audit before touching a single piece of content or building a single link.

## The Core Areas I Audit

### 1. Crawlability & Indexation
- Are the right pages being indexed? Are the wrong ones being indexed?
- Check robots.txt for unintentional blocks
- Review the XML sitemap — is it accurate and submitted?
- Look for noindex tags on pages that should be indexed

### 2. Site Architecture
- Is the URL structure logical and flat?
- Are important pages reachable within 3 clicks from the homepage?
- Check for orphaned pages with no internal links pointing to them

### 3. Core Web Vitals
- LCP (Largest Contentful Paint): target under 2.5 seconds
- CLS (Cumulative Layout Shift): target under 0.1
- INP (Interaction to Next Paint): target under 200ms
- Use PageSpeed Insights and CrUX data for real-world numbers

### 4. Duplicate Content & Canonicalisation
- Are canonical tags implemented correctly?
- Are there duplicate pages created by URL parameters, pagination, or faceted navigation?
- Check for www vs non-www and HTTP vs HTTPS redirect consistency

### 5. Schema Markup
- Is structured data implemented where relevant?
- Validate with Google's Rich Results Test
- Prioritise: Organisation, Article, LocalBusiness, FAQ, BreadcrumbList

### 6. Mobile & HTTPS
- Is the site fully mobile-responsive?
- Is HTTPS implemented site-wide with no mixed content warnings?

## The Output

After the audit, I produce a prioritised action list — not a 50-page PDF of every possible issue, but a ranked list of what will actually move the needle. High-impact, low-effort fixes come first.

Technical SEO isn't glamorous, but it's where most sites have the most to gain.`,
  },
  {
    slug: "local-seo-google-business-profile-guide",
    title: "Local SEO in 2026: How to Actually Optimise Your Google Business Profile",
    excerpt:
      "Your Google Business Profile is one of the most powerful local SEO assets you have — and most businesses are leaving significant visibility on the table by not optimising it properly.",
    date: "2026-01-10",
    readTime: "7 min read",
    category: "Local SEO",
    content: `## Why Your Google Business Profile Matters

For local businesses, your Google Business Profile (GBP) is often the first thing a potential customer sees — before your website, before your reviews, before anything else. It appears in the local pack, Google Maps, and increasingly in AI-generated search summaries.

Getting it right isn't optional. It's foundational.

## The Basics That Most Businesses Get Wrong

### NAP Consistency
Your Name, Address, and Phone number must be identical across your GBP, your website, and every directory listing on the web. Even small inconsistencies (St vs Street, Suite vs Ste) can dilute your local authority.

### Category Selection
Your primary category is the single most important field in your GBP. Choose the most specific, accurate category available. Add secondary categories where genuinely relevant — but don't stuff them.

### Business Description
Write a description that clearly explains what you do, who you serve, and what makes you different. Include your primary keywords naturally. This is not the place for marketing fluff.

## The Optimisations That Actually Move the Needle

**Google Posts:** Publish regular updates — offers, events, news. These signal an active, engaged business and give Google fresh content to index.

**Photos:** Businesses with photos receive significantly more clicks and direction requests. Upload real photos of your team, premises, and work. Update them regularly.

**Q&A Section:** Seed your own questions and answers. This controls the narrative and provides useful information to searchers.

**Review Management:** Respond to every review — positive and negative. Your response is as much for future customers reading it as it is for the reviewer.

**Services & Products:** Fill out the services section completely. Be specific. This feeds into how Google matches your listing to search queries.

## The Ongoing Work

Local SEO isn't a set-and-forget exercise. The businesses that consistently appear in the local pack are the ones that treat their GBP as a living asset — updating it regularly, responding to reviews promptly, and publishing content consistently.

If you're not doing this, your competitors probably are.`,
  },
];

export const CATEGORIES = Array.from(new Set(BLOG_POSTS.map((p) => p.category)));

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
