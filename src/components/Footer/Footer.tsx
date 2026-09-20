import { MapPin, Phone, Mail, FileDown } from "lucide-react";
import Link from "next/link";
import AnimatedLogo from "../AnimatedLogo/AnimatedLogo";

export default function Footer() {
  return (
    <footer className="bg-[var(--secondary)] pt-16 pb-8 border-t border-[var(--glass-border)] mt-16 text-[#cbd5e1]">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand & Address */}
          <div className="space-y-6">
            <div className="transform scale-90 origin-left -ml-2">
              <AnimatedLogo />
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              Authorised channel partner of ADM Meters. Manufacturing world-class smart water meters in technical collaboration with Maddalena, Italy.
            </p>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <MapPin aria-hidden="true" className="w-5 h-5 text-[var(--primary)] shrink-0 mt-0.5" />
                <p>E-303, Indradhanu, behind Vanaz, Paud Road<br />Kothrud, Pune 411038</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone aria-hidden="true" className="w-5 h-5 text-[var(--primary)] shrink-0" />
                <p>+91 98908 00301</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail aria-hidden="true" className="w-5 h-5 text-[var(--primary)] shrink-0" />
                <p>aquacyindia@gmail.com</p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-[var(--foreground)] text-lg font-medium">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/" className="hover:text-[var(--primary)] transition-colors">Home</Link></li>
              <li><Link href="/catalog" className="hover:text-[var(--primary)] transition-colors">Product Catalog</Link></li>
              <li><Link href="/about-us" className="hover:text-[var(--primary)] transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-[var(--primary)] transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Products */}
          <div className="space-y-6">
            <h4 className="text-[var(--foreground)] text-lg font-medium">Products</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/#products" className="hover:text-[var(--primary)] transition-colors">Water Meters (DSTRP)</Link></li>
              <li><Link href="/communication-modules" className="hover:text-[var(--primary)] transition-colors">Communication Modules</Link></li>
              <li><Link href="/systems-monitoring" className="hover:text-[var(--primary)] transition-colors">Systems & Monitoring</Link></li>
              <li><Link href="/instruments" className="hover:text-[var(--primary)] transition-colors">Instruments</Link></li>
            </ul>
          </div>

          {/* Download & Legal */}
          <div className="space-y-6">
            <h4 className="text-[var(--foreground)] text-lg font-medium">Resources</h4>
            <a 
              href="/ADM_PRODUCT_CATALOGUE_AQ.pdf" 
              download
              className="inline-flex items-center gap-2 bg-[var(--primary)] text-white px-4 py-2 rounded-lg hover:bg-[#38bdf8] transition-colors text-sm font-medium shadow-[0_4px_14px_0_rgba(14,165,233,0.39)] hover:shadow-[0_6px_20px_rgba(14,165,233,0.5)] hover:-translate-y-0.5"
            >
              <FileDown aria-hidden="true" className="w-4 h-4" />
              Download Catalog
            </a>
            
            <div className="pt-4">
              <h4 className="text-[var(--foreground)] text-lg font-medium mb-3">Legal</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="#!" className="hover:text-[var(--primary)] transition-colors">Privacy Policy</Link></li>
                <li><Link href="#!" className="hover:text-[var(--primary)] transition-colors">Terms of Use</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-[var(--glass-border)] flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[#94a3b8]">
          <p>&copy; {new Date().getFullYear()} Aquacy Smart Metering. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
