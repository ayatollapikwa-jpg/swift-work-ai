import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { generateEmail } from "@/lib/ai.functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GeneratedOutput } from "@/components/GeneratedOutput";
import { Mail, Sparkles } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/email")({
  head: () => ({
    meta: [
      { title: "Smart Email Generator — AI Workplace Assistant" },
      {
        name: "description",
        content: "Generate clear, well-structured business emails in seconds with AI. No account required.",
      },
      { property: "og:title", content: "Smart Email Generator" },
      {
        property: "og:description",
        content: "Draft professional workplace emails with AI. Editable output, copy or download instantly.",
      },
    ],
  }),
  component: EmailPage,
});

type Tone = "Formal" | "Friendly" | "Persuasive";

function EmailPage() {
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [purpose, setPurpose] = useState("");
  const [notes, setNotes] = useState("");
  const [tone, setTone] = useState<Tone>("Formal");
  const [output, setOutput] = useState("");

  const mutation = useMutation({
    mutationFn: async () => {
      const res = await generateEmail({
        data: { recipient, subject, purpose, notes, tone },
      });
      return res.text;
    },
    onSuccess: (text) => setOutput(text),
    onError: (e: Error) => toast.error(e.message || "Failed to generate email"),
  });

  const canSubmit = recipient && subject && purpose && !mutation.isPending;

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <header className="mb-8">
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-accent font-medium">
          <Mail className="w-4 h-4" /> Smart Email Generator
        </div>
        <h1 className="font-serif text-4xl text-foreground mt-3">Create professional emails</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">
          Generate clear, well-structured business emails for any workplace situation. Every draft
          is fully editable before you send.
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
            <Label htmlFor="recipient">Recipient</Label>
            <Input
              id="recipient"
              placeholder="e.g. Project Manager"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              placeholder="e.g. Project Progress Update"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="purpose">Purpose</Label>
            <Textarea
              id="purpose"
              rows={3}
              placeholder="e.g. Request approval for the revised project timeline."
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Additional instructions</Label>
            <Textarea
              id="notes"
              rows={3}
              placeholder="e.g. Mention that all testing is complete and thank the recipient."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Tone</Label>
            <Select value={tone} onValueChange={(v) => setTone(v as Tone)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Formal">Formal — professional and respectful</SelectItem>
                <SelectItem value="Friendly">Friendly — warm and approachable</SelectItem>
                <SelectItem value="Persuasive">Persuasive — convincing and action-oriented</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" disabled={!canSubmit} className="w-full">
            <Sparkles className="w-4 h-4" />
            {mutation.isPending ? "Generating…" : "Generate email"}
          </Button>
        </form>

        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="font-serif text-xl text-foreground mb-4">Generated email</h2>
          <GeneratedOutput
            value={output}
            onChange={setOutput}
            filename="email.txt"
            placeholder="Fill in the form and click Generate. Your email will appear here, fully editable."
            onRegenerate={canSubmit ? () => mutation.mutate() : undefined}
            regenerating={mutation.isPending}
          />
        </div>
      </div>
    </div>
  );
}