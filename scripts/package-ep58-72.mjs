#!/usr/bin/env node
/**
 * Package EP58-72 onto release/epNN branches + append manifest entries.
 * Run from site-staging repo root.
 */
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const STAGING = process.cwd();
const PUBLIC = path.resolve(STAGING, '../mimran-khan.github.io');
const PLAN = JSON.parse(fs.readFileSync(path.join(PUBLIC, 'episode-plan-ep58-72.json'), 'utf8'));
const PUBLIC_EPS = JSON.parse(fs.readFileSync(path.join(PUBLIC, 'src/data/episodes.json'), 'utf8'));
const LINKEDIN_MD = fs.readFileSync(path.join(PUBLIC, 'linkedin-posts-ep58-72.md'), 'utf8');

function sh(cmd, opts = {}) {
  console.log(`$ ${cmd}`);
  return execSync(cmd, { stdio: 'pipe', encoding: 'utf8', ...opts });
}

function linkedInPost(ep) {
  const parts = LINKEDIN_MD.split(/\n---\n/);
  for (const p of parts) {
    const t = p.trim();
    if (t.startsWith(`Episode ${ep}:`)) return t;
  }
  throw new Error(`Missing LinkedIn post for EP${ep}`);
}

function epMeta(n) {
  const plan = PLAN.episodes.find((e) => e.ep === n);
  const pub = PUBLIC_EPS.find((e) => e.number === n);
  if (!plan || !pub) throw new Error(`Missing plan/public meta for EP${n}`);
  return {
    ep: n,
    branch: `release/ep${String(n).padStart(2, '0')}`,
    slug: plan.slug,
    title: plan.title,
    hook: pub.hook,
    category: plan.category,
    day: plan.day,
    date: pub.date,
    readTime: pub.readTime || '5 min',
    image: plan.image || pub.image,
    release_date: plan.release_date,
    linkedin_post: linkedInPost(n),
  };
}

function copyFile(src, dest) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
}

function buildEpisodesJson(currentEp, nextEp) {
  const base = JSON.parse(fs.readFileSync(path.join(STAGING, 'src/data/episodes.json'), 'utf8'));
  // Drop any existing entries >= currentEp then append current (+ next)
  const kept = base.filter((e) => e.number < currentEp.ep);
  const cur = {
    number: currentEp.ep,
    slug: currentEp.slug,
    title: currentEp.title,
    hook: currentEp.hook,
    category: currentEp.category,
    day: currentEp.day,
    date: currentEp.date,
    readTime: currentEp.readTime,
    published: true,
    image: currentEp.image,
  };
  kept.push(cur);
  if (nextEp) {
    kept.push({
      number: nextEp.ep,
      slug: nextEp.slug,
      title: nextEp.title,
      hook: nextEp.hook,
      category: nextEp.category,
      day: nextEp.day,
      date: nextEp.date,
      readTime: nextEp.readTime,
      published: false,
      image: nextEp.image,
    });
  }
  kept.sort((a, b) => a.number - b.number);
  fs.writeFileSync(
    path.join(STAGING, 'src/data/episodes.json'),
    JSON.stringify(kept, null, 2) + '\n'
  );
}

function packageOne(meta, nextMeta, { includeSitewide }) {
  const branch = meta.branch;
  sh('git checkout main');
  sh('git reset --hard origin/main');
  // delete local branch if exists
  try {
    sh(`git branch -D ${branch}`);
  } catch {
    /* ok */
  }
  sh(`git checkout -b ${branch}`);

  const slug = meta.slug;
  const n = meta.ep;
  const nn = String(n).padStart(2, '0');

  copyFile(
    path.join(PUBLIC, `src/pages/series/demystifying-ai/${slug}.astro`),
    path.join(STAGING, `src/pages/series/demystifying-ai/${slug}.astro`)
  );
  copyFile(
    path.join(PUBLIC, `public/series/ep${nn}-${slug}.png`),
    path.join(STAGING, `public/series/ep${nn}-${slug}.png`)
  );
  copyFile(
    path.join(PUBLIC, `public/og-series-ep${nn}-${slug}.png`),
    path.join(STAGING, `public/og-series-ep${nn}-${slug}.png`)
  );

  if (includeSitewide) {
    copyFile(
      path.join(PUBLIC, 'src/pages/index.astro'),
      path.join(STAGING, 'src/pages/index.astro')
    );
    copyFile(
      path.join(PUBLIC, 'src/pages/series/demystifying-ai/index.astro'),
      path.join(STAGING, 'src/pages/series/demystifying-ai/index.astro')
    );
  }

  buildEpisodesJson(meta, nextMeta);

  sh(`git add src/pages/series/demystifying-ai/${slug}.astro public/series/ep${nn}-${slug}.png public/og-series-ep${nn}-${slug}.png src/data/episodes.json`);
  if (includeSitewide) {
    sh('git add src/pages/index.astro src/pages/series/demystifying-ai/index.astro');
  }

  const msg = includeSitewide
    ? `feat: package EP${n} ${slug} + series-complete UI (72 total)`
    : `feat: package EP${n} ${slug}`;
  sh(`git commit -m "$(cat <<'EOF'
${msg}

EOF
)"`);
}

function updateManifest(metas) {
  sh('git checkout main');
  sh('git reset --hard origin/main');
  const manifest = JSON.parse(fs.readFileSync(path.join(STAGING, 'manifest.json'), 'utf8'));
  const existing = new Set(manifest.episodes.map((e) => e.ep));
  for (const [i, meta] of metas.entries()) {
    if (existing.has(meta.ep)) {
      console.log(`manifest already has EP${meta.ep}, skipping append`);
      continue;
    }
    manifest.episodes.push({
      ep: meta.ep,
      branch: meta.branch,
      slug: meta.slug,
      title: meta.title,
      status: i === 0 ? 'pending' : 'queued',
      release_date: meta.release_date,
      linkedin_post: meta.linkedin_post,
    });
  }
  fs.writeFileSync(path.join(STAGING, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
  sh('git add manifest.json');
  sh(`git commit -m "$(cat <<'EOF'
chore: queue EP58-72 into release train (EP58 pending, EP59-72 queued)

EOF
)"`);
}

function preflightLocal(meta) {
  const nn = String(meta.ep).padStart(2, '0');
  const checks = [
    `src/pages/series/demystifying-ai/${meta.slug}.astro`,
    `public/series/ep${nn}-${meta.slug}.png`,
    `public/og-series-ep${nn}-${meta.slug}.png`,
    'src/data/episodes.json',
  ];
  for (const f of checks) {
    if (!fs.existsSync(path.join(STAGING, f))) throw new Error(`preflight missing ${f} on ${meta.branch}`);
  }
  // no articles/ or images/
  if (fs.existsSync(path.join(STAGING, 'articles'))) throw new Error('stale articles/');
  if (fs.existsSync(path.join(STAGING, 'images'))) throw new Error('stale images/');
  const eps = JSON.parse(fs.readFileSync(path.join(STAGING, 'src/data/episodes.json'), 'utf8'));
  const cur = eps.find((e) => e.number === meta.ep);
  if (!cur || !cur.published) throw new Error(`EP${meta.ep} not published=true in branch episodes.json`);
  console.log(`preflight OK ${meta.branch}`);
}

const metas = [];
for (let n = 58; n <= 72; n++) metas.push(epMeta(n));

console.log('Packaging', metas.map((m) => m.ep).join(', '));

for (let i = 0; i < metas.length; i++) {
  const meta = metas[i];
  const next = metas[i + 1] || null;
  console.log(`\n==== ${meta.branch} ====`);
  packageOne(meta, next, { includeSitewide: meta.ep === 58 });
  preflightLocal(meta);
}

console.log('\n==== manifest on main ====');
updateManifest(metas);

console.log('\nDone packaging locally. Push separately.');
console.log(
  metas
    .map((m, i) => `${m.branch} ${i === 0 ? 'pending' : 'queued'} ${m.release_date}`)
    .join('\n')
);
