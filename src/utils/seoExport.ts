
import { generateSitemapXML, generateRobotsTxt, generateSEOStats } from '@/lib/sitemap';

export function downloadSitemap() {
  const sitemapXML = generateSitemapXML();
  const blob = new Blob([sitemapXML], { type: 'application/xml' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = 'sitemap.xml';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function downloadRobotsTxt() {
  const robotsTxt = generateRobotsTxt();
  const blob = new Blob([robotsTxt], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = 'robots.txt';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function logSEOStats() {
  const stats = generateSEOStats();
  console.table(stats);
  return stats;
}

// Console commands for development
if (typeof window !== 'undefined') {
  (window as any).seoUtils = {
    downloadSitemap,
    downloadRobotsTxt,
    logSEOStats
  };
}
