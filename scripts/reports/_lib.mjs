/**
 * Shared utilities for the 6.2 report scripts.
 *
 * All four reports follow the same pattern:
 *   1. Pull data from one or more APIs (Vercel, Fathom, GSC, Stripe, Shopify, etc.)
 *   2. Format as Markdown
 *   3. Send to a destination (Notion DB page + Telegram message)
 *
 * This module centralizes the "send" paths and the env-var validation.
 * Each individual report lives in scripts/reports/<name>.mjs and calls
 * these helpers.
 */

async function sendTelegram(text) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    return { ok: false, error: "TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not set" };
  }
  // Telegram messages are capped at 4096 chars. Truncate with a notice if longer.
  const truncated = text.length > 4000 ? text.slice(0, 3950) + "\n\n…(truncated)" : text;
  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: truncated,
        parse_mode: "Markdown",
        disable_web_page_preview: true,
      }),
    });
    const json = await res.json();
    if (!res.ok || !json.ok) {
      return { ok: false, error: json.description ?? `HTTP ${res.status}` };
    }
    return { ok: true, messageId: json.result?.message_id };
  } catch (err) {
    return { ok: false, error: err?.message ?? String(err) };
  }
}

async function appendToNotion(input) {
  const apiKey = process.env.NOTION_API_KEY;
  if (!apiKey) return { ok: false, error: "NOTION_API_KEY not set" };

  const blocks = markdownToNotionBlocks(input.body);

  try {
    const res = await fetch("https://api.notion.com/v1/pages", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        parent: { database_id: input.parentDatabaseId },
        properties: {
          Name: {
            title: [{ text: { content: input.title } }],
          },
          ...(input.properties ?? {}),
        },
        children: blocks,
      }),
    });
    const json = await res.json();
    if (!res.ok || json.object !== "page") {
      return { ok: false, error: json.message ?? `HTTP ${res.status}` };
    }
    return { ok: true, pageId: json.id };
  } catch (err) {
    return { ok: false, error: err?.message ?? String(err) };
  }
}

function markdownToNotionBlocks(md) {
  // Minimal Markdown -> Notion block conversion. Handles:
  //   - # / ## / ### headings
  //   - Paragraphs
  //   - Bulleted lists (- )
  //   - Code blocks (```)
  // Anything more complex (images, nested lists, etc.) → caller should use
  // a dedicated Markdown parser.
  const lines = md.split("\n");
  const blocks = [];
  let inCode = false;
  let codeLang = "plain text";
  let codeBuf = [];
  let inList = false;

  const flushList = () => {
    inList = false;
  };

  for (const line of lines) {
    if (line.startsWith("```")) {
      if (inCode) {
        blocks.push({
          object: "block",
          type: "code",
          code: { language: codeLang, rich_text: [{ type: "text", text: { content: codeBuf.join("\n") } }] },
        });
        codeBuf = [];
        inCode = false;
      } else {
        flushList();
        codeLang = line.slice(3).trim() || "plain text";
        inCode = true;
      }
      continue;
    }
    if (inCode) {
      codeBuf.push(line);
      continue;
    }
    if (line.startsWith("# ")) {
      flushList();
      blocks.push({
        object: "block",
        type: "heading_1",
        heading_1: { rich_text: [{ type: "text", text: { content: line.slice(2) } }] },
      });
    } else if (line.startsWith("## ")) {
      flushList();
      blocks.push({
        object: "block",
        type: "heading_2",
        heading_2: { rich_text: [{ type: "text", text: { content: line.slice(3) } }] },
      });
    } else if (line.startsWith("### ")) {
      flushList();
      blocks.push({
        object: "block",
        type: "heading_3",
        heading_3: { rich_text: [{ type: "text", text: { content: line.slice(4) } }] },
      });
    } else if (line.startsWith("- ")) {
      inList = true;
      blocks.push({
        object: "block",
        type: "bulleted_list_item",
        bulleted_list_item: { rich_text: [{ type: "text", text: { content: line.slice(2) } }] },
      });
    } else if (line.trim() === "") {
      flushList();
    } else {
      flushList();
      blocks.push({
        object: "block",
        type: "paragraph",
        paragraph: { rich_text: [{ type: "text", text: { content: line } }] },
      });
    }
  }
  return blocks;
}

/**
 * Validate that the required env vars are present. Returns the list of
 * missing keys, or [] if all good.
 */
function requireEnv(keys) {
  return keys.filter((k) => !process.env[k]);
}

/** Format a number as a percentage. */
function pct(n, decimals = 1) {
  return `${(n * 100).toFixed(decimals)}%`;
}

/** Format a delta with sign + percentage. */
function deltaPct(prev, curr) {
  if (prev === 0) return curr === 0 ? "0%" : "+∞";
  const d = (curr - prev) / prev;
  const sign = d >= 0 ? "+" : "";
  return `${sign}${(d * 100).toFixed(1)}%`;
}

export { sendTelegram, appendToNotion, requireEnv, pct, deltaPct };
