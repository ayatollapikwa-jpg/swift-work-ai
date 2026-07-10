# AI Workplace Productivity Assistant

A no-login, privacy-first AI assistant that helps professionals draft emails, summarize research, and get workplace guidance on demand. No accounts, no personal data, no stored history — every session is ephemeral.

## Project Overview

This app gives anyone instant access to three focused AI tools designed for the workplace. Users can open the site and immediately start generating content — nothing is saved, nothing is tracked, and no sign-up is required. The interface uses a warm olive-green and brown palette with a collapsible sidebar for easy navigation between tools.

## Features Implemented

- **Smart Email Generator** — Produces professional emails from a recipient, subject, purpose, optional notes, and a chosen tone (Formal, Friendly, or Persuasive).
- **AI Research Assistant** — Turns a topic or pasted text into a structured markdown report (Executive Summary, Key Findings, Insights, Opportunities, Risks, Recommendations, Conclusion) at Quick, Detailed, or Executive depth.
- **AI Workplace Chat Assistant** — Ephemeral chat for workplace questions: communication, writing, productivity, meeting prep, business terminology, and more. History clears on refresh.
- **Reusable output panel** — Every generated result supports Copy, Download (.txt), and Regenerate.
- **Collapsible sidebar navigation** — Quick access to Home, Email, Research, Chat, and Privacy.
- **Privacy page** — Clear privacy statement and responsible-AI disclaimer.
- **Per-route SEO metadata** — Unique title, description, and social tags on every page.
- **Olive-green + brown design system** — Custom tokens, serif display headings, warm parchment backgrounds, and full light/dark support.

## Privacy Guarantees

- No authentication, no user accounts.
- No database writes and no server-side logging of prompts or outputs.
- No `localStorage` or `sessionStorage` persistence of conversations or generated content.
- All state lives in memory for the current session only.

## Technologies and Tools Used

- **Framework:** TanStack Start v1 (React 19, file-based routing, server functions)
- **Build tool:** Vite 7
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4 with custom design tokens in `src/styles.css`
- **UI primitives:** shadcn/ui (Button, Card, Input, Textarea, Select, Sidebar, Toaster, etc.)
- **Icons:** lucide-react
- **Typography:** Playfair Display (headings) + Inter (body)
- **Validation:** Zod
- **AI:** Lovable AI Gateway using `google/gemini-2.5-flash` via the `ai` SDK
- **Backend runtime:** Lovable Cloud (server functions only — no database tables)
- **Deployment target:** Cloudflare Workers (edge)

## Project Structure

```
src/
  routes/
    __root.tsx        # App shell, sidebar provider, global SEO
    index.tsx         # Dashboard with hero + tool cards
    email.tsx         # Smart Email Generator
    research.tsx      # AI Research Assistant
    chat.tsx          # AI Workplace Chat Assistant
    privacy.tsx       # Privacy statement + AI disclaimer
  components/
    AppSidebar.tsx    # Collapsible sidebar navigation
    GeneratedOutput.tsx  # Copy / Download / Regenerate panel
    SiteFooter.tsx
  lib/
    ai.functions.ts       # Server functions (email, research, chat)
    ai-gateway.server.ts  # Lovable AI Gateway provider
  styles.css          # Olive/brown design tokens
```

## Setup Instructions

### Prerequisites

- [Bun](https://bun.sh) (recommended) or Node.js 20+
- A `LOVABLE_API_KEY` environment variable for the AI Gateway (automatically provisioned when running inside Lovable Cloud)

### Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd <project-directory>
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Configure environment variables**
   Create a `.env` file in the project root:
   ```bash
   LOVABLE_API_KEY=your_lovable_ai_gateway_key
   ```

4. **Start the dev server**
   ```bash
   bun run dev
   ```
   The app will be available at `http://localhost:8080`.

5. **Build for production**
   ```bash
   bun run build
   ```

### Deploying

The app is designed to run on Cloudflare Workers via Lovable's hosting. Click **Publish** in the Lovable editor to deploy the latest build.

## Responsible AI

AI responses may occasionally be inaccurate or incomplete. Always review generated content before using it in professional contexts.

## License

MIT