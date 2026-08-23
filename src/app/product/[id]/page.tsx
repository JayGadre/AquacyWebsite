import styles from './ProductDetail.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import productsData from '@/data/products.json';
import InquiryModal from '@/components/InquiryModal/InquiryModal';

// Make sure we type the params properly for Next.js app router
export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const product = productsData.find(p => p.id === resolvedParams.id);
  
  if (!product) {
    notFound();
  }

  return (
    <main className={styles.section}>
      <div className="container">
        <nav className={styles.breadcrumb}>
          <Link href="/" className={styles.breadcrumbLink}>Home</Link>
          <span className={styles.breadcrumbSeparator}>/</span>
          <Link href="/#products" className={styles.breadcrumbLink}>Products</Link>
          <span className={styles.breadcrumbSeparator}>/</span>
          <span className={styles.breadcrumbCurrent}>{product.title}</span>
        </nav>

        <div className={styles.productGrid}>
          <div className={styles.imageContainer}>
            <Image
              src={`/products/${product.id}.png`}
              alt={product.title}
              width={600}
              height={600}
              style={{ objectFit: 'contain', width: '100%', height: 'auto' }}
              priority
            />
          </div>

          <div className={styles.infoContainer}>
            <div>
              <h1 className={styles.title}>{product.title}</h1>
              {product.subtitle && (
                <h2 className={styles.subtitle}>{product.subtitle}</h2>
              )}
            </div>

            <div className={styles.description}>
              {product.description.split('\n\n').map((paragraph, i) => (
                <p key={i} style={{ marginBottom: '1rem' }}>{paragraph}</p>
              ))}
            </div>

            {product.features && product.features.length > 0 && (
              <div className={styles.featuresCard}>
                <h3 className={styles.featuresTitle}>Structural and functional characteristics</h3>
                <ul className={styles.featuresList}>
                  {product.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className={styles.actionArea}>
              <InquiryModal productName={product.title} />
              
              {product.brochures && product.brochures.map((brochure, i) => (
                <a 
                  key={i} 
                  href={brochure.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={styles.brochureBtn}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                  {brochure.title}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
