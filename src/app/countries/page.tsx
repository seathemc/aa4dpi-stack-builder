import Link from "next/link";
import { ArrowRight, Clock3, ExternalLink, GitBranch, MapPinned } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cohortCountries, upcomingCountries } from "@/lib/data";
import { evidenceLevel, evidenceTone } from "@/lib/evidence";

export default function CountriesPage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-4 py-6 sm:px-6 sm:py-8">
      <section className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">
          Country readiness by cohort
        </h1>
        <p className="max-w-3xl text-sm leading-6 text-muted-foreground">
          Cohort 1 countries have full dashboard pages because they have active
          AA4DPI materials behind them. Cohort 2 countries are visible as the
          next expansion set, but their readiness dashboards are not live yet.
        </p>
      </section>

      <section className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg border bg-background p-4 shadow-sm">
          <div className="flex items-center gap-2">
            <MapPinned className="size-4 text-primary" />
            <h2 className="text-sm font-semibold">Cohort 1</h2>
          </div>
          <p className="mt-2 text-xs leading-5 text-muted-foreground">
            Live readiness dashboards for Sierra Leone, Ethiopia, and Zambia.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {cohortCountries.map((country) => (
              <Badge key={country.id} variant="secondary" className="rounded-md">
                <span className="mr-1">{country.flag}</span>
                {country.name}
              </Badge>
            ))}
          </div>
        </div>
        <div className="rounded-lg border bg-background p-4 shadow-sm">
          <div className="flex items-center gap-2">
            <Clock3 className="size-4 text-primary" />
            <h2 className="text-sm font-semibold">Cohort 2</h2>
          </div>
          <p className="mt-2 text-xs leading-5 text-muted-foreground">
            Planned expansion countries. These are shown for roadmap clarity,
            but are not clickable until the country materials are ready.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {upcomingCountries.map((country) => (
              <Badge key={country.id} variant="secondary" className="rounded-md">
                <span className="mr-1">{country.flag}</span>
                {country.name}
                <span className="ml-1 text-[10px] text-muted-foreground">
                  soon
                </span>
              </Badge>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <div>
          <h2 className="text-lg font-semibold">Cohort 1 dashboards</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Open a country page to see readiness signals, economic data, use
            cases, systems, and agency flows.
          </p>
        </div>

        <section className="grid gap-3 md:hidden">
          {cohortCountries.map((country) => (
            <article key={country.id} className="rounded-lg border bg-background p-4 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-secondary text-base font-semibold text-primary">
                  {country.flag}
                </div>
                <div className="min-w-0 flex-1">
                  <Link
                    href={`/countries/${country.id}`}
                    className="font-semibold hover:underline"
                  >
                    {country.name}
                  </Link>
                  <div className="mt-1 text-xs text-muted-foreground">
                    {country.region}
                  </div>
                </div>
                <Badge variant="secondary">{country.maturity}</Badge>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <Badge className={evidenceTone(evidenceLevel(country.readiness))}>
                  {evidenceLevel(country.readiness)}
                </Badge>
                {country.relevantDpgs.slice(0, 3).map((dpg) => (
                  <Badge key={dpg} variant="secondary">
                    {dpg}
                  </Badge>
                ))}
              </div>
              <p className="mt-3 text-xs leading-5 text-muted-foreground">
                {country.priorityUseCases.join(", ")}
              </p>
              <div className="mt-3 grid gap-2">
                <Button asChild variant="outline" size="sm" className="w-full text-xs">
                  <Link href={`/countries/${country.id}`}>
                    Open country dashboard
                    <ArrowRight className="size-3.5" />
                  </Link>
                </Button>
                {country.codeRepository ? (
                  <Button asChild size="sm" className="w-full text-xs">
                    <a
                      href={country.codeRepository.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <GitBranch className="size-3.5" />
                      Open code repo
                    </a>
                  </Button>
                ) : null}
              </div>
            </article>
          ))}
        </section>

        <section className="hidden overflow-hidden rounded-lg border bg-background shadow-sm md:block">
          <table className="w-full text-left text-xs">
            <thead className="border-b bg-secondary/50 text-[10px] uppercase tracking-[0.08em] text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-semibold">Country</th>
                <th className="px-4 py-3 font-semibold">Region</th>
                <th className="px-4 py-3 font-semibold">Stage</th>
                <th className="px-4 py-3 font-semibold">Readiness signal</th>
                <th className="px-4 py-3 font-semibold">Relevant DPGs to evaluate</th>
                <th className="px-4 py-3 font-semibold">Priority use cases</th>
                <th className="px-4 py-3 font-semibold">Code</th>
                <th className="px-4 py-3 font-semibold" />
              </tr>
            </thead>
            <tbody>
              {cohortCountries.map((country) => (
                <tr
                  key={country.id}
                  className="group border-b last:border-b-0 hover:bg-secondary/45"
                >
                  <td className="px-4 py-3">
                    <Link
                      href={`/countries/${country.id}`}
                      className="flex items-center gap-2 font-semibold hover:underline"
                    >
                      <div className="flex size-7 items-center justify-center rounded-md bg-secondary text-[10px] font-semibold text-primary">
                        <span className="text-base">{country.flag}</span>
                      </div>
                      {country.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{country.region}</td>
                  <td className="px-4 py-3">
                    <Badge variant="secondary">{country.maturity}</Badge>
                  </td>
                  <td className="px-4 py-3">
                    <Badge
                      className={evidenceTone(evidenceLevel(country.readiness))}
                    >
                      {evidenceLevel(country.readiness)}
                    </Badge>
                  </td>
                  <td className="max-w-xs px-4 py-3 text-muted-foreground">
                    {country.relevantDpgs.slice(0, 4).join(", ")}
                  </td>
                  <td className="max-w-xs px-4 py-3 text-muted-foreground">
                    {country.priorityUseCases.join(", ")}
                  </td>
                  <td className="px-4 py-3">
                    {country.codeRepository ? (
                      <a
                        href={country.codeRepository.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 font-medium text-primary"
                      >
                        Repo
                        <ExternalLink className="size-3.5" />
                      </a>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button asChild variant="ghost" size="sm" className="h-8 text-xs">
                      <Link href={`/countries/${country.id}`}>
                        Open
                        <ArrowRight className="size-3.5" />
                      </Link>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </section>
    </main>
  );
}
