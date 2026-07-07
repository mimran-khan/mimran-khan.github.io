import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

const episodes = JSON.parse(readFileSync(resolve(root, 'src/data/episodes.json'), 'utf-8'));
const BASE = 'https://mimran-khan.github.io';

const staticUrls = [
  { loc: '/', lastmod: new Date().toISOString().slice(0, 10), changefreq: 'weekly', priority: '1.0' },
  { loc: '/blog/loop-engineering', lastmod: '2026-07-04', changefreq: 'monthly', priority: '0.8' },
  { loc: '/blog/agents-all-the-way-down', lastmod: '2026-04-29', changefreq: 'monthly', priority: '0.8' },
  { loc: '/blog/deltaforge', lastmod: '2026-06-05', changefreq: 'monthly', priority: '0.8' },
  { loc: '/blog/claude-code-source', lastmod: '2026-03-31', changefreq: 'monthly', priority: '0.8' },
];

const publishedEps = episodes.filter(ep => ep.published);

const seriesLastmod = publishedEps.length > 0
  ? new Date().toISOString().slice(0, 10)
  : '2026-07-06';

const seriesUrls = [
  { loc: '/series/demystifying-ai', lastmod: seriesLastmod, changefreq: 'weekly', priority: '0.9' },
];

const dateFromEp = (ep) => {
  const months = { Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06', Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12' };
  const [mon, day] = ep.date.split(' ');
  return `2026-${months[mon]}-${day.padStart(2, '0')}`;
};

for (const ep of publishedEps) {
  seriesUrls.push({
    loc: `/series/demystifying-ai/${ep.slug}`,
    lastmod: dateFromEp(ep),
    changefreq: 'monthly',
    priority: '0.8',
  });
}

const allUrls = [...staticUrls, ...seriesUrls];

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
console.log(`Sitemap generated with ${allUrls.length} URLs (${publishedEps.length} episodes).`);
