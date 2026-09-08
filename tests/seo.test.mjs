import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";
import {
  canonicalUrl,
  createPageMetadata,
  ENGLISH_DEMO_PATHS,
  INDEXABLE_PATHS,
  languageAlternates,
  languageLinks,
  TRANSLATED_ROUTES,
} from "../lib/seo.ts";

const products = JSON.parse(readFileSync(new URL("../configs/products.json", import.meta.url), "utf8"));
const italianProductPaths = new Set(products.map(({ slug }) => `/it/${slug}`));

function hasPage(path) {
  return existsSync(new URL(`../app${path === "/" ? "" : path}/page.tsx`, import.meta.url))
    || existsSync(new URL(`../app/(en)${path === "/" ? "" : path}/page.tsx`, import.meta.url))
    || italianProductPaths.has(path);
}

test("the sitemap route list includes both partner pages and only real indexable pages", () => {
  assert.ok(INDEXABLE_PATHS.includes("/partners"));
  assert.ok(INDEXABLE_PATHS.includes("/it/partner"));
  assert.equal(new Set(INDEXABLE_PATHS).size, INDEXABLE_PATHS.length);
  for (const path of INDEXABLE_PATHS) {
    assert.ok(hasPage(path), `Missing public page: ${path}`);
    assert.doesNotMatch(path, /(?:^\/(?:api|buy|success)(?:\/|$))|(?:\/founder$)/);
  }
});

test("translated pages have reciprocal hreflang pointing to their own canonical URLs", () => {
  for (const { en, it } of TRANSLATED_ROUTES) {
    const english = createPageMetadata({ path: en, title: "English page", description: "English description" });
    const italian = createPageMetadata({ path: it, title: "Pagina italiana", description: "Descrizione italiana" });
    assert.deepEqual(english.alternates.languages, italian.alternates.languages);
    assert.equal(english.alternates.languages.en, english.alternates.canonical);
    assert.equal(italian.alternates.languages.it, italian.alternates.canonical);
    assert.equal(english.alternates.languages["x-default"], english.alternates.canonical);
    assert.equal(english.openGraph.url, english.alternates.canonical);
    assert.equal(italian.openGraph.locale, "it_IT");
  }
});

test("language navigation resolves partner spelling and never invents Italian demos or checkout pages", () => {
  assert.deepEqual(languageLinks("/partners"), { en: "/partners", it: "/it/partner" });
  assert.deepEqual(languageLinks("/it/partner"), { en: "/partners", it: "/it/partner" });
  for (const demo of ENGLISH_DEMO_PATHS) {
    const links = languageLinks(demo);
    assert.equal(links.en, demo);
    assert.ok(hasPage(links.it), `Missing translated navigation destination: ${links.it}`);
    assert.equal(languageAlternates(demo).it, undefined, "A product is not a translated demo");
  }
  for (const path of ["/success", "/repeat-guest-engine/founder", "/unknown", ...INDEXABLE_PATHS]) {
    for (const destination of Object.values(languageLinks(path))) {
      assert.ok(hasPage(destination), `Broken language destination ${destination} from ${path}`);
    }
  }
});

test("each page gets its own canonical and social metadata, without referral or preview URLs", () => {
  for (const path of INDEXABLE_PATHS) {
    const title = `Title for ${path}`;
    const description = `Description for ${path}`;
    const metadata = createPageMetadata({ path, title, description });
    assert.equal(metadata.alternates.canonical, `https://www.guestflowsystems.com${path}`);
    assert.equal(metadata.openGraph.url, metadata.alternates.canonical);
    assert.equal(metadata.openGraph.title, title);
    assert.equal(metadata.twitter.description, description);
  }
  assert.equal(canonicalUrl("/partners/?ref=partner-42#apply"), "https://www.guestflowsystems.com/partners");
});

test("non-indexable checkout and founder pages cannot advertise language alternates", () => {
  for (const path of ["/success", "/repeat-guest-engine/founder"]) {
    const metadata = createPageMetadata({ path, title: "Private flow", description: "Checkout flow", noIndex: true });
    assert.equal(metadata.robots.index, false);
    assert.equal(metadata.alternates.languages, undefined);
    assert.equal(INDEXABLE_PATHS.includes(path), false);
  }
});
