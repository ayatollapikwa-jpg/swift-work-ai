import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { generateResearch } from "@/lib/ai.functions";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GeneratedOutput } from "@/components/GeneratedOutput";
import { BookOpen, Sparkles } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "AI Research Assistant — AI Workplace Assistant" },
      {
        name: "description",
        content: "Summarize workplace topics, reports, and articles into structured business insights.",
      },
      { property: "og:title", content: "AI Research Assistant" },
      {
        property: "og:description",
        content: "Executive summaries, key findings, and practical recommendations from any text.",
      },
    ],
  }),
  component: ResearchPage,
});

type Level = "Quick" | "Detailed" | "Executive";

function ResearchPage() {
  const [topic, setTopic] = useState("");
  const [level, setLevel] = useState<Level>("Executive");
  const [output, setOutput] = useState("");

  const mutation = useMutation({
    mutationFn: async () => {
      const res = await generateResearch({ data: { topic, level } });
      return res.text;
    },
    onSuccess: (text) => setOutput(text),
    onError: (e: Error) => toast.error(e.message || "Failed to generate summary"),
  });

  const canSubmit = topic.trim().length > 0 && !mutation.isPending;

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <header className="mb-8">
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-accent font-medium">
          <BookOpen className="w-4 h-4" /> AI Research Assistant
        </div>
        <h1 className="font-serif text-4xl text-foreground mt-3">Research smarter</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">
          Paste a topic, article, report, or text you'd like AI to summarize and receive
          meaningful, structured insights.
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-2">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (canSubmit) mutation.mutate();
          }}
          className="rounded-xl border border-border bg-card p-6 space-y-5"
        >
          <div className="space-y-2">
            <Label htmlFor="topic">Research topic or source text</Label>
            <Textarea
              id="topic"
              rows={12}
              placeholder='e.g. "The impact of Artificial Intelligence on workplace productivity."'
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Summary level</Label>
            <Select value={level} onValueChange={(v) => setLevel(v as Level)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Quick">Quick — concise overview</SelectItem>
                <SelectItem value="Detailed">Detailed — comprehensive explanation</SelectItem>
                <SelectItem value="Executive">Executive — business summary for decision-makers</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" disabled={!canSubmit} className="w-full">
            <Sparkles className="w-4 h-4" />
            {mutation.isPending ? "Analyzing…" : "Generate summary"}
          </Button>
        </form>

        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="font-serif text-xl text-foreground mb-4">AI research output</h2>
          <GeneratedOutput
            value={output}
            onChange={setOutput}
            filename="research-summary.md"
            rows={20}
            placeholder="Your structured research summary will appear here."
            onRegenerate={canSubmit ? () => mutation.mutate() : undefined}
            regenerating={mutation.isPending}
          />
        </div>
      </div>
    </div>
  );
}