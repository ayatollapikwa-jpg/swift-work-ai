import { useState } from "react";
import { Copy, Download, RefreshCw, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface Props {
  value: string;
  onChange: (v: string) => void;
  onRegenerate?: () => void;
  regenerating?: boolean;
  filename?: string;
  placeholder?: string;
  rows?: number;
}

export function GeneratedOutput({
  value,
  onChange,
  onRegenerate,
  regenerating,
  filename = "output.txt",
  placeholder = "Your generated content will appear here.",
  rows = 16,
}: Props) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    if (!value) return;
    await navigator.clipboard.writeText(value);
    setCopied(true);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopied(false), 1500);
  };

  const download = () => {
    if (!value) return;
    const blob = new Blob([value], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-3">
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="font-sans leading-relaxed bg-card"
      />
      <div className="flex flex-wrap gap-2">
        <Button type="button" variant="outline" onClick={copy} disabled={!value}>
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          Copy
        </Button>
        <Button type="button" variant="outline" onClick={download} disabled={!value}>
          <Download className="w-4 h-4" />
          Download
        </Button>
        {onRegenerate && (
          <Button
            type="button"
            variant="secondary"
            onClick={onRegenerate}
            disabled={regenerating}
          >
            <RefreshCw className={`w-4 h-4 ${regenerating ? "animate-spin" : ""}`} />
            Regenerate
          </Button>
        )}
      </div>
    </div>
  );
}