import { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import { MapPin, Phone, Mail, Clock, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us | Aquacy India – Water Meter Inquiry & Support',
  description:
    'Reach out to Aquacy India for water meter inquiries, quotes, and support. Authorised ADM Meters channel partner based in Pune. Call +91 98908 00301 or email aquacyindia@gmail.com.',
  keywords: ["contact Aquacy India", "water meter inquiry", "Pune water meter supplier", "Aquacy support"],
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: 'Contact Aquacy India | Water Meter Specialists',
    description:
      'Get in touch with Aquacy India — your authorised ADM Meters channel partner. Pune based. Available for quotes, technical support, and project consultations.',
    url: "https://www.aquacy.in/contact",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Contact Aquacy India",
  "url": "https://www.aquacy.in/contact",
  "description": "Contact Aquacy India for water meter inquiries, quotes, and support.",
  "mainEntity": {
    "@type": "LocalBusiness",
    "name": "Aquacy India",
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
};

const contactDetails = [
  {
    icon: MapPin,
    label: 'Office Address',
    value: 'E-303, Indradhanu, behind Vanaz,\nPaud Road, Kothrud, Pune – 411038',
    href: 'https://maps.google.com/?q=Indradhanu+Vanaz+Paud+Road+Kothrud+Pune+411038',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+91 98908 00301',
    href: 'tel:+919890800301',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'aquacyindia@gmail.com',
    href: 'mailto:aquacyindia@gmail.com',
  },
  {
    icon: Clock,
    label: 'Business Hours',
    value: 'Monday – Saturday\n9:00 AM – 6:00 PM IST',
    href: null,
  },
];

export default function ContactPage() {
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
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-pill text-[#38bdf8] text-xs font-semibold uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#0ea5e9]" />
            Direct Communication &amp; Support
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
            Contact <span className="text-gradient-cyan">Aquacy India</span>
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Have a water metering requirement or tender specs? Our specialists are ready to assist you with product selection, technical datasheets, and custom quotations.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">

          {/* Left – Contact Details */}
          <aside className="lg:col-span-1 space-y-6">
            <h2 className="text-xl font-bold text-white mb-4 tracking-tight">Contact Details</h2>

            <div className="space-y-4">
              {contactDetails.map((detail) => {
                const Icon = detail.icon;
                const content = (
                  <div
                    key={detail.label}
                    className="glass-card p-5 flex items-start gap-4"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0ea5e9]/20 to-[#0ea5e9]/5 border border-[#0ea5e9]/30 flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(14,165,233,0.2)]">
                      <Icon className="w-5 h-5 text-[#38bdf8]" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-[11px] text-[#0ea5e9] font-semibold uppercase tracking-wider mb-1">{detail.label}</p>
                      <p className="text-slate-200 text-sm leading-relaxed whitespace-pre-line font-medium">{detail.value}</p>
                    </div>
                  </div>
                );
                return detail.href ? (
                  <a key={detail.label} href={detail.href} target="_blank" rel="noopener noreferrer" className="block">
                    {content}
                  </a>
                ) : (
                  <div key={detail.label}>{content}</div>
                );
              })}
            </div>

            {/* Google Maps Embed */}
            <div className="glass-card p-2 overflow-hidden mt-6" style={{ height: '230px' }}>
              <iframe
                title="Aquacy Pune Office – Kothrud"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.5617037568496!2d73.81529547507715!3d18.50850848259158!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bfb8b1f2d5f5%3A0x1a2b3c4d5e6f7890!2sKothrud%2C%20Pune%2C%20Maharashtra%20411038!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: '14px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </aside>

          {/* Right – Inquiry Form */}
          <section className="lg:col-span-2">
            <div className="glass-card p-8 md:p-12">
              <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight">Send Us an Inquiry</h2>
                <p className="text-slate-300 text-sm">
                  Fill out the form below and our Pune engineering office will get back to you within one business day.
                </p>
              </div>
              <ContactForm />
            </div>
          </section>

        </div>
      </div>
    </main>
    </>
  );
}

