import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar/Sidebar";
import Footer from "@/components/Footer/Footer";
import { ThemeProvider } from "@/context/ThemeContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aquacy - Smart Water Management & Ultrasonic Meters",
  description: "Commercial, production-grade ultrasonic smart water meters compliant with ISO 4064, featuring IP68 and 12-year battery life.",
  metadataBase: new URL("https://www.aquacy.in"),
  openGraph: {
    title: "Aquacy - Smart Water Management & Ultrasonic Meters",
    description: "Commercial, production-grade ultrasonic smart water meters compliant with ISO 4064, featuring IP68 and 12-year battery life.",
    url: "https://www.aquacy.in",
    siteName: "Aquacy",
    locale: "en_US",
    type: "website",
    images: ["/aquacy_logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`} data-theme="light">
      <body className="min-h-screen flex relative font-sans bg-background text-foreground" style={{ overflowX: 'clip' }}>
        <ThemeProvider>
          <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-background focus:text-foreground">
            Skip to main content
          </a>
          <Sidebar />
          <div className="flex-1 min-w-0 flex flex-col">
            {children}
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
