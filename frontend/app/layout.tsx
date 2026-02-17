import type { Metadata } from "next";
import "./globals.css";

import BackendGate from "../components/BackendGate";
import Providers from "../lib/context/Providers";
import Header from "../components/Header/Header";
import Footer from "../components/footer/Footer";

export const metadata: Metadata = {
  title: "My Portfolio",
  description: "Personal portfolio built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <Providers>
          <BackendGate>
            {/* Global Header */}
            <Header />

            {/* Page Content */}
            <main className="flex-grow">{children}</main>

            {/* Global Footer */}
            <Footer />
          </BackendGate>
        </Providers>
      </body>
    </html>
  );
}
