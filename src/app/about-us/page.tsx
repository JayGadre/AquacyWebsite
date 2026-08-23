import styles from './AboutUs.module.css';
import Link from 'next/link';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';

export const metadata = {
  title: 'About Us - Aquacy Pvt. Ltd.',
  description: 'A premier provider of cutting-edge water management and metering solutions.',
};

export default function AboutUsPage() {
  return (
    <>
      <Navbar />
      <main className={styles.section}>
        <div className="container">
          <nav className={styles.breadcrumb}>
            <Link href="/" className={styles.breadcrumbLink}>Home</Link>
            <span className={styles.breadcrumbSeparator}>/</span>
            <span className={styles.breadcrumbCurrent}>About Us</span>
          </nav>

          <div className={styles.header}>
            <h1 className={styles.pageTitle}>Aquacy Pvt. Ltd.</h1>
            <h2 className={styles.subtitle}>Empowering Sustainable Water Management Nationwide</h2>
            <p className={styles.pageDescription}>
              Established in 2013 with our head office in Pune, Aquacy Group of Companies has emerged as a premier consultancy and solutions provider in the field of efficient water resource management. With a strong focus on innovation, sustainability, and smart technology integration, we offer end-to-end services designed to optimize water supply systems for municipalities, utilities, and large-scale infrastructure projects.
            </p>
          </div>

          <div className={styles.contentGrid}>
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>Our Achievements</h2>
              <p className={styles.cardText}>
                Our consistent performance and customer-centric approach have enabled us to establish a strong financial foundation with a current turnover above ₹9 Crore. We have successfully executed numerous projects across India in smart water management, GIS consultancy, and metering infrastructure.
              </p>
              
              <div className={styles.statsGrid}>
                <div className={styles.statBox}>
                  <div className={styles.statValue}>15+</div>
                  <div className={styles.statLabel}>Years of Expertise</div>
                </div>
                <div className={styles.statBox}>
                  <div className={styles.statValue}>3 Lakh+</div>
                  <div className={styles.statLabel}>Meters Supplied</div>
                </div>
                <div className={styles.statBox}>
                  <div className={styles.statValue}>33,000+</div>
                  <div className={styles.statLabel}>EPC Contract Meters Executed</div>
                </div>
                <div className={styles.statBox}>
                  <div className={styles.statValue}>Pan-India</div>
                  <div className={styles.statLabel}>Presence Across 12+ States</div>
                </div>
              </div>
            </div>

            <div className={styles.card}>
              <h2 className={styles.cardTitle}>Comprehensive Water Management Expertise</h2>
              <p className={styles.cardText}>
                Since 2013, Aquacy Group of Companies has been delivering cutting-edge solutions across the entire water management lifecycle. With deep expertise in Water Audits, Smart Metering infrastructure, precise Billing and Distribution systems, and advanced GIS Mapping, we empower municipalities and utilities to streamline operations, reduce non-revenue water, and maximize revenue collection efficiency.
              </p>
            </div>

            <div className={styles.card}>
              <h2 className={styles.cardTitle}>Services & Product Offerings</h2>
              <div className={styles.servicesList}>
                <div className={styles.serviceItem}>
                  <h3 className={styles.serviceTitle}>Water Meter Supply & Installation</h3>
                  <p className={styles.serviceDesc}>Complete range of high-accuracy water meters tailored to customer needs, including Mechanical, AMR, AMI, and Ultrasonic meters for residential, commercial, and industrial use.</p>
                </div>
                <div className={styles.serviceItem}>
                  <h3 className={styles.serviceTitle}>Smart Metering Solutions</h3>
                  <p className={styles.serviceDesc}>Integration of AMR/AMI technologies for remote automated data collection, real-time monitoring, enhanced billing accuracy, and LoRa network setup.</p>
                </div>
                <div className={styles.serviceItem}>
                  <h3 className={styles.serviceTitle}>Water Audit Services</h3>
                  <p className={styles.serviceDesc}>Detailed analysis of supply and consumption patterns, identification of leakages, NRW reduction recommendations, and DPR preparation as per IWA guidelines.</p>
                </div>
                <div className={styles.serviceItem}>
                  <h3 className={styles.serviceTitle}>GIS Consultancy & Mapping</h3>
                  <p className={styles.serviceDesc}>GIS-based mapping of water distribution networks, digital inventory of water supply assets, hydraulic modeling, and spatial analysis for expansion.</p>
                </div>
              </div>
            </div>

            <div className={styles.card}>
              <h2 className={styles.cardTitle}>Contact Us</h2>
              <div className={styles.contactGrid}>
                <div className={styles.contactItem}>
                  <span className={styles.contactIcon}>📍</span>
                  <span>E-303, Indradhanu, behind Vanaz, Paud Road, Kothrud, Pune - 411038</span>
                </div>
                <div className={styles.contactItem}>
                  <span className={styles.contactIcon}>📞</span>
                  <span>+91 98908 00301</span>
                </div>
                <div className={styles.contactItem}>
                  <span className={styles.contactIcon}>✉️</span>
                  <span>aquacyindia@gmail.com</span>
                </div>
                <div className={styles.contactItem}>
                  <span className={styles.contactIcon}>🌐</span>
                  <span>www.aquacyindia.com</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
