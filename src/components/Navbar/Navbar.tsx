"use client";

import { useState, useEffect } from "react";
import styles from "./Navbar.module.css";
import Link from "next/link";
import AnimatedLogo from "../AnimatedLogo/AnimatedLogo";
import InquiryModal from "../InquiryModal/InquiryModal";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
      <div className={`container ${styles.container}`}>
        <Link href="/" className={styles.logoContainer}>
          <AnimatedLogo />
        </Link>

        <div className={styles.navLinks}>
          <Link href="/#products" className={styles.navLink}>Meters</Link>
          <Link href="/#about" className={styles.navLink}>About OEM</Link>
        </div>

        <InquiryModal 
          productName="General Inquiry" 
          buttonText="Contact Us" 
          buttonClassName={`btn btn-primary ${styles.contactBtn}`} 
        />
      </div>
    </nav>
  );
}
