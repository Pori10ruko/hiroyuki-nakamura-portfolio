import { getStore } from "@netlify/blobs";

export default async function handler(req, context) {
  if (req.method === "OPTIONS") {
    return new Response("", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  if (req.method !== "POST") {
    return new Response("", { status: 405 });
  }

  try {
    const body = await req.json();
    const page = body.page || "/";
    const referrer = body.referrer || "";

    const country = context.geo?.country?.code || "??";
    const city = context.geo?.city || "";
    const ip = context.ip || "";
    const ua = req.headers.get("user-agent") || "";

    const now = new Date();
    const key =
      now.toISOString().replace(/[:.]/g, "-") +
      "_" +
      Math.random().toString(36).slice(2, 6);

    const store = getStore("site-events");
    await store.setJSON(key, {
      page,
      country,
      city,
      ip,
      ua: ua.slice(0, 120),
      referrer,
      ts: now.toISOString(),
    });

    return new Response(JSON.stringify({ ok: true }), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (e) {
    console.error("Track error:", e);
    return new Response(JSON.stringify({ ok: false }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }
}
