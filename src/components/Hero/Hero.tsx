import styles from "./Hero.module.css";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className={styles.hero}>
      {/* Decorative background orbs */}
      <div className={`${styles.orb} ${styles.orb1}`}></div>
      <div className={`${styles.orb} ${styles.orb2}`}></div>

      <div className={`container ${styles.heroContent}`}>
        <div className={styles.badge}>
          Authorised Channel Partner of ADM Meters
        </div>
        
        <h1 className={styles.title}>
          Precision <span className="text-gradient">UltraModern</span> Water Metering
        </h1>
        
        <p className={styles.subtitle}>
          AQUACY is an authorised channel partner of ADM Meters. ADM Meters manufactures world-class water meters in technical collaboration with Maddalena, Italy.
        </p>

        <div className={styles.actions}>
          <a href="#products" className="btn btn-primary" style={{ textDecoration: 'none' }}>
            Explore Products <ArrowRight size={18} style={{ marginLeft: "8px" }} />
          </a>
          <a href="/ADM_PRODUCT_CATALOGUE_AQ.pdf" target="_blank" rel="noopener noreferrer" className={`btn ${styles.btnSecondary}`} style={{ textDecoration: 'none' }}>
            Download Specifications
          </a>
        </div>
      </div>
    </section>
  );
}
