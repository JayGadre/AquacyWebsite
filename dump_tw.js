const { execSync } = require('child_process');
const fs = require('fs');

try {
  const output = execSync('npx tailwindcss -i src/app/globals.css', { encoding: 'utf-8' });
  fs.writeFileSync('tailwind_output.txt', output);
} catch (e) {
  fs.writeFileSync('tailwind_error.txt', e.toString());
}
