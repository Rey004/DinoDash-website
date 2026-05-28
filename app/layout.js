import { JetBrains_Mono, Inter } from "next/font/google";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import SmoothScroller from "@/components/SmoothScroller";
import "./globals.css";

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata = {
  title: "DinoDash — your new tab will never be the same",
  description:
    "DinoDash replaces your Chrome new tab with a cinematic dino runner. Privacy-first. Endlessly playable.",
  icons: {
    icon: "/assets/logo-dark.webp",
    shortcut: "/assets/logo-dark.webp",
    apple: "/assets/logo-dark.webp",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${mono.variable} ${sans.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="grain bg-ink text-paper" suppressHydrationWarning>
        <SmoothScroller />
        <CustomCursor />
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
