"use client";

import Image from "next/image";
import styles from "./AnimatedLogo.module.css";

export default function AnimatedLogo() {
  return (
    <div className={styles.logoContainer}>
      <Image 
        src="/aquacy_logo.png" 
        alt="Aquacy Logo" 
        width={600} 
        height={180} 
        className={styles.logoImage}
        priority
      />
      {/* Flowing Water Effect Overlay */}
      <div className={styles.waterOverlay}>
        <div className={styles.waterGradient}></div>
      </div>
    </div>
  );
}
