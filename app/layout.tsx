import type { Metadata } from "next";
import { DM_Serif_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const serif = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lakeside Veterinary Clinic | Toronto Vet on The Esplanade",
  description:
    "Compassionate, modern veterinary care on Toronto's waterfront. Wellness exams, surgery, dental, diagnostics & urgent care. Now welcoming new patients at 8 The Esplanade.",
  keywords: [
    "Toronto vet",
    "veterinary clinic Toronto",
    "Esplanade vet",
    "pet clinic downtown Toronto",
    "Lakeside Veterinary",
    "dog vet Toronto",
    "cat vet Toronto",
  ],
  openGraph: {
    title: "Lakeside Veterinary Clinic | Toronto",
    description:
      "Compassionate veterinary care on Toronto's waterfront. Now welcoming new patients.",
    url: "https://lakesideveterinary.ca",
    siteName: "Lakeside Veterinary Clinic",
    locale: "en_CA",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
