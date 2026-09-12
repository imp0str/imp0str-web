const fs = require('node:fs');
const path = require('node:path');

const root = __dirname;
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const routes = fs.readFileSync(path.join(root, 'js', 'routes.js'), 'utf8');
const css = fs.readFileSync(path.join(root, 'css', 'styles.css'), 'utf8');

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

assert(!fs.existsSync(path.join(root, 'CNAME')), 'CNAME must not exist before Web domain activation');
assert(!html.includes('web.imp0str.dev') && !routes.includes('web.imp0str.dev'), 'Premature Web custom domain');
assert(routes.includes("hub: 'https://imp0str.dev'"), 'Hub route missing');
assert(routes.includes("game: 'https://game.imp0str.dev'"), 'Game route missing');
assert(html.includes('Independent redesign proposal'), 'Segrest disclosure missing');
assert(html.includes('Personal application project'), 'PersonaPal disclosure missing');
assert(html.includes('imp0str.dev@gmail.com'), 'Contact email missing');
assert(css.includes('prefers-reduced-motion'), 'Reduced-motion support missing');
assert(/img\s*\{[^}]*height:\s*auto/.test(css), 'Global image aspect-ratio safeguard missing');

for (const match of html.matchAll(/(?:src|href)="([^"#][^"]*)"/g)) {
  const target = match[1];
  if (/^(?:https?:|mailto:)/.test(target)) continue;
  assert(fs.existsSync(path.join(root, target.split(/[?#]/, 1)[0])), `Missing local asset: ${target}`);
}

const routeKeys = new Set([...routes.matchAll(/^\s{2}([A-Za-z][A-Za-z0-9]*):/gm)].map((match) => match[1]));
for (const match of html.matchAll(/data-route="([^"]+)"/g)) {
  assert(routeKeys.has(match[1]), `Missing configured route: ${match[1]}`);
}

console.log('Web site validation passed.');
