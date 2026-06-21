import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Download, Layers3 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cohortCountries, cohortCountryIds, countries, dpgs } from "@/lib/data";
import { evidenceLevel, evidenceTone } from "@/lib/evidence";

export function generateStaticParams() {
  return cohortCountries.map((country) => ({ country: country.id }));
}

function getMetric(country: (typeof countries)[number], keyword: string) {
  return country.metrics.find((metric) =>
    metric.label.toLowerCase().includes(keyword)
  );
}

function SignalCard({
  label,
  note,
  value,
}: {
  label: string;
  note: string;
  value: number;
}) {
  const level = evidenceLevel(value);

  return (
    <div className="rounded-lg border bg-background p-4 shadow-sm">
      <div className="text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
        {label}
      </div>
      <Badge className={`mt-3 rounded-md ${evidenceTone(level)}`}>
        {level}
      </Badge>
      <div className="mt-3 text-xs leading-5 text-muted-foreground">{note}</div>
    </div>
  );
}

function DataCard({
  label,
  value,
  year,
  source,
  note,
}: {
  label: string;
  value: string;
  year: string;
  source: string;
  note: string;
}) {
  return (
    <div className="rounded-lg border bg-background p-4 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div className="text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
          {label}
        </div>
        <Badge variant="secondary" className="rounded-md">
          {year}
        </Badge>
      </div>
      <div className="mt-3 text-2xl font-semibold text-foreground">{value}</div>
      <p className="mt-2 text-xs leading-5 text-muted-foreground">{note}</p>
      <div className="mt-3 text-[10px] text-muted-foreground">
        Source: {source}
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

  const identityMetric = getMetric(country, "identity");
  const paymentMetric = getMetric(country, "payment");
  const safeguardsMetric = getMetric(country, "safeguards");

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
            {country.name} DPI readiness signals
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

      <Tabs defaultValue="readiness" className="gap-5">
        <TabsList className="flex h-auto w-full flex-wrap justify-start gap-1 rounded-lg p-1 sm:w-fit">
          <TabsTrigger value="readiness">Readiness</TabsTrigger>
          <TabsTrigger value="data">Country data</TabsTrigger>
          <TabsTrigger value="use-cases">Use cases</TabsTrigger>
          <TabsTrigger value="systems">Systems</TabsTrigger>
        </TabsList>

        <TabsContent value="readiness" className="space-y-5">
          <section className="grid gap-4 md:grid-cols-4">
            <SignalCard
              label="Overall signal"
              note="Draft synthesis of the visible evidence in the country materials"
              value={country.readiness}
            />
            {identityMetric ? (
              <SignalCard
                label="Identity readiness"
                note={identityMetric.note}
                value={identityMetric.value}
              />
            ) : null}
            {paymentMetric ? (
              <SignalCard
                label="Payment reach"
                note={paymentMetric.note}
                value={paymentMetric.value}
              />
            ) : null}
            {safeguardsMetric ? (
              <SignalCard
                label="Safeguards maturity"
                note={safeguardsMetric.note}
                value={safeguardsMetric.value}
              />
            ) : null}
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

          <section className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-lg border bg-background p-4 shadow-sm">
              <div className="mb-4 text-xs font-semibold">
                Building block signals
              </div>
              <div className="grid gap-3">
                {country.metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-md border bg-secondary/25 p-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-xs font-semibold">
                        {metric.label}
                      </span>
                      <Badge
                        className={`rounded-md ${evidenceTone(
                          evidenceLevel(metric.value)
                        )}`}
                      >
                        {evidenceLevel(metric.value)}
                      </Badge>
                    </div>
                    <p className="mt-2 text-xs leading-5 text-muted-foreground">
                      {metric.note}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-lg border bg-background p-4 shadow-sm">
              <div className="mb-4 text-xs font-semibold">
                What each signal means
              </div>
              <div className="grid gap-3">
                {[
                  {
                    label: "Strong signal",
                    body: "The materials point to a live system, active implementation path, or clear institutional owner.",
                    value: 70,
                  },
                  {
                    label: "Emerging signal",
                    body: "There is a credible foundation, but coverage, operating model, or interoperability still needs to be checked.",
                    value: 58,
                  },
                  {
                    label: "Needs validation",
                    body: "The next step is to verify evidence before making a public claim about readiness.",
                    value: 45,
                  },
                ].map((item) => (
                  <div key={item.label} className="rounded-md border p-3">
                    <Badge
                      className={`rounded-md ${evidenceTone(
                        evidenceLevel(item.value)
                      )}`}
                    >
                      {item.label}
                    </Badge>
                    <p className="mt-2 text-xs leading-5 text-muted-foreground">
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="rounded-lg border bg-background p-4 shadow-sm">
            <div className="text-sm font-semibold">
              How to read these signals
            </div>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
              These are draft evidence labels, not official AA4DPI scores. They
              are inferred from the Cohort 1 materials, named public systems,
              and implementation signals in the documents. They should be read
              as a guide for what to validate next, not as a ranking of
              countries.
            </p>
          </section>
        </TabsContent>

        <TabsContent value="data" className="space-y-4">
          <section className="grid gap-4 md:grid-cols-3">
            {country.countryData?.map((item) => (
              <DataCard key={item.label} {...item} />
            ))}
          </section>
          <p className="text-xs leading-5 text-muted-foreground">
            Country data uses World Bank indicators returned by the API in June
            2026. Values are rounded for dashboard readability; 2024 is used
            where available and 2023 is used where 2024 is missing.
          </p>
        </TabsContent>

        <TabsContent value="use-cases">
          {country.countryUseCases?.length ? (
            <section className="rounded-lg border bg-background p-4 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <Layers3 className="size-4 text-primary" />
                <div>
                  <div className="text-sm font-semibold">
                    Country implementation examples
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Concrete service flows that can anchor a country-specific
                    DPI build.
                  </p>
                </div>
              </div>
              <div className="grid gap-3">
                {country.countryUseCases.map((useCase) => (
                  <article
                    key={useCase.title}
                    className="rounded-md border p-4"
                  >
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
        </TabsContent>

        <TabsContent value="systems">
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
                <div className="mb-3 text-xs font-semibold">
                  Priority use cases
                </div>
                <div className="flex flex-wrap gap-2">
                  {country.priorityUseCases.map((item) => (
                    <Badge
                      key={item}
                      variant="secondary"
                      className="rounded-md"
                    >
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
                <div className="mb-3 text-xs font-semibold">
                  Next validation work
                </div>
                <div className="grid gap-2 text-xs text-muted-foreground">
                  {country.gaps.map((item) => (
                    <div key={item}>- {item}</div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button size="sm" className="text-xs">
          Export implementation brief
          <Download className="size-3.5" />
        </Button>
      </div>
    </main>
  );
}
