import { identity } from '@/lib/content';

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="section-shell flex flex-col gap-4 py-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-sm text-muted-foreground">
          {identity.name} - {new Date().getFullYear()}
        </p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          <li>
            <a
              href={`mailto:${identity.email}`}
              className="inline-flex min-h-11 items-center font-mono text-sm text-muted-foreground transition-colors duration-200 hover:text-accent"
            >
              Email
            </a>
          </li>
          <li>
            <a
              href={identity.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center font-mono text-sm text-muted-foreground transition-colors duration-200 hover:text-accent"
            >
              LinkedIn
            </a>
          </li>
          <li>
            <a
              href={identity.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center font-mono text-sm text-muted-foreground transition-colors duration-200 hover:text-accent"
            >
              GitHub
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
