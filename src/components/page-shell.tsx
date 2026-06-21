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
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-8 sm:px-6 md:px-8 md:py-12">
      <section className="flex flex-col gap-4">
        <div className="inline-flex w-fit rounded-full bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
          {eyebrow}
        </div>
        <h1 className="max-w-3xl text-3xl font-semibold tracking-normal text-foreground sm:text-4xl">
          {title}
        </h1>
        <p className="max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
          {summary}
        </p>
      </section>
      {children}
    </main>
  );
}
