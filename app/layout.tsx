import type { Metadata } from "next";
import { Poppins, Playfair_Display } from "next/font/google";
import "./globals.css";
import Preloader from "./components/preloader";

const poppins = Poppins({ variable: "--font-poppins", subsets: ["latin"], weight: ["400", "700"] });
const playfair = Playfair_Display({ variable: "--font-play-fair-display", subsets: ["latin"], weight: ["400"] });

export const metadata: Metadata = {
  title: "Paycort | AI Tax Integration App",
  description: "Built with Love by AY Asemota",
    openGraph: {
    title: "Paycort | AI Tax Integration App",
    description: "Built with Love by AY Asemota",
    siteName: "Paycort",
    images: [
      {
        url: "/social-preview.png",
        width: 1200,
        height: 630,
        alt: "Paycort Website Preview",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${playfair.variable} antialiased`}>
        <Preloader />
        {children}
      </body>
    </html>
  );
}