import styles from "./Footer.module.css";
import { Droplets } from "lucide-react";
import Link from "next/link";
import AnimatedLogo from "../AnimatedLogo/AnimatedLogo";

export default function Footer() {
  return (
    <footer className={styles.footer} id="about">
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.brandInfo}>
            <div style={{ marginBottom: '1.5rem', transform: 'scale(0.8)', transformOrigin: 'left center' }}>
              <AnimatedLogo />
            </div>
            <p>
              Authorised channel partner of ADM Meters. Manufacturing world-class smart water meters in technical collaboration with Maddalena, Italy.
            </p>
          </div>
          
          <div className={styles.linksColumn}>
            <h4>Products</h4>
            <ul>
              <li><Link href="/#products">Water Meters (DSTRP)</Link></li>
              <li><Link href="/communication-modules">Communication Modules</Link></li>
              <li><Link href="/systems-monitoring">Systems & Monitoring</Link></li>
              <li><Link href="/instruments">Instruments</Link></li>
            </ul>
          </div>
          
          <div className={styles.linksColumn}>
            <h4>Company</h4>
            <ul>
              <li><Link href="/about-us">About Us</Link></li>
              <li><Link href="#">ADM Partnership</Link></li>
              <li><Link href="#">5-Year Guarantee</Link></li>
              <li><Link href="#">Contact Support</Link></li>
            </ul>
          </div>
        </div>
        
        <div className={styles.bottomBar}>
          <p>&copy; {new Date().getFullYear()} Aquacy Smart Metering. All rights reserved.</p>
          <div className={styles.bottomBarLinks}>
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
