import Link from "next/link";
import { BrandIcon } from "@/components/ui/BrandIcon";
import type { ProtocolVersion } from "@/lib/protocol-versions";

interface ProtocolChangelogProps {
  versions: ProtocolVersion[];
  /** When true, renders the full page layout. When false, embeds compact
   *  cards (for use inside blog posts, lead-magnet pages, etc.). */
  fullPage?: boolean;
}

const STATUS_STYLES: Record<ProtocolVersion["status"], string> = {
  active: "bg-accent/10 border-accent/30 text-accent",
  superseded: "bg-white/5 border-white/15 text-white/50",
  draft: "bg-amber-500/5 border-amber-500/30 text-amber-400",
};

const STATUS_LABELS: Record<ProtocolVersion["status"], string> = {
  active: "ACTIVE NOW",
  superseded: "SUPERSEDED",
  draft: "DRAFT",
};

export function ProtocolChangelog({ versions, fullPage = true }: ProtocolChangelogProps) {
  if (versions.length === 0) {
    return (
      <div className="text-muted text-sm italic">
        No protocol versions documented yet.
      </div>
    );
  }

  return (
    <ol className="relative space-y-8" aria-label="Protocol version history">
      {/* Vertical timeline rail */}
      <div
        className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-accent via-white/20 to-transparent"
        aria-hidden="true"
      />

      {versions.map((v, idx) => (
        <li key={v.slug} className="relative pl-8">
          {/* Timeline dot */}
          <div
            className={`absolute left-0 top-2 w-3.5 h-3.5 rounded-full border-2 ${
              v.status === "active"
                ? "bg-accent border-accent shadow-lg shadow-accent/30"
                : "bg-zinc-950 border-white/30"
            }`}
            aria-hidden="true"
          />

          <article
            className={`border rounded-2xl bg-zinc-950 p-6 md:p-8 ${
              v.status === "active" ? "border-accent/30" : "border-white/10"
            }`}
          >
            <header className="flex flex-wrap items-center gap-3 mb-3">
              <span className="text-accent font-mono text-[10.5px] uppercase tracking-[0.2em] font-bold">
                {v.version}
              </span>
              <span
                className={`border px-2 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-widest font-bold ${STATUS_STYLES[v.status]}`}
              >
                {STATUS_LABELS[v.status]}
              </span>
              <time
                dateTime={v.date}
                className="text-muted text-xs font-mono"
              >
                {v.date}
              </time>
              {idx === 0 && v.status === "active" && (
                <span className="text-muted text-[10px] font-mono ml-auto hidden md:inline">
                  ↓ current ↓
                </span>
              )}
            </header>

            <h3
              className={`font-bold tracking-tight leading-tight mb-2 ${
                fullPage ? "text-2xl md:text-3xl" : "text-lg"
              } text-white`}
            >
              {v.summary}
            </h3>

            {fullPage && (
              <p className="text-muted text-sm leading-relaxed mb-5">{v.why}</p>
            )}

            {/* What changed */}
            <div className="mb-5">
              <h4 className="text-[10px] font-mono uppercase tracking-widest text-accent font-bold mb-2 flex items-center gap-2">
                <BrandIcon id="folder-structure" className="w-3.5 h-3.5" />
                What changed
              </h4>
              <ul className="space-y-1.5 text-sm text-muted">
                {v.whatChanged.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-accent mt-0.5" aria-hidden="true">
                      →
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Data deltas */}
            {v.data && v.data.length > 0 && (
              <div className="mb-5 grid grid-cols-1 sm:grid-cols-2 gap-2">
                {v.data.map((d, i) => (
                  <div
                    key={i}
                    className="p-3 border border-white/10 rounded-lg bg-black/30"
                  >
                    <p className="text-[10px] font-mono uppercase tracking-widest text-muted mb-1">
                      {d.label}
                    </p>
                    <p className="text-sm font-mono text-white">
                      <span className="text-white/40">{d.before}</span>
                      <span className="text-accent mx-2" aria-hidden="true">
                        →
                      </span>
                      <span className="font-bold">{d.after}</span>
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Evidence links */}
            {v.evidence && v.evidence.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="text-[10px] font-mono uppercase tracking-widest text-muted">
                  Evidence:
                </span>
                {v.evidence.map((e, i) => {
                  const isImage = /\.(png|jpg|jpeg|webp|gif)$/i.test(e);
                  const label = isImage ? "Scan" : e.startsWith("/api/og") ? "Data card" : e;
                  return (
                    <Link
                      key={i}
                      href={e}
                      className="text-accent hover:underline font-mono"
                      target={e.startsWith("http") ? "_blank" : undefined}
                      rel={e.startsWith("http") ? "noopener noreferrer" : undefined}
                    >
                      {label} →
                    </Link>
                  );
                })}
              </div>
            )}
          </article>
        </li>
      ))}
    </ol>
  );
}
