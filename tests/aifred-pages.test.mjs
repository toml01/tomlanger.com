import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

test('publishes an identifiable AIfred homepage without changing the personal homepage', () => {
  assert.ok(existsSync('dist/aifred/index.html'), 'AIfred homepage must be built');
  const html = readFileSync('dist/aifred/index.html', 'utf8');
  assert.match(html, /<h1\b[^>]*>AIfred<\/h1>/);
  assert.match(html, /<meta name="robots" content="noindex, nofollow"/);
  assert.match(html, /personal AI assistant/);
  assert.match(html, /href="\/aifred\/privacy\/"/);
  assert.match(html, /href="https:\/\/tomlanger\.com\/aifred\/"/);
  assert.match(readFileSync('dist/index.html', 'utf8'), /This site is under construction/);
  assert.doesNotMatch(readFileSync('dist/index.html', 'utf8'), /aifred/i);
});

test('publishes an unindexed privacy policy with data use, sharing, retention, and revocation disclosures', () => {
  assert.ok(existsSync('dist/aifred/privacy/index.html'), 'Privacy policy must be built');
  const html = readFileSync('dist/aifred/privacy/index.html', 'utf8');
  for (const text of ['AIfred Privacy Policy', 'Google API Services User Data Policy', 'Limited Use', 'AI model providers', 'Retention', 'Revoke access', 'not automatically delete']) {
    assert.ok(html.includes(text), `Privacy policy must disclose ${text}`);
  }
  assert.match(html, /<meta name="robots" content="noindex, nofollow"/);
  assert.match(html, /https:\/\/myaccount.google.com\/connections/);
});
