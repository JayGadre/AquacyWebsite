import styles from './Instruments.module.css';
import Image from 'next/image';
import Link from 'next/link';
import InquiryModal from '@/components/InquiryModal/InquiryModal';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';

export const metadata = {
  title: 'Instruments - Aquacy',
  description: 'Specialized instruments including manual and semi-automatic batch control units for industrial water delivery.',
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
      <Navbar />
      <main className={styles.section}>
        <div className="container">
          <nav className={styles.breadcrumb}>
            <Link href="/" className={styles.breadcrumbLink}>Home</Link>
            <span className={styles.breadcrumbSeparator}>/</span>
            <Link href="/#products" className={styles.breadcrumbLink}>Products</Link>
            <span className={styles.breadcrumbSeparator}>/</span>
            <span className={styles.breadcrumbCurrent}>Instruments</span>
          </nav>

          <div className={styles.header}>
            <h1 className={styles.pageTitle}>Instruments</h1>
            <p className={styles.pageDescription}>
              Specialized industrial instrumentation from ADM Meters, featuring robust manual and semi-automatic batch control units designed to streamline precise water delivery for various manufacturing sectors.
            </p>
          </div>

          <div className={styles.productGrid}>
            {products.map((mod) => (
              <div key={mod.id} className={styles.productCard}>
                <div className={styles.imageGallery}>
                  {mod.imageUrls.map((url, idx) => (
                    <div key={idx} className={styles.imageContainer}>
                      <div style={{ position: 'relative', width: '100%', height: idx === 0 ? '300px' : '200px' }}>
                        <Image
                          src={url}
                          alt={`${mod.title} - view ${idx + 1}`}
                          fill
                          style={{ objectFit: 'contain' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className={styles.infoContainer}>
                  <h2 className={styles.title}>{mod.title}</h2>
                  <p className={styles.description}>{mod.description}</p>

                  {mod.features && mod.features.length > 0 && (
                    <div className={styles.featuresCard}>
                      <h3 className={styles.featuresTitle}>Key Features</h3>
                      <ul className={styles.featuresList}>
                        {mod.features.map((feature, i) => (
                          <li key={i}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className={styles.actionArea}>
                    <InquiryModal productName={mod.title} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
