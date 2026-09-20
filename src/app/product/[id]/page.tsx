import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import productsData from '@/data/products.json';
import { Download, ChevronRight, CheckCircle2, ArrowLeft, Mail, ShieldCheck } from 'lucide-react';

export async function generateStaticParams() {
  return productsData.map((product) => ({
    id: product.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const product = productsData.find((p) => p.id === resolvedParams.id);

  if (!product) {
    return { title: 'Product Not Found | Aquacy India' };
  }

  return {
    title: `${product.title} – ${product.subtitle} | Aquacy India`,
    description: product.description.substring(0, 160),
    alternates: {
      canonical: `/product/${resolvedParams.id}`,
    },
    openGraph: {
      title: `${product.title} | Aquacy India Water Meters`,
      description: product.description.substring(0, 160),
      images: [`https://www.aquacy.in/products/${product.id}.png`],
      url: `https://www.aquacy.in/product/${resolvedParams.id}`,
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const product = productsData.find((p) => p.id === resolvedParams.id);

  if (!product) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: `https://www.aquacy.in/products/${product.id}.png`,
    url: `https://www.aquacy.in/product/${product.id}`,
    model: product.id,
    brand: {
      '@type': 'Brand',
      name: 'ADM Meters',
    },
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      areaServed: 'IN',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main id="main-content" className="min-h-screen relative pt-14 md:pt-0">
        <div className="container mx-auto px-4 md:px-6 py-12 max-w-6xl">

          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-6 uppercase tracking-wider" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[#38bdf8] transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/catalog" className="hover:text-[#38bdf8] transition-colors">Catalog</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#0ea5e9]">{product.title}</span>
          </nav>

          <div className="mb-8">
            <Link
              href="/catalog"
              className="btn btn-glass text-xs py-2 px-4 inline-flex items-center gap-2 text-slate-300 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Product Catalog</span>
            </Link>
          </div>

          {/* Main Product Glass Card */}
          <div className="glass-card overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">

              {/* Image Section */}
              <div className="p-8 md:p-12 flex items-center justify-center border-b lg:border-b-0 lg:border-r border-[rgba(255,255,255,0.08)] relative overflow-hidden bg-gradient-to-b from-slate-900/80 to-slate-950/90 min-h-[360px]">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#0ea5e9]/15 via-transparent to-[#6366f1]/15 pointer-events-none" />
                <div className="relative w-full max-w-md flex items-center justify-center p-4">
                  <Image
                    src={`/products/${product.id}.png`}
                    alt={`${product.title} – ${product.subtitle} by ADM Meters`}
                    width={380}
                    height={380}
                    className="max-h-[340px] w-auto object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.6)] hover:scale-105 transition-transform duration-500 relative z-10"
                    priority
                  />
                </div>
              </div>

              {/* Product Info Section */}
              <div className="p-8 md:p-12 flex flex-col">

                {/* Title & Subtitle */}
                <div className="mb-6 pb-6 border-b border-[rgba(255,255,255,0.08)]">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md glass-pill text-[#38bdf8] text-[11px] font-semibold uppercase tracking-wider mb-3">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#0ea5e9]" />
                    ADM Meters · ISO 4064 Certified
                  </div>
                  <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-2 tracking-tight">
                    {product.title}
                  </h1>
                  {product.subtitle && (
                    <h2 className="text-sm md:text-base text-[#0ea5e9] font-semibold uppercase tracking-wider">
                      {product.subtitle}
                    </h2>
                  )}
                </div>

                {/* Description */}
                <div className="mb-8">
                  {product.description.split('\n').filter(Boolean).map((paragraph, i) => (
                    <p key={i} className="text-slate-300 leading-relaxed mb-3 text-sm font-normal">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Features */}
                {product.features && product.features.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-xs font-semibold text-[#0ea5e9] uppercase tracking-wider mb-4">
                      Technical Specifications &amp; Features
                    </h3>
                    <ul className="space-y-3">
                      {product.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle2 className="w-4 h-4 text-[#0ea5e9] shrink-0 mt-0.5" aria-hidden="true" />
                          <span className="text-slate-200 text-sm leading-snug font-medium">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Actions */}
                <div
                  id="inquiry"
                  className="mt-auto flex flex-col sm:flex-row gap-3 pt-6 border-t border-[rgba(255,255,255,0.08)]"
                >
                  <Link
                    href={`/contact?product=${encodeURIComponent(product.title)}`}
                    className="btn btn-primary flex-1 text-sm py-3.5"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Inquire Now</span>
                  </Link>

                  {product.brochures &&
                    product.brochures
                      .filter((b) => b.url && b.url !== 'javascript:void(0);')
                      .map((brochure, i) => (
                        <a
                          key={i}
                          href={brochure.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-glass flex-1 text-sm py-3.5 text-center justify-center"
                        >
                          <Download className="w-4 h-4" />
                          <span>{brochure.title}</span>
                        </a>
                      ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Catalog Link */}
          <div className="mt-12 text-center">
            <p className="text-slate-400 mb-3 text-sm">Need a different size or technology specification?</p>
            <Link
              href="/catalog"
              className="btn btn-glass text-xs py-2.5 px-6 inline-flex items-center gap-2 text-[#38bdf8] hover:text-white"
            >
              Browse Full Product Catalog →
            </Link>
          </div>

        </div>
      </main>
    </>
  );
}

