import styles from './CommunicationModules.module.css';
import Image from 'next/image';
import Link from 'next/link';
import InquiryModal from '@/components/InquiryModal/InquiryModal';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';

export const metadata = {
  title: 'Communication Modules - Aquacy',
  description: 'Communication modules for smart water metering, enabling remote data reading and fixed networks.',
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
      <Navbar />
      <main className={styles.section}>
        <div className="container">
          <nav className={styles.breadcrumb}>
            <Link href="/" className={styles.breadcrumbLink}>Home</Link>
            <span className={styles.breadcrumbSeparator}>/</span>
            <Link href="/#products" className={styles.breadcrumbLink}>Products</Link>
            <span className={styles.breadcrumbSeparator}>/</span>
            <span className={styles.breadcrumbCurrent}>Communication Modules</span>
          </nav>

          <div className={styles.header}>
            <h1 className={styles.pageTitle}>Communication Modules</h1>
            <p className={styles.pageDescription}>
              ADM Meters LLP offers a range of communication modules designed to enable analog (mechanical totalizer) water meters to connect and exchange data with various short-range and long-range networks. These modules facilitate faster meter reading, improved network monitoring, and the identification of potential leaks or faults.
            </p>
          </div>

          <div className={styles.productGrid}>
            {modules.map((mod) => (
              <div key={mod.id} className={styles.productCard}>
                <div className={styles.imageContainer}>
                  <div style={{ position: 'relative', width: '100%', height: '300px' }}>
                    <Image
                      src={mod.imageUrl}
                      alt={mod.title}
                      fill
                      style={{ objectFit: 'contain' }}
                    />
                  </div>
                </div>

                <div className={styles.infoContainer}>
                  <h2 className={styles.title}>{mod.title}</h2>
                  <p className={styles.description}>{mod.description}</p>

                  <div className={styles.featuresCard}>
                    <h3 className={styles.featuresTitle}>Key Features</h3>
                    <ul className={styles.featuresList}>
                      {mod.features.map((feature, i) => (
                        <li key={i}>{feature}</li>
                      ))}
                    </ul>
                  </div>

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
