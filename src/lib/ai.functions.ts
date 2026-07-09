import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const MODEL = "google/gemini-2.5-flash";

async function getModel() {
  const key = process.env.LOVABLE_API_KEY;
  if (!key) throw new Error("Missing LOVABLE_API_KEY");
  const { createLovableAiGatewayProvider } = await import("./ai-gateway.server");
  const gateway = createLovableAiGatewayProvider(key);
  return gateway(MODEL);
}

const EmailInput = z.object({
  recipient: z.string().min(1),
  subject: z.string().min(1),
  purpose: z.string().min(1),
  notes: z.string().optional().default(""),
  tone: z.enum(["Formal", "Friendly", "Persuasive"]),
});

export const generateEmail = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => EmailInput.parse(input))
  .handler(async ({ data }) => {
    const { generateText } = await import("ai");
    const model = await getModel();
    const { text } = await generateText({
      model,
      system:
        "You are an experienced workplace communication specialist. Generate a professional email using the information provided. The email must include: an appropriate greeting, a clear introduction, a professional and concise body, any requested details, a polite call to action, and a professional closing. Maintain the requested tone throughout. Output only the email text — no preamble, no markdown code fences.",
      prompt: `Recipient: ${data.recipient}
Subject: ${data.subject}
Purpose: ${data.purpose}
Additional instructions: ${data.notes || "(none)"}
Tone: ${data.tone}`,
    });
    return { text };
  });

const ResearchInput = z.object({
  topic: z.string().min(1),
  level: z.enum(["Quick", "Detailed", "Executive"]),
});

export const generateResearch = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => ResearchInput.parse(input))
  .handler(async ({ data }) => {
    const { generateText } = await import("ai");
    const model = await getModel();
    const levelHint =
      data.level === "Quick"
        ? "Provide a concise overview of the main points."
        : data.level === "Detailed"
        ? "Provide a comprehensive explanation of key ideas and supporting information."
        : "Provide a professional business summary suitable for managers and decision-makers.";
    const { text } = await generateText({
      model,
      system:
        "You are an experienced business research analyst. Analyze the supplied information and produce a structured markdown report with these sections in order: Executive Summary, Key Findings, Important Insights, Opportunities, Risks or Challenges, Practical Recommendations, Conclusion. Use professional business language. Do not wrap the output in code fences.",
      prompt: `Summary level: ${data.level}. ${levelHint}

Topic or source text:
${data.topic}`,
    });
    return { text };
  });

const ChatInput = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string(),
      }),
    )
    .min(1),
});

export const chatReply = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => ChatInput.parse(input))
  .handler(async ({ data }) => {
    const { generateText } = await import("ai");
    const model = await getModel();
    const { text } = await generateText({
      model,
      system:
        "You are an intelligent workplace productivity assistant. Provide helpful, accurate, and professional responses. You assist users with workplace communication, professional writing, research summaries, productivity advice, business terminology, report writing, time management, meeting preparation, and general office support. Respond clearly, professionally, and concisely.",
      messages: data.messages,
    });
    return { text };
  });