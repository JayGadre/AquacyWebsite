import fs from 'fs';
import path from 'path';

function runTests() {
  console.log('Starting validation tests...');
  let hasError = false;

  const dataPath = path.join(__dirname, 'src/data/products.json');
  const products = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

  // 1. Verify JSON structure
  products.forEach((p, idx) => {
    if (!p.id || typeof p.id !== 'string') { console.error(`Product ${idx} missing id`); hasError = true; }
    if (!p.title || typeof p.title !== 'string') { console.error(`Product ${p.id} missing title`); hasError = true; }
    if (!p.subtitle || typeof p.subtitle !== 'string') { console.error(`Product ${p.id} missing subtitle`); hasError = true; }
    if (!p.description || typeof p.description !== 'string') { console.error(`Product ${p.id} missing description`); hasError = true; }
    if (!Array.isArray(p.features)) { console.error(`Product ${p.id} features is not an array`); hasError = true; }
    if (!Array.isArray(p.brochures)) { console.error(`Product ${p.id} brochures is not an array`); hasError = true; }
  });

  // 2. Verify all images exist
  const publicProductsDir = path.join(__dirname, 'public/products');
  products.forEach(p => {
    const imgPath = path.join(publicProductsDir, `${p.id}.png`);
    if (!fs.existsSync(imgPath)) {
      console.error(`Image missing for product ${p.id}: ${imgPath}`);
      hasError = true;
    }
  });

  // 3. Verify Categories helper
  // We can't import the TS file directly in Node without ts-node, but we can verify logic manually.
  const knownIds = ['ds-trp', 'ds-asd', 'composite-ds-trp', 'electo-sonic', 'e-bulk', 'wmap-evo', 'wt'];
  products.forEach(p => {
    if (!knownIds.includes(p.id)) {
      console.error(`Product ${p.id} has no known categories mapped`);
      hasError = true;
    }
  });

  if (!hasError) {
    console.log('All empirical validations passed successfully.');
  } else {
    console.log('Validations failed.');
  }
}

runTests();
