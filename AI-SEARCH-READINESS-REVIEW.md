# AI-search readiness review — experimental demo

**Reviewed:** August 17, 2026  
**Scope:** The experimental Simple Man Plumbing copy in this repository. This is a review record, not a deployment authorization.

## What is ready for demo review

| Standard area | Experimental implementation | Evidence |
| --- | --- | --- |
| Crawler permission | `robots.txt` allows the named AI and answer-engine crawlers with the same private-path exclusions as the default rule. | `public/robots.txt` and automated checks |
| Machine-readable summaries | `llms.txt` is a concise linked site map; `llms-full.txt` is generated from the 17 indexable HTML pages on every build. | `scripts/generate-ai-discovery.mjs` |
| Server-visible content | The pages are static HTML, including headings, prices, FAQ answers, contact methods, city content, and flood guidance. | `public/*.html`; local HTTP verification |
| Structured data | Every public HTML document contains one cross-linked JSON-LD graph with organization, named plumber, WebSite, WebPage, and breadcrumb context. It carries the existing displayed price range and supported expertise; services, location pages, FAQs, and the flood resource add the relevant nodes. Visible FAQ details automatically become their matching FAQ schema. | `scripts/sync-structured-content.mjs`; `tests/ai-search-readiness.test.mjs` |
| Flood and sump-pump discovery | A dedicated, plainly titled guide covers system checks, drainage, discharge routing, backwater valves, backup considerations, and safety boundaries. Every represented service-area page links to it through distinct local copy. | `public/flood-prevention-sump-pumps.html`; `public/plumber-*.html` |
| Metadata and canonicals | Indexable pages use self-referencing canonical URLs, and internal home links point to the canonical root rather than `index.html`; visible title/description, WebPage schema, Open Graph, and Twitter values are synchronized. Core pages name their Indianapolis plumbing relevance directly. | `scripts/sync-structured-content.mjs`; automated checks |
| Crawl hygiene | The sitemap contains all indexable HTML pages once, with current modification dates. The custom 404 links visitors back into the site and is deliberately `noindex, follow`. | `public/sitemap.xml`, `public/404.html` |
| Provenance | The repository has a facts registry and distinguishes owner-confirmed/authoritative facts from copied demo claims. | `SITE-FACTS.md`, `data/site-facts.json` |

## Fact decisions still reserved for the owner

The full standard calls for these fields, but they should not be guessed or pulled from an uncertain directory listing. They are intentionally not added to the new public-facing schema or copy yet.

| Needed decision | Why it is held | What would resolve it |
| --- | --- | --- |
| Legal business name and public mailing/street address | The demo does not establish a customer-facing address or the exact legal name to publish. | Owner-approved NAP record |
| Coordinates and location-specific postal codes | They need to correspond to an address or real office, not an inferred service area. | Approved public address/location policy |
| ~~Operating hours and emergency-contact policy~~ | **Resolved.** Owner supplied "Monday–Friday, 8 a.m.–5 p.m. Visits by appointment." on 2026-09-16; the 24/7 and visit-window wording was removed. Visible text and JSON-LD agree (re-checked 2026-11-13). | — |
| Reviews (`sameAs` partly resolved) | The exact BBB profile was verified and added as `sameAs` on 2026-09-16. No review records exist, so no rating markup. | At least five verifiable reviews before rating markup |
| Bond and insurance detail (company license resolved) | Indiana PLA (checked 2026-09-16) shows corporation license CO52600043 for Simple Man Plumbing alongside PC12300114; both are published. Bonding and insurance are not evidenced and are no longer claimed. | Owner-approved insurance/bond documentation if it should be stated |

**Canonical host — resolved 2026-11-04.** `https://simplemanplumbing.tech` (apex, no `www`) is the
permanent canonical. `simplemanplumbing.net` was not recovered and is no longer counted on; the
`.tech` host, originally interim, is permanent. Every canonical URL, sitemap entry, `robots.txt`
directive, and `llms.txt` link now names the apex host, and the `.net` host permanently redirects
here. **Verified live 2026-11-13:** the apex serves 200, `www` 308-redirects to it, and `.net` redirects
to it (see `SITE-FACTS.md`). Open dependency: neither `.tech` nor `.net` publishes an MX record, so the
published email address cannot receive mail until a mailbox is set up.

## Before a public release

1. Confirm the fact decisions above with Dave/the business owner.
2. Enter approved values and sources in `data/site-facts.json`.
3. Regenerate the structured data and summaries from those approved facts.
4. Run the automated checks and validate the deployed homepage, services page, one location page, and flood guide from the final public URL.

Until then, this remains a complete, review-ready experimental implementation rather than a replacement for the active business site.
