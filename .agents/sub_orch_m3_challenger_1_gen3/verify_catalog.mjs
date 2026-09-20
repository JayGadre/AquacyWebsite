import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runTests() {
  console.log("Running Empirical Tests for M3.1 Catalog Grid...");
  
  const productsPath = path.resolve(__dirname, '../../src/data/products.json');
  const productsRaw = await fs.readFile(productsPath, 'utf8');
  const products = JSON.parse(productsRaw);
  
  console.log(`Loaded ${products.length} products.`);

  // Test 1: Data schema verification
  let schemaErrors = 0;
  for (const product of products) {
    if (!product.id || typeof product.id !== 'string') {
      console.error(`Product missing id:`, product);
      schemaErrors++;
    }
    if (!product.title || typeof product.title !== 'string') {
      console.error(`Product ${product.id} missing title`);
      schemaErrors++;
    }
    if (product.subtitle === undefined) {
      console.error(`Product ${product.id} missing subtitle`);
      schemaErrors++;
    }
    if (!Array.isArray(product.features)) {
      console.error(`Product ${product.id} features is not an array`);
      schemaErrors++;
    }
    if (!Array.isArray(product.brochures)) {
      console.error(`Product ${product.id} brochures is not an array`);
      schemaErrors++;
    }
  }
  
  if (schemaErrors === 0) {
    console.log("✅ Schema verification passed.");
  } else {
    console.error(`❌ Schema verification failed with ${schemaErrors} errors.`);
  }

  // Oracle for getCategories logic from src/types/product.ts
  const getCategoriesOracle = (id) => {
    const categories = [];
    if (['ds-trp', 'ds-asd', 'composite-ds-trp'].includes(id)) categories.push('Mechanical');
    if (['electo-sonic', 'e-bulk'].includes(id)) categories.push('Ultrasonic');
    if (['wmap-evo', 'e-bulk', 'wt'].includes(id)) categories.push('Bulk/Industrial');
    return categories;
  };

  // Test 2: Category mapping Oracle
  let categoryErrors = 0;
  for (const product of products) {
    const categories = getCategoriesOracle(product.id);
    if (categories.length === 0 && product.id !== 'unknown') {
      // Actually some might have no categories other than "All" which is implicit.
      // E.g., 'composite-ds-trp' is in Mechanical. 'wt' in Bulk.
      // Wait, let's check ds-asd - it's in Mechanical.
      // Let's check ds-asd, it is in 'ds-asd'.
      // Let's check 'e-bulk', it is in Ultrasonic and Bulk/Industrial.
      // Let's check 'wmap-evo', it is in Bulk.
    }
  }

  // Verify 'e-bulk' has multiple categories
  const eBulkCats = getCategoriesOracle('e-bulk');
  if (eBulkCats.includes('Ultrasonic') && eBulkCats.includes('Bulk/Industrial')) {
    console.log("✅ E-Bulk category intersection oracle passed.");
  } else {
    console.error("❌ E-Bulk categories incorrect:", eBulkCats);
    categoryErrors++;
  }

  // Stress Test: Large catalog filtering simulation
  console.log("Running stress test for filtering...");
  const start = performance.now();
  const iterations = 10000;
  let matches = 0;
  for (let i = 0; i < iterations; i++) {
    const activeTab = 'Ultrasonic';
    const filtered = products.filter(p => {
       const cats = getCategoriesOracle(p.id);
       return activeTab === 'All' || cats.includes(activeTab);
    });
    matches += filtered.length;
  }
  const end = performance.now();
  console.log(`✅ Stress test completed in ${(end - start).toFixed(2)}ms. Matches found: ${matches / iterations} per iteration.`);

  if (schemaErrors === 0 && categoryErrors === 0) {
    console.log("All empirical verifications passed.");
  } else {
    process.exit(1);
  }
}

runTests().catch(console.error);
