
import Image from 'next/image';
import Link from 'next/link';
import InquiryModal from '@/components/InquiryModal/InquiryModal';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Communication Modules - Aquacy',
  description: 'Communication modules for smart water metering, enabling remote data reading and fixed networks.',
  keywords: ["communication modules", "smart water metering", "wM-Bus radio module", "remote data reading"],
  alternates: {
    canonical: "/communication-modules",
  },
  openGraph: {
    title: 'Communication Modules - Aquacy',
    description: 'Communication modules for smart water metering, enabling remote data reading and fixed networks.',
    url: "https://www.aquacy.in/communication-modules",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Communication Modules - Aquacy",
  "url": "https://www.aquacy.in/communication-modules",
  "description": "Communication modules for smart water metering, enabling remote data reading and fixed networks."
};

export default function CommunicationModulesPage() {
  const modules = [
    {
      id: 'arrow-evo',
      title: 'Arrow EVO',
      description: 'Compact wM-Bus radio module for drive-by and fixed network remote data reading. Also available in a standalone version for connection to compatible pulse emitting meters. Arrow EVO is also suitable for difficult Utility installations (IP68). The configuration of the radio module can be changed using a dedicated configuration kit (optional) and Android app.',
      features: [
        'Compact 868 MHz wM-Bus radio module',
        'Designed for drive-by and fixed network remote data reading (AMR)',
        'IP68 rated for difficult installations',
        'Compatible with MVM, MVM PLUS C, and WMAP EVO water meters',
        'Battery service life of up to 15 years'
      ],
      imageUrl: '/products/arrow_evo.png'
    },
    {
      id: 'unico-tool',
      title: 'Unico Tool',
      description: 'A universal connecting tool with an 868 MHz wM-Bus transceiver for local programming and data exchange. Designed for easy setup and configuration of communication modules.',
      features: [
        '868 MHz wM-Bus transceiver',
        'Local programming capabilities',
        'Data exchange functionality',
        'Simplifies field deployment and maintenance'
      ],
      imageUrl: '/products/unico_tool.png'
    }
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main id="main-content" className="min-h-screen relative pt-32 pb-16">
        <div className="container mx-auto px-6">
          <nav className="flex items-center gap-2 text-sm text-slate-400 mb-8">
            <Link href="/" className="hover:text-[#38bdf8] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/#products" className="hover:text-[#38bdf8] transition-colors">Products</Link>
            <span>/</span>
            <span className="text-slate-200">Communication Modules</span>
          </nav>

          <div className="max-w-3xl mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
              Communication <span className="text-gradient-cyan">Modules</span>
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed">
              ADM Meters LLP offers a range of communication modules designed to enable analog (mechanical totalizer) water meters to connect and exchange data with various short-range and long-range networks. These modules facilitate faster meter reading, improved network monitoring, and the identification of potential leaks or faults.
            </p>
          </div>

          <div className="flex flex-col gap-12">
            {modules.map((mod) => (
              <div key={mod.id} className="glass-card bg-white/5 backdrop-blur-lg border border-white/10 p-6 md:p-10 rounded-3xl grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                <div className="relative w-full h-[300px] md:h-[400px] bg-black/20 rounded-2xl p-6 border border-white/5 flex items-center justify-center">
                  <Image
                    src={mod.imageUrl}
                    alt={mod.title}
                    fill
                    style={{ objectFit: 'contain' }}
                    className="drop-shadow-2xl"
                  />
                </div>

                <div className="flex flex-col">
                  <h2 className="text-3xl font-bold text-white mb-4">{mod.title}</h2>
                  <p className="text-slate-300 mb-8 leading-relaxed text-lg">{mod.description}</p>

                  <div className="bg-white/5 rounded-2xl p-6 border border-white/10 mb-8">
                    <h3 className="text-white font-semibold mb-4 text-lg">Key Features</h3>
                    <ul className="space-y-3">
                      {mod.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3 text-slate-300">
                          <span className="text-[#0ea5e9] font-bold">→</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <InquiryModal productName={mod.title} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
