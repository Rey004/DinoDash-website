/**
 * /api/feedback — receives the JSON payload from the website's
 * `/feedback` form and writes it into the matching Airtable table.
 *
 * Routing is by `body.type`:
 *   - "bug"      → AIRTABLE_BUGS_TABLE
 *   - "feedback" → AIRTABLE_FEEDBACK_TABLE
 *   - "feature"  → AIRTABLE_FEATURES_TABLE
 *
 * Screenshots:
 *   The form sends `body.screenshot` as a base64 data URI. We create
 *   the record first, then (for bugs only) call Airtable's content
 *   upload endpoint to push the image into the Screenshot attachment
 *   column. Limit per the API: 5 MB.
 *
 * Env vars expected (see .env.local.example):
 *   AIRTABLE_TOKEN, AIRTABLE_BASE_ID,
 *   AIRTABLE_BUGS_TABLE, AIRTABLE_FEEDBACK_TABLE, AIRTABLE_FEATURES_TABLE,
 *   AIRTABLE_BUGS_SCREENSHOT_FIELD  (optional — needed only if you want
 *                                    inline screenshots for bug rows)
 */

const TABLE_BY_TYPE = {
  bug: process.env.AIRTABLE_BUGS_TABLE,
  feedback: process.env.AIRTABLE_FEEDBACK_TABLE,
  feature: process.env.AIRTABLE_FEATURES_TABLE,
};

const PRIORITY_LABEL = {
  nice: "Nice to have",
  daily: "Would use daily",
  "game-changer": "Game changer",
};

const MAX_ATTACHMENT_BYTES = 5 * 1024 * 1024; // Airtable's 5 MB limit

export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const table = TABLE_BY_TYPE[body.type];
  if (!table) {
    return Response.json(
      { error: `Unknown feedback type: ${body.type}` },
      { status: 400 }
    );
  }

  const baseId = process.env.AIRTABLE_BASE_ID;
  const token = process.env.AIRTABLE_TOKEN;
  if (!baseId || !token) {
    console.error(
      "[feedback] Missing AIRTABLE_BASE_ID or AIRTABLE_TOKEN env vars"
    );
    return Response.json(
      { error: "Server is missing Airtable configuration" },
      { status: 500 }
    );
  }

  // 1) create the row
  const fields = mapFields(body);

  let createRes;
  try {
    createRes = await fetch(
      `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(table)}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ records: [{ fields }], typecast: true }),
      }
    );
  } catch (err) {
    console.error("[feedback] Airtable fetch failed:", err);
    return Response.json(
      { error: "Could not reach Airtable" },
      { status: 502 }
    );
  }

  if (!createRes.ok) {
    const text = await createRes.text().catch(() => "");
    console.error(
      "[feedback] Airtable rejected the row:",
      createRes.status,
      text
    );
    let detail = text;
    try {
      const parsed = JSON.parse(text);
      detail = parsed?.error?.message || parsed?.error?.type || text;
    } catch {}
    return Response.json(
      { error: `Airtable error (${createRes.status}): ${detail}` },
      { status: 502 }
    );
  }

  // 2) attach screenshot for bugs (best-effort — failure here doesn't
  //    fail the whole submission, the row is already saved)
  if (body.type === "bug" && body.screenshot?.base64) {
    try {
      const created = await createRes.json();
      const recordId = created?.records?.[0]?.id;
      const fieldId = process.env.AIRTABLE_BUGS_SCREENSHOT_FIELD;
      if (recordId && fieldId) {
        await uploadScreenshot({
          baseId,
          recordId,
          fieldId,
          token,
          screenshot: body.screenshot,
        });
      } else if (recordId && !fieldId) {
        console.warn(
          "[feedback] Skipping screenshot upload — set AIRTABLE_BUGS_SCREENSHOT_FIELD in .env.local"
        );
      }
    } catch (err) {
      console.error("[feedback] Screenshot upload failed:", err);
    }
  }

  return Response.json({ ok: true });
}

/* ------------------------------------------------------------------ */
/*  field mapping                                                     */
/* ------------------------------------------------------------------ */

function mapFields(body) {
  const common = {
    "Submitted At": body.meta?.submittedAt || new Date().toISOString(),
    Name: body.name || "",
    Email: body.email || "",
  };

  if (body.type === "bug") {
    return {
      ...common,
      Description: body.description || "",
      Expected: body.expected || "",
      Areas: body.areas || [],
      // Screenshot is added by the upload endpoint after the row exists.
    };
  }

  if (body.type === "feedback") {
    return {
      ...common,
      Message: body.message || "",
      Areas: body.areas || [],
      Vibe: body.vibe || null,
    };
  }

  // feature
  return {
    ...common,
    Description: body.description || "",
    Why: body.why || "",
    Areas: body.areas || [],
    Priority: PRIORITY_LABEL[body.priority] || "",
  };
}

/* ------------------------------------------------------------------ */
/*  screenshot upload                                                 */
/* ------------------------------------------------------------------ */

async function uploadScreenshot({
  baseId,
  recordId,
  fieldId,
  token,
  screenshot,
}) {
  // base64 from the form looks like "data:image/png;base64,iVBORw0..."
  const raw = screenshot.base64 || "";
  const match = raw.match(/^data:([^;]+);base64,(.+)$/);
  if (!match) {
    console.warn("[feedback] Screenshot base64 was not a data URI, skipping.");
    return;
  }

  const contentType = match[1];
  const base64 = match[2];

  // approximate decoded size
  const bytes = Math.floor((base64.length * 3) / 4);
  if (bytes > MAX_ATTACHMENT_BYTES) {
    console.warn(
      `[feedback] Screenshot is ${(bytes / 1024 / 1024).toFixed(2)} MB — over Airtable's 5 MB limit. Skipping.`
    );
    return;
  }

  const url = `https://content.airtable.com/v0/${baseId}/${recordId}/${fieldId}/uploadAttachment`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contentType,
      file: base64,
      filename: screenshot.name || "screenshot",
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Upload failed (${res.status}). ${text}`.trim());
  }
}
