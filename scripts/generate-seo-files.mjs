
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Since this is an ES module, we need to derive __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// We need to temporarily modify the require context for our script to import project files
// This is a common pattern when running scripts in a mixed module environment.
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// Resolve paths relative to the project root
const projectRoot = path.resolve(__dirname, '..');
const publicDir = path.join(projectRoot, 'public');
const sitemapPath = path.join(publicDir, 'sitemap.xml');
const robotsPath = path.join(publicDir, 'robots.txt');

// Configure path aliases to match vite.config.ts
// This allows the script to understand imports like '@/lib/sitemap'
import { reconfigure } from 'reconfigure';
reconfigure({
  '@': path.join(projectRoot, 'src'),
});

// Now, we can import our sitemap generation logic
const { generateSitemapXML, generateRobotsTxt } = require('@/lib/sitemap');

// --- Main Script Logic ---
console.log('Generating SEO files...');

// Ensure public directory exists
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Generate and write sitemap.xml
try {
  const sitemapXML = generateSitemapXML();
  fs.writeFileSync(sitemapPath, sitemapXML);
  console.log(`✅ Successfully generated sitemap.xml at ${sitemapPath}`);
} catch (error) {
  console.error('❌ Error generating sitemap.xml:', error);
}

// Generate and write robots.txt
try {
  const robotsTxt = generateRobotsTxt();
  fs.writeFileSync(robotsPath, robotsTxt);
  console.log(`✅ Successfully generated robots.txt at ${robotsPath}`);
} catch (error) {
  console.error('❌ Error generating robots.txt:', error);
}

console.log('SEO file generation complete.');

// We need a small package to handle path alias resolution in a Node script.
// Add `reconfigure` to devDependencies.
// npm install reconfigure --save-dev
