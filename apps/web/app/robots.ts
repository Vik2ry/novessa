import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://novessafoundation.org.ng";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/donate/success", "/donate/error", "/donate/payment", "/volunteer/success"]
    },
    sitemap: `${siteUrl}/sitemap.xml`
  };
}
