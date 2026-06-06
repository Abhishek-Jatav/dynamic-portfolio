import type { Metadata, Viewport } from "next";
import "./globals.css";

import BackendGate from "../hooks/backendCheck/BackendGate";
import Providers from "../lib/context/Providers";
import Header from "../components/Header/Header";
import Footer from "../components/footer/Footer";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "NexaBuild | Abhishek Jatav",
  description:
    "A portfolio website showcasing the projects and skills of Abhishek Jatav, a passionate developer and designer.",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
        <Providers>
          <BackendGate>
            <Header />

            <main className="flex-grow w-full">
              <div className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16 py-10">
                {children}

                <Toaster
                  position="top-right"
                  toastOptions={{
                    duration: 4000,
                    style: {
                      borderRadius: "12px",
                      background: "var(--bg-card)",
                      color: "var(--text-primary)",
                      border: "1px solid var(--border-card)",
                      backdropFilter: "blur(20px)",
                      boxShadow: "var(--shadow-card)",
                      fontFamily: "var(--font-body)",
                    },
                  }}
                />
              </div>
            </main>

            <Footer />
          </BackendGate>
        </Providers>
      </body>
    </html>
  );
}
