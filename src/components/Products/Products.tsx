import styles from "./Products.module.css";
import Image from "next/image";
import Link from "next/link";

const products = [
  {
    id: "ds-trp",
    title: "DS TRP",
    desc: "The exclusive DSTRP analog water meter with an industry-first 5-year replacement guarantee.",
    tags: ["Analogue", "5-Year Guarantee", "Water"],
    image: "/products/ds-trp.png"
  },
  {
    id: "ds-asd",
    title: "DS ASD/ASD-G",
    desc: "High-quality analog mechanical water meter engineered for reliable water measurement.",
    tags: ["Analogue", "Mechanical", "Water"],
    image: "/products/ds-asd.png"
  },
  {
    id: "composite-ds-trp",
    title: "Composite DS TRP",
    desc: "Lightweight, high-durability composite body water meter offering exceptional precision.",
    tags: ["Analogue", "Composite", "Water"],
    image: "/products/composite-ds-trp.png"
  },
  {
    id: "electo-sonic",
    title: "ELECTO SONIC",
    desc: "Precision digital ultrasonic water meter with zero moving parts and remote reading capabilities.",
    tags: ["Digital", "Ultrasonic", "Smart"],
    image: "/products/electo-sonic.png"
  },
  {
    id: "wmap-evo",
    title: "WMAP EVO",
    desc: "Heavy-duty analog bulk water meter designed for commercial and industrial applications.",
    tags: ["Analogue", "Bulk", "Commercial"],
    image: "/products/wmap-evo.png"
  },
  {
    id: "e-bulk",
    title: "E-BULK",
    desc: "Advanced electronic bulk water meter with advanced digital data transmission capabilities.",
    tags: ["Digital", "Bulk", "Industrial"],
    image: "/products/e-bulk.png"
  },
  {
    id: "wt",
    title: "WT",
    desc: "Rugged Woltman-type analog water meter for highly accurate measurement of large flows.",
    tags: ["Analogue", "Woltman", "High Flow"],
    image: "/products/wt.png"
  }
];

export default function Products() {
  return (
    <section id="products" className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>Our <span className="text-gradient">Smart Meters</span></h2>
          <p>Full range of ultrasonic meters compliant with global standards, ready for immediate deployment.</p>
        </div>

        <div className={styles.grid}>
          {products.map((product) => (
            <div key={product.id} className={`glass-card ${styles.productCard}`}>
              {/* Provision for Water Meter Photo */}
              <div id={`meter-photo-${product.id}`} className={styles.imagePlaceholder}>
                <Image 
                  src={product.image}
                  alt={product.title}
                  width={400}
                  height={240}
                  style={{ objectFit: 'contain', width: '100%', height: '100%' }}
                  priority={product.id === 'ds-trp'}
                />
              </div>
              
              <div className={styles.productInfo}>
                <h3 className={styles.productTitle}>{product.title}</h3>
                <div className={styles.productTags}>
                  {product.tags.map(tag => (
                    <span key={tag} className={styles.tag}>{tag}</span>
                  ))}
                </div>
                <p className={styles.productDesc}>{product.desc}</p>
                
                <div style={{ marginTop: '1.5rem' }}>
                  <Link href={`/product/${product.id}`} className={styles.readMoreBtn}>
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
