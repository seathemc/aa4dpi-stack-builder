import { ReactNode } from "react";

export function PageShell({
  eyebrow,
  title,
  summary,
  children,
}: {
  eyebrow: string;
  title: string;
  summary: string;
  children: ReactNode;
}) {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-5 py-7 sm:px-7 md:px-8 md:py-9">
      <section className="flex flex-col gap-3">
        <div className="inline-flex w-fit rounded-full bg-secondary px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-primary">
          {eyebrow}
        </div>
        <h1 className="max-w-3xl text-2xl font-semibold tracking-normal text-foreground sm:text-3xl">
          {title}
        </h1>
        <p className="max-w-3xl text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
          {summary}
        </p>
      </section>
      {children}
    </main>
  );
}
