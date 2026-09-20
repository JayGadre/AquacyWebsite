const fs = require('fs');

function testCssLayers() {
  const css = fs.readFileSync('./src/app/globals.css', 'utf-8');
  let failures = [];

  // Check if @layer base exists
  if (!css.includes('@layer base {')) {
    failures.push('Missing @layer base');
  }

  // Check if @layer components exists
  if (!css.includes('@layer components {')) {
    failures.push('Missing @layer components');
  }

  // Check if .glass-card is inside @layer components
  const componentsIndex = css.indexOf('@layer components {');
  const glassCardIndex = css.indexOf('.glass-card {');
  
  if (glassCardIndex === -1) {
    failures.push('Missing .glass-card');
  } else if (glassCardIndex < componentsIndex) {
    failures.push('.glass-card is not inside @layer components');
  }

  if (failures.length > 0) {
    console.error('Test Failed:', failures);
    process.exit(1);
  } else {
    console.log('Test Passed: CSS layers are correctly structured.');
  }
}

testCssLayers();
