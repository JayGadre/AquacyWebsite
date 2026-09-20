import { MapPin, Phone, Mail, FileDown, ShieldCheck, Award } from "lucide-react";
import Link from "next/link";
import AnimatedLogo from "../AnimatedLogo/AnimatedLogo";

export default function Footer() {
  return (
    <footer className="bg-slate-900 dark:bg-slate-950 pt-16 pb-12 border-t border-slate-800 text-slate-300">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand & Address */}
          <div className="space-y-5">
            <div className="transform scale-90 origin-left -ml-2">
              <AnimatedLogo />
            </div>
            <p className="text-xs leading-relaxed text-slate-300 font-medium">
              Authorised channel partner of ADM Meters. Manufacturing world-class smart water meters in technical collaboration with Maddalena, Italy.
            </p>
            <div className="space-y-2.5 text-xs text-slate-300 font-medium pt-2">
              <div className="flex items-start gap-2.5">
                <MapPin aria-hidden="true" className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <p>E-303, Indradhanu, behind Vanaz, Paud Road<br />Kothrud, Pune 411038</p>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone aria-hidden="true" className="w-4 h-4 text-sky-400 shrink-0" />
                <p>+91 98908 00301</p>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail aria-hidden="true" className="w-4 h-4 text-sky-400 shrink-0" />
                <p>aquacyindia@gmail.com</p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-white text-base font-bold tracking-tight">Navigation</h4>
            <ul className="space-y-2.5 text-xs font-semibold text-slate-300">
              <li><Link href="/" className="hover:text-sky-400 transition-colors">Home</Link></li>
              <li><Link href="/catalog" className="hover:text-sky-400 transition-colors">Product Catalog</Link></li>
              <li><Link href="/about-us" className="hover:text-sky-400 transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-sky-400 transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Products */}
          <div className="space-y-4">
            <h4 className="text-white text-base font-bold tracking-tight">Water Meters</h4>
            <ul className="space-y-2.5 text-xs font-semibold text-slate-300">
              <li><Link href="/catalog#ds-trp" className="hover:text-sky-400 transition-colors">DS TRP Multi-Jet Meter</Link></li>
              <li><Link href="/catalog#electo-sonic" className="hover:text-sky-400 transition-colors">ELECTO SONIC Ultrasonic</Link></li>
              <li><Link href="/catalog#e-bulk" className="hover:text-sky-400 transition-colors">E-BULK Static Bulk Meter</Link></li>
              <li><Link href="/catalog#wmap-evo" className="hover:text-sky-400 transition-colors">WMAP EVO Woltmann Meter</Link></li>
            </ul>
          </div>

          {/* Certifications & Download */}
          <div className="space-y-5">
            <h4 className="text-white text-base font-bold tracking-tight">Certifications</h4>
            <div className="flex items-center gap-2 text-xs font-bold text-sky-400 bg-sky-950/60 border border-sky-800/60 px-3 py-2 rounded-lg">
              <ShieldCheck className="w-4 h-4 text-sky-400 shrink-0" />
              <span>ISO 4064 &amp; IS 778 Certified</span>
            </div>
            
            <a 
              href="/ADM_PRODUCT_CATALOGUE_AQ.pdf" 
              download
              className="btn btn-primary w-full text-xs py-3 justify-center font-bold"
            >
              <FileDown aria-hidden="true" className="w-4 h-4" />
              <span>Download Product Catalog</span>
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400 font-medium">
          <p>&copy; {new Date().getFullYear()} Aquacy India. Authorised Channel Partner ADM Meters. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-sky-400 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-sky-400 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
