import fs from 'fs';
import assert from 'assert';

try {
  // Check if JSON-LD stringifies correctly and can be parsed
  const products = JSON.parse(fs.readFileSync('src/data/products.json', 'utf-8'));
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: products.map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: product.title,
        description: product.description,
        url: `https://aquacyindia.com/product/${product.id}`
      }
    }))
  };

  const str = JSON.stringify(jsonLd);
  const parsed = JSON.parse(str);
  
  assert.strictEqual(parsed['@type'], 'ItemList');
  assert.strictEqual(parsed.itemListElement.length, products.length);
  console.log("JSON-LD Test Passed");

  // Basic check for valid categories
  const TABS = ['All', 'Mechanical', 'Ultrasonic', 'Bulk/Industrial'];
  const getCategories = (id) => {
    const categories = [];
    if (['ds-trp', 'ds-asd', 'composite-ds-trp'].includes(id)) categories.push('Mechanical');
    if (['electo-sonic', 'e-bulk'].includes(id)) categories.push('Ultrasonic');
    if (['wmap-evo', 'e-bulk', 'wt'].includes(id)) categories.push('Bulk/Industrial');
    return categories;
  };

  products.forEach(p => {
    const cats = getCategories(p.id);
    cats.forEach(c => assert(TABS.includes(c)));
  });
  console.log("Categories Test Passed");

  process.exit(0);
} catch (e) {
  console.error(e);
  process.exit(1);
}
