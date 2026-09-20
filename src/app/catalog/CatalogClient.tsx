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
            <Sparkles aria-hidden="true" className="w-3.5 h-3.5 text-[#0ea5e9]" />
            ADM Meters – Authorised Channel Partner Pune
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
            Water Meter <span className="text-gradient-cyan">Catalog</span>
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed mb-8">
            Discover our complete range of precision-engineered water metering solutions. From residential
            multi-jet meters to industrial ultrasonic bulk meters — ISO 4064 certified, IP68 rated.
          </p>
          <a
            href="/ADM_PRODUCT_CATALOGUE_AQ.pdf"
            download
            className="btn btn-primary text-sm px-6 py-3.5 shadow-[0_0_20px_rgba(14,165,233,0.3)] inline-flex items-center gap-2"
          >
            <Download aria-hidden="true" className="w-4 h-4" />
            Download Full Catalog PDF
          </a>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-12">
          <div className="flex items-center gap-2 text-slate-300 text-sm font-medium">
            <SlidersHorizontal aria-hidden="true" className="w-4 h-4 text-[#0ea5e9]" />
            <span>Filter by technology:</span>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-300 ${
                  activeTab === tab
                    ? 'btn-primary shadow-[0_0_15px_rgba(14,165,233,0.4)] scale-105'
                    : 'btn-glass text-slate-300 hover:text-white'
                }`}
                aria-pressed={activeTab === tab}
              >
                {tab}
              </button>
            ))}
          </div>
          <p className="text-slate-400 text-xs font-medium">
            Showing <span className="text-white font-bold">{filteredProducts.length}</span> meter{filteredProducts.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} priority={index < 4} />
            ))}
          </div>
        ) : (
          <div className="glass-card p-12 flex flex-col items-center justify-center text-center min-h-[400px]">
            <div className="w-16 h-16 bg-[#0ea5e9]/10 rounded-full flex items-center justify-center mb-6 border border-[#0ea5e9]/20">
              <SlidersHorizontal aria-hidden="true" className="w-8 h-8 text-[#38bdf8]" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">No products found</h3>
            <p className="text-slate-400 max-w-md mx-auto mb-8">
              We couldn&apos;t find any water meters matching the &quot;{activeTab}&quot; technology category.
            </p>
            <button 
              onClick={() => setActiveTab('All')}
              className="btn btn-primary"
            >
              View All Products
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

