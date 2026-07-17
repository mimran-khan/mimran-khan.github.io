import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

const episodes = JSON.parse(readFileSync(resolve(root, 'src/data/episodes.json'), 'utf-8'));
const BASE = 'https://mimran-khan.github.io';
const today = new Date().toISOString().slice(0, 10);

const blogUrls = [
  { loc: '/blog/loop-engineering', lastmod: '2026-07-04', changefreq: 'monthly', priority: '0.8' },
  { loc: '/blog/agents-all-the-way-down', lastmod: '2026-04-29', changefreq: 'monthly', priority: '0.8' },
  { loc: '/blog/deltaforge', lastmod: '2026-06-05', changefreq: 'monthly', priority: '0.8' },
];

const publishedEps = episodes.filter(ep => ep.published);

const dateFromEp = (ep) => {
  const months = { Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06', Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12' };
  const [mon, day] = ep.date.split(' ');
  return `2026-${months[mon]}-${day.padStart(2, '0')}`;
};

const episodeUrls = publishedEps.map(ep => ({
  loc: `/series/demystifying-ai/${ep.slug}`,
  lastmod: dateFromEp(ep),
  changefreq: 'monthly',
  priority: '0.8',
}));

const allUrls = [
  { loc: '/', lastmod: today, changefreq: 'weekly', priority: '1.0' },
  ...blogUrls,
  { loc: '/series/demystifying-ai', lastmod: today, changefreq: 'weekly', priority: '0.9' },
  ...episodeUrls,
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(u => `  <url>
    <loc>${BASE}${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>
`;

writeFileSync(resolve(root, 'public/sitemap.xml'), xml);
console.log(`Sitemap generated: ${allUrls.length} URLs (${blogUrls.length} blogs, ${publishedEps.length} episodes).`);
