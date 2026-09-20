
import Image from 'next/image';
import Link from 'next/link';
import InquiryModal from '@/components/InquiryModal/InquiryModal';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Systems & Monitoring - Aquacy',
  description: 'Systems and monitoring solutions for smart water metering, including MGrid, repeaters, and gateways.',
  keywords: ["systems and monitoring", "smart water metering", "MGrid IoT platform", "data collection networks"],
  alternates: {
    canonical: "/systems-monitoring",
  },
  openGraph: {
    title: 'Systems & Monitoring - Aquacy',
    description: 'Systems and monitoring solutions for smart water metering, including MGrid, repeaters, and gateways.',
    url: "https://www.aquacy.in/systems-monitoring",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Systems & Monitoring - Aquacy",
  "url": "https://www.aquacy.in/systems-monitoring",
  "description": "Systems and monitoring solutions for smart water metering, including MGrid, repeaters, and gateways."
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main id="main-content" className="min-h-screen relative pt-32 pb-16">
        <div className="container mx-auto px-6">
          <nav className="flex items-center gap-2 text-sm text-slate-400 mb-8">
            <Link href="/" className="hover:text-[#38bdf8] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/#products" className="hover:text-[#38bdf8] transition-colors">Products</Link>
            <span>/</span>
            <span className="text-slate-200">Systems & Monitoring</span>
          </nav>

          <div className="max-w-3xl mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
              Systems & <span className="text-gradient-cyan">Monitoring</span>
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed">
              ADM Meters provides a comprehensive suite of systems and monitoring tools to build scalable, robust data collection networks. From web-based IoT platforms like MGrid to repeaters, dataloggers, and gateways, these tools ensure accurate accounting and network management for modern water utilities.
            </p>
          </div>

          <div className="flex flex-col gap-12">
            {products.map((mod) => (
              <div key={mod.id} className="glass-card bg-white/5 backdrop-blur-lg border border-white/10 p-6 md:p-10 rounded-3xl grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                <div className="relative w-full h-[300px] md:h-[400px] bg-black/20 rounded-2xl p-6 border border-white/5 flex items-center justify-center">
                  <Image
                    src={mod.imageUrl}
                    alt={mod.title}
                    fill
                    style={{ objectFit: 'contain' }}
                    className="drop-shadow-2xl"
                  />
                </div>

                <div className="flex flex-col">
                  <h2 className="text-3xl font-bold text-white mb-4">{mod.title}</h2>
                  <p className="text-slate-300 mb-8 leading-relaxed text-lg">{mod.description}</p>

                  {mod.features && mod.features.length > 0 && (
                    <div className="bg-white/5 rounded-2xl p-6 border border-white/10 mb-8">
                      <h3 className="text-white font-semibold mb-4 text-lg">Key Features</h3>
                      <ul className="space-y-3">
                        {mod.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-3 text-slate-300">
                            <span className="text-[#0ea5e9] font-bold">→</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div>
                    <InquiryModal productName={mod.title} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
