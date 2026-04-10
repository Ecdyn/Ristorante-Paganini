/**
 * tools/validate.js
 * JSON-LD validation script for Ristorante Paganini
 *
 * Validates JSON-LD structured data blocks in all 3 onepages.
 * Uses ONLY Node.js built-in modules (fs, path) — no npm dependencies.
 *
 * Usage: node tools/validate.js
 * Exits 0 if all checks pass, exits 1 if any check fails.
 */

// Built-in modules only — no npm required (D-11)
const fs = require('fs');
const path = require('path');

// Script lives in tools/ — root is one level up
const ROOT = path.join(__dirname, '..');

const FILES_TO_VALIDATE = [
  path.join(ROOT, 'de', 'index.html'),
  path.join(ROOT, 'en', 'index.html'),
  path.join(ROOT, 'it', 'index.html'),
];

// Regex to extract all JSON-LD script blocks (D-12)
const JSONLD_REGEX = /<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/gi;

// Required fields per @type (D-12)
// Restaurant and LocalBusiness are commonly used together as array @type
const REQUIRED_FIELDS = {
  Restaurant: ['name', 'address', 'telephone', 'openingHoursSpecification', 'servesCuisine'],
  LocalBusiness: ['name', 'address', 'telephone', 'openingHoursSpecification', 'servesCuisine'],
  FAQPage: ['mainEntity'],
};

var errors = 0;
var passes = 0;

FILES_TO_VALIDATE.forEach(function (filePath) {
  var rel = path.relative(ROOT, filePath);

  // Check file exists before reading
  if (!fs.existsSync(filePath)) {
    console.error('FAIL [' + rel + '] File not found: ' + filePath);
    errors++;
    return;
  }

  var html = fs.readFileSync(filePath, 'utf8');

  // Reset regex state before each file (global regex retains lastIndex)
  JSONLD_REGEX.lastIndex = 0;

  var match;
  var blockCount = 0;

  while ((match = JSONLD_REGEX.exec(html)) !== null) {
    blockCount++;
    var rawJson = match[1];
    var block;

    // Parse JSON — catch syntax errors
    try {
      block = JSON.parse(rawJson);
    } catch (e) {
      console.error('FAIL [' + rel + '] Invalid JSON in block ' + blockCount + ': ' + e.message);
      errors++;
      continue;
    }

    // Normalize @type to array — handles both string and array form
    // The codebase uses array form: "@type": ["Restaurant", "LocalBusiness"]
    var types = [].concat(block['@type'] || []);

    if (types.length === 0) {
      console.error('FAIL [' + rel + '] Block ' + blockCount + ' missing @type');
      errors++;
      continue;
    }

    types.forEach(function (type) {
      var required = REQUIRED_FIELDS[type];

      // Skip types not in our required fields map
      if (!required) {
        return;
      }

      required.forEach(function (field) {
        if (!block[field]) {
          console.error('FAIL [' + rel + '] @type=' + type + ' missing field: ' + field);
          errors++;
        } else {
          console.log('PASS [' + rel + '] @type=' + type + ' field: ' + field);
          passes++;
        }
      });
    });
  }

  if (blockCount === 0) {
    console.error('FAIL [' + rel + '] No JSON-LD blocks found in file');
    errors++;
  }
});

console.log('\n--- Validation Summary ---');
console.log('Passed checks: ' + passes);
console.log('Failed checks: ' + errors);

if (errors === 0) {
  console.log('ALL JSON-LD VALID');
  process.exit(0);
} else {
  console.error('VALIDATION FAILED -- fix errors above before launch');
  process.exit(1);
}
