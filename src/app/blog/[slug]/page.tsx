import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { blogPosts } from "@/constants/blogData";
import { FiClock, FiCalendar, FiArrowLeft, FiCheckCircle, FiPhone, FiMail, FiUser } from "react-icons/fi";
import { FaLinkedinIn } from "react-icons/fa";
import ceoImg from "@/assets/images/ceo.png";
import darkbg from "@/assets/images/darkbg.png";
import Button from "@/components/Button";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return { title: "Article Not Found | VR Tax CPA LLC" };
  }

  return {
    title: `${post.title} | VR Tax CPA LLC`,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  // Related posts (excluding current)
  const relatedPosts = blogPosts.filter((p) => p.slug !== slug).slice(0, 3);

  // Convert markdown-style sections into clean JSX paragraphs/headings
  const renderContent = (contentStr: string) => {
    const lines = contentStr.trim().split("\n");
    const elements: React.ReactNode[] = [];
    let currentParagraph: string[] = [];

    const formatInline = (raw: string): React.ReactNode => {
      const parts = raw.split(/(\*\*.*?\*\*)/g);
      return parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={i} className="font-bold text-[#0B1F3B]">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return part;
      });
    };

    const flushParagraph = (key: number) => {
      if (currentParagraph.length > 0) {
        const text = currentParagraph.join(" ");
        elements.push(
          <p key={`p-${key}`} className="text-slate-600 text-sm sm:text-base leading-relaxed mb-5 font-manrope">
            {formatInline(text)}
          </p>
        );
        currentParagraph = [];
      }
    };

    lines.forEach((line, index) => {
      const trimmed = line.trim();

      if (trimmed.startsWith("## ")) {
        flushParagraph(index);
        elements.push(
          <h2 key={`h2-${index}`} className="text-2xl sm:text-3xl font-extrabold font-figtree text-[#0B1F3B] mt-10 mb-4 tracking-tight">
            {trimmed.replace("## ", "")}
          </h2>
        );
      } else if (trimmed.startsWith("### ")) {
        flushParagraph(index);
        elements.push(
          <h3 key={`h3-${index}`} className="text-xl sm:text-2xl font-bold font-figtree text-[#0B1F3B] mt-7 mb-3">
            {trimmed.replace("### ", "")}
          </h3>
        );
      } else if (trimmed.startsWith("> ")) {
        flushParagraph(index);
        elements.push(
          <blockquote key={`quote-${index}`} className="my-6 p-5 sm:p-6 bg-slate-50 border-l-4 border-[#d3d663] rounded-r-2xl text-slate-700 italic font-manrope text-sm sm:text-base leading-relaxed shadow-2xs">
            {formatInline(trimmed.replace("> ", ""))}
          </blockquote>
        );
      } else if (trimmed.startsWith("- ")) {
        flushParagraph(index);
        elements.push(
          <div key={`li-${index}`} className="flex items-start gap-3 my-2.5 text-sm sm:text-base text-slate-700 font-manrope">
            <FiCheckCircle className="text-[#d3d663] mt-1 flex-shrink-0" size={16} />
            <span>{formatInline(trimmed.replace("- ", ""))}</span>
          </div>
        );
      } else if (trimmed === "---") {
        flushParagraph(index);
        elements.push(<hr key={`hr-${index}`} className="my-8 border-slate-200" />);
      } else if (trimmed.length > 0) {
        currentParagraph.push(trimmed);
      } else {
        flushParagraph(index);
      }
    });

    flushParagraph(lines.length);
    return elements;
  };

  return (
    <>
      {/* ── Blog Header Hero ── */}
      <section 
        className="relative pt-28 sm:pt-36 pb-14 sm:pb-20 text-white overflow-hidden bg-safe-fixed bg-no-repeat"
        style={{ backgroundImage: `url(${darkbg.src})` }}
      >
        <div className="absolute inset-0 bg-[#0B1F3B]/60 pointer-events-none" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-15 pointer-events-none bg-[radial-gradient(circle,#d3d663,transparent_70%)]" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-10 pointer-events-none bg-[radial-gradient(circle,#d3d663,transparent_70%)]" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          {/* Breadcrumbs */}
          <nav className="flex items-center justify-center gap-2 text-white/60 text-xs font-semibold mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-[#d3d663] line-clamp-1">{post.category}</span>
          </nav>

          {/* Title */}
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold font-figtree tracking-tight leading-tight max-w-3xl mx-auto mb-6 text-white">
            {post.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-white/80 font-manrope">
            <div className="flex items-center gap-2">
              <FiUser className="text-[#d3d663]" />
              <span>{post.author}</span>
            </div>
            <span className="text-white/40">•</span>
            <div className="flex items-center gap-2">
              <FiCalendar className="text-[#d3d663]" />
              <span>{post.date}</span>
            </div>
            <span className="text-white/40">•</span>
            <div className="flex items-center gap-2">
              <FiClock className="text-[#d3d663]" />
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Main Content & Sidebar Layout ── */}
      <section className="py-8 sm:py-20 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">

            {/* ── Left Column: Article Body (lg:col-span-8) ── */}
            <article className="lg:col-span-8 bg-white p-0 sm:p-10 lg:p-12 md:rounded-3xl md:border md:border-slate-200/80 md:shadow-sm">

              {/* Featured Image */}
              <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden mb-8 shadow-md bg-slate-100">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 800px"
                  priority
                />
              </div>

              {/* Key Takeaways Box */}
              {post.takeaways && post.takeaways.length > 0 && (
                <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 sm:p-7 mb-10 shadow-sm">
                  <h4 className="text-base font-extrabold font-figtree text-[#0B1F3B] uppercase tracking-wider mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#d3d663] inline-block" />
                    Key Executive Takeaways
                  </h4>
                  <div className="space-y-3">
                    {post.takeaways.map((point: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 font-medium font-manrope">
                        <FiCheckCircle className="text-[#d3d663] mt-0.5 flex-shrink-0" size={16} />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Rendered Body Text */}
              <div className="article-body font-manrope">
                {renderContent(post.content)}
              </div>

              {/* Back to Blog Navigation */}
              <div className="mt-8 pt-6 border-t border-slate-100 flex  items-center justify-between gap-4">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold font-figtree text-[#0B1F3B] hover:text-[#d3d663] transition-colors"
                >
                  <FiArrowLeft /> Back to All Insights
                </Link>
                <Button
                  href="/contact"
                  variant="accent"
                  size="sm"
                >
                  Book a Strategy Call
                </Button>
              </div>

            </article>

            {/* ── Right Column: Sticky Sidebar (lg:col-span-4) ── */}
            <aside className="lg:col-span-4 flex flex-col gap-6 lg:sticky">

              {/* Strategy Consultation CTA */}
              <div className="bg-[#0B1F3B] text-white p-7 sm:p-8 rounded-3xl shadow-xl relative overflow-hidden text-center">
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-20 pointer-events-none bg-[radial-gradient(circle,#d3d663,transparent_70%)]" />
                <h3 className="text-xl sm:text-2xl font-extrabold font-figtree text-white mb-2">
                  Need Help With Your Taxes?
                </h3>
                <p className="text-white/70 text-xs sm:text-sm font-manrope leading-relaxed mb-6">
                  Book a free consultation to discuss your tax strategy and get expert guidance.
                </p>
                <Button
                  href="/contact"
                  variant="accent"
                  size="md"
                  className="w-fit self-center"
                >
                  Schedule a Consultation
                </Button>
              </div>

              {/* Related Insights */}
              <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/80 shadow-sm">
                <h4 className="text-base font-extrabold font-figtree text-[#0B1F3B] mb-5 pb-3 border-b border-slate-100 flex items-center gap-2">
                  Related Insights
                </h4>
                <div className="flex flex-col gap-4">
                  {relatedPosts.map((r, i) => (
                    <Link
                      key={i}
                      href={`/blog/${r.slug}`}
                      className="group flex items-start gap-3.5 pb-4 border-b border-slate-100 last:border-b-0 last:pb-0"
                    >
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0 relative">
                        <Image src={r.image} alt={r.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="64px" />
                      </div>
                      <div className="flex-1">
                        <span className="text-[10px] font-bold text-[#d3d663] block uppercase tracking-wider mb-0.5 font-figtree">
                          {r.category}
                        </span>
                        <h5 className="text-xs sm:text-sm font-bold font-figtree text-[#0B1F3B] group-hover:text-[#d3d663] transition-colors line-clamp-2 leading-snug">
                          {r.title}
                        </h5>
                        <span className="text-[10px] text-slate-400 font-manrope mt-1 block">
                          {r.date} · {r.readTime}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Direct Reachout */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col gap-3.5 hidden md:block">
                <h4 className="text-sm font-extrabold font-figtree text-[#0B1F3B]">Direct CPA Contact</h4>
                <a href="tel:+14694716580" className="flex items-center gap-3 text-xs text-[#0B1F3B] hover:text-[#d3d663] transition-colors font-medium">
                  <div className="w-8 h-8 rounded-full bg-[#d3d663]/15 text-[#0B1F3B] flex items-center justify-center flex-shrink-0">
                    <FiPhone size={14} />
                  </div>
                  <span>+1 (469) 471-6580</span>
                </a>
                <a href="mailto:info@vrtaxcpa.com" className="flex items-center gap-3 text-xs text-[#0B1F3B] hover:text-[#d3d663] transition-colors font-medium">
                  <div className="w-8 h-8 rounded-full bg-[#d3d663]/15 text-[#0B1F3B] flex items-center justify-center flex-shrink-0">
                    <FiMail size={14} />
                  </div>
                  <span>info@vrtaxcpa.com</span>
                </a>
              </div>

            </aside>

          </div>
        </div>
      </section>
    </>
  );
}
