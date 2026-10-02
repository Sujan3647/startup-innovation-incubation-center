import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Startup Innovation & Incubation Center - ICFAI University Tripura",
  description:
    "ICFAI University Tripura Institution's Innovation Council (IIC) fostering research, entrepreneurship, and collaboration in Tripura.",
  keywords: [
    "ICFAI University",
    "Tripura",
    "Startup",
    "Innovation",
    "Incubation Center",
    "IIC",
    "Entrepreneurship",
  ],
  icons: {
    icon: "/Logos/Navbar-Logo/Icfai logo.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable} antialiased overflow-x-hidden`}>
      <body className="min-h-screen flex flex-col font-sans overflow-x-hidden">{children}</body>
    </html>
  );
}
