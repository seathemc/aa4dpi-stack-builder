import Link from "next/link";
import { ArrowRight, Clock3, MapPinned, PlugZap } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cohortCountries, upcomingCountries } from "@/lib/data";

const regions = ["Cohort 1", "East Africa", "West Africa", "Southern Africa"];

function readinessTone(value: number) {
  if (value >= 62) return "bg-emerald-50 text-emerald-700";
  if (value >= 52) return "bg-amber-50 text-amber-700";
  return "bg-slate-100 text-slate-700";
}

export default function CountriesPage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-6 py-8">
      <section className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">
          Cohort 1 country readiness
        </h1>
        <p className="max-w-3xl text-sm leading-6 text-muted-foreground">
          The first AA4DPI country dashboards focus on Sierra Leone, Ethiopia,
          and Zambia because those are the countries with active Cohort 1
          programme material behind them.
        </p>
      </section>

      <section className="flex flex-wrap gap-2">
        {regions.map((region, index) => (
          <Badge
            key={region}
            variant={index === 0 ? "default" : "secondary"}
            className="rounded-md px-3 py-1"
          >
            {region}
          </Badge>
        ))}
      </section>

      <section className="overflow-hidden rounded-lg border bg-background shadow-sm">
        <table className="w-full text-left text-xs">
          <thead className="border-b bg-secondary/50 text-[10px] uppercase tracking-[0.08em] text-muted-foreground">
            <tr>
              <th className="px-4 py-3 font-semibold">Country</th>
              <th className="px-4 py-3 font-semibold">Region</th>
              <th className="px-4 py-3 font-semibold">Stage</th>
              <th className="px-4 py-3 font-semibold">Readiness</th>
              <th className="px-4 py-3 font-semibold">Relevant DPGs to evaluate</th>
              <th className="px-4 py-3 font-semibold">Priority use cases</th>
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
                  <Badge className={readinessTone(country.readiness)}>
                    {country.readiness}%
                  </Badge>
                </td>
                <td className="max-w-xs px-4 py-3 text-muted-foreground">
                  {country.relevantDpgs.slice(0, 4).join(", ")}
                </td>
                <td className="max-w-xs px-4 py-3 text-muted-foreground">
                  {country.priorityUseCases.join(", ")}
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

      <section className="rounded-lg border bg-background p-4 shadow-sm">
        <div className="mb-3 flex items-center gap-2">
          <Clock3 className="size-4 text-primary" />
          <div>
            <div className="text-sm font-semibold">Coming soon</div>
            <p className="text-xs text-muted-foreground">
              These countries remain useful peer references, but they do not
              have full AA4DPI readiness pages in this version.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {upcomingCountries.map((country) => (
            <Badge key={country.id} variant="secondary" className="rounded-md">
              <span className="mr-1">{country.flag}</span>
              {country.name}
            </Badge>
          ))}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border bg-background p-4 shadow-sm">
          <MapPinned className="mb-3 size-4 text-primary" />
          <div className="text-sm font-semibold">Country pages are dashboards</div>
          <p className="mt-2 text-xs leading-5 text-muted-foreground">
            Each Cohort 1 page mixes development priorities, DPI readiness, and
            open-source components that could support the first implementation
            sprint.
          </p>
        </div>
        <div className="rounded-lg border bg-background p-4 shadow-sm md:col-span-2">
          <PlugZap className="mb-3 size-4 text-primary" />
          <div className="text-sm font-semibold">How to read this table</div>
          <p className="mt-2 text-xs leading-5 text-muted-foreground">
            The DPGs listed here are not claims that a country has deployed
            those tools. They are relevant open-source options to assess against
            each country&apos;s selected use cases, standards, safeguards, and
            existing systems.
          </p>
        </div>
      </section>
    </main>
  );
}
