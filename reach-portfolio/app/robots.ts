import type { MetadataRoute } from "next";
import { isPublished, siteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return isPublished
    ? {
        rules: { userAgent: "*", allow: "/" },
        sitemap: `${siteUrl}/sitemap.xml`,
      }
    : { rules: { userAgent: "*", disallow: "/" } };
}
