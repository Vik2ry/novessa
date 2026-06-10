import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Novessa Foundation | Empowering Nigerian Communities",
  description:
    "Novessa Foundation promotes mental wellbeing and quality education for youth, women, neurodivergent people, and vulnerable communities across Nigeria.",
  icons: {
    icon: "/logo.jpeg",
    apple: "/logo.jpeg",
  },
  openGraph: {
    title: "Novessa Foundation | Empowering Nigerian Communities",
    description:
      "Novessa Foundation promotes mental wellbeing and quality education for youth, women, neurodivergent people, and vulnerable communities across Nigeria.",
    images: [
      {
        url: "/logo.jpeg",
        width: 1200,
        height: 1200,
        alt: "Novessa Foundation Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Novessa Foundation | Empowering Nigerian Communities",
    description:
      "Novessa Foundation promotes mental wellbeing and quality education for youth, women, neurodivergent people, and vulnerable communities across Nigeria.",
    images: ["/logo.jpeg"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
