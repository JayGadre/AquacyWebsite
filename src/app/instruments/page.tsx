
import Image from 'next/image';
import Link from 'next/link';
import InquiryModal from '@/components/InquiryModal/InquiryModal';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Instruments - Aquacy',
  description: 'Specialized instruments including manual and semi-automatic batch control units for industrial water delivery.',
  keywords: ["industrial water delivery", "batch control units", "water meters", "manual water units", "Aquacy instruments"],
  alternates: {
    canonical: "/instruments",
  },
  openGraph: {
    title: 'Instruments - Aquacy',
    description: 'Specialized instruments including manual and semi-automatic batch control units for industrial water delivery.',
    url: "https://www.aquacy.in/instruments",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Instruments - Aquacy",
  "url": "https://www.aquacy.in/instruments",
  "description": "Specialized instruments including manual and semi-automatic batch control units for industrial water delivery."
};

export default function InstrumentsPage() {
  const products = [
    {
      id: 'tdml-tdsl',
      title: 'TDML-TDSL',
      description: 'Manual (TDML) or semi-automatic (TDSL) batch control unit able to significantly reduce operation times and simplify batching issues. Batch control units are used in industry, and in particular in the delivery of specific amounts of water in the cement manufacturing industry. The manual unit (TDML) features a pointer indicating the volume of water delivered, a preset pointer, and a meter reset lever. The semi-automatic unit (TDSL) features a preset pointer, to be positioned manually on the volume required at the beginning of the batching operation. As soon as the preset volume is reached, the instrument will issue an end-of-batch electric signal.',
      features: [
        'Multi-jet meter (DN 25÷32) or axial helix meter (DN 40÷50)',
        'Brass body (cast iron for DN50)',
        'Large impact-resistant methacrylate face',
        'Preset pointer with wiper',
        'Dial scale according to type, size, installation position and application',
        'Optional dial protection cover',
        'Operating temperature: 30 °C (up to 90 °C upon request)'
      ],
      imageUrls: [
        '/products/tdml_tdsl1.png',
        '/products/tdml_tdsl2.png'
      ]
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
            <span className="text-slate-200">Instruments</span>
          </nav>

          <div className="max-w-3xl mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
              Instruments
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed">
              Specialized industrial instrumentation from ADM Meters, featuring robust manual and semi-automatic batch control units designed to streamline precise water delivery for various manufacturing sectors.
            </p>
          </div>

          <div className="flex flex-col gap-12">
            {products.map((mod) => (
              <div key={mod.id} className="glass-card bg-white/5 backdrop-blur-lg border border-white/10 p-6 md:p-10 rounded-3xl grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                <div className="flex flex-col gap-4">
                  {mod.imageUrls.map((url, idx) => (
                    <div key={idx} className="relative w-full h-[300px] md:h-[400px] bg-black/20 rounded-2xl p-6 border border-white/5 flex items-center justify-center">
                      <Image
                        src={url}
                        alt={`${mod.title} - view ${idx + 1}`}
                        fill
                        style={{ objectFit: 'contain' }}
                        className="drop-shadow-2xl"
                      />
                    </div>
                  ))}
                </div>

                <div className="flex flex-col">
                  <h2 className="text-3xl font-bold text-white mb-4">{mod.title}</h2>
                  <p className="text-slate-300 mb-8 leading-relaxed text-lg">{mod.description}</p>

                  {mod.features && mod.features.length > 0 && (
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
                  )}

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
