const fs = require('fs');
const { execSync } = require('child_process');

fs.writeFileSync('test.html', '<div class="hover:translate-y-0 hover:-translate-y-1"></div>');
fs.writeFileSync('test.css', '@import "tailwindcss";');
execSync('npx @tailwindcss/cli -i test.css -o out.css');
console.log(fs.readFileSync('out.css', 'utf-8'));
