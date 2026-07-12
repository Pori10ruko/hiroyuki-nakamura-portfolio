import { getStore } from "@netlify/blobs";

const PASS = process.env.STATS_PASSWORD || "nkmr2026stats";

export default async function handler(req) {
  const url = new URL(req.url);
  const pass = url.searchParams.get("p");

  if (pass !== PASS) {
    return new Response("Unauthorized. Add ?p=YOUR_PASSWORD", {
      status: 401,
      headers: { "Content-Type": "text/plain" },
    });
  }

  try {
    const store = getStore("site-events");
    const { blobs } = await store.list();

    const events = [];
    for (const blob of blobs) {
      try {
        const data = await store.get(blob.key, { type: "json" });
        if (data) events.push(data);
      } catch (e) {}
    }

    // Sort newest first
    events.sort((a, b) => (b.ts || "").localeCompare(a.ts || ""));

    // Filter out owner (Yokohama) and bots (Ashburn)
    const excludeCities = ["yokohama", "ashburn"];
    const filtered = events.filter(
      (e) => !excludeCities.includes((e.city || "").toLowerCase())
    );

    // Compute stats
    const totalViews = filtered.length;
    const uniqueIPs = new Set(filtered.map((e) => e.ip).filter(Boolean)).size;

    // By country
    const countryCounts = {};
    for (const e of filtered) {
      const c = e.country || "??";
      if (!countryCounts[c]) countryCounts[c] = 0;
      countryCounts[c]++;
    }
    const byCountry = Object.entries(countryCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 30);

    // By page
    const pageCounts = {};
    for (const e of filtered) {
      const p = e.page || "/";
      pageCounts[p] = (pageCounts[p] || 0) + 1;
    }
    const byPage = Object.entries(pageCounts).sort((a, b) => b[1] - a[1]);

    // By day (JST)
    const dayCounts = {};
    for (const e of filtered) {
      if (!e.ts) continue;
      const d = new Date(e.ts);
      d.setHours(d.getHours() + 9);
      const day = d.toISOString().slice(0, 10);
      dayCounts[day] = (dayCounts[day] || 0) + 1;
    }
    const byDay = Object.entries(dayCounts)
      .sort((a, b) => b[0].localeCompare(a[0]))
      .slice(0, 14);

    // By referrer
    const refCounts = {};
    for (const e of filtered) {
      if (!e.referrer) continue;
      try {
        const host = new URL(e.referrer).hostname || e.referrer;
        refCounts[host] = (refCounts[host] || 0) + 1;
      } catch {
        refCounts[e.referrer] = (refCounts[e.referrer] || 0) + 1;
      }
    }
    const byRef = Object.entries(refCounts).sort((a, b) => b[1] - a[1]).slice(0, 20);

    // Recent 50 (unfiltered for debugging)
    const recent = events.slice(0, 50);

    function fmtTime(ts) {
      if (!ts) return "\u2014";
      const d = new Date(ts);
      d.setHours(d.getHours() + 9);
      return (
        (d.getMonth() + 1) +
        "/" +
        d.getDate() +
        " " +
        String(d.getHours()).padStart(2, "0") +
        ":" +
        String(d.getMinutes()).padStart(2, "0")
      );
    }

    const html = `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow">
<title>Site Stats</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:-apple-system,sans-serif;background:#111;color:#ccc;padding:2rem;font-size:14px}
h1{font-size:1.1rem;color:#fff;margin-bottom:.3rem;font-weight:400;letter-spacing:0.1em}
.sub{font-size:.7rem;color:#666;margin-bottom:1.5rem}
.cards{display:flex;gap:1rem;flex-wrap:wrap;margin-bottom:2rem}
.card{background:#1a1a1a;padding:1.2rem 1.5rem;border:1px solid #333;min-width:140px}
.card-n{font-size:2rem;color:#fff;font-weight:300}
.card-l{font-size:.65rem;color:#888;text-transform:uppercase;letter-spacing:.12em;margin-top:.3rem}
h2{font-size:.7rem;color:#888;text-transform:uppercase;letter-spacing:.15em;margin:2rem 0 .8rem;font-weight:500}
table{width:100%;border-collapse:collapse;margin-bottom:1rem}
th{text-align:left;font-size:.6rem;color:#666;text-transform:uppercase;letter-spacing:.1em;padding:.5rem .6rem;border-bottom:1px solid #333;font-weight:500}
td{padding:.4rem .6rem;border-bottom:1px solid #222;font-size:.82rem}
.mono{font-family:monospace;font-size:.75rem;color:#888}
</style></head><body>
<h1>NAKAMURA HIROYUKI — Site Analytics</h1>
<p class="sub">Excluding: Yokohama (owner), Ashburn (bots) &mdash; ${events.length} total, ${filtered.length} after filter</p>
<div class="cards">
  <div class="card"><div class="card-n">${totalViews}</div><div class="card-l">Page Views</div></div>
  <div class="card"><div class="card-n">${uniqueIPs}</div><div class="card-l">Unique Visitors</div></div>
</div>

<h2>By Day (JST)</h2>
<table><tr><th>Date</th><th>Views</th></tr>
${byDay.map(([day, n]) => `<tr><td>${day}</td><td>${n}</td></tr>`).join("")}
</table>

<h2>By Country</h2>
<table><tr><th>Country</th><th>Views</th></tr>
${byCountry.map(([c, n]) => `<tr><td>${c}</td><td>${n}</td></tr>`).join("")}
</table>

<h2>By Page</h2>
<table><tr><th>Page</th><th>Views</th></tr>
${byPage.map(([p, n]) => `<tr><td>${p}</td><td>${n}</td></tr>`).join("")}
</table>

<h2>By Referrer</h2>
<table><tr><th>Source</th><th>Views</th></tr>
${byRef.length ? byRef.map(([r, n]) => `<tr><td>${r}</td><td>${n}</td></tr>`).join("") : `<tr><td colspan="2" style="color:#666">No referrer data yet</td></tr>`}
</table>

<h2>Recent Events (50)</h2>
<table><tr><th>Time (JST)</th><th>Page</th><th>Country</th><th>City</th><th>Referrer</th><th>IP</th></tr>
${recent.map(e => `<tr>
  <td class="mono">${fmtTime(e.ts)}</td>
  <td>${e.page || "/"}</td>
  <td>${e.country || "\u2014"}</td>
  <td>${e.city || "\u2014"}</td>
  <td class="mono">${e.referrer ? e.referrer.slice(0, 30) : "\u2014"}</td>
  <td class="mono">${(e.ip || "").slice(0, 12)}</td>
</tr>`).join("")}
</table>
</body></html>`;

    return new Response(html, {
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  } catch (e) {
    console.error("Stats error:", e);
    return new Response("Error: " + e.message, { status: 500 });
  }
}
