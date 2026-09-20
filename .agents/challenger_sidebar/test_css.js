const fs = require('fs');
const css = fs.readFileSync('src/app/globals.css', 'utf8');
console.log(css.includes('.glass-card:hover'));
