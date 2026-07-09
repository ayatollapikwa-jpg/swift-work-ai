import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, AlertTriangle } from "lucide-react";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy — AI Workplace Productivity Assistant" },
      {
        name: "description",
        content:
          "No accounts, no sign-in, no personal information, no stored chat history. Each session is independent.",
      },
      { property: "og:title", content: "Privacy — AI Workplace Assistant" },
      {
        property: "og:description",
        content: "How this privacy-first AI assistant handles your data — the short answer is: it doesn't.",
      },
    ],
  }),
  component: PrivacyPage,
});

const guarantees = [
  "No account creation is required.",
  "No registration is required.",
  "No sign-in is required.",
  "No passwords are collected.",
  "No personal information is requested.",
  "No user credentials are stored.",
  "No chat history is permanently saved.",
];

function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-accent font-medium">
        <ShieldCheck className="w-4 h-4" /> Privacy statement
      </div>
      <h1 className="font-serif text-4xl text-foreground mt-3">Your privacy matters</h1>
      <p className="text-muted-foreground mt-4">
        This application is designed with privacy in mind. You can access every AI feature
        immediately, without providing any personal information.
      </p>

      <ul className="mt-8 space-y-2">
        {guarantees.map((g) => (
          <li
            key={g}
            className="flex items-start gap-3 rounded-md border border-border bg-card px-4 py-3"
          >
            <ShieldCheck className="w-4 h-4 mt-0.5 text-primary shrink-0" />
            <span className="text-foreground text-sm">{g}</span>
          </li>
        ))}
      </ul>

      <p className="text-muted-foreground mt-8 text-sm">
        Each session is independent. Please save any generated content before leaving the
        application — it will not be available later.
      </p>

      <div className="mt-12 rounded-xl border border-accent/40 bg-accent/5 p-6">
        <div className="flex items-center gap-2 text-accent font-medium">
          <AlertTriangle className="w-4 h-4" />
          Responsible AI disclaimer
        </div>
        <p className="text-sm text-foreground mt-3 leading-relaxed">
          Artificial intelligence can occasionally produce inaccurate, incomplete, or outdated
          information. Please review and verify all AI-generated content before using it for
          professional, legal, financial, academic, or business purposes. The AI Workplace
          Productivity Assistant is intended to support decision-making, not replace professional
          judgement.
        </p>
      </div>
    </div>
  );
}