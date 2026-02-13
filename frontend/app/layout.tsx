import type { Metadata } from "next";
import "./globals.css";


import BackendGate from "../components/BackendGate";
import Providers from "../lib/context/Providers";

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
      <body>
        <Providers>
          <BackendGate>{children}</BackendGate>
        </Providers>
      </body>
    </html>
  );
}
