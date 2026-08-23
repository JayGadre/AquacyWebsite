const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const productUrls = [
  { id: 'ds-trp', url: 'https://www.admmeters.com/product/ds-trp/' },
  { id: 'ds-asd', url: 'https://www.admmeters.com/product/ds-asd-asd-g/' },
  { id: 'composite-ds-trp', url: 'https://www.admmeters.com/product/composite-ds-trp/' },
  { id: 'electo-sonic', url: 'https://www.admmeters.com/product/electo-sonic/' },
  { id: 'wmap-evo', url: 'https://www.admmeters.com/product/wmap-evo/' },
  { id: 'e-bulk', url: 'https://www.admmeters.com/product/e-bulk/' },
  { id: 'wt', url: 'https://www.admmeters.com/product/wt/' }
];

async function fetchProducts() {
  const products = [];
  
  for (const { id, url } of productUrls) {
    console.log(`Fetching ${url}...`);
    try {
      const response = await fetch(url);
      const html = await response.text();
      const $ = cheerio.load(html);
      
      const title = $('.product-name h3').text().trim();
      const subtitle = $('.product-name h4').text().trim();
      
      const descParagraphs = [];
      $('.product-dtl > p').each((i, el) => {
        descParagraphs.push($(el).text().trim());
      });
      const description = descParagraphs.join('\n\n');
      
      const features = [];
      $('.product_characteristics_text').parent().next().find('ul li').each((i, el) => {
        features.push($(el).text().trim());
      });
      
      const brochures = [];
      $('.brochur_link').each((i, el) => {
        brochures.push({
          title: $(el).text().trim(),
          url: $(el).attr('href')
        });
      });
      
      products.push({
        id,
        title,
        subtitle,
        description,
        features,
        brochures
      });
    } catch (e) {
      console.error(`Failed to fetch ${id}: ${e}`);
    }
  }
  
  const targetDir = path.join(__dirname, 'src', 'data');
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  
  fs.writeFileSync(
    path.join(targetDir, 'products.json'),
    JSON.stringify(products, null, 2)
  );
  
  console.log('Saved to src/data/products.json');
}

fetchProducts();
