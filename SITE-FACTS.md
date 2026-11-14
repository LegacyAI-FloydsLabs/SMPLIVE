# Simple Man Plumbing — fact registry

This is the human review guide to the site's facts and the evidence behind each one. The machine-readable registry is [`data/site-facts.json`](data/site-facts.json).

**Last reviewed: November 14, 2026** (email setup); full live check November 13, 2026. On that date the live site and DNS were re-checked from a cloud session (see "Live verification" below). The Indiana license search and the BBB profile could not be re-checked automatically, so their latest evidence is still the September 16, 2026 check in [`SEO-POLISH-VERIFICATION.md`](SEO-POLISH-VERIFICATION.md).

## Publishing gate

New or strengthened factual claims need owner confirmation or an authoritative source recorded in the registry. Missing values remain **MISSING—DO NOT INVENT**. Claims the site no longer makes are marked **RETIRED—NO LONGER ON SITE** and must not be reintroduced without owner confirmation.

## Open blockers

1. **DMARC record pending.** Add `_dmarc` CNAME → `dmarcroot.purelymail.com.` in Vercel DNS on or after 2026-11-16, once SPF and DKIM have been live for 48 hours (Purelymail's guidance).
2. **The BBB profile still lists `simplemanplumbing.net`** as the website (as of 2026-09-16). Update it to `https://simplemanplumbing.tech` through the BBB business portal.
3. **Legal name is unconfirmed.** BBB says "Simple Man Plumbing LLC"; the Indiana plumbing-corporation record says "Simple Man Plumbing". Confirm with the owner or the Indiana Secretary of State before publishing a legal name.

## Email setup — November 14, 2026

- **Provider:** Purelymail. `service@simplemanplumbing.tech` is a real mailbox; a routing rule redirects all its mail to `simplemanplumbing@gmail.com` (Dave's regular Gmail). Routing rules redirect rather than copy, so no copy stays in Purelymail.
- **DNS (Vercel, added 2026-11-14 18:44 UTC, confirmed in Google Public DNS):** ownership TXT, MX `50 mailserver.purelymail.com.`, SPF `v=spf1 include:_spf.purelymail.com ~all`, DKIM CNAMEs `purelymail1/2/3._domainkey` → `key1/2/3.dkimroot.purelymail.com.`. Purelymail's DNS check accepted the domain. AutoConfig/AutoDiscover were deliberately not added (Gmail is the client).
- **Delivery tests (owner-reported 2026-11-14):** a test email to `service@simplemanplumbing.tech` and a website contact-form submission both arrived in Dave's Gmail, as confirmed by Dave. Not independently verified from this repository.
- **`sales@simplemanplumbing.net`** was never a mailbox, only a forward to Dave's Gmail. `.net` has no MX record, so that forward no longer works; the site no longer publishes it. `.net` DNS is at Wix (`ns14/ns15.wixdns.net`); `www.simplemanplumbing.net` points to Webflow. The `simplemanplumbing.net` entry in the Vercel team is not authoritative, so records added there have no effect.

## Live verification — November 13, 2026

| Check | Result |
| --- | --- |
| `https://simplemanplumbing.tech/` | 200; canonical link is the apex URL |
| `https://www.simplemanplumbing.tech/` | 308 → apex |
| `https://simplemanplumbing.net/` | 301 → `www.simplemanplumbing.net` → 301 → `https://simplemanplumbing.tech/` |
| `/contact`, `/residential` | 308 → `/contact.html`, `/services.html` |
| `/contact.html`, `/thanks.html` | 200 |
| Nameservers | `ns1.vercel-dns.com`, `ns2.vercel-dns.com` |
| MX `simplemanplumbing.tech` | **none** |
| MX `simplemanplumbing.net` | **none** |
| Live contact page | phone `+1-765-860-8667`; hours Monday–Friday 8–5 by appointment; licenses PC12300114 and CO52600043; email still `sales@simplemanplumbing.net` until PR #9 is merged and deployed |
| Indiana PLA search | not re-run (reCAPTCHA) |
| BBB profile | not re-run (HTTP 403 to automated requests) |

## Confirmed facts

| Fact | Value | Status | Evidence |
| --- | --- | --- | --- |
| Display name | Simple Man Plumbing | **APPROVED—AUTHORITATIVE SOURCE** | Indiana PLA corporation record CO52600043 and BBB profile, both checked 2026-09-16 |
| Website | `https://simplemanplumbing.tech/` | **APPROVED—OWNER CONFIRMED** | Owner directive 2026-11-04; live check 2026-11-13 (apex 200, `www` and `.net` redirect to it) |
| Phone | `+1-765-860-8667` | **APPROVED—AUTHORITATIVE SOURCE** | BBB and Nextdoor profiles, 2026-09-16; matches live site 2026-11-13 |
| Email | `service@simplemanplumbing.tech` | **APPROVED—OWNER CONFIRMED** | Owner directive 2026-11-13 (PR #9); Purelymail mailbox redirecting to Dave's Gmail, delivery confirmed by Dave 2026-11-14 |
| Hours | Monday–Friday, 8 a.m.–5 p.m. Visits by appointment. | **APPROVED—OWNER CONFIRMED** | Owner copy update 2026-09-16; visible text and JSON-LD agree (`public/contact.html:117`, `:34`) |
| Owner | David (Dave) Kropczynski | Corroborated | PLA lists him as manager of CO52600043, BBB as owner (2026-09-16); "lead plumber" is site wording (`public/about.html:76-85`) |
| Contractor license | PC12300114, David Kropczynski, active through 2027-12-31 | **APPROVED—AUTHORITATIVE SOURCE** | Indiana PLA, checked 2026-08-17 and 2026-09-16 |
| Corporation license | CO52600043, Simple Man Plumbing, issued 2026-08-28, active through 2027-12-31 | **APPROVED—AUTHORITATIVE SOURCE** | Indiana PLA, checked 2026-09-16 |
| Experience | 8+ years of hands-on plumbing experience | **APPROVED—OWNER CONFIRMED** | Owner copy update 2026-09-16 (`public/index.html:142`) |
| Workmanship guarantee | One year on workmanship; manufacturer warranties separate | **APPROVED—OWNER CONFIRMED** | Owner 2026-09-16, reconfirmed 2026-09-21 |
| Form response | Contact within one business day of a form submission | **APPROVED—OWNER CONFIRMED** | Owner 2026-09-21 |
| Contact-form recipient | `simplemanplumbing@gmail.com` via FormSubmit | Owner-supplied 2026-09-16 | Delivery confirmed by owner test submissions 2026-11-13 and 2026-11-14 |
| Flood-prevention guidance | Indiana DHS, FEMA, Citizens Energy links | **APPROVED—AUTHORITATIVE SOURCE** | Checked 2026-08-17; guidance only, no affiliation or emergency claim |

## Still unverified

| Subject | Current site content | Status | What is needed |
| --- | --- | --- | --- |
| Service areas | 11 area pages; 8 headline areas (Indianapolis, Carmel, Fishers, Westfield, Noblesville, Zionsville, Pendleton, Greenwood) | 8 owner-supplied 2026-09-16; Broad Ripple, Castleton and Keystone at the Crossing **UNVERIFIED** | Owner confirmation of the other 3 areas |
| Services | Residential plumbing, everyday repairs, home system upgrades (`public/services.html`) | **UNVERIFIED** | Owner confirmation of the offerings list |
| Legal name | not published | **MISSING—DO NOT INVENT** | See blocker 4 |

## No longer on the site (retired)

Checked against every public page on 2026-11-13. None of these appear any more; keep them off unless the owner confirms them.

- Price ranges (diagnostic $89, faucet $149–$320, water heater $1,800–$3,400, repipe $9,000–$22,000) and the `$89-$22,000` schema price range.
- 24/7 phone answering and the 2–3-business-day visit window (removed by `scripts/clean-go-live-claims.mjs`).
- "Bonded and insured" wording.
- The "Serving Indianapolis and the Northside" address string, ZIP and geographic coordinates in structured data.
- Tuesday-office hours.

## Do not publish without evidence

- A physical street address or coordinates (BBB places the business in Fortville, IN; no address is confirmed for publication).
- Insurance or bonding claims.
- Individual reviews, ratings or `aggregateRating` markup; no review records exist in this project.
- Any new pricing, emergency-availability or response-time promise.

## Domain history

- **2026-11-04:** `https://simplemanplumbing.tech` (apex) became the permanent canonical host. `simplemanplumbing.net` was never recovered and redirects to `.tech`. Verified live on 2026-11-13.
- **2026-11-13:** published email changed from `sales@simplemanplumbing.net` to `service@simplemanplumbing.tech` at the owner's direction (an interim change to `sales@simplemanplumbing.tech` the same day was superseded). The form recipient is unchanged.
- **2026-11-14:** Purelymail mailbox and DNS records set up for `service@simplemanplumbing.tech`; mail redirects to Dave's Gmail. DMARC to follow after 48 hours.
