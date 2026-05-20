import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Novessa Foundation | Empowering Nigerian Communities",
  description:
    "Novessa Foundation promotes mental wellbeing and quality education for youth, women, neurodivergent people, and vulnerable communities across Nigeria."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
