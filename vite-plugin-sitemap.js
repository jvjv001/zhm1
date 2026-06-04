// 自定义Vite插件：构建时生成sitemap.xml
export default function sitemapPlugin() {
  return {
    name: 'vite-plugin-sitemap',
    apply: 'build',
    writeBundle(options, bundle) {
      const baseUrl = 'https://jvjv09.pages.dev';
      const pages = [
        { path: '/', lastmod: new Date().toISOString().split('T')[0], priority: '1.0', changefreq: 'weekly' },
        { path: '/', lastmod: new Date().toISOString().split('T')[0], priority: '0.9', changefreq: 'weekly' }, // 主页面
        { path: '/', lastmod: new Date().toISOString().split('T')[0], priority: '0.8', changefreq: 'weekly' },
        { path: '/', lastmod: new Date().toISOString().split('T')[0], priority: '0.8', changefreq: 'weekly' },
        { path: '/', lastmod: new Date().toISOString().split('T')[0], priority: '0.8', changefreq: 'weekly' },
        { path: '/', lastmod: new Date().toISOString().split('T')[0], priority: '0.7', changefreq: 'monthly' }
      ];

      const uniquePages = pages.reduce((acc, curr) => {
        if (!acc.find(p => p.path === curr.path)) {
          acc.push(curr);
        }
        return acc;
      }, []);

      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${uniquePages.map(page => `  <url>
    <loc>${baseUrl}${page.path}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

      // 由于Vite插件API限制，我们手动生成sitemap文件
      const fs = require('fs');
      const path = require('path');
      const distDir = path.resolve(process.cwd(), 'dist');
      
      if (!fs.existsSync(distDir)) {
        fs.mkdirSync(distDir, { recursive: true });
      }
      
      fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemap, 'utf-8');
      console.log('✅ sitemap.xml 已生成');
    }
  };
}
