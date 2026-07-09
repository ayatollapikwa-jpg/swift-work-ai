import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, BookOpen, MessagesSquare, ShieldCheck, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

const tools = [
  {
    to: "/email",
    icon: Mail,
    title: "Smart Email Generator",
    description: "Create professional, polished emails in seconds using AI.",
  },
  {
    to: "/research",
    icon: BookOpen,
    title: "AI Research Assistant",
    description:
      "Generate concise summaries, insights, and practical recommendations from workplace topics or articles.",
  },
  {
    to: "/chat",
    icon: MessagesSquare,
    title: "AI Chat Assistant",
    description: "Ask workplace-related questions and get intelligent, conversational responses instantly.",
  },
] as const;

function Index() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 -z-10 opacity-90"
          style={{ background: "var(--gradient-subtle)" }}
        />
        <div className="mx-auto max-w-6xl px-6 pt-20 pb-16">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-accent font-medium mb-6">
            <ShieldCheck className="w-4 h-4" />
            No account · No sign-in · No data stored
          </div>
          <h1 className="font-serif text-5xl sm:text-6xl leading-tight text-foreground max-w-3xl">
            Work smarter with <span className="text-primary">AI</span>, without giving up your{" "}
            <span className="text-accent">privacy</span>.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
            The AI Workplace Productivity Assistant helps professionals draft emails, summarize
            research, and answer workplace questions. Every tool is available immediately — no
            registration, no personal information, no chat history saved.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/email"
              className="inline-flex items-center gap-2 rounded-md bg-primary text-primary-foreground px-5 py-3 text-sm font-medium hover:opacity-90 transition"
              style={{ boxShadow: "var(--shadow-warm)" }}
            >
              Start with an email <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/chat"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-5 py-3 text-sm font-medium text-foreground hover:bg-secondary transition"
            >
              Open the chat assistant
            </Link>
          </div>
        </div>
      </section>

      {/* Dashboard / tools */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="mb-8">
          <h2 className="font-serif text-3xl text-foreground">Welcome back</h2>
          <p className="text-muted-foreground mt-2 max-w-2xl">
            Boost your productivity with AI-powered workplace tools designed to help you
            communicate effectively, understand information faster, and make informed decisions.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {tools.map((t) => (
            <Link
              key={t.to}
              to={t.to}
              className="group rounded-xl border border-border bg-card p-6 hover:border-primary/60 hover:-translate-y-0.5 transition-all"
            >
              <span className="grid place-items-center w-11 h-11 rounded-md bg-primary/10 text-primary mb-4">
                <t.icon className="w-5 h-5" />
              </span>
              <h3 className="font-serif text-xl text-foreground">{t.title}</h3>
              <p className="text-sm text-muted-foreground mt-2">{t.description}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm text-accent font-medium">
                Open <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
