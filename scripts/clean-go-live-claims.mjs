import { readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const siteRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicDirectory = path.join(siteRoot, "public");
const files = (await readdir(publicDirectory)).filter((file) => file.endsWith(".html"));

// Guarantee-related claims are intentionally absent from this table: the
// one-year workmanship guarantee is owner-confirmed (data/site-facts.json,
// claims_requiring_evidence.workmanship_guarantee, APPROVED—OWNER CONFIRMED)
// and must not be stripped back to hedge language by this script.
const replacements = [
  ["Leak or no-water situation? The phone is answered 24/7 &mdash; day, night, weekends, holidays.", "Urgent leak, water intrusion, or no-water issue? Call now to check availability."],
  ["Emergency &middot; (765) 860-8667", "Call now &middot; (765) 860-8667"],
  ["Phone answered 24/7 &middot; every day", "Call to check current availability"],
  ["Phone answered 24/7, every day", "Call to check current availability"],
  ["&copy; 2026 Simple Man Plumbing &middot; Bonded &amp; insured &middot; All rights reserved.", "&copy; 2026 Simple Man Plumbing &middot; All rights reserved."],
  ["Booking now &middot; this week", "Call to discuss availability"],
  ["Most non-emergency visits get a window within 2&ndash;3 business days. Active leaks, no-water situations, and water-heater failures are triaged ahead of routine appointments. Calls are answered 24/7, and emergencies are dispatched as fast as physically possible.", "Call to discuss current availability. For active leaks, water intrusion, sewer backup, or no-water, tell us when you call so we can understand the urgency."],
  ["Most non-emergency visits get a window within 2&ndash;3 business days. Active leaks, no-water situations, and water-heater failures are triaged ahead of routine appointments. After-hours calls are answered, and we book the next morning whenever possible.", "Call to discuss current availability. For active leaks, water intrusion, sewer backup, or no-water, tell us when you call so we can understand the urgency."],
  ["Yes &mdash; fully licensed for residential and commercial plumbing in Indiana, with general liability coverage, workers&rsquo; comp, and a bonded crew. Documentation is available on request before any work begins.", "David Kropczynski holds an active Indiana Plumbing Contractor credential. Ask about the documentation and scope that apply to your specific project."],
  ["Always. We diagnose the issue first, walk you through what&rsquo;s actually happening, and give you a fixed price for the work before any parts come off. If something changes mid-job, we stop and ask first &mdash; no surprises on the invoice.", "We explain the work and provide clear pricing before you decide how to proceed. Ask for the current estimate for your repair or installation."],
  ["Cards (Visa, Mastercard, Amex, Discover), ACH, and personal check on completion. Larger projects can be staged with a deposit and milestone payments &mdash; written into the proposal.", "Ask about current payment options and project terms when you schedule."],
  ["The phone is answered 24/7 &mdash; nights, weekends, holidays. For active leaks, no-water issues, and burst lines, we&rsquo;ll get someone out as fast as physically possible &mdash; including weekends. After-hours rates are quoted before dispatch.", "Call to discuss current availability for an urgent leak, water intrusion, sewer backup, or no-water issue."],
  ["The phone is answered 24/7. For active leaks, sewer backups, no-water issues, and burst lines, we&rsquo;ll get someone out as fast as physically possible &mdash; including weekends. After-hours rates are quoted before dispatch.", "Call to discuss current availability for an urgent leak, water intrusion, sewer backup, or no-water issue."],
  ["<summary>Do you do emergency / weekend calls", "<summary>Can I call about an urgent water problem"],
  ["<summary>What&rsquo;s your guarantee, exactly?</summary>", "<summary>What warranty terms apply?</summary>"],
  ["<summary>What payment do you accept?</summary>", "<summary>How do payment options work?</summary>"],
  ["<li>Mon &ndash; Fri &middot; 8 a.m. &ndash; 5 p.m.</li><li>By appointment, and</li><li>Tuesdays in the office</li>", "<li>Call to confirm current availability</li>"],
];

for (const file of files) {
  const sourcePath = path.join(publicDirectory, file);
  let html = await readFile(sourcePath, "utf8");
  const original = html;
  for (const [from, to] of replacements) html = html.replaceAll(from, to);
  html = html.replace(/<div class="social">[\s\S]*?<\/div>/g, "");
  if (html !== original) await writeFile(sourcePath, html);
}
