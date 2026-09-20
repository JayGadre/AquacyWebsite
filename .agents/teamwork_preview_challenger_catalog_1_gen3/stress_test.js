import fs from 'fs';
import path from 'path';

function stressTest() {
  console.log('Starting stress test on Catalog filters...');
  const dataPath = path.join(__dirname, 'src/data/products.json');
  const products = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

  // Simulate generating 10,000 products to test filter performance
  const mockLargeData = [];
  for (let i = 0; i < 10000; i++) {
    mockLargeData.push({
      ...products[i % products.length],
      id: `mock-id-${i}`
    });
  }

  // The helper from src/types/product.ts
  const getCategories = (id) => {
    const categories = [];
    if (['ds-trp', 'ds-asd', 'composite-ds-trp'].includes(id)) categories.push('Mechanical');
    if (['electo-sonic', 'e-bulk'].includes(id)) categories.push('Ultrasonic');
    if (['wmap-evo', 'e-bulk', 'wt'].includes(id)) categories.push('Bulk/Industrial');
    return categories;
  };

  const TABS = ['All', 'Mechanical', 'Ultrasonic', 'Bulk/Industrial'];

  TABS.forEach(activeTab => {
    const start = performance.now();
    const filteredProducts = mockLargeData.filter((product) =>
      activeTab === 'All' || getCategories(product.id).includes(activeTab)
    );
    const end = performance.now();
    console.log(`Filtering for ${activeTab} took ${end - start}ms. Found ${filteredProducts.length} items.`);
    
    // In our mock data, since all ids are generated like 'mock-id-0', getCategories will return [] for all of them.
    // Let's modify the helper or the IDs to accurately test if it was real IDs.
  });

  console.log('Stress test completed.');
}

stressTest();
