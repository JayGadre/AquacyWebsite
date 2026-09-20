const fs = require('fs');
const postcss = require('postcss');
const tailwindcss = require('@tailwindcss/postcss');

async function check() {
  const css = fs.readFileSync('./src/app/globals.css', 'utf8');
  const result = await postcss([tailwindcss()]).process(css, { from: './src/app/globals.css' });
  
  const generatedCSS = result.css;
  
  fs.writeFileSync('generated-test.css', generatedCSS);
  console.log("Written to generated-test.css");
}

check().catch(console.error);
