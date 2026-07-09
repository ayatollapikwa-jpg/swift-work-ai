import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="border-t border-border mt-24 bg-secondary/40">
      <div className="mx-auto max-w-6xl px-6 py-10 grid gap-4 sm:grid-cols-2">
        <div>
          <h3 className="font-serif text-lg text-foreground">AI Workplace Productivity Assistant</h3>
          <p className="text-sm text-muted-foreground mt-1 max-w-md">
            Helping professionals communicate, research, and work smarter with AI.
          </p>
        </div>
        <div className="sm:text-right text-sm text-muted-foreground">
          <p>Privacy-first · No Registration · No Sign-in · No Data Storage</p>
          <Link to="/privacy" className="mt-2 inline-block text-accent hover:underline">
            Read the privacy statement
          </Link>
        </div>
      </div>
    </footer>
  );
}