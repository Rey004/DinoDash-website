/**
 * Feedback submission helper.
 *
 * Reads `NEXT_PUBLIC_FEEDBACK_ENDPOINT` at runtime and posts a JSON
 * payload to it. The endpoint can be:
 *   - a Tally webhook URL
 *   - your own thin proxy that writes to Airtable / Notion / etc
 *
 * If the env var isn't set, we resolve successfully after a short
 * delay so the UI can be tested locally without a live endpoint.
 *
 * The payload always includes a `type` field so the receiving service
 * can route bug / feedback / feature submissions into different lists.
 *
 * See `docs/feedback-integrations.md` for setup.
 */

export async function submitFeedback(payload) {
  const endpoint = process.env.NEXT_PUBLIC_FEEDBACK_ENDPOINT;

  // Dev fallback — pretend we sent it.
  if (!endpoint) {
    console.warn(
      "[feedback] NEXT_PUBLIC_FEEDBACK_ENDPOINT is not configured. Logging payload only."
    );
    console.info("[feedback] payload:", payload);
    await wait(800);
    return { ok: true, mocked: true };
  }

  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...payload,
      meta: {
        userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
        url: typeof window !== "undefined" ? window.location.href : "",
        submittedAt: new Date().toISOString(),
      },
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Submit failed (${res.status}). ${text}`.trim());
  }

  return { ok: true, mocked: false };
}

function wait(ms) {
  return new Promise((r) => setTimeout(r, ms));
}
