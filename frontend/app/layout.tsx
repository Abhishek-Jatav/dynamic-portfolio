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
  themeColor: "#000000", // Always dark
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen flex flex-col bg-black text-white">
        <Providers>
          <BackendGate>
            <Header />

            <main className="flex-grow w-full">
              <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 py-10">
                {children}

                <Toaster
                  position="top-right"
                  toastOptions={{
                    duration: 4000,
                    style: {
                      borderRadius: "12px",
                      background: "#111827",
                      color: "#fff",
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
