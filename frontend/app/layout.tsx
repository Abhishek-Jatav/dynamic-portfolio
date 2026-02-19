import type { Metadata } from "next";
import "./globals.css";

import BackendGate from "../components/BackendGate";
import Providers from "../lib/context/Providers";
import Header from "../components/Header/Header";
import Footer from "../components/footer/Footer";

export const metadata: Metadata = {
  title: "Abhishek Jatav | Portfolio",
  description: "Full Stack Developer portfolio built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-white dark:bg-black text-gray-900 dark:text-white">
        <Providers>
          <BackendGate>
            <Header />

            <main className="flex-grow w-full">
              <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 py-10">
                {children}
              </div>
            </main>

            <Footer />
          </BackendGate>
        </Providers>
      </body>
    </html>
  );
}
