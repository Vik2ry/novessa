"use client";

import {
  ChartColumn,
  Heart,
  Home,
  LayoutGrid,
  Phone
} from "lucide-react";
import Link from "next/link";

const items = [
  { href: "/", label: "Home", icon: Home },
  { href: "/programs", label: "Programs", icon: LayoutGrid },
  { href: "/impact", label: "Impact", icon: ChartColumn },
  { href: "/donate", label: "Donate", icon: Heart },
  { href: "/contact", label: "Contact", icon: Phone }
] as const;

export function MobileBottomNav({ activeHref }: { activeHref: string }) {
  return (
    <nav className="mobileBottomNav" aria-label="Mobile navigation">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <Link className={activeHref === item.href ? "mobileBottomNavLink active" : "mobileBottomNavLink"} href={item.href} key={item.href}>
            <Icon size={18} />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
