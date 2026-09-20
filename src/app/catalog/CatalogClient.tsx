'use client';

import React, { useState } from 'react';
import { Download, SlidersHorizontal, Sparkles } from 'lucide-react';
import productsData from '@/data/products.json';
import ProductCard from '@/components/ui/ProductCard';
import { Category, getCategories } from '@/types/product';

const TABS: Category[] = ['All', 'Mechanical', 'Ultrasonic', 'Bulk/Industrial'];

export default function CatalogClient() {
  const [activeTab, setActiveTab] = useState<Category>('All');

  const filteredProducts = productsData.filter((product) =>
    activeTab === 'All' || getCategories(product.id).includes(activeTab)
  );

  return (
    <main id="main-content" className="min-h-screen relative pt-14 md:pt-0 bg-background text-foreground">
      {/* Page Header */}
      <div className="relative py-20 overflow-hidden border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 50% 0%, var(--primary-glow) 0%, transparent 70%)',
          }}
        />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-pill text-xs font-bold uppercase tracking-wider mb-6">
            <Sparkles aria-hidden="true" className="w-3.5 h-3.5 text-primary" />
            ADM Meters – Authorised Channel Partner Pune
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-foreground mb-6 tracking-tight">
            Water Meter <span className="text-gradient-cyan">Catalog</span>
          </h1>
          <p className="text-base md:text-lg text-muted-text max-w-2xl mx-auto leading-relaxed mb-8 font-medium">
            Discover our complete range of precision-engineered water metering solutions. From residential
            multi-jet meters to industrial ultrasonic bulk meters — ISO 4064 certified, IP68 rated.
          </p>
          <a
            href="/ADM_PRODUCT_CATALOGUE_AQ.pdf"
            download
            className="btn btn-primary text-sm px-6 py-3.5 font-bold inline-flex items-center gap-2"
          >
            <Download aria-hidden="true" className="w-4 h-4" />
            Download Full Catalog PDF
          </a>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
          <div className="flex items-center gap-2 text-foreground font-semibold text-sm">
            <SlidersHorizontal aria-hidden="true" className="w-4 h-4 text-primary" />
            <span>Filter by technology:</span>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold tracking-wide transition-all duration-300 ${
                  activeTab === tab
                    ? 'btn-primary scale-105'
                    : 'btn-glass text-muted-text hover:text-foreground'
                }`}
                aria-pressed={activeTab === tab}
              >
                {tab}
              </button>
            ))}
          </div>
          <p className="text-muted-text text-xs font-bold">
            Showing <span className="text-foreground font-extrabold">{filteredProducts.length}</span> meter{filteredProducts.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {filteredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} priority={index < 4} />
            ))}
          </div>
        ) : (
          <div className="glass-card p-12 flex flex-col items-center justify-center text-center min-h-[400px]">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 border border-primary/20">
              <SlidersHorizontal aria-hidden="true" className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-3 tracking-tight">No products found</h3>
            <p className="text-muted-text max-w-md mx-auto mb-8">
              We couldn&apos;t find any water meters matching the &quot;{activeTab}&quot; technology category.
            </p>
            <button 
              onClick={() => setActiveTab('All')}
              className="btn btn-primary font-bold"
            >
              View All Products
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
