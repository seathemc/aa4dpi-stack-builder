import { notFound } from "next/navigation";
import { Download } from "lucide-react";

import { Button } from "@/components/ui/button";
import { countries } from "@/lib/data";

export function generateStaticParams() {
  return countries.map((country) => ({ country: country.id }));
}

function MetricCard({
  label,
  value,
  tone = "blue",
}: {
  label: string;
  value: string;
  tone?: "blue" | "amber" | "green";
}) {
  const color =
    tone === "green"
      ? "text-emerald-600"
      : tone === "amber"
        ? "text-amber-600"
        : "text-primary";

  return (
    <div className="rounded-lg border bg-background p-4 shadow-sm">
      <div className="text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
        {label}
      </div>
      <div className={`mt-2 text-3xl font-semibold ${color}`}>{value}</div>
      <div className="mt-3 h-9 rounded-md bg-gradient-to-r from-sky-50 via-background to-sky-100" />
    </div>
  );
}

function LineChart() {
  return (
    <div className="h-48 rounded-lg border bg-background p-4 shadow-sm">
      <div className="mb-4 text-xs font-semibold">Trend (last 12 months)</div>
      <div className="grid h-32 grid-rows-4 gap-0 border-l border-muted pl-2">
        {[0, 1, 2, 3].map((line) => (
          <div key={line} className="border-t border-dashed" />
        ))}
      </div>
      <svg viewBox="0 0 420 120" className="-mt-32 h-32 w-full overflow-visible">
        <polyline
          fill="none"
          stroke="#2563eb"
          strokeWidth="3"
          points="0,80 45,62 90,70 135,48 180,58 225,36 270,50 315,42 360,34 420,28"
        />
        <polyline
          fill="none"
          stroke="#0ea5e9"
          strokeWidth="2"
          points="0,95 45,88 90,76 135,72 180,60 225,68 270,58 315,62 360,54 420,48"
        />
        <polyline
          fill="none"
          stroke="#d946ef"
          strokeWidth="2"
          points="0,106 45,100 90,98 135,94 180,88 225,92 270,84 315,86 360,82 420,78"
        />
      </svg>
    </div>
  );
}

export default async function CountryPage({
  params,
}: {
  params: Promise<{ country: string }>;
}) {
  const { country: countryId } = await params;
  const country = countries.find((item) => item.id === countryId);

  if (!country) {
    notFound();
  }

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-8">
      <section className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            {country.name} DPI readiness
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Snapshot of key indicators across DPI building blocks.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="text-xs">
            Compare countries
          </Button>
          <Button variant="outline" size="sm" className="text-xs">
            {country.name}
          </Button>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        <MetricCard label="Overall readiness" value="62%" />
        <MetricCard label="DPI coverage" value="48%" />
        <MetricCard label="API readiness" value="58%" tone="amber" />
        <MetricCard label="Safeguards maturity" value="65%" tone="green" />
      </section>

      <section className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-lg border bg-background p-4 shadow-sm">
          <div className="mb-4 text-xs font-semibold">Building block snapshot</div>
          <div className="grid gap-4 text-xs">
            {[
              ["Identity coverage", "72%"],
              ["Civil registration quality", "68%"],
              ["Payment reach", "60%"],
              ["Data exchange readiness", "56%"],
              ["Trust & safeguards", "66%"],
            ].map(([label, value]) => (
              <div key={label} className="grid grid-cols-[11rem_1fr_3rem] items-center gap-3">
                <span>{label}</span>
                <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
                  <div className="h-full rounded-full bg-emerald-500" style={{ width: value }} />
                </div>
                <span className="text-muted-foreground">{value}</span>
              </div>
            ))}
          </div>
        </div>
        <LineChart />
      </section>

      <section className="rounded-lg border bg-background p-4 shadow-sm">
        <div className="mb-3 text-xs font-semibold">Next steps</div>
        <div className="grid gap-2 text-xs text-muted-foreground">
          <div>○ Strengthen legal framework for data sharing</div>
          <div>○ Expand digital ID coverage in rural areas</div>
          <div>○ Onboard more agencies to data exchange layer</div>
        </div>
      </section>

      <div className="flex justify-end">
        <Button size="sm" className="text-xs">
          Export implementation brief
          <Download className="size-3.5" />
        </Button>
      </div>
    </main>
  );
}
