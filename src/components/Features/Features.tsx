import styles from "./Features.module.css";
import { Activity, ShieldCheck, BatteryCharging, Droplet } from "lucide-react";

const features = [
  {
    title: "Static Ultrasonic Design",
    description: "Zero moving parts means zero mechanical wear. Highly accurate flow measurement for domestic and commercial applications.",
    icon: Activity
  },
  {
    title: "R500 Turndown Ratio",
    description: "Exceptional low-flow sensitivity, capturing even the smallest leaks. Compliant with strict global tender requirements.",
    icon: Droplet
  },
  {
    title: "5-Year Replacement Guarantee",
    description: "The exclusive DSTRP meter of ADM offers an industry-first 5 years replacement guarantee which no other meter offers.",
    icon: ShieldCheck
  },
  {
    title: "12-Year Battery Life",
    description: "High-capacity LiSOCl2 battery combined with optimized NB-IoT transmission ensures a massive 12-year lifespan.",
    icon: BatteryCharging
  }
];

export default function Features() {
  return (
    <section id="features" className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>Engineered for <span className="text-gradient">Reliability</span></h2>
          <p>Our smart meters meet and exceed global and regional utility specifications.</p>
        </div>

        <div className={styles.grid}>
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className={`glass-card ${styles.featureCard}`}>
                <div className={styles.iconWrapper}>
                  <Icon size={28} />
                </div>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDesc}>{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
