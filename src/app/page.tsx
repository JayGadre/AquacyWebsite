import Navbar from "@/components/Navbar/Navbar";
import Hero from "@/components/Hero/Hero";
import Products from "@/components/Products/Products";
import Footer from "@/components/Footer/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Products />
      </main>
      <Footer />
    </>
  );
}
