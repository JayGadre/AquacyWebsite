import { Metadata } from 'next';
import CatalogClient from './CatalogClient';

import productsData from '@/data/products.json';

export const metadata: Metadata = {
  title: 'Water Meter Catalog | Aquacy India – ADM Meters Channel Partner',
  description:
    'Browse the complete range of ADM water meters supplied by Aquacy India: multi-jet mechanical meters, ultrasonic smart meters, and bulk Woltmann meters. ISO 4064 & IS 778 certified.',
  keywords: ["water meter catalog", "ADM meters India", "ultrasonic smart meters", "mechanical water meters", "Aquacy India products"],
  alternates: {
    canonical: "/catalog",
  },
  openGraph: {
    title: 'Water Meter Catalog | Aquacy India',
    description:
      'DS TRP, ELECTO SONIC, WMAP EVO, E-BULK and more – precision water meters for utilities, municipalities, and industry.',
    url: "https://www.aquacy.in/catalog",
    type: "website",
  },
};

export default function CatalogPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: productsData.map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: product.title,
        description: product.description,
        url: `https://www.aquacy.in/product/${product.id}`
      }
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CatalogClient />
    </>
  );
}
