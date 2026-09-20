import ProductCard from "@/components/ui/ProductCard";
import productsData from "@/data/products.json";

export default function Products() {
  return (
    <section id="products" className="py-24 bg-slate-900/30 relative z-10">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Our <span className="text-gradient-cyan">Smart Meters</span></h2>
          <p className="text-slate-300 text-lg">Full range of ultrasonic meters compliant with global standards, ready for immediate deployment.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {productsData.map((product, index) => (
            <ProductCard key={product.id} product={product} priority={index < 3} />
          ))}
        </div>
      </div>
    </section>
  );
}
