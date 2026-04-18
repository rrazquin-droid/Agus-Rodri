import type { Metadata } from "next";
import { DM_Sans, Inter } from "next/font/google";
import { SimProvider } from "@/lib/sim/SimContext";
import { DemoPanel } from "@/components/DemoPanel";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "medy — tranquilidad, confirmada",
    template: "%s · medy",
  },
  description:
    "Saber que tu mamá o papá tomó sus pastillas, sin llamar para preguntar.",
  openGraph: {
    title: "medy — tranquilidad, confirmada",
    description:
      "App del pastillero inteligente. Convierte la ansiedad crónica en tranquilidad objetiva.",
    locale: "es_UY",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-UY" className={`${dmSans.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-bone text-ink antialiased">
        <SimProvider>
          {children}
          <DemoPanel />
        </SimProvider>
      </body>
    </html>
  );
}
