import type { Metadata } from "next";
import { Poppins, Playfair_Display } from "next/font/google";
import "./globals.css";

const poppins = Poppins({ variable: "--font-poppins", subsets: ["latin"], weight: ["400", "700"] });
const playfair = Playfair_Display({ variable: "--font-play-fair-display", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Paycort | AI Tax Integration App",
  description: "Built with Love by AY Asemota",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${playfair.variable} antialiased`}>{children}</body>
    </html>
  );
}