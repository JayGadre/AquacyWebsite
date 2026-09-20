const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio'); // Try to use cheerio if available, otherwise just use regex

const htmlPath = path.join(__dirname, '.next', 'server', 'app', 'catalog.html');
if (!fs.existsSync(htmlPath)) {
  console.error("Could not find catalog.html. Path: " + htmlPath);
  process.exit(1);
}

const html = fs.readFileSync(htmlPath, 'utf8');

// Find JSON-LD script
const scriptRegex = /<script\s+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/;
const match = html.match(scriptRegex);

if (!match) {
  console.error("Could not find JSON-LD script on catalog page.");
  process.exit(1);
}

try {
  // Dangerously set inner HTML in Next.js might leave some escaping.
  // Next.js escapes <, >, etc. Let's see if JSON.parse can handle it.
  const jsonLd = JSON.parse(match[1]);
  console.log("JSON-LD parsed successfully.");
  console.log(JSON.stringify(jsonLd, null, 2));

  if (jsonLd['@context'] !== 'https://schema.org' || jsonLd['@type'] !== 'ItemList') {
    console.error("Invalid JSON-LD format.");
    process.exit(1);
  }

  console.log("Valid JSON-LD ItemList found with", jsonLd.itemListElement.length, "items.");
} catch (error) {
  console.error("Error parsing JSON-LD:", error);
  process.exit(1);
}
