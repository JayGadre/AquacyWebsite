const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const workspacePath = 'd:/Coding Projects/AquacyWebsite/Aquacy_New_Website';
const buildPath = path.join(workspacePath, '.next/server/app');

function verifyCatalogPage() {
  console.log('--- Verifying Catalog Page ---');
  const catalogHtmlPath = path.join(buildPath, 'catalog.html');
  if (!fs.existsSync(catalogHtmlPath)) {
    console.error('❌ catalog.html not found!');
    return false;
  }

  const html = fs.readFileSync(catalogHtmlPath, 'utf8');
  const $ = cheerio.load(html);

  // 1. Verify JSON-LD
  const scripts = $('script[type="application/ld+json"]');
  let foundItemList = false;
  scripts.each((i, el) => {
    try {
      const json = JSON.parse($(el).html());
      if (json['@type'] === 'ItemList') {
        foundItemList = true;
        console.log('✅ JSON-LD ItemList found. Items count:', json.itemListElement.length);
        if (json.itemListElement.length === 0) {
          console.error('❌ ItemList is empty.');
        }
      }
    } catch (e) {
      // ignore parse error for other scripts
    }
  });
  if (!foundItemList) {
    console.error('❌ JSON-LD ItemList not found in catalog.html');
  }

  // 2. Verify Responsive Grid
  const gridContainer = $('.grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-3');
  if (gridContainer.length > 0) {
    console.log('✅ Responsive grid classes found on container.');
  } else {
    console.error('❌ Responsive grid classes NOT found.');
  }

  // 3. Verify Glassmorphism
  const glassCards = $('.glass-card');
  if (glassCards.length > 0) {
    console.log('✅ Glassmorphism (.glass-card) classes applied to products. Count:', glassCards.length);
  } else {
    console.error('❌ .glass-card class not found on products.');
  }

  // 4. Verify explicit :focus-visible in CSS
  const cssPath = path.join(workspacePath, 'src/app/globals.css');
  const cssContent = fs.readFileSync(cssPath, 'utf8');
  if (cssContent.includes(':focus-visible')) {
    console.log('✅ :focus-visible styles found in globals.css.');
  } else {
    console.error('❌ :focus-visible styles NOT found in globals.css.');
  }

  return true;
}

verifyCatalogPage();
