import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { chatReply } from "@/lib/ai.functions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessagesSquare, Send, User, Sparkles } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "AI Chat Assistant — AI Workplace Assistant" },
      {
        name: "description",
        content: "Ask workplace and productivity questions and get intelligent AI responses instantly.",
      },
      { property: "og:title", content: "AI Workplace Chat Assistant" },
      {
        property: "og:description",
        content: "Conversational AI support for workplace communication, planning, and productivity.",
      },
    ],
  }),
  component: ChatPage,
});

type Msg = { role: "user" | "assistant"; content: string };

const EXAMPLES = [
  "How do I write a professional resignation email?",
  "Explain SWOT analysis.",
  "Help me prepare for a performance review.",
  "Create a meeting agenda.",
  "What are effective time-management techniques?",
];

function ChatPage() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const mutation = useMutation({
    mutationFn: async (history: Msg[]) => {
      const res = await chatReply({ data: { messages: history } });
      return res.text;
    },
    onSuccess: (text) => {
      setMessages((m) => [...m, { role: "assistant", content: text }]);
    },
    onError: (e: Error) => toast.error(e.message || "Failed to get a reply"),
  });

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, mutation.isPending]);

  const send = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || mutation.isPending) return;
    const next: Msg[] = [...messages, { role: "user", content: trimmed }];
    setMessages(next);
    setInput("");
    mutation.mutate(next);
  };

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <header className="mb-6">
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-accent font-medium">
          <MessagesSquare className="w-4 h-4" /> Chat Assistant
        </div>
        <h1 className="font-serif text-4xl text-foreground mt-3">Your AI productivity assistant</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">
          Ask questions about workplace communication, planning, meetings, reports, or research.
          Conversations are held only in this browser tab and disappear when you refresh or leave.
        </p>
      </header>

      {messages.length === 0 && (
        <div className="mb-6">
          <p className="text-sm text-muted-foreground mb-3">Try one of these:</p>
          <div className="flex flex-wrap gap-2">
            {EXAMPLES.map((q) => (
              <button
                key={q}
                onClick={() => send(q)}
                className="rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground hover:border-primary/60 hover:bg-secondary/60 transition"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      <div
        ref={scrollRef}
        className="rounded-xl border border-border bg-card p-6 min-h-[420px] max-h-[60vh] overflow-y-auto space-y-5"
      >
        {messages.length === 0 && (
          <div className="text-center text-muted-foreground text-sm py-16">
            Ask anything workplace-related to get started.
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
            <div
              className={`grid place-items-center w-8 h-8 rounded-full shrink-0 ${
                m.role === "user"
                  ? "bg-accent text-accent-foreground"
                  : "bg-primary text-primary-foreground"
              }`}
            >
              {m.role === "user" ? <User className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
            </div>
            <div
              className={`max-w-[80%] rounded-lg px-4 py-3 whitespace-pre-wrap text-sm leading-relaxed ${
                m.role === "user"
                  ? "bg-accent/10 text-foreground"
                  : "bg-secondary text-foreground"
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}
        {mutation.isPending && (
          <div className="flex gap-3">
            <div className="grid place-items-center w-8 h-8 rounded-full bg-primary text-primary-foreground shrink-0">
              <Sparkles className="w-4 h-4 animate-pulse" />
            </div>
            <div className="bg-secondary rounded-lg px-4 py-3 text-sm text-muted-foreground">
              Thinking…
            </div>
          </div>
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="mt-4 flex gap-2 items-end"
      >
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              send(input);
            }
          }}
          placeholder="Ask a workplace question…"
          rows={2}
          className="bg-card"
        />
        <Button type="submit" disabled={!input.trim() || mutation.isPending} size="lg">
          <Send className="w-4 h-4" />
          Send
        </Button>
      </form>
    </div>
  );
}