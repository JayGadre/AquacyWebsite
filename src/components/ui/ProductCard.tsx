import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Product, getCategories } from '@/types/product';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  return (
    <article
      id={product.id}
      className="product-card flex flex-col overflow-hidden group h-full"
    >
      {/* Product Image Stage */}
      <div className="relative h-56 bg-slate-100 dark:bg-slate-900/80 flex items-center justify-center p-6 overflow-hidden border-b border-slate-200 dark:border-slate-800">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 via-transparent to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        <Image
          src={`/products/${product.id}.png`}
          alt={`${product.title} – ${product.subtitle}`}
          width={300}
          height={200}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={priority}
          className="max-h-full object-contain transition-transform duration-500 group-hover:scale-105 drop-shadow-[0_8px_16px_rgba(0,0,0,0.15)] dark:drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
        />
        {/* ISO Standard Badge */}
        <div className="absolute top-3 right-3 flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-md bg-white/90 dark:bg-slate-800/90 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 shadow-sm">
          <ShieldCheck className="w-3 h-3 text-sky-600 dark:text-sky-400" />
          <span>ISO 4064</span>
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col">
        {/* Category badges */}
        <div className="flex flex-wrap gap-2 mb-3">
          {getCategories(product.id).map((cat) => (
            <span
              key={cat}
              className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-sky-50 dark:bg-sky-950/50 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800/50"
            >
              {cat}
            </span>
          ))}
        </div>

        <h3 className="text-xl font-extrabold text-foreground mb-1 tracking-tight group-hover:text-primary transition-colors">
          {product.title}
        </h3>
        <p className="text-primary text-xs font-bold uppercase tracking-wider mb-3">
          {product.subtitle}
        </p>
        <p className="text-muted-text text-xs leading-relaxed mb-5 line-clamp-3">
          {product.description}
        </p>

        {/* Top features */}
        {product.features.length > 0 && (
          <ul className="space-y-2 mb-6 mt-auto">
            {product.features.slice(0, 3).map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                <span className="text-foreground/90 text-xs line-clamp-1 font-medium">{feature}</span>
              </li>
            ))}
            {product.features.length > 3 && (
              <li className="text-[11px] text-muted-text italic pl-5">
                + {product.features.length - 3} more technical specs
              </li>
            )}
          </ul>
        )}

        {/* Actions */}
        <div className="flex gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
          <Link
            href={`/product/${product.id}`}
            className="btn btn-primary flex-1 text-xs py-2.5 font-bold"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href={`/contact?product=${encodeURIComponent(product.title)}`}
            className="btn btn-glass flex-1 text-xs py-2.5 text-center justify-center font-bold"
          >
            Get Quote
          </Link>
        </div>
      </div>
    </article>
  );
}
