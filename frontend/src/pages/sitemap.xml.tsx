import type { GetServerSideProps } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://blog.doctorpok.io";

type Entry = { loc: string; lastmod?: string; changefreq: string; priority: string };

function buildXml(entries: Entry[]): string {
  const urls = entries
    .map(
      (e) => `  <url>
    <loc>${e.loc}</loc>${e.lastmod ? `\n    <lastmod>${e.lastmod}</lastmod>` : ""}
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority}</priority>
  </url>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemap.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  // Pull slugs from Strapi. Adjust the field names to your content types.
  const [posts, categories, tags] = await Promise.all([
    fetch(`${process.env.API_URL}/api/posts?fields[0]=slug&fields[1]=updatedAt&pagination[limit]=1000`).then((r) => r.json()),
    fetch(`${process.env.API_URL}/api/categories?fields[0]=slug&pagination[limit]=200`).then((r) => r.json()),
    fetch(`${process.env.API_URL}/api/tags?fields[0]=slug&pagination[limit]=500`).then((r) => r.json()),
  ]);

  const entries: Entry[] = [
    { loc: `${SITE_URL}/`, changefreq: "daily", priority: "1.0" },
    { loc: `${SITE_URL}/articles`, changefreq: "daily", priority: "0.9" },
    ...(posts?.data ?? []).map((p: any) => ({
      loc: `${SITE_URL}/posts/${p.attributes?.slug ?? p.slug}`,
      lastmod: (p.attributes?.updatedAt ?? p.updatedAt)?.slice(0, 10),
      changefreq: "monthly",
      priority: "0.8",
    })),
    ...(categories?.data ?? []).map((c: any) => ({
      loc: `${SITE_URL}/categories/${c.attributes?.slug ?? c.slug}`,
      changefreq: "weekly",
      priority: "0.6",
    })),
    ...(tags?.data ?? []).map((t: any) => ({
      loc: `${SITE_URL}/tags/${t.attributes?.slug ?? t.slug}`,
      changefreq: "weekly",
      priority: "0.4",
    })),
  ];

  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  // Cache at the edge for an hour, serve stale while revalidating for a day.
  res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400");
  res.write(buildXml(entries));
  res.end();

  return { props: {} };
};

export default function Sitemap() {
  return null;
}
