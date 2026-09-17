# Simple Man Plumbing — fact registry

This is the internal source-of-truth intake file for the experimental Site copy. It records what the copied site currently states, with provenance. It is not evidence that those real-world claims are correct.

## Publishing gate

Existing visible demo claims may be reproduced consistently while the demo is under review. New or strengthened factual claims need owner confirmation or an authoritative source. Missing values remain **MISSING—DO NOT INVENT**.

The machine-readable registry is [`data/site-facts.json`](data/site-facts.json). It is the canonical input for later generators; this file is the human review guide.

## Confirmed sources now used

- **Indiana contractor credential:** David Kropczynski holds Indiana Plumbing Contractor credential `PC12300114`, active through December 31, 2027. Source: [Indiana PLA verification](https://mylicense.in.gov/EVerification/Search.aspx), checked August 17, 2026. This is an individual credential; it is not a claim that a corporate entity holds a separate plumbing license.
- **Flood-prevention resource guidance:** the flood-and-sump-pump page links to [Indiana flood safety](https://www.in.gov/dhs/get-prepared/nature-safety/flood-safety/), FEMA homeowner guidance, and public sewer-backup/connection resources. These sources support safety and prevention guidance only; they do not establish current emergency conditions, availability, or affiliation.

## What the copied site currently says

| Subject | Observed value | Status | Exact copied-site evidence |
| --- | --- | --- | --- |
| Display name | Simple Man Plumbing | **UNVERIFIED—DO NOT PUBLISH** | `public/index.html:6-12`; `public/llms.txt:1-3` |
| Website | `https://www.simplemanplumbing.net/` | **UNVERIFIED—DO NOT PUBLISH** | `public/index.html:6-14`; `public/llms.txt:19-24` |
| Phone | `+1-765-860-8667` | **UNVERIFIED—DO NOT PUBLISH** | `public/contact.html:26,100-103`; `public/llms.txt:19-25` |
| Email | `sales@simplemanplumbing.net` | **UNVERIFIED—DO NOT PUBLISH** | `public/contact.html:26,100-103`; `public/llms.txt:19-24` |
| Owner / lead | Dave, described as owner and lead plumber | **UNVERIFIED—DO NOT PUBLISH** | `public/about.html:68-78`; `public/llms.txt:7-9` |
| Service area | 11 named locations, including Zionsville | **UNVERIFIED—DO NOT PUBLISH** | `public/llms.txt:27-45`; `public/areas.html:95-113` |
| Services | Residential plumbing, everyday repairs, home system upgrades | **UNVERIFIED—DO NOT PUBLISH** | `public/llms.txt:47-51`; `public/services.html:100-157` |
| Pricing ranges | Four typical ranges listed; schema summarizes their displayed minimum/maximum as `$89-$22,000` | **UNVERIFIED—DO NOT PUBLISH** | `public/llms.txt:10-17`; `public/services.html:60-96` |

## Do not publish until supplied and confirmed

- Legal business name and any DBA.
- Real, publishable physical address. The current structured-data string is “Serving Indianapolis and the Northside,” not a street address. Source: `public/contact.html:26`.
- Geographic coordinates. Existing coordinates have no usable address evidence. Source: `public/contact.html:26`.
- Operating hours. Current copy conflicts: appointment/Tuesday-office hours in `public/llms.txt:19-25`, Monday–Friday hours in `public/contact.html:117`, and a 24/7 contact point in `public/contact.html:26`.
- License numbers, licensing authority/record, insurance and bonding evidence, and expiry dates. Claims exist, but evidence does not. Sources: `public/llms.txt:3,7-9,60-63`; `public/plumber-zionsville.html:26-28,201-202`.
- Individual reviews, ratings, review source URLs, reviewer names, and dates. No review records are stored in the copied public files; do not synthesize them. `public/llms.txt:69-71` only asserts they exist.
- Any response-time, emergency availability, guarantee, pricing, or location-specific operational claim. These are claims in current copy, not verified facts.

## Reconciliation required before schema work

1. Confirm the canonical business identity, phone, email, physical address, and service-area policy.
2. Confirm one operating-hours policy, separating office hours, appointment availability, and emergency phone coverage if applicable.
3. Confirm the services that are actually offered, pricing effective date/ranges, guarantee terms, and licensing/insurance claims.
4. Enter source URLs or owner-approved evidence in `data/site-facts.json`, change only those fields to `APPROVED`, then generate synchronized public artifacts.

The registry deliberately contains no invented address, hours, reviews, license details, or coordinates.
