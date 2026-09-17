import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function renderRoot() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("redirects the application root to the static homepage", async () => {
  const response = await renderRoot();
  assert.equal(response.status, 307);
  assert.equal(response.headers.get("location"), "http://localhost/index.html");
});

test("includes a distinct, indexed Zionsville service-area page", async () => {
  const [page, areas, sitemap, llms] = await Promise.all([
    readFile(new URL("../public/plumber-zionsville.html", import.meta.url), "utf8"),
    readFile(new URL("../public/areas.html", import.meta.url), "utf8"),
    readFile(new URL("../public/sitemap.xml", import.meta.url), "utf8"),
    readFile(new URL("../public/llms.txt", import.meta.url), "utf8"),
    access(new URL("../public/assets/areas/area-zionsville.jpg", import.meta.url)),
  ]);

  assert.match(page, /Plumber in Zionsville, IN/);
  assert.match(page, /historic Village/);
  assert.match(page, /Citizens Water/);
  assert.match(page, /Whitestown/);
  assert.match(page, /19 grains per gallon/);
  assert.match(page, /Eagle Creek/);
  assert.match(areas, /href="plumber-zionsville\.html"/);
  assert.match(sitemap, /plumber-zionsville\.html/);
  assert.match(llms, /Plumber in Zionsville, IN/);
});
