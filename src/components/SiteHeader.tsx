import { Link } from "@tanstack/react-router";
import { Leaf } from "lucide-react";

const nav = [
  { to: "/", label: "Home" },
  { to: "/email", label: "Email" },
  { to: "/research", label: "Research" },
  { to: "/chat", label: "Chat" },
  { to: "/privacy", label: "Privacy" },
] as const;

export function SiteHeader() {
  return (
    <header className="border-b border-border bg-background/80 backdrop-blur sticky top-0 z-40">
      <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="grid place-items-center w-9 h-9 rounded-md bg-primary text-primary-foreground">
            <Leaf className="w-5 h-5" />
          </span>
          <span className="font-serif text-lg text-foreground">
            Workplace<span className="text-accent">AI</span>
          </span>
        </Link>
        <nav className="flex items-center gap-1 text-sm">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="px-3 py-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors"
              activeProps={{ className: "px-3 py-2 rounded-md text-foreground bg-secondary" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}