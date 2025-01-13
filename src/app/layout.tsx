import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import 'boxicons/css/boxicons.min.css';
import "./globals.css";
import Layout from "./components/layout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "atmosChart",
  description: "Charts of temperature and humidity for a nation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Layout>
         {children}
        </Layout>
      </body>
    </html>
  );
}
