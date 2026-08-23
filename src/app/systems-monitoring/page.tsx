import styles from './SystemsMonitoring.module.css';
import Image from 'next/image';
import Link from 'next/link';
import InquiryModal from '@/components/InquiryModal/InquiryModal';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';

export const metadata = {
  title: 'Systems & Monitoring - Aquacy',
  description: 'Systems and monitoring solutions for smart water metering, including MGrid, repeaters, and gateways.',
};

export default function SystemsMonitoringPage() {
  const products = [
    {
      id: 'mgrid',
      title: 'MGRID',
      description: 'MGrid is ADM Meters Web IoT platform developed to meet the requirements of the water Utility and for the accounting of water and thermal energy. Accessible from any Internet browser, it offers features to facilitate billing cycles and support the control and development of data collection technologies. MGrid allows real-time control of every element of the system, from the specific devices to the network infrastructure. It is an effective tool to assist with identifying leaks in the network thanks to its map-based representation of the information collected. The interface is structured in modules having different specific functions for data acquisition (Mobile or Fixed). It also allows integration with third-party ERP systems.',
      features: [
        'Fast web-based access (readings, alarms, etc.)',
        'Intuitive dashboard',
        'Connection with ADM Meters Arrow Mobile Android reading app',
        'Integration with third-party systems',
        'Customer database management',
        'Local data export',
        'Leak finding support',
        'Map-based display of information'
      ],
      imageUrl: '/products/mgrid.png'
    },
    {
      id: 'irda-connection',
      title: 'IRDA CONNECTION',
      description: 'Accessories for the configuration of devices with an optical interface. Can be used with a range of ADM Meters devices and apps. Bluetooth and USB versions comply with IEC 62056-21.',
      features: [
        'Available in several versions:',
        'USB A optical head',
        'USB C optical head',
        'Bluetooth optical head',
        'Optical head for UniCo Tool'
      ],
      imageUrl: '/products/interfacceottiche.png'
    },
    {
      id: 'smart-kit-level-converter',
      title: 'SMART KIT – LEVEL CONVERTER',
      description: 'M-Bus level converter, compatible with RTU EVO datalogger. Available in two models for 60 and 250 M-Bus wired devices respectively. It can be used as a master or as a repeater to extend an existing network. Only available with external power supply.',
      features: [],
      imageUrl: '/products/levelconverter-250-z.png'
    },
    {
      id: 'smart-kit-repeater-wm-bus',
      title: 'SMART KIT – REPEATER WM-BUS',
      description: '868 MHz radio repeater for data communication with the RTU EVO datalogger via MESH radio channel. It can receive up to 500 wM-Bus radio devices. Multi-hop function for extending the network using other repeaters. Only available with external power supply.',
      features: [
        'Manages up to 500 wM-Bus devices',
        'Supports various operating modes: S / T / C+T / S&T+C',
        'Local USB port for configuration, firmware update and power supply',
        'Mains power (no need to change batteries)',
        'Constant data storage',
        'Larger covered area when compared to similar battery-powered instruments'
      ],
      imageUrl: '/products/repeater-868-3q.png'
    },
    {
      id: 'smart-kit-datalogger',
      title: 'SMART KIT – DATALOGGER',
      description: 'Externally-powered RTU EVO datalogger for M-Bus and wM-Bus 868 MHz meters. For automatic, periodical reading of devices connected by cable (without dedicated M-Bus level converter, up to a maximum of 20 devices). wM-Bus connection requires a radio level converter. The data can be read locally or transmitted remotely.',
      features: [
        'Graphic display and 6-key keypad',
        'Datalogging function and built-in web server',
        'Ethernet and USB interface',
        'External AC/DC 24 V power supply',
        'IP20'
      ],
      imageUrl: '/products/datalogger-3q.png'
    },
    {
      id: 'gateway',
      title: 'GATEWAY',
      description: 'Battery-powered 868 MHz wMBus gateway. Supports radio-based reading of wM-Bus meters. General settings can be configured locally and the data is sent via FTP or email using an integrated GSM/GPRS connection.',
      features: [
        'Manages up to 1000 wM-Bus devices',
        'Data transfer: Every 30 days',
        'Battery life: 10 years',
        'Local USB port for configuration'
      ],
      imageUrl: '/products/gateway-wmbus.png'
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
            <span className={styles.breadcrumbCurrent}>Systems & Monitoring</span>
          </nav>

          <div className={styles.header}>
            <h1 className={styles.pageTitle}>Systems & Monitoring</h1>
            <p className={styles.pageDescription}>
              ADM Meters provides a comprehensive suite of systems and monitoring tools to build scalable, robust data collection networks. From web-based IoT platforms like MGrid to repeaters, dataloggers, and gateways, these tools ensure accurate accounting and network management for modern water utilities.
            </p>
          </div>

          <div className={styles.productGrid}>
            {products.map((mod) => (
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
