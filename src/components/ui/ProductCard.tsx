import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Product, getCategories } from '@/types/product';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  return (
    <article
      id={product.id}
      className="glass-card flex flex-col overflow-hidden group"
    >
      {/* Product Image Stage */}
      <div className="relative h-56 bg-gradient-to-b from-slate-900/60 to-slate-950/80 flex items-center justify-center p-6 overflow-hidden border-b border-[rgba(255,255,255,0.06)]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0ea5e9]/10 via-transparent to-[#6366f1]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        <Image
          src={`/products/${product.id}.png`}
          alt={`${product.title} – ${product.subtitle}`}
          width={300}
          height={200}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={priority}
          className="max-h-full object-contain transition-transform duration-500 group-hover:scale-105 drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
        />
      </div>

      <div className="p-6 flex-1 flex flex-col">
        {/* Category badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          {getCategories(product.id).map((cat) => (
            <span
              key={cat}
              className="glass-pill px-2.5 py-1 rounded-md text-[11px] font-semibold text-[#38bdf8]"
            >
              {cat}
            </span>
          ))}
        </div>

        <h2 className="text-xl font-bold text-white mb-1 tracking-tight group-hover:text-[#38bdf8] transition-colors">{product.title}</h2>
        <p className="text-[#0ea5e9] text-xs font-semibold uppercase tracking-wider mb-3">{product.subtitle}</p>
        <p className="text-slate-300 text-xs leading-relaxed mb-5 line-clamp-3 flex-1">
          {product.description}
        </p>

        {/* Top features */}
        {product.features.length > 0 && (
          <ul className="space-y-2 mb-6">
            {product.features.slice(0, 3).map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#0ea5e9] shrink-0 mt-0.5" />
                <span className="text-slate-300 text-xs line-clamp-1">{feature}</span>
              </li>
            ))}
            {product.features.length > 3 && (
              <li className="text-[11px] text-slate-400 italic pl-5">
                + {product.features.length - 3} more technical specs
              </li>
            )}
          </ul>
        )}

        {/* Actions */}
        <div className="flex gap-3 mt-auto pt-4 border-t border-[rgba(255,255,255,0.08)]">
          <Link
            href={`/product/${product.id}`}
            className="btn btn-primary flex-1 text-xs py-2.5"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href={`/contact?product=${encodeURIComponent(product.title)}`}
            className="btn btn-glass flex-1 text-xs py-2.5 text-center justify-center"
          >
            Get Quote
          </Link>
        </div>
      </div>
    </article>
  );
}
