import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Download, Layers3 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cohortCountries, cohortCountryIds, countries, dpgs } from "@/lib/data";

export function generateStaticParams() {
  return cohortCountries.map((country) => ({ country: country.id }));
}

function metricValue(country: (typeof countries)[number], keyword: string) {
  return (
    country.metrics.find((metric) =>
      metric.label.toLowerCase().includes(keyword)
    )?.value ?? country.readiness
  );
}

function MetricCard({
  label,
  value,
  note,
}: {
  label: string;
  value: number;
  note: string;
}) {
  return (
    <div className="rounded-lg border bg-background p-4 shadow-sm">
      <div className="text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
        {label}
      </div>
      <div className="mt-2 text-3xl font-semibold text-primary">{value}%</div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-secondary">
        <div className="h-full rounded-full bg-primary" style={{ width: `${value}%` }} />
      </div>
      <div className="mt-3 text-xs leading-5 text-muted-foreground">{note}</div>
    </div>
  );
}

function ReadinessChart({ values }: { values: number[] }) {
  const points = values
    .map((value, index) => {
      const x = (index / Math.max(values.length - 1, 1)) * 420;
      const y = 112 - value;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="rounded-lg border bg-background p-4 shadow-sm">
      <div className="mb-4 text-xs font-semibold">DPI readiness profile</div>
      <div className="relative h-48">
        <div className="absolute inset-0 grid grid-rows-4">
          {[0, 1, 2, 3].map((line) => (
            <div key={line} className="border-t border-dashed" />
          ))}
        </div>
        <svg
          viewBox="0 0 420 120"
          className="relative h-full w-full overflow-visible text-primary"
        >
          <polyline
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
            points={points}
          />
          {values.map((value, index) => {
            const x = (index / Math.max(values.length - 1, 1)) * 420;
            const y = 112 - value;

            return (
              <circle
                key={`${value}-${index}`}
                cx={x}
                cy={y}
                fill="white"
                r="4"
                stroke="currentColor"
                strokeWidth="2"
              />
            );
          })}
        </svg>
      </div>
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

  const isCohortCountry = cohortCountryIds.some((id) => id === country.id);

  if (!isCohortCountry) {
    return (
      <main className="mx-auto flex w-full max-w-3xl flex-col gap-5 px-6 py-8">
        <section className="rounded-lg border bg-background p-6 shadow-sm">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className="gap-1">
              <span>{country.flag}</span>
              {country.name}
            </Badge>
            <Badge variant="secondary">Coming soon</Badge>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">
            {country.name} readiness page is coming soon
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
            This version focuses the full country-readiness experience on the
            three AA4DPI Cohort 1 countries: Sierra Leone, Ethiopia, and Zambia.
            {country.name} remains a peer reference for future expansion.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <Button asChild size="sm" className="text-xs">
              <Link href="/countries">View Cohort 1 countries</Link>
            </Button>
            <Button asChild variant="outline" size="sm" className="text-xs">
              <Link href="/builder">Open Stack Builder</Link>
            </Button>
          </div>
        </section>
      </main>
    );
  }

  const relevantDpgs = country.relevantDpgs.map((name) => {
    const match = dpgs.find((dpg) => dpg.name === name);
    return {
      name,
      layer: match?.layer ?? "Operations",
      description: match?.description ?? "Open-source tool to evaluate.",
    };
  });

  const chartValues = country.metrics.map((metric) => metric.value);

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-8">
      <section className="flex items-start justify-between gap-4">
        <div>
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className="gap-1">
              <span>{country.flag}</span>
              {country.name}
            </Badge>
            <Badge variant="secondary">{country.region}</Badge>
            <Badge className="bg-emerald-50 text-emerald-700">
              {country.maturity}
            </Badge>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">
            {country.name} DPI readiness
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
            {country.summary}
          </p>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline" size="sm" className="text-xs">
            <Link href="/countries">Compare countries</Link>
          </Button>
          <Button asChild size="sm" className="text-xs">
            <Link href={`/builder?country=${country.id}`}>
              Build stack
              <ArrowRight className="size-3.5" />
            </Link>
          </Button>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        <MetricCard
          label="Overall readiness"
          note="Composite prototype score for this country page"
          value={country.readiness}
        />
        <MetricCard
          label="Identity readiness"
          note="Ability to verify people or entities for service delivery"
          value={metricValue(country, "identity")}
        />
        <MetricCard
          label="Payment reach"
          note="How usable payment rails may be for public services"
          value={metricValue(country, "payment")}
        />
        <MetricCard
          label="Safeguards maturity"
          note="Privacy, redress, auditability, and trust signals"
          value={metricValue(country, "safeguards")}
        />
      </section>

      {country.implementationFocus?.length ? (
        <section className="grid gap-3 md:grid-cols-3">
          {country.implementationFocus.map((item) => (
            <div
              key={item.label}
              className="rounded-lg border bg-background p-4 shadow-sm"
            >
              <div className="text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                {item.label}
              </div>
              <p className="mt-2 text-sm leading-6">{item.value}</p>
            </div>
          ))}
        </section>
      ) : null}

      <section className="grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="rounded-lg border bg-background p-4 shadow-sm">
          <div className="mb-4 text-xs font-semibold">Building block snapshot</div>
          <div className="grid gap-4 text-xs">
            {country.metrics.map((metric) => (
              <div
                key={metric.label}
                className="grid grid-cols-[10rem_1fr_3rem] items-center gap-3"
              >
                <span>{metric.label}</span>
                <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${metric.value}%` }}
                  />
                </div>
                <span className="text-muted-foreground">{metric.value}%</span>
              </div>
            ))}
          </div>
        </div>
        <ReadinessChart values={chartValues} />
      </section>

      <section className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-lg border bg-background p-4 shadow-sm">
          <div className="mb-3 text-xs font-semibold">
            Relevant open DPGs to evaluate
          </div>
          <div className="grid gap-3">
            {relevantDpgs.map((dpg) => (
              <div key={dpg.name} className="rounded-md border p-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="font-semibold">{dpg.name}</div>
                  <Badge variant="secondary">{dpg.layer}</Badge>
                </div>
                <p className="mt-2 text-xs leading-5 text-muted-foreground">
                  {dpg.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4">
          <div className="rounded-lg border bg-background p-4 shadow-sm">
            <div className="mb-3 text-xs font-semibold">Priority use cases</div>
            <div className="flex flex-wrap gap-2">
              {country.priorityUseCases.map((item) => (
                <Badge key={item} variant="secondary" className="rounded-md">
                  {item}
                </Badge>
              ))}
            </div>
          </div>
          <div className="rounded-lg border bg-background p-4 shadow-sm">
            <div className="mb-3 text-xs font-semibold">
              Public systems or signals to validate
            </div>
            <div className="grid gap-2 text-xs text-muted-foreground">
              {country.publicSystems.map((item) => (
                <div key={item}>- {item}</div>
              ))}
            </div>
          </div>
          <div className="rounded-lg border bg-background p-4 shadow-sm">
            <div className="mb-3 text-xs font-semibold">Next validation work</div>
            <div className="grid gap-2 text-xs text-muted-foreground">
              {country.gaps.map((item) => (
                <div key={item}>- {item}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {country.countryUseCases?.length ? (
        <section className="rounded-lg border bg-background p-4 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <Layers3 className="size-4 text-primary" />
            <div>
              <div className="text-sm font-semibold">
                Country implementation examples
              </div>
              <p className="text-xs text-muted-foreground">
                Concrete service flows that can anchor a country-specific DPI
                build.
              </p>
            </div>
          </div>
          <div className="grid gap-3">
            {country.countryUseCases.map((useCase) => (
              <article key={useCase.title} className="rounded-md border p-4">
                <div className="grid gap-4 md:grid-cols-[1fr_0.8fr]">
                  <div>
                    <h2 className="text-base font-semibold">
                      {useCase.title}
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {useCase.description}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                      <span className="font-medium text-foreground">
                        Outcome:
                      </span>{" "}
                      {useCase.outcome}
                    </p>
                  </div>
                  <div>
                    <div className="mb-2 text-xs font-semibold">
                      Systems involved
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {useCase.systems.map((system) => (
                        <Badge
                          key={system}
                          variant="secondary"
                          className="rounded-md"
                        >
                          {system}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <div className="flex justify-end">
        <Button size="sm" className="text-xs">
          Export implementation brief
          <Download className="size-3.5" />
        </Button>
      </div>
    </main>
  );
}
