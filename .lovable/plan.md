# AI Workplace Productivity Assistant — Build Plan

A no-login, privacy-first productivity app with three AI tools, styled in an olive-green and warm-brown palette.

## Scope

- No auth, no accounts, no persisted user data.
- Each session is ephemeral (in-memory React state only; no localStorage of chats).
- AI powered by Lovable AI Gateway (free defaults; no keys asked from user).

## Design System

Update `src/styles.css` with an olive/brown token set (light + dark), warm neutral background, serif display + clean sans body.

- `--primary`: olive green (e.g. oklch(~0.48 0.09 130))
- `--accent` / secondary: warm brown (e.g. oklch(~0.42 0.08 55))
- `--background`: warm off-white / parchment (light), deep brown (dark)
- Gradients + soft shadows using olive→brown for hero and card accents.
- Typography: Playfair Display (headings) + Inter (body), loaded via `<link>` in `__root.tsx`.

## Routes (TanStack Start, file-based)

```
src/routes/
  __root.tsx          # global head, fonts, nav shell, Toaster
  index.tsx           # Landing / Dashboard (welcome + 3 tool cards)
  email.tsx           # Smart Email Generator
  research.tsx        # AI Research Assistant
  chat.tsx            # AI Workplace Chat Assistant
  privacy.tsx         # Privacy statement + Responsible AI disclaimer
```

Each route sets its own `head()` with unique title/description/OG tags. Shared header (logo + nav links) and footer live in `__root.tsx`.

## Components

- `src/components/SiteHeader.tsx`, `SiteFooter.tsx`
- `src/components/ToolCard.tsx` (dashboard tiles)
- `src/components/GeneratedOutput.tsx` — editable textarea + Copy / Download / Regenerate buttons (reused by Email + Research)
- `src/components/ChatMessages.tsx` — message list with streaming assistant bubbles
- shadcn primitives already available (Button, Input, Textarea, Select, Card, Tabs, Toaster).

## Feature Behavior

**Smart Email Generator (`/email`)**
- Form: Recipient, Subject, Purpose, Additional Instructions, Tone (Formal / Friendly / Persuasive).
- Calls server function → Lovable AI Gateway with the provided system prompt.
- Streams result into an editable textarea; Copy, Download (.txt), Regenerate.

**AI Research Assistant (`/research`)**
- Form: Topic/text + Summary Level (Quick / Detailed / Executive).
- Server function returns structured markdown (Executive Summary, Key Findings, Insights, Opportunities, Risks, Recommendations, Conclusion).
- Editable output; Copy, Download, Regenerate.

**AI Chat Assistant (`/chat`)**
- Ephemeral message list in React state (cleared on refresh/navigate).
- Example question chips that prefill the input.
- Streaming responses.

**Privacy Page (`/privacy`)**
- Static content from the brief: privacy statement + Responsible AI disclaimer.

## Backend (Lovable Cloud + AI Gateway)

Enable Lovable Cloud so we can use the AI Gateway (Cloud is the mechanism; no DB tables needed).

Server functions in `src/lib/ai.functions.ts`:
- `generateEmail({ recipient, subject, purpose, notes, tone })`
- `generateResearch({ topic, level })`
- `chat({ messages })` — streams a response

All three call the AI Gateway with `google/gemini-2.5-flash` (default free model) and the exact system prompts from the brief. No database writes; nothing persisted server-side beyond the request lifecycle.

## Privacy Guarantees (enforced in code)

- No localStorage / sessionStorage of prompts or outputs.
- No DB tables created.
- Server functions don't log request bodies.
- Footer + dedicated Privacy page reinforce the guarantees.

## Out of Scope

- Auth, user accounts, saved history.
- Payments, file uploads, document parsing.
- Analytics.

## Deliverables Checklist

1. Enable Lovable Cloud.
2. Olive/brown design tokens in `src/styles.css` + font `<link>` in `__root.tsx`.
3. Header/Footer + updated root metadata.
4. Dashboard (`/`) with 3 tool cards + hero.
5. `/email`, `/research`, `/chat`, `/privacy` routes with per-route SEO head.
6. Server functions wired to Lovable AI Gateway with the provided system prompts.
7. Reusable editable-output component with Copy / Download / Regenerate.
