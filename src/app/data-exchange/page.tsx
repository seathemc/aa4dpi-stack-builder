import { ArrowDown, ArrowRight } from "lucide-react";

function Lane({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-0 rounded-lg border bg-background p-4 shadow-sm lg:min-h-[27rem]">
      <div className="mb-6">
        <div className="text-xs font-semibold">{title}</div>
        <div className="text-[10px] text-muted-foreground">{subtitle}</div>
      </div>
      {children}
    </div>
  );
}

function FlowStep({
  n,
  title,
  body,
}: {
  n: number;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-md border bg-secondary/70 p-3 text-xs">
      <div className="mb-2 flex items-center gap-2 font-semibold">
        <span className="flex size-5 items-center justify-center rounded-full bg-primary text-[10px] text-white">
          {n}
        </span>
        {title}
      </div>
      <p className="leading-5 text-muted-foreground">{body}</p>
    </div>
  );
}

export default function DataExchangePage() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-5 px-4 py-6 sm:gap-6 sm:px-6 sm:py-8">
      <section className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">
          Data exchange flow
        </h1>
        <p className="text-sm text-muted-foreground">
          Example: Sierra Leone procurement-to-payment tracking
        </p>
      </section>

      <section className="relative grid gap-5 lg:grid-cols-[1fr_1.1fr_1fr]">
        <Lane title="Agency A" subtitle="eGP procurement">
          <div className="grid gap-5 text-xs lg:gap-20">
            <div>
              <div className="font-semibold">Requests data</div>
              <p className="mt-2 text-muted-foreground">Purpose</p>
              <p className="mt-1">Verify supplier and contract status</p>
            </div>
            <div>
              <p className="text-muted-foreground">Data needed</p>
              <p className="mt-1">Supplier verified? Contract awarded?</p>
            </div>
            <div>
              <p className="text-muted-foreground">Legal basis</p>
              <p className="mt-1">Digital Government Bill and procurement rules</p>
            </div>
          </div>
        </Lane>

        <Lane title="Data Exchange Layer" subtitle="Government Service Bus / X-Road">
          <div className="grid gap-3">
            <FlowStep
              n={1}
              title="Authenticate request"
              body="Confirm the requesting agency and system"
            />
            <FlowStep
              n={2}
              title="Authorize"
              body="Check purpose, data-sharing rule, and role"
            />
            <FlowStep n={3} title="Route" body="Query CRVS, IFMIS, or T24" />
            <FlowStep n={4} title="Respond" body="Return signed status, not raw databases" />
          </div>
        </Lane>

        <Lane title="Agency B" subtitle="CRVS · IFMIS · T24">
          <div className="grid gap-5 text-xs lg:gap-20">
            <div>
              <div className="font-semibold">Verifies request</div>
              <p className="mt-2 text-muted-foreground">
                Checks identity, treasury, or settlement record
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Returns response</p>
              <p className="mt-1 text-emerald-700">
                Verified / allocated / paid
              </p>
            </div>
          </div>
        </Lane>

        <div className="absolute left-1/2 top-[8.5rem] hidden -translate-x-1/2 items-center gap-2 text-primary lg:flex">
          <ArrowRight className="size-4" />
          <ArrowRight className="size-4" />
        </div>
        <div className="absolute left-1/2 top-[17.5rem] hidden -translate-x-1/2 items-center gap-2 text-emerald-500 lg:flex">
          <ArrowRight className="size-4 rotate-180" />
          <ArrowRight className="size-4 rotate-180" />
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-md place-items-center rounded-lg border bg-secondary/60 p-4 text-center shadow-sm">
        <ArrowDown className="mb-2 size-4 text-muted-foreground" />
        <div className="text-xs font-semibold">Audit Log</div>
        <p className="mt-1 text-xs text-muted-foreground">
          Every request records who asked, why they asked, what system answered,
          and what status was returned.
        </p>
      </section>
    </main>
  );
}
