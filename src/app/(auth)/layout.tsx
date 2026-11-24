import React from "react";

const authHighlights = [
  "Track building charges",
  "Stay on top of payments",
  "Keep notices and updates together",
];

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative isolate flex flex-1 items-center justify-center overflow-hidden bg-muted/30 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 top-12 size-72 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -right-24 bottom-0 size-80 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 grid w-full max-w-6xl overflow-hidden rounded-[2rem] border border-border/70 bg-card shadow-2xl shadow-foreground/5 lg:min-h-168 lg:grid-cols-[0.88fr_1.12fr]">
        <aside className="relative hidden flex-col justify-between overflow-hidden bg-primary p-10 text-primary-foreground lg:flex xl:p-14">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-36 -top-32 size-96 rounded-full border border-primary-foreground/10"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-48 -left-36 size-112 rounded-full border border-primary-foreground/10"
          />

          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-3 py-1.5 text-xs font-medium tracking-wide text-primary-foreground/80">
              <span className="size-1.5 rounded-full bg-primary-foreground" />
              BUILDING MANAGEMENT, SIMPLIFIED
            </div>
            <h1 className="mt-10 max-w-md text-4xl font-semibold leading-tight tracking-tight xl:text-5xl">
              A better way to manage your building.
            </h1>
            <p className="mt-5 max-w-sm text-base leading-7 text-primary-foreground/70">
              Bring building charges, payments, and community updates together
                in one simple place.
            </p>
          </div>

          <div className="relative space-y-3">
            {authHighlights.map((highlight, index) => (
              <div
                key={highlight}
                className="flex items-center gap-3 rounded-xl border border-primary-foreground/10 bg-primary-foreground/5 px-4 py-3"
              >
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary-foreground/10 text-xs font-semibold text-primary-foreground/80">
                  0{index + 1}
                </span>
                <span className="text-sm font-medium text-primary-foreground/90">
                  {highlight}
                </span>
              </div>
            ))}
          </div>

          <p className="relative text-xs font-medium tracking-[0.2em] text-primary-foreground/50">
            FLATBILL
          </p>
        </aside>

        <div className="flex min-w-0 items-center justify-center p-0 sm:p-6 lg:p-10 xl:p-14">
          <div className="w-full max-w-xl">{children}</div>
        </div>
      </div>
    </main>
  );
}
