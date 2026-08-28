import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const AiInput = z.object({
  system: z.string().min(1),
  prompt: z.string().min(1).max(20000),
});

type ResponsesPayload = {
  output_text?: string;
  output?: Array<{ content?: Array<{ type?: string; text?: string }> }>;
};

function extractText(payload: ResponsesPayload): string {
  if (typeof payload.output_text === "string" && payload.output_text.trim()) {
    return payload.output_text;
  }
  const parts: string[] = [];
  for (const item of payload.output ?? []) {
    for (const c of item.content ?? []) {
      if (c.type === "output_text" && c.text) parts.push(c.text);
    }
  }
  return parts.join("\n").trim();
}

export const runAi = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => AiInput.parse(data))
  .handler(async ({ data }) => {
    const key = process.env["LOVABLE_API_KEY"];
    if (!key) throw new Error("AI is not configured yet.");

    const res = await fetch("https://ai.gateway.lovable.dev/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Lovable-API-Key": key,
      },
      body: JSON.stringify({
        model: "openai/gpt-5.6-sol",
        input: [
          { role: "system", content: data.system },
          { role: "user", content: data.prompt },
        ],
      }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      if (res.status === 429)
        throw new Error("The assistant is busy right now. Please try again in a moment.");
      if (res.status === 402)
        throw new Error("AI credits are exhausted. Please add credits to continue using AI tools.");
      if (res.status === 403)
        throw new Error("AI access is blocked for this workspace. Please contact the administrator.");
      throw new Error(`AI request failed (${res.status}). ${detail.slice(0, 200)}`);
    }

    const payload = (await res.json()) as ResponsesPayload;
    const text = extractText(payload);
    return { text: text || "No response was generated. Please rephrase and try again." };
  });
