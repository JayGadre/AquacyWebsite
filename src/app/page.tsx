import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Activity,
  MapPin,
  Building2,
  CheckCircle2,
  Sparkles,
  Medal,
  Award,
  ShieldCheck,
  Cpu,
  Layers,
  Wrench,
} from "lucide-react";
import productsData from "@/data/products.json";
import VideoHeroClient from "@/components/VideoHero/VideoHeroClient";
import ProductCard from "@/components/ui/ProductCard";

export const metadata: Metadata = {
  title: "Aquacy India | Smart Water Metering Solutions",
  description:
    "Leading provider of smart water metering solutions with 15+ years of experience, serving Pan-India with 3 Lakh+ meters and 33,000+ EPC contracts.",
  keywords: ["smart water meter", "ultrasonic water meter", "water metering India", "Aquacy India"],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Aquacy India | Smart Water Metering Solutions",
    description:
      "Leading provider of smart water metering solutions with 15+ years of experience, serving Pan-India with 3 Lakh+ meters and 33,000+ EPC contracts.",
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
    "sameAs": [],
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
      "addressCountry": "IN",
    },
  },
];

export default function Home() {
  const featuredProducts = productsData.slice(0, 4);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main id="main-content" className="flex-1 relative w-full" style={{ overflowX: "clip" }}>
        {/* ── Video Scroll Hero ── */}
        <VideoHeroClient />

        {/* ── Featured Products Section ── */}
        <section id="products" className="py-24 relative border-t border-slate-200 dark:border-slate-800 bg-background">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 text-xs uppercase font-bold text-primary tracking-wider mb-2">
                  <Sparkles aria-hidden="true" className="w-4 h-4" />
                  <span>High Precision Engineering</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-extrabold text-foreground tracking-tight">
                  Featured Water Meters
                </h2>
                <p className="text-muted-text text-base mt-3 leading-relaxed">
                  Discover flagship water meters certified to ISO 4064 &amp; IS 778 for maximum durability and unmatched accuracy across municipal and industrial applications.
                </p>
              </div>
              <Link
                href="/catalog"
                className="hidden md:inline-flex items-center gap-2 text-primary font-bold hover:underline transition-colors group"
              >
                <span>View full catalog ({productsData.length} meters)</span>
                <ArrowRight aria-hidden="true" className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <div className="mt-12 text-center md:hidden">
              <Link href="/catalog" className="btn btn-primary text-sm font-bold">
                View full catalog
              </Link>
            </div>
          </div>
        </section>

        {/* ── Technical Excellence & Certifications ── */}
        <section className="py-20 relative border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">Certified Engineering</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mt-2">Built for Extreme Industrial Tolerances</h2>
              <p className="text-muted-text mt-3 text-sm leading-relaxed">
                Aquacy India meters combine European technological collaboration with rigorous Indian testing standards.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: ShieldCheck,
                  title: "ISO 4064 & IS 778 Compliant",
                  desc: "Rigorously tested to international standards with MID approvals for utility billing and billing protection.",
                },
                {
                  icon: Cpu,
                  title: "IoT & AMR/AMI Ready",
                  desc: "Integrated LoRaWAN, wM-Bus, and NB-IoT protocols for seamless remote reading and smart city grids.",
                },
                {
                  icon: Wrench,
                  title: "15+ Years Service Life",
                  desc: "Mineral glass registers, IP68 copper seals, and anti-magnetic enclosures ensure zero maintenance downtime.",
                },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="glass-card p-8 flex flex-col items-start">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-5">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
                    <p className="text-muted-text text-xs leading-relaxed">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Trust Stats Section ── */}
        <section id="about" className="py-20 relative border-t border-slate-200 dark:border-slate-800 bg-background">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: "Years of Expertise", value: "15+", icon: Medal, sub: "Since 2013 in Pune" },
                { label: "Meters Installed", value: "3 Lakh+", icon: Activity, sub: "Across Pan-India" },
                { label: "EPC Contracts", value: "33,000+", icon: Building2, sub: "Utility & Industrial" },
                { label: "State Coverage", value: "Pan-India", icon: MapPin, sub: "12+ States Network" },
              ].map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={idx}
                    className="product-card p-6 flex flex-col items-center text-center group hover:scale-[1.02]"
                  >
                    <div className="w-14 h-14 bg-primary/10 border border-primary/20 rounded-2xl flex items-center justify-center mb-4 text-primary group-hover:scale-110 transition-transform duration-300">
                      <Icon aria-hidden="true" className="w-7 h-7" />
                    </div>
                    <div className="text-3xl lg:text-4xl font-extrabold text-foreground mb-1 tracking-tight">
                      {stat.value}
                    </div>
                    <div className="text-foreground/90 text-sm font-bold mb-0.5">{stat.label}</div>
                    <div className="text-muted-text text-xs font-medium">{stat.sub}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Final CTA Section ── */}
        <section className="py-24 relative overflow-hidden border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40">
          <div className="container mx-auto px-6">
            <div className="glass-card border border-primary/30 p-10 lg:p-16 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-teal-500/10 pointer-events-none" />
              <div className="relative z-10 max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-extrabold text-foreground mb-6 tracking-tight">
                  Ready to upgrade your water infrastructure?
                </h2>
                <p className="text-base md:text-lg text-muted-text mb-10 leading-relaxed">
                  Join hundreds of municipal boards, EPC contractors, and industrial plants across India who trust Aquacy for high-reliability water metering.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Link href="/contact" className="btn btn-primary w-full sm:w-auto text-base px-8 py-4 justify-center font-bold">
                    Contact Our Specialists
                  </Link>
                  <Link
                    href="/catalog"
                    className="btn btn-glass w-full sm:w-auto text-base px-8 py-4 justify-center font-bold"
                  >
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
