import Link from 'next/link';
import { Metadata } from 'next';
import { MapPin, Phone, Mail, CheckCircle2, ArrowRight, Sparkles, Building2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Aquacy India | Authorised ADM Meters Channel Partner – Pune',
  description:
    'Aquacy Pvt. Ltd. — established 2013, Pune. Authorised channel partner of ADM Meters (Italy). 15+ years expertise, 3 Lakh+ meters supplied, Pan-India presence. Smart water metering solutions for municipalities, utilities, and industry.',
  keywords: ["About Aquacy India", "ADM Meters Channel Partner", "Pune water management", "Aquacy Pvt Ltd", "smart water metering solutions"],
  alternates: {
    canonical: "/about-us",
  },
  openGraph: {
    title: 'About Aquacy India | ADM Meters Channel Partner',
    description:
      'Learn about Aquacy Pvt. Ltd. — a premier water management solutions provider based in Pune with 15+ years of experience and Pan-India presence.',
    url: "https://www.aquacy.in/about-us",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "name": "About Aquacy India",
  "url": "https://www.aquacy.in/about-us",
  "description": "Aquacy Pvt. Ltd. — established 2013, Pune. Authorised channel partner of ADM Meters (Italy).",
  "publisher": {
    "@type": "Organization",
    "name": "Aquacy India",
    "logo": "https://www.aquacy.in/aquacy_logo.png"
  }
};

const stats = [
  { value: '15+', label: 'Years of Expertise' },
  { value: '3 Lakh+', label: 'Meters Supplied' },
  { value: '33,000+', label: 'EPC Contract Meters' },
  { value: '12+ States', label: 'Pan-India Presence' },
];

const services = [
  {
    num: '01',
    title: 'Water Meter Supply & Installation',
    desc: 'Complete range of high-accuracy water meters tailored to customer needs, including Mechanical, AMR, AMI, and Ultrasonic meters for residential, commercial, and industrial use.',
  },
  {
    num: '02',
    title: 'Smart Metering Solutions',
    desc: 'Integration of AMR/AMI technologies for remote automated data collection, real-time monitoring, enhanced billing accuracy, and LoRa network setup.',
  },
  {
    num: '03',
    title: 'Water Audit Services',
    desc: 'Detailed analysis of supply and consumption patterns, identification of leakages, NRW reduction recommendations, and DPR preparation as per IWA guidelines.',
  },
  {
    num: '04',
    title: 'GIS Consultancy & Mapping',
    desc: 'GIS-based mapping of water distribution networks, digital inventory of water supply assets, hydraulic modeling, and spatial analysis for expansion projects.',
  },
];

export default function AboutUsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main id="main-content" className="min-h-screen relative pt-14 md:pt-0">

      {/* Page Header */}
      <div className="relative py-24 overflow-hidden border-b border-[rgba(255,255,255,0.06)]">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(14,165,233,0.18) 0%, transparent 70%)',
          }}
        />
        <div className="container mx-auto px-6 relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-8 uppercase tracking-wider" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[#38bdf8] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#0ea5e9]">About Us</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-pill text-[#38bdf8] text-xs font-semibold uppercase tracking-wider mb-6">
              <Building2 className="w-3.5 h-3.5 text-[#0ea5e9]" />
              Est. 2013 · Pune, India
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-tight leading-tight">
              Aquacy Pvt. Ltd.
            </h1>
            <h2 className="text-xl text-gradient-cyan font-bold mb-6">
              Empowering Sustainable Water Management Nationwide
            </h2>
            <p className="text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
              Established in 2013 with our head office in Pune, Aquacy Group of Companies has emerged as a premier
              consultancy and solutions provider in the field of efficient water resource management. With a strong
              focus on innovation, sustainability, and smart technology integration, we offer end-to-end services
              designed to optimize water supply systems for municipalities, utilities, and large-scale infrastructure projects.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16 space-y-16">

        {/* Stats Grid */}
        <section aria-label="Company Statistics">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="glass-card p-6 text-center group"
              >
                <div className="text-3xl md:text-5xl font-extrabold text-gradient-cyan mb-2 tracking-tight group-hover:scale-105 transition-transform">{stat.value}</div>
                <div className="text-xs text-slate-300 font-semibold uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ADM Partnership */}
        <section className="glass-card p-8 md:p-12" aria-label="ADM Partnership">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs uppercase font-semibold text-[#0ea5e9] tracking-wider mb-3">
              <Sparkles className="w-4 h-4" />
              <span>Technical Collaboration</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-6 tracking-tight">Our Story &amp; ADM Partnership</h2>
            <div className="space-y-4 text-slate-300 text-base leading-relaxed">
              <p>
                Our consistent performance and customer-centric approach have enabled us to establish a strong
                financial foundation with a current turnover above <strong className="text-white">₹9 Crore</strong>.
                We have successfully executed numerous projects across India in smart water management, GIS
                consultancy, and metering infrastructure.
              </p>
              <p>
                In our ongoing pursuit of excellence, Aquacy is an{' '}
                <strong className="text-white">
                  authorised channel partner of ADM Meters
                </strong>{' '}
                — India&apos;s leading water meter brand manufactured in technical collaboration with{' '}
                <strong className="text-white">Maddalena, Italy</strong>. This collaboration empowers us to deliver
                world-class water metering and management solutions, integrating cutting-edge European technology with
                our deep local expertise.
              </p>
              <p>
                Our meters are compliant with <strong className="text-white">ISO 4064</strong>,{' '}
                <strong className="text-white">IS 778</strong>, and other international standards, making them
                suitable for utility, industrial, and municipal deployments across India.
              </p>
            </div>
          </div>
        </section>

        {/* Services */}
        <section aria-label="Services">
          <div className="mb-10">
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-3 tracking-tight">Services &amp; Offerings</h2>
            <p className="text-slate-300 text-base max-w-2xl leading-relaxed">
              Comprehensive water management expertise delivering cutting-edge solutions across the entire lifecycle.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service) => (
              <div
                key={service.num}
                className="glass-card p-8"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0ea5e9]/20 to-[#0ea5e9]/5 border border-[#0ea5e9]/30 flex items-center justify-center shrink-0 text-[#38bdf8] font-bold text-base shadow-[0_0_15px_rgba(14,165,233,0.2)]">
                    {service.num}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2 tracking-tight">{service.title}</h3>
                    <p className="text-slate-300 text-sm leading-relaxed">{service.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose Aquacy */}
        <section className="glass-card p-8 md:p-12" aria-label="Why Choose Aquacy">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-8 tracking-tight">Why Choose Aquacy?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              'Authorised ADM Meters channel partner with genuine products',
              'ISO 4064 & IS 778 certified meters for compliance assurance',
              'End-to-end project support: supply, installation & commissioning',
              'Pan-India service network across 12+ states',
              'Experienced team with 15+ years in water management',
              'Smart metering (AMR/AMI/LoRaWAN) integration expertise',
            ].map((point) => (
              <div key={point} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#0ea5e9] shrink-0 mt-0.5" aria-hidden="true" />
                <span className="text-slate-200 text-sm leading-relaxed font-medium">{point}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Contact CTA */}
        <section
          className="glass-card p-8 md:p-12 border border-[#0ea5e9]/30 relative overflow-hidden"
          aria-label="Contact Information"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#0ea5e9]/15 to-[#6366f1]/10 pointer-events-none" />
          <div className="grid md:grid-cols-2 gap-10 items-center relative z-10">
            <div>
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 tracking-tight">Get In Touch</h2>
              <p className="text-slate-300 text-base mb-8 leading-relaxed">
                Ready to transform your water management infrastructure? Our specialists are available to
                discuss your specific requirements.
              </p>
              <div className="space-y-4">
                <a href="https://maps.google.com/?q=Kothrud+Pune+411038" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 group">
                  <MapPin className="w-5 h-5 text-[#0ea5e9] shrink-0 mt-0.5" />
                  <span className="text-slate-300 text-sm group-hover:text-white transition-colors">
                    E-303, Indradhanu, behind Vanaz, Paud Road, Kothrud, Pune 411038
                  </span>
                </a>
                <a href="tel:+919890800301" className="flex items-center gap-3 group">
                  <Phone className="w-5 h-5 text-[#0ea5e9] shrink-0" />
                  <span className="text-slate-300 text-sm group-hover:text-white transition-colors">+91 98908 00301</span>
                </a>
                <a href="mailto:aquacyindia@gmail.com" className="flex items-center gap-3 group">
                  <Mail className="w-5 h-5 text-[#0ea5e9] shrink-0" />
                  <span className="text-slate-300 text-sm group-hover:text-white transition-colors">aquacyindia@gmail.com</span>
                </a>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <Link
                href="/contact"
                className="btn btn-primary text-base py-4 text-center justify-center"
              >
                <span>Send an Inquiry</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/catalog"
                className="btn btn-glass text-base py-4 text-center justify-center"
              >
                View Product Catalog
              </Link>
            </div>
          </div>
        </section>

      </div>
    </main>
    </>
  );
}

