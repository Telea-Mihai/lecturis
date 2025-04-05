import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import '@/lib/fontawesome/css/fa.css';
import NavBar from "@/app/components/navBar";

export const metadata: Metadata = {
  title: "Bloblo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
            {children}
      </body>
    </html>
  );
}
