import { execSync } from 'child_process';
import fs from 'fs';

try {
  console.log('Running npm run build...');
  const output = execSync('npm run build', { encoding: 'utf8', stdio: 'pipe' });
  console.log('Build successful!');
  fs.writeFileSync('.agents/challenger_1/build_output.txt', output);
} catch (error) {
  console.error('Build failed!');
  fs.writeFileSync('.agents/challenger_1/build_output.txt', error.stdout || error.message);
  process.exit(1);
}
