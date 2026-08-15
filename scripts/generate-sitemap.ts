// Runs before `vite dev` and `vite build` (predev/prebuild hooks); writes public/sitemap.xml.

import { writeFileSync } from "fs";
import { resolve } from "path";

// Matches the domain used in public/robots.txt and the index.html canonical tag.
const BASE_URL = "https://wulardata.com";

interface SitemapEntry {
  path: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

// Public, indexable routes only. Omit /not-found, /lovable, auth, portal and
// admin (authenticated/internal) routes — these should not be indexed.
const entries: SitemapEntry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/data-center-services", changefreq: "monthly", priority: "0.9" },
  { path: "/data-center-services/dedicated-servers", changefreq: "monthly", priority: "0.8" },
  { path: "/data-center-services/vps", changefreq: "monthly", priority: "0.8" },
  { path: "/data-center-services/application-hosting", changefreq: "monthly", priority: "0.8" },
  { path: "/data-center-services/database-hosting", changefreq: "monthly", priority: "0.8" },
  { path: "/data-center-services/storage-provisioning", changefreq: "monthly", priority: "0.8" },
  { path: "/data-center-services/backup-and-dr", changefreq: "monthly", priority: "0.8" },
  { path: "/hosting-services", changefreq: "monthly", priority: "0.9" },
  { path: "/it-infrastructure", changefreq: "monthly", priority: "0.9" },
  { path: "/about", changefreq: "yearly", priority: "0.5" },
  { path: "/contact", changefreq: "yearly", priority: "0.5" },
];

function generateSitemap(entries: SitemapEntry[]) {
  const urls = entries.map((e) =>
    [
      `  <url>`,
      `    <loc>${BASE_URL}${e.path}</loc>`,
      e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
      e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
      e.priority ? `    <priority>${e.priority}</priority>` : null,
      `  </url>`,
    ]
      .filter(Boolean)
      .join("\n"),
  );

  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...urls,
    `</urlset>`,
  ].join("\n");
}

writeFileSync(resolve("public/sitemap.xml"), generateSitemap(entries));
console.log(`sitemap.xml written (${entries.length} entries)`);
