import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Activity, MapPin, Building2, CheckCircle2, Sparkles, Medal } from "lucide-react";
import productsData from "@/data/products.json";
import VideoHeroClient from "@/components/VideoHero/VideoHeroClient";

export const metadata: Metadata = {
  title: "Aquacy India | Smart Water Metering Solutions",
  description: "Leading provider of smart water metering solutions with 15+ years of experience, serving Pan-India with 3 Lakh+ meters and 33,000+ EPC contracts.",
  keywords: ["smart water meter", "ultrasonic water meter", "water metering India", "Aquacy India"],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Aquacy India | Smart Water Metering Solutions",
    description: "Leading provider of smart water metering solutions with 15+ years of experience, serving Pan-India with 3 Lakh+ meters and 33,000+ EPC contracts.",
    url: "https://www.aquacy.in",
    type: "website",
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Aquacy India",
    "url": "https://www.aquacy.in",
    "logo": "https://www.aquacy.in/aquacy_logo.png",
    "description": "Leading provider of smart water metering solutions across India.",
    "sameAs": []
  },
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Aquacy India",
    "image": "https://www.aquacy.in/aquacy_logo.png",
    "url": "https://www.aquacy.in",
    "telephone": "+919890800301",
    "email": "aquacyindia@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "E-303, Indradhanu, behind Vanaz, Paud Road, Kothrud",
      "addressLocality": "Pune",
      "postalCode": "411038",
      "addressCountry": "IN"
    }
  }
];

export default function Home() {
  const featuredProducts = productsData.slice(0, 4);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main id="main-content" className="flex-1 relative w-full" style={{ overflowX: 'clip' }}>

        {/* ── Video Scroll Hero ── */}
        <VideoHeroClient />

        {/* ── Featured Products Section ── */}
        <section id="products" className="py-24 relative border-t border-[rgba(255,255,255,0.06)]">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 text-xs uppercase font-semibold text-[#0ea5e9] tracking-wider mb-2">
                  <Sparkles aria-hidden="true" className="w-4 h-4" />
                  <span>High Precision Engineering</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">Featured Products</h2>
                <p className="text-slate-400 text-base mt-3">
                  Discover flagship water meters certified to ISO 4064 &amp; IS 778 for maximum durability and unmatched accuracy.
                </p>
              </div>
              <Link
                href="/catalog"
                className="hidden md:inline-flex items-center gap-2 text-[#38bdf8] font-semibold hover:text-white transition-colors group"
              >
                <span>View full catalog</span>
                <ArrowRight aria-hidden="true" className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <div key={product.id} className="glass-card bg-white/5 backdrop-blur-lg border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:bg-white/10 hover:border-white/20 transition-all hover:-translate-y-1 group flex flex-col overflow-hidden">
                  {/* Product Image Stage */}
                  <div className="relative h-44 bg-white/5 backdrop-blur-sm border-b border-white/10 flex items-center justify-center p-4 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0ea5e9]/10 via-transparent to-[#6366f1]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    <Image
                      src={`/products/${product.id}.png`}
                      alt={`${product.title} – ${product.subtitle}`}
                      width={220}
                      height={140}
                      className="max-h-full object-contain transition-transform duration-500 group-hover:scale-105 drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)]"
                    />
                  </div>

                  <div className="p-6 flex-1 relative overflow-hidden flex flex-col">
                    <h3 className="text-lg font-bold text-white mb-1 relative z-10 group-hover:text-[#38bdf8] transition-colors">{product.title}</h3>
                    <p className="text-xs font-semibold text-[#0ea5e9] uppercase tracking-wider mb-3 relative z-10">{product.subtitle}</p>
                    <p className="text-slate-300 text-xs line-clamp-3 mb-5 relative z-10 leading-relaxed">{product.description}</p>

                    <ul className="space-y-2 mt-auto relative z-10">
                      {product.features.slice(0, 2).map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                          <CheckCircle2 aria-hidden="true" className="w-3.5 h-3.5 text-[#0ea5e9] shrink-0 mt-0.5" />
                          <span className="line-clamp-2">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-4 border-t border-[rgba(255,255,255,0.08)] bg-slate-950/40">
                    <Link
                      href={`/catalog#${product.id}`}
                      className="btn btn-glass bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 w-full text-xs py-2.5 text-center justify-center"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center md:hidden">
              <Link href="/catalog" className="btn btn-primary text-sm">
                View full catalog
              </Link>
            </div>
          </div>
        </section>

        {/* ── Trust Stats Section ── */}
        <section id="about" className="py-16 relative border-t border-[rgba(255,255,255,0.06)]">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: "Years of Expertise", value: "15+", icon: Medal, sub: "Since 2013" },
                { label: "Meters Installed", value: "3 Lakh+", icon: Activity, sub: "Across India" },
                { label: "EPC Contracts", value: "33,000+", icon: Building2, sub: "Utility & Urban" },
                { label: "State Coverage", value: "Pan-India", icon: MapPin, sub: "12+ States Network" },
              ].map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div key={idx} className="glass-card p-4 sm:p-6 bg-white/5 backdrop-blur-lg border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:bg-white/10 hover:border-white/20 transition-all hover:-translate-y-1 flex flex-col items-center text-center group">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#0ea5e9]/20 to-[#0ea5e9]/5 border border-[#0ea5e9]/30 rounded-2xl flex items-center justify-center mb-4 text-[#38bdf8] group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(14,165,233,0.3)] transition-all duration-300">
                      <Icon aria-hidden="true" className="w-7 h-7" />
                    </div>
                    <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-1 tracking-tight">{stat.value}</div>
                    <div className="text-slate-200 text-sm font-semibold mb-0.5">{stat.label}</div>
                    <div className="text-slate-400 text-xs">{stat.sub}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Final CTA Section ── */}
        <section className="py-24 relative overflow-hidden border-t border-[rgba(255,255,255,0.06)]">
          <div className="container mx-auto px-6">
            <div className="glass-card bg-white/5 backdrop-blur-lg border border-[#0ea5e9]/30 shadow-[0_8px_32px_rgba(0,0,0,0.3)] p-10 lg:p-16 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-[#0ea5e9]/15 via-transparent to-[#6366f1]/15 pointer-events-none" />
              <div className="relative z-10 max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                  Ready to upgrade your water infrastructure?
                </h2>
                <p className="text-lg text-slate-300 mb-10 leading-relaxed">
                  Join hundreds of municipal boards, EPC contractors, and industrial plants across India who trust Aquacy for high-reliability water metering.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Link href="/contact" className="btn btn-primary w-full sm:w-auto text-base px-8 py-4 justify-center">
                    Contact Our Specialists
                  </Link>
                  <Link href="/catalog" className="btn btn-glass bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 w-full sm:w-auto text-base px-8 py-4 justify-center">
                    View Product Catalog
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
