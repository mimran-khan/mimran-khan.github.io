import sharp from 'sharp';
import { writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');

const blogOgSvg = `
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="glow" cx="50%" cy="40%" r="50%">
      <stop offset="0%" stop-color="rgba(63,185,80,0.12)"/>
      <stop offset="100%" stop-color="transparent"/>
    </radialGradient>
  </defs>
  
  <rect width="1200" height="630" fill="#080c10"/>
  
  <!-- Grid -->
  <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
    <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(63,185,80,0.04)" stroke-width="0.5"/>
  </pattern>
  <rect width="1200" height="630" fill="url(#grid)"/>
  
  <!-- Center glow -->
  <circle cx="600" cy="260" r="300" fill="url(#glow)"/>
  
  <!-- Agent network -->
  <!-- L1 Orchestrator -->
  <circle cx="600" cy="200" r="40" fill="rgba(63,185,80,0.08)" stroke="rgb(63,185,80)" stroke-width="2"/>
  <circle cx="600" cy="200" r="30" fill="rgba(63,185,80,0.04)" stroke="rgba(63,185,80,0.5)" stroke-width="1"/>
  <text x="600" y="196" text-anchor="middle" fill="rgb(63,185,80)" font-size="16" font-family="monospace" font-weight="700">ORCH</text>
  <text x="600" y="214" text-anchor="middle" fill="rgba(63,185,80,0.5)" font-size="10" font-family="monospace">orchestrator</text>
  
  <!-- L2 Supervisors -->
  <rect x="250" y="310" width="130" height="45" rx="10" fill="rgba(57,211,213,0.06)" stroke="rgb(57,211,213)" stroke-width="1.5"/>
  <text x="315" y="338" text-anchor="middle" fill="rgb(57,211,213)" font-size="14" font-family="monospace" font-weight="600">Code</text>
  
  <rect x="535" y="320" width="130" height="45" rx="10" fill="rgba(57,211,213,0.06)" stroke="rgb(57,211,213)" stroke-width="1.5"/>
  <text x="600" y="348" text-anchor="middle" fill="rgb(57,211,213)" font-size="14" font-family="monospace" font-weight="600">Review</text>
  
  <rect x="820" y="310" width="130" height="45" rx="10" fill="rgba(57,211,213,0.06)" stroke="rgb(57,211,213)" stroke-width="1.5"/>
  <text x="885" y="338" text-anchor="middle" fill="rgb(57,211,213)" font-size="14" font-family="monospace" font-weight="600">Deploy</text>
  
  <!-- Connections -->
  <line x1="570" y1="230" x2="350" y2="310" stroke="rgba(63,185,80,0.3)" stroke-width="1.2" stroke-dasharray="8,5"/>
  <line x1="600" y1="240" x2="600" y2="320" stroke="rgba(63,185,80,0.3)" stroke-width="1.2" stroke-dasharray="8,5"/>
  <line x1="630" y1="230" x2="850" y2="310" stroke="rgba(63,185,80,0.3)" stroke-width="1.2" stroke-dasharray="8,5"/>
  
  <!-- Judges -->
  <rect x="420" y="260" width="70" height="28" rx="6" fill="rgba(210,153,34,0.08)" stroke="rgb(210,153,34)" stroke-width="1"/>
  <text x="455" y="279" text-anchor="middle" fill="rgb(210,153,34)" font-size="11" font-family="monospace">Judge</text>
  <rect x="710" y="260" width="70" height="28" rx="6" fill="rgba(210,153,34,0.08)" stroke="rgb(210,153,34)" stroke-width="1"/>
  <text x="745" y="279" text-anchor="middle" fill="rgb(210,153,34)" font-size="11" font-family="monospace">Judge</text>
  
  <!-- L3 Workers (subtle) -->
  <rect x="210" y="385" width="60" height="24" rx="4" fill="rgba(139,148,158,0.04)" stroke="rgba(139,148,158,0.2)" stroke-width="0.7"/>
  <text x="240" y="401" text-anchor="middle" fill="rgba(139,148,158,0.5)" font-size="9" font-family="monospace">Arch</text>
  <rect x="285" y="385" width="60" height="24" rx="4" fill="rgba(139,148,158,0.04)" stroke="rgba(139,148,158,0.2)" stroke-width="0.7"/>
  <text x="315" y="401" text-anchor="middle" fill="rgba(139,148,158,0.5)" font-size="9" font-family="monospace">Impl</text>
  <rect x="360" y="385" width="60" height="24" rx="4" fill="rgba(139,148,158,0.04)" stroke="rgba(139,148,158,0.2)" stroke-width="0.7"/>
  <text x="390" y="401" text-anchor="middle" fill="rgba(139,148,158,0.5)" font-size="9" font-family="monospace">Test</text>
  
  <rect x="500" y="390" width="55" height="24" rx="4" fill="rgba(139,148,158,0.04)" stroke="rgba(139,148,158,0.2)" stroke-width="0.7"/>
  <text x="527" y="406" text-anchor="middle" fill="rgba(139,148,158,0.5)" font-size="9" font-family="monospace">Sec</text>
  <rect x="570" y="390" width="55" height="24" rx="4" fill="rgba(139,148,158,0.04)" stroke="rgba(139,148,158,0.2)" stroke-width="0.7"/>
  <text x="597" y="406" text-anchor="middle" fill="rgba(139,148,158,0.5)" font-size="9" font-family="monospace">Perf</text>
  <rect x="640" y="390" width="55" height="24" rx="4" fill="rgba(139,148,158,0.04)" stroke="rgba(139,148,158,0.2)" stroke-width="0.7"/>
  <text x="667" y="406" text-anchor="middle" fill="rgba(139,148,158,0.5)" font-size="9" font-family="monospace">Style</text>
  
  <rect x="785" y="385" width="60" height="24" rx="4" fill="rgba(139,148,158,0.04)" stroke="rgba(139,148,158,0.2)" stroke-width="0.7"/>
  <text x="815" y="401" text-anchor="middle" fill="rgba(139,148,158,0.5)" font-size="9" font-family="monospace">Build</text>
  <rect x="860" y="385" width="60" height="24" rx="4" fill="rgba(139,148,158,0.04)" stroke="rgba(139,148,158,0.2)" stroke-width="0.7"/>
  <text x="890" y="401" text-anchor="middle" fill="rgba(139,148,158,0.5)" font-size="9" font-family="monospace">Mon</text>
  <rect x="935" y="385" width="70" height="24" rx="4" fill="rgba(139,148,158,0.04)" stroke="rgba(139,148,158,0.2)" stroke-width="0.7"/>
  <text x="970" y="401" text-anchor="middle" fill="rgba(139,148,158,0.5)" font-size="9" font-family="monospace">Rollback</text>
  
  <!-- Worker connections -->
  <line x1="280" y1="355" x2="240" y2="385" stroke="rgba(139,148,158,0.1)" stroke-width="0.6"/>
  <line x1="315" y1="355" x2="315" y2="385" stroke="rgba(139,148,158,0.1)" stroke-width="0.6"/>
  <line x1="350" y1="355" x2="390" y2="385" stroke="rgba(139,148,158,0.1)" stroke-width="0.6"/>
  <line x1="565" y1="365" x2="527" y2="390" stroke="rgba(139,148,158,0.1)" stroke-width="0.6"/>
  <line x1="600" y1="365" x2="597" y2="390" stroke="rgba(139,148,158,0.1)" stroke-width="0.6"/>
  <line x1="635" y1="365" x2="667" y2="390" stroke="rgba(139,148,158,0.1)" stroke-width="0.6"/>
  <line x1="850" y1="355" x2="815" y2="385" stroke="rgba(139,148,158,0.1)" stroke-width="0.6"/>
  <line x1="885" y1="355" x2="890" y2="385" stroke="rgba(139,148,158,0.1)" stroke-width="0.6"/>
  <line x1="920" y1="355" x2="970" y2="385" stroke="rgba(139,148,158,0.1)" stroke-width="0.6"/>
  
  <!-- MCP bar -->
  <rect x="170" y="440" width="860" height="24" rx="5" fill="rgba(63,185,80,0.02)" stroke="rgba(63,185,80,0.1)" stroke-width="0.6"/>
  <text x="600" y="456" text-anchor="middle" fill="rgba(63,185,80,0.25)" font-size="10" font-family="monospace">MCP Servers: GitHub / Filesystem / Database / CI-CD / Slack / Monitoring / Security</text>
  
  <!-- Layer labels -->
  <text x="160" y="205" text-anchor="end" fill="rgba(63,185,80,0.25)" font-size="12" font-family="monospace">L1</text>
  <text x="160" y="340" text-anchor="end" fill="rgba(57,211,213,0.25)" font-size="12" font-family="monospace">L2</text>
  <text x="160" y="400" text-anchor="end" fill="rgba(139,148,158,0.25)" font-size="12" font-family="monospace">L3</text>

  <!-- Particles -->
  <circle cx="450" cy="160" r="2" fill="rgba(63,185,80,0.3)"/>
  <circle cx="780" cy="180" r="1.5" fill="rgba(57,211,213,0.25)"/>
  <circle cx="350" cy="250" r="1.5" fill="rgba(210,153,34,0.2)"/>
  <circle cx="900" cy="240" r="1.2" fill="rgba(63,185,80,0.2)"/>
  
  <!-- Title text -->
  <text x="600" y="100" text-anchor="middle" fill="rgba(63,185,80,0.08)" font-size="16" font-family="monospace" letter-spacing="10">HIERARCHICAL AGENT ARCHITECTURE</text>
  
  <!-- Bottom bar -->
  <rect x="0" y="490" width="1200" height="140" fill="rgba(0,0,0,0.6)"/>
  <rect x="0" y="490" width="1200" height="1" fill="rgba(63,185,80,0.2)"/>
  
  <text x="80" y="540" font-family="monospace" font-size="16" fill="rgb(63,185,80)">$ cat blog.md</text>
  <text x="80" y="578" font-family="system-ui, -apple-system, sans-serif" font-size="34" font-weight="700" fill="#f0f6fc">Agents All the Way Down</text>
  <text x="80" y="610" font-family="system-ui, -apple-system, sans-serif" font-size="18" fill="#8b949e">The Architecture Nobody Talks About</text>
  
  <text x="1120" y="610" text-anchor="end" font-family="monospace" font-size="14" fill="rgb(63,185,80)">mimran-khan.github.io</text>
  
  <!-- Red Hat accent bar -->
  <rect x="80" y="490" width="80" height="3" rx="1.5" fill="#EE0000"/>
</svg>`;

const defaultOgSvg = `
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#0d1117"/>
  
  <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
    <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(63,185,80,0.04)" stroke-width="0.5"/>
  </pattern>
  <rect width="1200" height="630" fill="url(#grid)"/>
  
  <text x="80" y="200" font-family="monospace" font-size="22" fill="#3fb950">$ whoami</text>
  <text x="80" y="290" font-family="system-ui, -apple-system, sans-serif" font-size="64" font-weight="700" fill="#f0f6fc">Imran Khan</text>
  <text x="80" y="350" font-family="system-ui, -apple-system, sans-serif" font-size="30" fill="#8b949e">Senior ML Engineer @ Red Hat</text>
  
  <text x="80" y="430" font-family="monospace" font-size="20" fill="#3fb950">&gt;</text>
  <text x="115" y="430" font-family="monospace" font-size="20" fill="#f0f6fc">Agentic AI &amp; Multi-Agent Systems</text>
  <text x="80" y="465" font-family="monospace" font-size="20" fill="#3fb950">&gt;</text>
  <text x="115" y="465" font-family="monospace" font-size="20" fill="#f0f6fc">RAG Pipelines &amp; LLM Applications</text>
  <text x="80" y="500" font-family="monospace" font-size="20" fill="#3fb950">&gt;</text>
  <text x="115" y="500" font-family="monospace" font-size="20" fill="#f0f6fc">PhD Scholar | IIT Kanpur | BITS Pilani</text>
  
  <rect x="80" y="555" width="100" height="4" rx="2" fill="#EE0000"/>
  <text x="1120" y="595" font-family="monospace" font-size="18" fill="#3fb950" text-anchor="end">mimran-khan.github.io</text>
</svg>`;

async function generate(svg, filename) {
  const buf = Buffer.from(svg);
  await sharp(buf).png({ quality: 90 }).toFile(join(publicDir, filename));
  console.log(`Generated ${filename}`);
}

await generate(blogOgSvg, 'og-blog-agents.png');
await generate(defaultOgSvg, 'og-default.png');
console.log('Done');
