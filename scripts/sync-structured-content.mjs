import { readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const siteRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicDirectory = path.join(siteRoot, "public");
const serviceAreas = [
  ["Indianapolis", "Marion County, IN"],
  ["Carmel", "Hamilton County, IN"],
  ["Fishers", "Hamilton County, IN"],
  ["Westfield", "Hamilton County, IN"],
  ["Noblesville", "Hamilton County, IN"],
  ["Broad Ripple", "Marion County, IN"],
  ["Castleton", "Marion County, IN"],
  ["Keystone at the Crossing", "Marion County, IN"],
  ["Pendleton", "Madison County, IN"],
  ["Greenwood", "Johnson County, IN"],
  ["Zionsville", "Boone County, IN"],
].map(([name, county]) => ({
  "@type": "City",
  name,
  containedInPlace: { "@type": "AdministrativeArea", name: county },
}));
const davidCredential = {
  "@type": "EducationalOccupationalCredential",
  credentialCategory: "Indiana Plumbing Contractor license",
  identifier: "PC12300114",
  expires: "2027-12-31",
  recognizedBy: {
    "@type": "Organization",
    name: "Indiana Professional Licensing Agency",
    url: "https://www.in.gov/pla/",
  },
};
const davidExpertise = [
  "Residential plumbing",
  "Plumbing repair",
  "Water heater installation",
  "Sump pump systems",
  "Drainage and flood prevention",
  "Water softeners and filtration",
];

function decodeEntities(value) {
  return value
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&ndash;/gi, "–")
    .replace(/&mdash;/gi, "—")
    .replace(/&middot;/gi, "·")
    .replace(/&rsquo;|&lsquo;/gi, "'")
    .replace(/&rdquo;|&ldquo;/gi, '"');
}

function textFromHtml(value) {
  return decodeEntities(value.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
}

function hasType(node, expected) {
  return (Array.isArray(node["@type"]) ? node["@type"] : [node["@type"]]).includes(expected);
}

function visibleFaqs(html) {
  return [...html.matchAll(/<details\b[^>]*>\s*<summary[^>]*>([\s\S]*?)<\/summary>\s*<div[^>]*>([\s\S]*?)<\/div>\s*<\/details>/gi)]
    .map((match) => ({ question: textFromHtml(match[1]), answer: textFromHtml(match[2]) }))
    .filter(({ question, answer }) => question && answer);
}

function metaDescription(html) {
  const tag = /<meta\s+[^>]*name=["']description["'][^>]*>/i.exec(html)?.[0] ?? "";
  return decodeEntities(/content=(["'])([\s\S]*?)\1/i.exec(tag)?.[2] ?? "");
}

function pageTitle(html) {
  return textFromHtml(/<title>([\s\S]*?)<\/title>/i.exec(html)?.[1] ?? "");
}

function visibleUpdatedDate(html) {
  const match = /Last updated:\s*([A-Z][a-z]+)\s+(\d{1,2}),\s+(\d{4})/i.exec(textFromHtml(html));
  if (!match) return null;
  const months = {
    january: "01", february: "02", march: "03", april: "04", may: "05", june: "06",
    july: "07", august: "08", september: "09", october: "10", november: "11", december: "12",
  };
  const month = months[match[1].toLowerCase()];
  return month ? `${match[3]}-${month}-${match[2].padStart(2, "0")}` : null;
}

function mainWordCount(html) {
  const main = /<main\b[^>]*>([\s\S]*?)<\/main>/i.exec(html)?.[1] ?? "";
  return textFromHtml(main).match(/[A-Za-z0-9]+(?:['’.-][A-Za-z0-9]+)*/g)?.length ?? 0;
}

const files = (await readdir(publicDirectory)).filter((file) => file.endsWith(".html"));
let changedFiles = 0;

for (const file of files) {
  const sourcePath = path.join(publicDirectory, file);
  const html = await readFile(sourcePath, "utf8");
  const match = /(<script\s+type=["']application\/ld\+json["'][^>]*>)([\s\S]*?)(<\/script>)/i.exec(html);
  if (!match) continue;

  const document = JSON.parse(match[2]);
  let graph = document["@graph"] ?? [];
  let changed = false;

  const webPage = graph.find((node) => hasType(node, "WebPage"));
  const title = pageTitle(html);
  const description = metaDescription(html);
  if (webPage) {
    if (title) webPage.name = title;
    if (description) webPage.description = description;
    changed = true;
  }

  for (const organization of graph.filter((node) => hasType(node, "Organization"))) {
    organization.description = "Residential plumbing for Indianapolis and nearby communities. Owner-led.";
    delete organization.priceRange;
    // Business hours confirmed by the owner on 2026-09-16; visits by appointment.
    organization.openingHoursSpecification = {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "17:00",
      description: "Visits by appointment.",
    };
    changed = true;
  }

  // Estimates are deliberately kept out of search markup until the owner has
  // approved an effective date, scope, and terms for every published price.
  if (file === "services.html") {
    graph = graph.filter((node) => !hasType(node, "OfferCatalog"));
    for (const service of graph.filter((node) => hasType(node, "Service"))) {
      delete service.hasOfferCatalog;
    }
    document["@graph"] = graph;
    changed = true;
  }

  for (const person of graph.filter((node) => hasType(node, "Person") && node.name === "David Kropczynski")) {
    person.knowsAbout = davidExpertise;
    changed = true;
  }

  let faqPage = graph.find((node) => hasType(node, "FAQPage"));
  const faqs = visibleFaqs(html);
  if (faqs.length > 0) {
    if (!faqPage) {
      const pageUrl = webPage?.url;
      faqPage = {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntityOfPage: webPage?.["@id"] ? { "@id": webPage["@id"] } : undefined,
      };
      graph.push(faqPage);
    }
    faqPage.mainEntity = faqs.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    }));
    changed = true;
  }

  const article = graph.find((node) => hasType(node, "BlogPosting") || hasType(node, "Article"));
  if (article) {
    const headline = textFromHtml(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i.exec(html)?.[1] ?? "");
    const dateModified = visibleUpdatedDate(html);
    if (headline) article.headline = headline;
    if (description) article.description = description;
    if (dateModified) article.dateModified = dateModified;
    article.wordCount = String(mainWordCount(html));
    changed = true;
  }

  if (file === "flood-prevention-sump-pumps.html") {
    const organization = graph.find((node) => hasType(node, "Organization"));
    const person = graph.find((node) => hasType(node, "Person") && node.name === "David Kropczynski");
    const service = graph.find((node) => hasType(node, "Service"));
    if (organization) organization.areaServed = serviceAreas;
    if (person) person.hasCredential = davidCredential;
    if (service) service.areaServed = serviceAreas;
    changed = true;
  }

  if (changed) {
    const indentation = file === "flood-prevention-sump-pumps.html" ? 2 : undefined;
    const serializedDocument = JSON.stringify(document, null, indentation);
    if (serializedDocument !== match[2]) {
      const updatedHtml = html.replace(match[0], `${match[1]}${serializedDocument}${match[3]}`);
      await writeFile(sourcePath, updatedHtml);
      changedFiles += 1;
    }
  }
}

console.log(`Synchronized visible FAQ and article schema content in ${changedFiles} page(s).`);
