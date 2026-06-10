"use client";

import { Heart, Menu, Phone, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { mobileNavigationLinks, navigationLinks } from "@/lib/api";

export function SiteHeader({ activeHref }: { activeHref?: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const currentHref = activeHref ?? pathname;
  const drawerPreview = useMemo(
    () => [
      "Our Story is rooted in empathy, reliability, and sustainable momentum.",
      "Impact Update 2024: 12.8k lives reached across six active programs.",
      "Become a monthly donor and help us fund long-term support pathways."
    ],
    []
  );

  return (
    <>
      <header className="siteHeader">
        <div className="container navShell">
          <div className="brandBlock">
            <button
              aria-expanded={open}
              aria-label={open ? "Close navigation menu" : "Open navigation menu"}
              className="navIconButton mobileOnly"
              onClick={() => setOpen((value) => !value)}
              type="button"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
            <Link className="brand" href="/" style={{ display: 'flex', alignItems: 'center' }}>
              <Image
                src="/logo.jpeg"
                alt="Novessa Foundation Logo"
                width={40}
                height={40}
                priority
                style={{ width: 'auto', height: '40px', marginRight: '8px' }}
              />
              Novessa Foundation
            </Link>
          </div>

          <nav aria-label="Primary navigation" className="navLinks">
            {navigationLinks.slice(0, 5).map((item) => (
              <Link
                className={currentHref.startsWith(item.href) && item.href !== "/" ? "navLink active" : "navLink"}
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="navActions">
            <Link className="navTextLink desktopOnly" href="/partners">
              Partners
            </Link>
            <Link className="button buttonPrimary navDonateButton" href="/donate">
              Donate
            </Link>
          </div>
        </div>
      </header>

      <div className={open ? "mobileDrawerOverlay open" : "mobileDrawerOverlay"} onClick={() => setOpen(false)} />
      <aside className={open ? "mobileDrawer open" : "mobileDrawer"} aria-hidden={!open}>
        <div className="mobileDrawerHeader">
          <p className="eyebrow">Novessa Foundation</p>
          <button
            aria-label="Close navigation menu"
            className="navIconButton"
            onClick={() => setOpen(false)}
            type="button"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mobileDrawerBody">
          {navigationLinks.map((item) => (
            <Link
              className={currentHref.startsWith(item.href) && item.href !== "/" ? "mobileDrawerLink active" : "mobileDrawerLink"}
              href={item.href}
              key={item.href}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="mobileDrawerPromo">
          <p className="eyebrow">Our Mission in Action</p>
          <h3>Join the movement building healthier, more hopeful communities.</h3>
          <ul>
            {drawerPreview.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
          <Link className="button buttonPrimary mobileDrawerCta" href="/donate" onClick={() => setOpen(false)}>
            <Heart size={16} /> Donate Now
          </Link>
          <div className="mobileDrawerMeta">
            <a href="https://instagram.com/novessafoundation" rel="noreferrer" target="_blank">
              Instagram
            </a>
            <a href={`mailto:${"hello@novessafoundation.org"}`}>Email</a>
            <a href={`tel:${"+2349075550144"}`}>
              <Phone size={14} /> Call
            </a>
          </div>
        </div>

        <div className="mobileDrawerBottomNav">
          {mobileNavigationLinks.map((item) => (
            <Link
              className={currentHref === item.href ? "mobileMiniNavLink active" : "mobileMiniNavLink"}
              href={item.href}
              key={item.href}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </aside>
    </>
  );
}
