import type { Metadata } from "next";
import localFont from "next/font/local";
import {
  Bricolage_Grotesque,
  JetBrains_Mono,
  Instrument_Serif,
} from "next/font/google";
import "./globals.css";
import N8nChatWidget from "@/components/chat/N8nChatWidget";
import BlindCurtainsTransition from "@/components/layout/BlindCurtainsTransition";
import InitialPageLoader from "@/components/layout/InitialPageLoader";
import ScrollToTopButton from "@/components/layout/ScrollToTopButton";

// Downloaded Local Font: Manrope (Variable Weights 200-900)
const fontManrope = localFont({
  src: "../fonts/Manrope-Variable.ttf",
  variable: "--font-sans",
  weight: "200 900",
  style: "normal",
  display: "swap",
});

// Primary Display / Heading Font: Bricolage Grotesque (600, 700, 800)
const fontBricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["600", "700", "800"],
});

// Monospace Numbers & Track Indexes: JetBrains Mono (400, 500, 600, 700)
const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600", "700"],
});

// Editorial Accent Serif Font: Instrument Serif (400 italic & normal)
const fontInstrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: "400",
  style: ["italic", "normal"],
});

export const metadata: Metadata = {
  title: "Capital Youth Expo 2026 | Pre Event at BUIC",
  description:
    "Official Capital Youth Expo pre-event hosted at Bahria University Islamabad Campus (BUIC). Speed Programming, Hackathon, Esports, Speech Competition & Ambassador Program.",
  keywords: [
    "Capital Youth Expo",
    "CYE BUIC",
    "Bahria University Islamabad",
    "Speed Programming",
    "Hackathon Islamabad",
    "Youth Insight",
    "Al Nakhla",
  ],
  icons: {
    icon: [
      { url: "/cye-logo.png", href: "/cye-logo.png" },
      { url: "/images/logo-removebg-preview 8.png", href: "/images/logo-removebg-preview 8.png" },
    ],
    shortcut: "/cye-logo.png",
    apple: "/cye-logo.png",
  },
  openGraph: {
    title: "Capital Youth Expo 2026 | Pre Event at BUIC",
    description:
      "Official Capital Youth Expo pre-event hosted at Bahria University Islamabad Campus (BUIC).",
    images: [{ url: "/images/logo-removebg-preview 8.png" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fontManrope.variable} ${fontBricolage.variable} ${fontMono.variable} ${fontInstrumentSerif.variable} antialiased scroll-smooth`}
    >
      <body className="min-h-screen flex flex-col font-sans bg-[#F8FAFC] text-slate-900 selection:bg-[#003B96] selection:text-white">
        <InitialPageLoader />
        <BlindCurtainsTransition />
        {children}
        <ScrollToTopButton />
        <N8nChatWidget />
      </body>
    </html>
  );
}
