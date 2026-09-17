# SEO polish verification — September 16, 2026

Scope: existing Simple Man Plumbing Sites project `appgprj_6a66c1724a44819182fef06c4ec367ac`, published at https://simple-man-plumbing.captainphantasy.chatgpt.site/.

## Sources checked in this task

- The published page already contains a `Plumber`/`Organization` graph and FAQPage with six questions. The exact source checkout matches the delivered HTML, except Cloudflare's injected challenge script. `Plumber` is Schema.org's valid plumbing-service type; `https://schema.org/PlumbingService` returned 404. See https://schema.org/Plumber.
- HTTPS GET of https://simplemanplumbing.net/ returned 301 to https://www.simplemanplumbing.net/; the destination returned 200. Therefore the existing www canonical remains correct. The .net domain currently serves a separate Webflow site, not this Sites publication. No domain mapping changes are part of this edit.
- Indiana PLA search https://mylicense.in.gov/EVerification/Search.aspx, searched for PC12300114: David Kropczynski; Plumbing Contractor; Active; issued June 12, 2023; expiration December 31, 2027. The related-license row identifies Simple Man Plumbing and corporation license CO52600043, with Kropczynski as manager.
- The linked Indiana record for CO52600043 shows Simple Man Plumbing; Plumbing Corporation; Active; issued August 28, 2026; expiration December 31, 2027, and the reciprocal manager link to PC12300114. This updates the knowledge available in the project's August 17 fact snapshot. The official detail links are session-dependent; public website links use the durable PLA search entrypoints.
- https://www.bbb.org/us/in/fortville/profile/plumber/simple-man-plumbing-llc-0382-90071735 identifies Simple Man Plumbing LLC, phone (765) 860-8667, website simplemanplumbing.net, and owner Dave Kropczynski. These establish the exact business profile match. No BBB rating or review claims were added.

## Changes

- Retain the valid business type and head-based JSON-LD; add the exact BBB profile as `sameAs` and the verified company credential to the business entity.
- Display both verified license numbers in the existing licensing answer; preserve all six questions and all original answer text. Synchronize FAQPage with the actual displayed answer.
- Use `expires` and `datePublished` for credential dates, correcting the unsupported `validThrough`/`validFrom` properties on EducationalOccupationalCredential. Update the existing generator so it preserves this correction.
- Add a BBB business profile link in the existing footer contact list across all 18 HTML pages. The generic Google search link mentioned in the earlier conversation was already absent.
- Keep canonical links, all other visible content, styles, scripts, images, navigation and forms unchanged. The existing build synchronizes the full AI text reference with the added license and footer content.
- Do not add the earlier example's 24/7 hours: they conflict with the existing visible appointment and office hours. No new operational promises are introduced.

## Validation

- All 11 existing tests passed, including exact FAQ-to-visible-text matching and canonical consistency.
- The official current Schema.org vocabulary validates type names, property domains and nested object ranges for 850 typed objects and 1,932 properties across 18 pages with zero errors.
- All 18 HTML bodies were compared with the original source after subtracting only the authorized license text and BBB link additions; they are identical. No CSS, browser scripts, images or layout templates changed.
- Build succeeded. Published-source and browser verification follow deployment and are recorded in the task's final evidence ledger.
